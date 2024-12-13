import { useState } from "react";
import Image from "next/image";
import { Item } from "@/model/products/items";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function OrderCard({ ele, index, bgColor, addOrderItems, canAddItems }: {
    ele: Item; index: number; bgColor: string; addOrderItems: (ele: Item, type: string) => void; canAddItems: boolean
}) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const addToItems = (type: string) => {
        if (canAddItems) {
            if (type == "add" && ele.quantity == 0 || ele.quantity == null) {
                ele.quantity = 1;
                addOrderItems(ele, type);
            } else if (type == "add") {
                ele.quantity = ele.quantity + 1;
                addOrderItems(ele, type);
            } else if (type == "remove" && ele.quantity > 0) {
                if (ele.quantity > 1) {
                    ele.quantity = ele.quantity - 1;
                } else {
                    ele.quantity = null;
                }
                addOrderItems(ele, type);
            }
        }
    };

    return <div className="">
        <div className={`rounded-md boxshadow-3 md:rounded-md overflow-hidden max-h-[100px] flex bg-white`}>
            <div className="relative z-0">
                <div className={`h-full bg-slate-200  flex items-center`}>
                    {imageError ? (
                        <img
                            src="/images/png/empty_menu_item.png"
                            alt={ele.name! + "empty"}
                            height={80}
                            width={80}
                            style={{ objectFit: "cover", height: "80px" }}
                        />
                    ) : (
                        <img
                            src={ele.itemsImageUrl && ele.itemsImageUrl != "" ? ele.itemsImageUrl : '/images/png/empty_menu_item.png'}
                            alt={ele.name!}
                            height={80}
                            width={80}
                            // priority={index == 0 ? true : false}
                            onError={handleImageError}
                            style={{
                                objectFit: "cover",
                                height: "80px",
                                opacity: !ele.isActive ? 0.4 : 1
                            }}
                        />
                    )}
                </div>
                {ele.isActive && ele.isSpecial && (
                    <div className="absolute bottom-0 right-0 text-white bg-primary text-sm w-full text-center">
                        Special
                    </div>
                )}
                {!ele.isActive && (
                    <div className="absolute bottom-[38%] right-0 text-white bg-[#d71d25] text-sm w-full text-center">
                        Sold Out
                    </div>
                )}
            </div>
            <div className={`relative z-0 flex items-center rounded-e-md p-2 flex-1`}>
                <div className="flex flex-col  flex-1 pl-1" >
                    <h1 className={`text-base capitalize md:text-lg font-bold ${!ele.isActive ? "text-gray-400" : "text-black"}`}>
                        {ele.capitalizeNameFirstLetter()}
                    </h1>
                    { ele.rejectReason ? <div className="">{ele.rejectReason}</div> : <div className={`text-sm pr-1 ${!ele.isActive ? "text-gray-300" : "text-gray-700"}`}>&#x20B9; {ele.price}</div>}
                </div>
                {ele.isActive && <div className="font-semibold">{ele.quantity} Qty</div>}
            </div>
        </div>
    </div>
}