"use client";

import { MenuDataContext } from "@/context/menu.context";
import { Item } from "@/model/products/items";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import MenuItemCard from "../menu/menu_item_card";


interface CartComponentProps {
}

const CartComponent: React.FC<CartComponentProps> = () => {
    const { back } = useRouter();
    const { menuData, category, cartMenuData, deviceId } = useContext(MenuDataContext);

    return (
        <div className="container mx-auto">
            <div className="border border-primary mx-4 mt-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
                {cartMenuData && cartMenuData.getMenuList() &&
                    cartMenuData
                        .getMenuList()!
                        .map((ele: Item, index: any) => {
                            return (
                                <div key={index} className="">
                                    <MenuItemCard
                                        index={index}
                                        ele={ele}
                                    />
                                </div>
                            );
                        })}
            </div>
            <div
                className={` fixed bottom-0 bg-primary text-white text-lg text-center flex justify-evenly items-center w-full py-2 font-semibold`}
            >
                <div className="" onClick={() => {
                    back();
                }} >Select More</div>
                <div className="bg-white px-8 py-2 rounded-sm font-bold text-base text-primary" >Request Waiter</div>
            </div>
        </div>
    );
};

export default CartComponent;
