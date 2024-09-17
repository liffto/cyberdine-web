"use client";
import { MenuDataContext } from "@/context/menu.context";
import { useContext, useEffect, useState } from "react";
import OrderCard from "./orders_card";
import { Menu } from "@/model/products/menu";
import { Item } from "@/model/products/items";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OrdersComponentProps {
    bgColor: string;
    restId: string;
    table: string;
}

const OrdersComponent: React.FC<OrdersComponentProps> = ({ bgColor, restId, table }) => {
    const { back } = useRouter();
    const [menu, setMenu] = useState<Menu | null>(null)
    const { menuData, category, cartMenuData, deviceId } = useContext(MenuDataContext);
    useEffect(() => {
        if (menuData) {
            const value = localStorage.getItem('menuType');
            const menuInstance = new Menu(menuData[value!]);
            setMenu(menuInstance)
        }
    }, [])
    return <div className="mt-6">
        <div className="bg-[#FF7D20] px-4 text-white py-2 font-semibold text-xs">Your order is waiting for approval</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
            {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.length != 0 &&
                cartMenuData
                    .getMenuList()!
                    .map((ele: Item, index: any) => {
                        return (
                            <div key={index} className="">
                                <OrderCard
                                    index={index}
                                    ele={ele} bgColor={bgColor} />
                            </div>
                        );
                    })}
        </div>
        <div
            className={` fixed bottom-0 bg-primary text-white text-base text-center flex justify-evenly items-center w-full py-3 font-semibold`}
        >

            <div onClick={() => { back() }} className="" >Order More</div>
            <Link
                href={``}
            >
                <div className={`text-primary no-underline bg-white px-8 py-2 rounded-sm font-bold text-lg `} >Generate Bill</div>
            </Link>
        </div>
    </div>
}

export default OrdersComponent;
