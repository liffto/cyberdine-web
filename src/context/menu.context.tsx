"use client";
import { Menu } from "@/model/products/menu";
import { FirebaseServices } from "@/service/firebase.service";
import { useParams } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";

const MenuDataContext = createContext<{
  menuData: Menu | null;
  setMenuData: React.Dispatch<React.SetStateAction<Menu | null>>;
  category: string[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
}>({
  menuData: null,
  setMenuData: () => {},
  category: [],
  setCategory: () => {},
});

function MenuDataProvider({ children }: { children: React.ReactNode }) {
  const [menuData, setMenuData] = useState<Menu | null>(null);
  const [category, setCategory] = useState<Array<string>>([]);
  const { restId } = useParams<{ restId: string }>();
  useEffect(() => {
    if (restId && restId!="") {
      const catUnsub = FirebaseServices.shared.getRestCategory(
        restId,
        (cat: Array<string>) => {
          setCategory(cat);
        }
      );
      // console.log("useEffect count",restId);
      const menuUnSub = FirebaseServices.shared.getOrgMenu(restId, setMenuData);
      return () => {
        catUnsub();
        menuUnSub();
      };
    }
  }, [restId]);
  const value = { menuData, setMenuData, category, setCategory };

  return (
    <MenuDataContext.Provider value={value}>
      {children}
    </MenuDataContext.Provider>
  );
}

export { MenuDataContext, MenuDataProvider };
