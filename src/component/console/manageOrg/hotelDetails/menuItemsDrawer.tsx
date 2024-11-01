"use client";
import { FoodItem } from '@/model/manage_org_model/hotel_list';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import {
    Button,
    Select,
    MenuItem,
    Typography,
    FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import StyledTextField from '@/component/common/styledTextfield';
import { GithubService } from '@/service/githubImageUpload';
import { useParams } from 'next/navigation';
import { FirebaseServices } from '@/service/firebase.service';
import CloseIcon from '@mui/icons-material/Close';
const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#65C466',
                opacity: 1,
                border: 0,
            },
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default function MenuItemsDrawer({ handleBackClick, selectedFoodItems }: { handleBackClick: () => void; selectedFoodItems: FoodItem }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [pricing, setPricing] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isTodaySpecial, setIsTodaySpecial] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const [itemsImageUrl, setItemsImageUrl] = useState('');
    const [token, setToken] = useState('');
    const itemTypes = ["Non Veg", "Veg", "Egg", "Drinks"];
    const params = useParams();
    const restId = params.restId;

    useEffect(() => {
        if (selectedFoodItems) {
            setImageUrl(selectedFoodItems.itemsImageUrl || '');
            setItemName(selectedFoodItems.name || '');
            setItemType(selectedFoodItems.foodType || '');
            setPricing(selectedFoodItems.price !== undefined ? String(selectedFoodItems.price) : '');
            setDescription(selectedFoodItems.description || '');
            setIsActive(selectedFoodItems.isActive || false);
            setIsTodaySpecial(selectedFoodItems.isSpecial || false);
            setImagePath(selectedFoodItems.imagePath || '')
        }
    }, [selectedFoodItems]);

    useEffect(() => {
        FirebaseServices.shared.getToken((data) => {
            setToken(data);
        })
    }, [])

    useEffect(() => {
        const isFormDirty = () => {
            return (
                imageUrl !== selectedFoodItems.itemsImageUrl ||
                itemName !== selectedFoodItems.name ||
                itemType !== selectedFoodItems.foodType ||
                pricing !== (selectedFoodItems.price !== undefined ? String(selectedFoodItems.price) : '') ||
                description !== selectedFoodItems.description ||
                isActive !== selectedFoodItems.isActive ||
                isTodaySpecial !== selectedFoodItems.isSpecial
            );
        };

        setIsDirty(isFormDirty());
    }, [imageUrl, itemName, itemType, pricing, description, isActive, isTodaySpecial, selectedFoodItems]);


    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result as string;
                // Delete existing file
                // await deleteFileApi();
                const filePath = `${restId}/${Date.now()}.${file.name.split('.').pop()}`; // Generate file path based on timestamp and extension
                const message = `Successfully ${filePath} added`;
                const base64Cleaned = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
                setImagePath(filePath);
                // Set image URL
                setImageUrl(reader.result as string);
                // Upload new file
                await uploadFileApi(base64Cleaned, filePath, message);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        if (!imageUrl) {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64String = reader.result as string;
                    // Delete existing file
                    // await deleteFileApi();
                    const filePath = `${restId}/${Date.now()}.${file.name.split('.').pop()}`; // Generate file path based on timestamp and extension
                    const message = `Successfully ${filePath} added`;
                    // Set image URL
                    const base64Cleaned = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
                    setImagePath(filePath);
                    setImageUrl(reader.result as string);
                    // Upload new file
                    await uploadFileApi(base64Cleaned, filePath, message);
                };
                reader.readAsDataURL(file);
            }
        }

    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const deleteFileApi = async () => {
        let response = await GithubService.shared.deleteFileApi(token, imagePath);
        if (response) {
            setImagePath('');
            setImageUrl('');
            setItemsImageUrl('');
        }
    };

    const removeImage = () => {
        if (imageUrl && imageUrl.startsWith("https://firebasestorage.googleapis.com")) {
            firebaseRemoveApi();
        } else {
            deleteFileApi();
        }
    }

    const firebaseRemoveApi = () => {
        FirebaseServices.shared.removeLogo(imageUrl!, () => {
            setImagePath('');
            setImageUrl('');
            setItemsImageUrl('');
        });
    }

    const uploadFileApi = async (base64Data: string, filePath: string, message: string) => {
        let response = await GithubService.shared.uploadFileApi(token, base64Data, filePath, message);
        if (response) {
            setItemsImageUrl(response['content']['download_url']);
        }
    };

    const handleUpdateMenuItem = () => {
        const updatedFoodItem: FoodItem = {
            ...selectedFoodItems,
            name: itemName,
            foodType: itemType,
            price: Number(pricing),
            description: description,
            isActive: isActive,
            isSpecial: isTodaySpecial,
            itemsImageUrl: itemsImageUrl,
            imagePath: imagePath,
        };

        const htlId = restId as string;
        const orgMenuType = localStorage.getItem("orgMenuType")!;
        const category = localStorage.getItem("selectedCategory")!;
        const itemId = selectedFoodItems.id!;

        FirebaseServices.shared.updateMenuItem(updatedFoodItem, htlId, orgMenuType, category, itemId, (status) => {
            if (status === "done") {
                handleBackClick();
            } else {
                console.error("Error updating menu item.");
            }
        });
    };


    return (
        <div className="">
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <div className="cursor-pointer" onClick={handleBackClick}>
                        <ArrowBackIosIcon className="text-gray-700" />
                    </div>
                    <Typography variant="h5">{selectedFoodItems.name}</Typography>
                </div>
                <div className="relative">
                    <div
                        className={`border-2 ${imageUrl ? 'border-transparent' : 'border-dashed border-green-500'} rounded-lg h-48 mb-6 flex items-center justify-center`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {imageUrl ? (
                            <img src={imageUrl} alt="Item" className="h-full object-cover" />
                        ) : (
                            <label className="cursor-pointer">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                <Typography variant="body2" className="text-gray-500">Drag & drop an image here or click to upload</Typography>
                            </label>
                        )}
                    </div>
                    {imageUrl ? <div onClick={() => { removeImage() }} className="absolute top-0 right-0 cursor-pointer bg-red-500 rounded-full text-center px-2 pb-1 text-white">
                        <CloseIcon sx={{
                            fontSize: '16px'
                        }} />
                    </div> : <></>}
                </div>


                <div className="mb-6">
                    <StyledTextField
                        label="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </div>

                <div className="mb-6">
                    <Select
                        value={itemType}
                        onChange={(e) => setItemType(e.target.value)}
                        fullWidth
                        displayEmpty
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'black',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                    >
                        <MenuItem value=""><em>Select type</em></MenuItem>
                        {itemTypes.map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </div>

                <div className="mb-6">
                    <StyledTextField
                        type="number"
                        label="Item Pricing"
                        value={pricing}
                        onChange={(e) => setPricing(e.target.value)}
                        fullWidth
                        variant="outlined"
                        placeholder="Enter price"
                    />
                </div>

                <div className="mb-6">
                    <StyledTextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <Typography>Is Active</Typography>
                    <FormControlLabel
                        control={
                            <IOSSwitch
                                checked={isActive}
                                onChange={() => setIsActive(!isActive)}
                            />
                        }
                        label=""
                    />
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <Typography>Today&apos;s Special</Typography>
                    <FormControlLabel
                        control={
                            <IOSSwitch
                                checked={isTodaySpecial}
                                onChange={() => setIsTodaySpecial(!isTodaySpecial)}
                            />
                        }
                        label=""
                    />
                </div>
            </div>
            <Button
                variant="contained"
                style={{
                    backgroundColor: isDirty ? 'green' : 'gray',
                    color: 'white',
                    borderRadius: 0,
                    padding: '12px 0',
                    margin: 0,
                }}
                fullWidth
                onClick={() => { handleUpdateMenuItem() }}
                disabled={!isDirty} // Disable button if not dirty
            >
                Update
            </Button>
        </div>
    );
}
