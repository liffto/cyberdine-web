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
import BottomButton from "../common/bottom_button";
import Image from "next/image";
import { FirebaseServices } from "@/service/firebase.service";
import CircularProgress from "@mui/material/CircularProgress";

const notify = () => toast('Notified successfully');
interface CartComponentProps {
    restId: string,
    bgColor: string,
    table: string;
    topic: string;
    notification: boolean;
    isOrderFlow: boolean;
}

const CartComponent: React.FC<CartComponentProps> = ({ restId, bgColor, table, topic, notification, isOrderFlow }) => {
    const { back } = useRouter();
    const router = useRouter();
    const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
    const { menuData, category, cartMenuData, setOrderMenuData, deviceId } = useContext(MenuDataContext);
    const [menu, setMenu] = useState<Menu | null>(null)
    const [wait, setWait] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);

    useEffect(() => {
        if (menuData) {
            const value = localStorage.getItem('menuType');
            const menuInstance = new Menu(menuData[value!]);
            setMenu(menuInstance)
        }
    }, [menuData])

    const setSelectedData = (ele: Item) => {
        if (cartMenuData && cartMenuData?.getMenuList()?.length != 0) {
            setSelectedMenuData(ele);
        } else {
            back();
        }
    };

    const sendFcm = async (title: string, body: string,screen: string) => {
        var data = {
            'data': {
                'title': title,
                'body': body,
                'titleLocKey': screen
            },
            topic: `${restId}table${table}`,
        };
        setWait(true);
        await FcmService.shared.fcmTopic(data);
        notify()
        // setTimeout(() => {
            setWait(false);
        // }, 1000 * 3);
    };

    const checkOrderList = (data: Item, type: string) => {
        menu?.addQantity(data, data.quantity, restId, deviceId ?? '', type, table, (val: any) => {
            if (val == "remove" && cartMenuData && cartMenuData?.getPendingLength() == 1 && data.quantity == null) {
                cartMenuData.makeCartMenuEmpty();
                back();
            }
        })
    }


    const handleClick = () => {
        setLoader(true);
        var cartData = cartMenuData?.cartMenuMap?.get('cart');
        var pendingData = cartMenuData?.cartMenuMap?.get('pending');
        const mergedData = mergeCartAndPendingData(cartData, pendingData);
        FirebaseServices.shared.placeOrder(mergedData, restId, deviceId ?? '', table, () => {
            sendFcm(`New Order`,`From table - ${table} order has been asigned to you.`,`table`);
            router.replace(table ? `/rest/${restId}/orders?table=${table}` : `/rest/${restId}/orders`);
            getQuantityFromOrder();
        });
    };

    const mergeCartAndPendingData = (
        cartData: Map<string, Map<string, Item>> | undefined,
        pendingData: Map<string, Map<string, Item>> | undefined
    ): Map<string, Map<string, Item>> => {
        const body: Map<string, Map<string, Item>> = new Map();

        // Iterate through cartData
        if (cartData) {
            cartData.forEach((items, category) => {
                const categoryMap = new Map<string, Item>(items); // Clone the items for the category
                body.set(category, categoryMap);
            });
        }

        // Merge pending items
        if (pendingData) {
            pendingData.forEach((items, category) => {
                // Ensure the category exists in body
                if (!body.has(category)) {
                    body.set(category, new Map<string, Item>());
                }
                const existingItemMap = body.get(category);
                if (existingItemMap) {
                    items.forEach((item) => {
                        const existingItem = existingItemMap.get(item.id!);
                        if (existingItem) {
                            // Update quantity if item already exists
                            existingItem.quantity! += item.quantity!; // Combine quantities
                        } else {
                            // Add new item if it doesn't exist
                            existingItemMap.set(item.id!, { ...item });
                        }
                    });
                }
            });
        }

        return body;
    };


    const getQuantityFromOrder = () => {
        if (cartMenuData) {
            cartMenuData?.getMenuList()?.forEach((each) => {
                let response = menu
                    ?.getMenuList(each.category!, [])
                    ?.find((val) => val.id == each.id && !(each.isApproved == true));
                if (response != undefined) {
                    response.quantity = 0;
                }
            });
        }
    };

    const handleViewOrderClick = () => {
        router.push(table ? `/rest/${restId}/orders?table=${table}`: `/rest/${restId}/orders`);
    };

    return (
        <div className="md:container mx-auto">
            {loader ? <div className="flex flex-col justify-center items-center h-[600px]">
                <CircularProgress sx={{ color: "var(--primary-bg)" }} />
                <div className="mt-6" style={{ color: bgColor }} >Placing your order... Please hold on...</div>
            </div> : <div className="">
                <Toaster position="top-center" />
                <div className="border border-primary mx-4 mt-2"></div>
                {cartMenuData && (cartMenuData?.getApprovedLength() != 0 || cartMenuData?.getPendingLength() != 0) && <div className="w-full" onClick={handleViewOrderClick} >
                    <img src={'/images/png/view_selected_order.png'} alt="placed order" height={10} width={430} />
                </div>}
                <div className={`${cartMenuData && (cartMenuData?.getApprovedLength() != 0 || cartMenuData?.getPendingLength() != 0) ? "" : "mt-4"} px-4 py-1 font-bold text-sm bg-secondary text-black capitalize flex`}>
                    <div className=" ">Items in cart</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
                    {cartMenuData && cartMenuData.getMenuList() && cartMenuData.getMenuList()?.length != 0 &&
                        cartMenuData
                            .getMenuList()!
                            .map((ele: Item, index: any) => {
                                return (!(ele.isApproved == true) && !(ele.isOrdered == true) &&
                                    <div key={index} className="">
                                        <MenuItemCard
                                            index={index}
                                            setSelectedData={setSelectedData}
                                            ele={ele} bgColor={bgColor} addOrderItems={checkOrderList} isOrderFlow={isOrderFlow} />
                                    </div>
                                );
                            })}
                </div>
                <div className="h-20"></div>
                {isOrderFlow ? <BottomButton onBackClick={back} onNextClick={handleClick} wait={wait} backButton={"Select More"} nextButton={"Order Now"} /> :
                    <div
                        className={` fixed bottom-0 bg-primary text-white text-lg text-center flex justify-evenly items-center w-full py-3 font-semibold`}
                    >
                        <div className="" onClick={() => {
                            back();
                        }} >Select More</div>
                        {notification && <div onClick={() => {
                            wait ? null : sendFcm(`Table ${table}`,`Requesting for Captain`,`dashboard`);
                        }} className={`${wait ? "text-gray-300" : " text-primary"} bg-white px-8 py-2 rounded-sm font-bold text-xl `} >Request Waiter</div>}
                    </div>
                }
            </div>}
            {selectedMenuData && (
                <DescriptionSheet
                    setSelectedMenuData={setSelectedData}
                    selectedMenuData={selectedMenuData} bgColor={bgColor} restId={restId} deviceId={deviceId ?? ""} menuType={localStorage.getItem('menuType')!} menu={menu ?? new Menu()} table={table} isOrderFlow={isOrderFlow} />
            )}
        </div>
    );
};

export default CartComponent;
