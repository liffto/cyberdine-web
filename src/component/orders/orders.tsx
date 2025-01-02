"use client";
import { MenuDataContext } from "@/context/menu.context";
import { useContext, useEffect, useState } from "react";
import OrderCard from "./orders_card";
import { Menu } from "@/model/products/menu";
import { Item } from "@/model/products/items";
import { useRouter } from "next/navigation";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BottomButton from "../common/bottom_button";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircularProgress from "@mui/material/CircularProgress";

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
        if (data.dateAndTime == null) {
            data.dateAndTime = new Date().toISOString();
          }
          if (data.isOrdered != false) {
            data.isOrdered = false;
          }
          if (data.isApproved != false) {
            data.isApproved = false;
          }
        menu?.addQantity(data, data.quantity, restId, deviceId ?? '', type, table, (val: any) => {
            if (val == "remove" && cartMenuData && cartMenuData?.getMenuList()!.length == 1 && data.quantity == null) {
                cartMenuData.makeCartMenuEmpty();
            }
        })
    }

    const handleClick = () => {
        router.replace(table ? `/rest/${restId}/billing?table=${table}` : `/rest/${restId}/billing`);
    };

    return <div className="mt-6">
        {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.some((ele) => (ele.isApproved == null || ele.isApproved == false) && (ele.rejectReason == undefined || ele.rejectReason == null)) ?
            <div className="">
                <div className="bg-[#FF7D20] px-4 text-white py-2 font-semibold text-xs">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-v items-center gap-3">
                            <div className=""><AccessTimeIcon /></div>
                            <div className="">Your order is waiting for approval</div>
                        </div>
                        <div className="">
                            <CircularProgress size={20} thickness={6} sx={{ color: "white", }} />
                        </div>
                    </div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
                    {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.length != 0 ?
                        cartMenuData
                            .getMenuList()!
                            .map((ele: Item, index: any) => {
                                return (ele.isApproved == null || ele.isApproved == false) && ele.isOrdered == true && (ele.rejectReason == undefined || ele.rejectReason == null) && (
                                    <div key={index} className="">
                                        <OrderCard
                                            index={index}
                                            ele={ele} bgColor={bgColor} addOrderItems={checkOrderList} canAddItems={true} />
                                    </div>
                                );
                            }) : <></>}
                </div> </div> : <></>}

        {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.some((ele) => ele.isApproved == true && (ele.rejectReason == undefined || ele.rejectReason == null)) &&
            <div className="">
                <div className="bg-primary px-4 text-white py-2 font-semibold text-xs">
                    <div className="flex justify-start items-center gap-3">
                        <div className=""><CheckCircleOutlineIcon /></div>
                        <div className="">Order sent to kitchen</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
                    {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.length != 0 &&
                        cartMenuData
                            .getMenuList()!
                            .map((ele: Item, index: any) => {
                                return (ele.isApproved == true) && (ele.rejectReason == undefined || ele.rejectReason == null) && (
                                    <div key={index} className="">
                                        <OrderCard
                                            index={index}
                                            ele={ele} bgColor={bgColor} addOrderItems={() => { }} canAddItems={false} />
                                    </div>
                                );
                            })}
                </div>

            </div>}


        {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.some((ele) => ele.rejectReason) ?
            <div className="bg-[#FF0000] px-4 text-white py-2 font-semibold text-xs">
                <div className="flex justify-start items-center gap-3">
                    <div className=""><HighlightOffIcon /></div>
                    <div className="">Rejected</div>
                </div>
            </div> : <></>}
        {<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
            {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.length != 0 ?
                cartMenuData
                    .getMenuList()!
                    .map((ele: Item, index: any) => {
                        return ele.rejectReason && (
                            <div key={index} className="">
                                <OrderCard
                                    index={index}
                                    ele={ele} bgColor={bgColor} addOrderItems={checkOrderList} canAddItems={true} />
                            </div>
                        );
                    }) : <></>}
        </div>}
        <div className="h-20"></div>
        <BottomButton onBackClick={back} onNextClick={handleClick} backButton={"Order More"}
        nextButton={''}
        //  nextButton={cartMenuData && cartMenuData.getPendingLength() != 0 ? "" : "View Bill"} 
         />

    </div>
}

export default OrdersComponent;
