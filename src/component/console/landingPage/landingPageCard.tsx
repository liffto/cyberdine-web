"use client";

import React from 'react';

export default function LandingPageCard({ title, content, type, localStorageType, onCardClicked }: { title: string; content: string; type: string, localStorageType: string, onCardClicked: () => void }) {
    const handleClick = () => {
        localStorage.setItem(localStorageType, type);
        onCardClicked();
    };

    return (
        <div
            className="w-80 h-32 lg:w-96 bg-white rounded-lg p-6 ml-2 mt-1 flex flex-col justify-start cursor-pointer" // Added cursor-pointer for interactivity
            onClick={handleClick}
            style={{
                boxShadow: '0 0px 8px rgba(0, 0, 0, 0.2)',
            }}
        >
            <div className="text-xl mb-2">{title}</div>
            <div className="text-gray-600">{content}</div>
        </div>
    );
}
