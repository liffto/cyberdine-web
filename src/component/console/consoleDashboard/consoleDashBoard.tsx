"use client";

import ImageComponent from '../imageSection/imageComponent';
import LandingPage from '../landingPage/landingPage';
import ManageOrgComponent from '../manageOrg/manageOrg';
import ConsoleTopbar from '../topBar/topbar';
import React, { useEffect, useState } from 'react';

export default function ConsoleDashboard() {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    useEffect(() => {
        const updatedType = localStorage.getItem('selectedType');
        setSelectedType(updatedType);
    }, []);



    const renderContent = () => {
        switch (selectedType) {
            case 'Gallery':
                return <ImageComponent onBackClicked={() => { setSelectedType(null) }} />;
            case 'Organization':
                return <ManageOrgComponent onBackClicked={() => { setSelectedType(null); }} />;
            default:
                return <LandingPage onCardClicked={() => { setSelectedType(localStorage.getItem('selectedType')) }} />; // Default case if needed
        }
    };

    return (
        <div className="">
            <ConsoleTopbar />
            <div className="px-14">
                {renderContent()}
            </div>

        </div>
    );
}
