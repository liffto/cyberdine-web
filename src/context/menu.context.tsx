"use client";
import { CartMenu } from "@/model/orders/cart_menu";
import { Menu } from "@/model/products/menu";
import { FirebaseServices } from "@/service/firebase.service";
import { useParams } from "next/navigation";
import React, { createContext, useState, useEffect, useCallback } from "react";

const MenuDataContext = createContext<{
  menuData: any;
  setMenuData: React.Dispatch<React.SetStateAction<any>>;
  category: any;
  setCategory: React.Dispatch<any>;
  cartMenuData: CartMenu | null;
  orderMenuData: CartMenu | null;
  setCartMenuData: React.Dispatch<React.SetStateAction<CartMenu | null>>;
  setOrderMenuData: React.Dispatch<React.SetStateAction<CartMenu | null>>;
  deviceId: string | null;
  menuType: string;
  setMenuType: React.Dispatch<React.SetStateAction<string>>;
}>({
  menuData: null,
  setMenuData: () => { },
  category: {},
  orderMenuData: null,
  setCategory: () => { },
  setOrderMenuData: () => { },
  cartMenuData: null,
  setCartMenuData: () => { },
  deviceId: null,
  menuType: '',
  setMenuType: () => { }
});

function MenuDataProvider({ children }: { children: React.ReactNode }) {
  const [menuData, setMenuData] = useState<Map<string, Menu> | null>(null);
  const [cartMenuData, setCartMenuData] = useState<CartMenu | null>(null);
  const [orderMenuData, setOrderMenuData] = useState<CartMenu | null>(null);
  const [category, setCategory] = useState<any>();
  const { restId } = useParams<{ restId: string }>();
  const [deviceId, setDeviceId] = useState<string>('');
  const [menuType, setMenuType] = useState<string>('');
  const queryParams = new URLSearchParams(window.location.search);
  const table = queryParams.get('table');
  useEffect(() => {
    const getDeviceId = generateDeviceId();
    setDeviceId(getDeviceId);
    if (restId && restId != "") {
      const catUnsub = FirebaseServices.shared.getRestCategory(
        restId, setCategory
      );
      const menuUnSub = FirebaseServices.shared.getOrgMenu(restId, setMenuData);

      const cartMenuUnSub = FirebaseServices.shared.getCartMenu(restId, table ?? '', getDeviceId, setCartMenuData);
      const listenOrder = FirebaseServices.shared.listenOrder(restId, table ?? '', getDeviceId, (each: any) => {
        if (each == "Done") {
          setCartMenuData(null)
        }
      });
      return () => {
        catUnsub();
        menuUnSub();
        cartMenuUnSub();
        listenOrder();
      };
    }
  }, [restId, deviceId]);

  const generateDeviceId = useCallback(() => {
    const navigatorInfo = window.navigator;
    const screenInfo = window.screen;

    const ua = navigatorInfo.userAgent;
    const screenResolution = `${screenInfo.width}x${screenInfo.height}`;
    const language = navigatorInfo.language || '';

    // Concatenate browser properties to create a simple device ID
    const deviceId = `${ua}-${screenResolution}-${language}`;

    // Convert to a hash for better privacy
    const hash = hashCode(deviceId);

    return hash.toString();
  }, []);

  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  const value = { menuData, setMenuData, category, setCategory, cartMenuData, setCartMenuData, orderMenuData, setOrderMenuData, deviceId, menuType, setMenuType };

  return (
    <MenuDataContext.Provider value={value}>
      {children}
    </MenuDataContext.Provider>
  );
}

export { MenuDataContext, MenuDataProvider };
