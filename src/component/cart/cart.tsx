"use client";

import { MenuDataContext } from "@/context/menu.context";
import { Item } from "@/model/products/items";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import MenuItemCard from "../menu/menu_item_card";
import DescriptionSheet from "../menu/description_sheet";
import { FcmService } from "@/service/fcm_service";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Notified successfully');
interface CartComponentProps {
    restId: string,
    bgColor: string,
    table: string;
    topic: string;
    notification: boolean;
}

const CartComponent: React.FC<CartComponentProps> = ({ restId, bgColor, table, topic, notification }) => {
    const { back } = useRouter();
    const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
    const { menuData, category, cartMenuData, deviceId } = useContext(MenuDataContext);
    const [wait, setWait] = useState<boolean>(false);

    const setSelectedData = (ele: Item) => {
        if (cartMenuData && cartMenuData?.getMenuList()?.length != 0) {
            setSelectedMenuData(ele);
        } else {
            back();
        }
    };

    const sendFcm = async () => {
        var data = {
            'data': {
                'title': `Table ${table}`,
                'body': `Requesting for Captain`
            },
            topic: topic ? topic.replace(" ", "") : "",
        };
        setWait(true);
        await FcmService.shared.fcmTopic(data);
        notify()
        setTimeout(() => {
            setWait(false);
        }, 1000 * 60);
    };

    return (
        <div className="md:container mx-auto">
            <Toaster position="top-center" />
            <div className="border border-primary mx-4 mt-2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
                {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.length != 0 &&
                    cartMenuData
                        .getMenuList()!
                        .map((ele: Item, index: any) => {
                            return (
                                <div key={index} className="">
                                    <MenuItemCard
                                        index={index}
                                        setSelectedData={setSelectedData}
                                        ele={ele} bgColor={bgColor} />
                                </div>
                            );
                        })}
            </div>
            <div
                className={` fixed bottom-0 bg-primary text-white text-lg text-center flex justify-evenly items-center w-full py-3 font-semibold`}
            >
                <div className="" onClick={() => {
                    back();
                }} >Select More</div>
                {notification && <div onClick={() => {
                    wait ? null : sendFcm();
                }} className={`${wait ? "text-gray-300" : " text-primary"} bg-white px-8 py-2 rounded-sm font-bold text-xl `} >Request Waiter</div>}
            </div>
            {selectedMenuData && (
                <DescriptionSheet
                    setSelectedMenuData={setSelectedData}
                    selectedMenuData={selectedMenuData} bgColor={bgColor} restId={restId} deviceId={deviceId ?? ""} menuType={localStorage.getItem('menuType')!} />
            )}
        </div>
    );
};

export default CartComponent;
