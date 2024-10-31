"use client"
import { FoodItem } from '@/model/manage_org_model/hotel_list';
import { FirebaseServices } from '@/service/firebase.service';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuItemsDrawer from './menuItemsDrawer';

export default function CategoryMenuComponent({ onBackClicked }: { onBackClicked: () => void, }) {
    const params = useParams(); // Get the parameters
    const restId = params.restId;
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [selectedFoodItems, setselectedFoodItems] = useState<FoodItem>(new FoodItem());
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (restId) {
            FirebaseServices.shared.getOrgCategoryMenu(
                restId as string, localStorage.getItem("orgMenuType") ?? "", localStorage.getItem("selectedCategory") ?? "", (data: any) => {
                    const foodItemList = Object.values(data).map((item: any) => new FoodItem(item));
                    setFoodItems(foodItemList);
                }
            )
        }

    }, []);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') {
            return;
        }
        setOpen(open);
    };

    const handleBackClick = () => {
        onBackClicked();
    };

    const handleClick = (data: FoodItem) => {
        setselectedFoodItems(data);
        setOpen(true);
    };

    return <div className="">
        <div className="flex items-center mb-4 mt-8">
            <button onClick={handleBackClick} className="mr-2">
                <ArrowBackIosIcon className="text-gray-700" />
            </button>
            <h1 className="text-2xl font-semibold">{localStorage.getItem("selectedCategory")}</h1>
        </div>
        {
            <div className="">
                {
                    foodItems && foodItems.length > 0 ? (
                        <div className="overflow-x-auto w-full rounded bg-white" style={{
                            boxShadow: '0 0px 8px rgba(0, 0, 0, 0.2)',
                        }}>
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="text-left text-xl font-normal">
                                        <th className="p-3 w-[20%]">Item Name</th>
                                        <th className="p-3 w-[40%]">Description</th>
                                        <th className="p-3 w-[15%]">Food Type</th>
                                        <th className="p-3 w-[10%]">Price</th>
                                        <th className="p-3 w-[10%]">Status</th>
                                        <th className="p-3 w-[5%]"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foodItems.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-white' : 'bg-gray-50'}`}
                                            onClick={() => handleClick(item)} // Adjust if you need a click handler
                                        >
                                            <td className="p-3 w-[30%]">{item.name}</td>
                                            <td className="p-3 w-[40%]">{item.description}</td>
                                            <td className="p-3 w-[15%]">{item.foodType}</td>
                                            <td className="p-3 w-[10%]">{item.price}</td>
                                            <td className="p-3 w-[10%]"><span className={`px-2 py-1 rounded ${item.isActive ? 'text-[#179428]' : 'text-[#FF0000]'}`}>
                                                {item.isActive ? 'Active' : 'Inactive'}
                                            </span></td>
                                            <td className="p-3 w-[5%] text-center">
                                                <span className="bg-[#179428] text-white rounded px-2 pb-1 cursor-pointer transition">
                                                    <ArrowForwardIosIcon sx={{ fontSize: '14px' }} />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    ) : (
                        <div className=""></div>
                    )
                }
            </div>
        }
        <SwipeableDrawer
            anchor="right"
            open={open}
            onOpen={toggleDrawer(true)}
            onClose={toggleDrawer(false)}
            PaperProps={{
                sx: {
                    width: '500px',
                },
            }}
        >
            <MenuItemsDrawer handleBackClick={() => { setOpen(false); }} selectedFoodItems={selectedFoodItems} />
        </SwipeableDrawer>
    </div>
}