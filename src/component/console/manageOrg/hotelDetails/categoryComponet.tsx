"use client"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import { FirebaseServices } from '@/service/firebase.service';
import { useParams } from 'next/navigation';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function CategoryComponents({ onBackClicked, onCardClicked }: { onBackClicked: () => void, onCardClicked: () => void }) {
    const [category, setCategory] = useState<any>();
    const handleBackClick = () => {
        onBackClicked();
    };
    const params = useParams(); // Get the parameters
    const restId = params.restId;
    useEffect(() => {
        if (restId && !category) {
            FirebaseServices.shared.getRestCategory(
                restId as string, (data: any) => {
                    setCategory(data);
                }
            );
        }

    }, [])

    const handleCardClicked = (selectedCategory: string) => {
        localStorage.setItem("manageOrgType", "CategoryMenu");
        localStorage.setItem("selectedCategory", selectedCategory);
        onCardClicked();
    };

    return <div className="">
        <div className="flex items-center mb-4 mt-8">
            <button onClick={handleBackClick} className="mr-2">
                <ArrowBackIosIcon className="text-gray-700" />
            </button>
            <h1 className="text-2xl font-semibold">{localStorage.getItem("manageOrgType") == "foodMenu" ? "Food Menu" : "Drinks Menu"}</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {category && category[localStorage.getItem("manageOrgType") ?? ''].map((data: any, index: number) => (
                <div key={index} className="flex items-center justify-between h-16 bg-white rounded p-4" style={{
                    boxShadow: '0 0px 8px rgba(0, 0, 0, 0.2)',
                }} onClick={() => { handleCardClicked(data) }} >
                    <div className="text-sm">{data}</div>
                    <div className=""><ArrowForwardIosIcon sx={{ fontSize: '16px' }} /></div>
                </div>
            ))}
        </div>
    </div>
}