'use client'
import { MenuDataContext } from "@/context/menu.context";
import { useContext } from "react";

export default function MenuSearch(){
    const { menuData, category } = useContext(MenuDataContext);
    console.log(menuData, category );
    
    return (
        <div className="">

        </div>
    )
}