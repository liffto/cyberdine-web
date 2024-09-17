import { useState } from "react";
import Image from "next/image";
import { Item } from "@/model/products/items";

export default function OrderCard({ ele, index, bgColor }: { ele: Item; index: number; bgColor: string; }) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };
    return <div className="">
        <div className={`rounded-md boxshadow-3 md:rounded-md overflow-hidden max-h-[100px] flex bg-white`}>
            <div className="relative z-0">
                <div className={`h-full bg-slate-200  flex items-center`}>
                    {imageError ? (
                        <Image
                            src="/images/png/empty_menu_item.png"
                            alt={ele.name! + "empty"}
                            height={80}
                            width={80}
                            style={{ objectFit: "cover", height: "80px" }}
                        />
                    ) : (
                        <Image
                            src={ele.itemsImageUrl && ele.itemsImageUrl != "" ? ele.itemsImageUrl : '/images/png/empty_menu_item.png'}
                            alt={ele.name!}
                            height={80}
                            width={80}
                            priority={index == 0 ? true : false}
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
            <div className={`relative z-0 flex items-center border-y border-r border-[#FF7D20] rounded-e-md p-2 flex-1`}>
                <div className="flex flex-col  flex-1 pl-1" >
                    <h1 className={`text-base capitalize md:text-lg font-bold ${!ele.isActive ? "text-gray-400" : "text-black"}`}>
                        {ele.capitalizeNameFirstLetter()}
                    </h1>
                    <div
                        className={`text-xs md:text-sm  ${!ele.isActive ? "text-gray-300" : "text-gray-800"} font-medium`}
                    >
                        {ele.foodType}
                    </div>
                </div>
                {/* <div className={`font-bold pr-1 ${!ele.isActive ? "text-gray-300" : "text-gray-700"}`}>&#x20B9; {ele.price}</div> */}
                <div className={`font-bold pr-1 ${!ele.isActive ? "text-gray-300" : "text-gray-700"}`}>{ele.quantity} Qty</div>
            </div>
        </div>
    </div>
}