"use client";

import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';

export default function ImageComponent({ onBackClicked }: { onBackClicked: () => void }) {
    const handleBackClick = () => {
        localStorage.removeItem('selectedType');
        onBackClicked();
    };

    return (
        <div className="flex flex-col items-center p-6">
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center">
                    <button onClick={handleBackClick} className="mr-2">
                        <ArrowBackIosIcon className="text-gray-700" />
                    </button>
                    <h1 className="text-2xl font-semibold">Item Image Gallery</h1>
                </div>
                <button className="flex items-center bg-[#179428] text-white px-4 py-2 rounded">
                    <AddIcon className="mr-2" />
                    Add Item
                </button>
            </div>
            <div className="flex-grow flex items-center justify-center mt-6">
                <Image
                    src="/images/png/console_empty_menu.png"
                    alt="Empty State"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </div>
        </div>
    );
}
