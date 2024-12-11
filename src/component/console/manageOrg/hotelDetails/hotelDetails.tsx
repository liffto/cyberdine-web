"use client"

import { useEffect, useState } from "react"
import ConsoleTopbar from "../../topBar/topbar";
import HotelDashBoardCompoent from "./hotelDashBoard";
import MenuTypeComponents from "./menuTypeComponent";
import CategoryComponents from "./categoryComponet";
import CategoryMenuComponent from "./categoryMenuComponent";

export default function HotelDetailsCompoent() {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    useEffect(() => {
        const updatedType = localStorage.getItem('manageOrgType');
        setSelectedType(updatedType);
    }, []);

    const onBackClickedFunc = (type: string) => {
        localStorage.setItem('manageOrgType', type);
        setSelectedType(type);
    }


    const renderContent = () => {
        switch (selectedType) {
            case 'CategoryMenu':
                return <CategoryMenuComponent onBackClicked={() => { onBackClickedFunc(localStorage.getItem("orgMenuType")!) }} />
            case 'foodMenu':
                return <CategoryComponents onBackClicked={() => { onBackClickedFunc('menuManagement') }} onCardClicked={() => { setSelectedType(localStorage.getItem('manageOrgType')) }} />;
            case 'drinksMenu':
                return <CategoryComponents onBackClicked={() => { onBackClickedFunc('menuManagement') }} onCardClicked={() => { setSelectedType(localStorage.getItem('manageOrgType')) }} />;
            case 'menuManagement':
                return <MenuTypeComponents onBackClicked={() => { setSelectedType(null) }} onCardClicked={() => { setSelectedType(localStorage.getItem('manageOrgType')) }} />
            default:
                return <HotelDashBoardCompoent onCardClicked={() => { setSelectedType(localStorage.getItem('manageOrgType')) }} />
        }
    };

    return (<div className="">
        <ConsoleTopbar />
        <div className="px-14">
            {renderContent()}
        </div>
    </div>);
}