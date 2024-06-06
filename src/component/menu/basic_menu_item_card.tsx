import { Item } from "@/model/products/items";
import Image from "next/image";

export default function BasicMenuItemCard({
    index,
    ele,
    isLast
}: {
    index: any;
    ele: Item;
    isLast?: boolean;
}) {

    return (
        <div className="">
            <div
                key={index}
                className={`rounded-md md:rounded-md overflow-hidden max-h-[100px] flex bg-white  ${ele.quantity != undefined && ele.quantity > 0 ? "border-2 border-primary" : ""}`}
            >
                <div className="relative z-0">

                    {!ele.isActive && (
                        <div className="absolute bottom-[38%] right-0 text-white bg-[#d71d25] text-sm w-full text-center">
                            Sold Out
                        </div>
                    )}
                </div>
                <div className={` z-0 flex items-center rounded-e-md px-2 flex-1`}>
                    <div className="flex flex-col  flex-1 pl-1">
                        <div className="flex gap-2 items-center">
                            <h1 className={`text-base capitalize md:text-lg font-bold ${!ele.isActive ? "text-gray-400" : "text-black"}`}>
                                {ele.capitalizeNameFirstLetter()}
                            </h1>
                            <div className="">
                                <Image
                                    src={ele?.foodType == "Veg" ? "/images/svg/veg_icon.svg" : "/images/svg/non_veg_icon.svg"}
                                    alt={ele.name!}
                                    height={12}
                                    width={12}
                                    priority={false}
                                    style={{
                                        objectFit: "cover",
                                        background: "var(--secondary-bg)"
                                    }}
                                />
                            </div>
                            {ele.isActive && ele.isSpecial && (
                                <div className="px-1 h-4 text-white bg-primary text-xs">
                                    Special
                                </div>
                            )}
                        </div>

                        <div
                            className={`text-xs md:text-sm  ${!ele.isActive ? "text-gray-300" : "text-gray-800"} font-medium`}
                        >
                            {ele.description}
                        </div>
                    </div>
                    <div className={`font-bold pr-1 ${!ele.isActive ? "text-gray-300" : "text-gray-700"}`}>&#x20B9; {ele.price}</div>
                </div>
            </div>
            { isLast && <div className="h-[1px] bg-gray-300 mx-3 my-3"></div>}
        </div>
    );
}
