"use client";
import { MenuDataContext } from "@/context/menu.context";
import { useContext, useEffect, useState } from "react";
import OrderCard from "./orders_card";
import { Menu } from "@/model/products/menu";
import { Item } from "@/model/products/items";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BottomButton from "../common/bottom_button";

interface OrdersComponentProps {
    bgColor: string;
    restId: string;
    table: string;
}

const OrdersComponent: React.FC<OrdersComponentProps> = ({ bgColor, restId, table }) => {
    const { back } = useRouter();
    const router = useRouter();
    const [menu, setMenu] = useState<Menu | null>(null)
    const { menuData, cartMenuData, deviceId } = useContext(MenuDataContext);
    useEffect(() => {
        if (menuData) {
            const value = localStorage.getItem('menuType');
            const menuInstance = new Menu(menuData[value!]);
            setMenu(menuInstance)
        }
    }, [])
    const checkOrderList = (data: Item, type: string) => {
        menu?.addQantity(data, data.quantity, restId, deviceId ?? '', type, table, (val: any) => {
            if (val == "remove" && cartMenuData && cartMenuData?.getMenuList()!.length == 1 && data.quantity == null) {
                cartMenuData.makeCartMenuEmpty();
            }
        })
    }

    const handleClick = () => {
        router.replace(`/rest/${restId}/billing?table=${table}`);
    };
    console.log(cartMenuData, "cartMenuData", cartMenuData && cartMenuData.getPendingLength());

    return <div className="mt-6">
        {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.some((ele) => ele.isApproved == null || ele.isApproved == false) ?
            <div className="bg-[#FF7D20] px-4 text-white py-2 font-semibold text-xs">Your order is waiting for approval</div> : <></>}
        {cartMenuData && cartMenuData.getPendingLength() != 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
            {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.length != 0 ?
                cartMenuData
                    .getMenuList()!
                    .map((ele: Item, index: any) => {
                        return (ele.isApproved == null || ele.isApproved == false) && (
                            <div key={index} className="">
                                <OrderCard
                                    index={index}
                                    ele={ele} bgColor={bgColor} addOrderItems={checkOrderList} canAddItems={true} />
                            </div>
                        );
                    }) : <></>}
        </div> : <></>}

        {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.some((ele) => ele.isApproved == true) && <div className="bg-primary px-4 text-white py-2 font-semibold text-xs">Approved</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
            {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.length != 0 &&
                cartMenuData
                    .getMenuList()!
                    .map((ele: Item, index: any) => {
                        return (ele.isApproved == true) && (
                            <div key={index} className="">
                                <OrderCard
                                    index={index}
                                    ele={ele} bgColor={bgColor} addOrderItems={() => { }} canAddItems={false} />
                            </div>
                        );
                    })}
        </div>
        <div className="h-20"></div>
        <BottomButton onBackClick={back} onNextClick={handleClick} backButton={"Order More"} nextButton={cartMenuData && cartMenuData.getPendingLength() != 0 ? "" : "View Bill"} />

    </div>
}

export default OrdersComponent;
