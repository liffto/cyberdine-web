"use client";

import { MenuDataContext } from "@/context/menu.context";
import { Item } from "@/model/products/items";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import MenuItemCard from "../menu/menu_item_card";
import DescriptionSheet from "../menu/description_sheet";
import { FcmService } from "@/service/fcm_service";
import toast, { Toaster } from 'react-hot-toast';
import { Menu } from "@/model/products/menu";
import Link from "next/link";
import BottomButton from "../common/bottom_button";

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
    const router = useRouter();
    const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
    const { menuData, category, cartMenuData, deviceId } = useContext(MenuDataContext);
    const [menu, setMenu] = useState<Menu | null>(null)
    const [wait, setWait] = useState<boolean>(false);

    useEffect(() => {
        if (menuData) {
            const value = localStorage.getItem('menuType');
            const menuInstance = new Menu(menuData[value!]);
            setMenu(menuInstance)
        }
    }, [])

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

    const checkOrderList = (data: Item, type: string) => {
        menu?.addQantity(data, data.quantity, restId, deviceId ?? '', type, table, (val: any) => {
            if (val == "remove" && cartMenuData && cartMenuData?.getMenuList()!.length == 1 && data.quantity == null) {
                cartMenuData.makeCartMenuEmpty();
                back();
            }
        })
    }


    const handleClick = () => {
        router.replace(`/rest/${restId}/orders?table=${table}`);
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
                                        ele={ele} bgColor={bgColor} addOrderItems={checkOrderList} />
                                </div>
                            );
                        })}
            </div>
            <BottomButton onBackClick={back} onNextClick={handleClick} wait={wait} backButton={"Select More"} nextButton={"Order Now"} />
            {selectedMenuData && (
                <DescriptionSheet
                    setSelectedMenuData={setSelectedData}
                    selectedMenuData={selectedMenuData} bgColor={bgColor} restId={restId} deviceId={deviceId ?? ""} menuType={localStorage.getItem('menuType')!} menu={menu ?? new Menu()} table={table} />
            )}
        </div>
    );
};

export default CartComponent;
