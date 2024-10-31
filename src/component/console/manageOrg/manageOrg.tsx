"use client";

import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import { FirebaseServices } from "@/service/firebase.service";
import { Restaurant } from '@/model/manage_org_model/hotel_list';
import { useRouter } from 'next/navigation';

export default function ManageOrgComponent({ onBackClicked }: { onBackClicked: () => void }) {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const router = useRouter(); // Initialize the router

    const handleBackClick = () => {
        localStorage.removeItem('selectedType');
        onBackClicked();
    };

    useEffect(() => {
        FirebaseServices.shared.getHotellist((data: any) => {
            const restaurantList = Object.values(data).map((item: any) => new Restaurant(item));
            setRestaurants(restaurantList);
        });
    }, []);

    const handleClick = (restaurant: Restaurant) => {
        localStorage.setItem("restaurantData", JSON.stringify(restaurant))
        router.push(`/console/${restaurant.id}`);
    };

    return (
        <div className="flex flex-col items-center p-6">
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center">
                    <button onClick={handleBackClick} className="mr-2">
                        <ArrowBackIosIcon className="text-gray-700" />
                    </button>
                    <h1 className="text-2xl font-semibold">Manage Organizations</h1>
                </div>
                <button className="flex items-center bg-[#179428] text-white px-4 py-2 rounded hover:bg-[#0f6a1c] transition">
                    <AddIcon className="mr-2" />
                    Create Org
                </button>
            </div>
            <div className="min-w-full flex-grow flex items-center justify-center mt-6">
                {restaurants && restaurants.length > 0 ? (
                    <div className="overflow-x-auto w-full rounded bg-white" style={{
                        boxShadow: '0 0px 8px rgba(0, 0, 0, 0.2)',
                    }}>
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="text-left text-xl font-normal">
                                    <th className="p-3 w-[30%]">Org Name</th>
                                    <th className="p-3 w-[20%]">Org ID</th>
                                    <th className="p-3 w-[20%]">Org Type</th>
                                    <th className="p-3 w-[12%]">Subscription</th>
                                    <th className="p-3 w-[12%]">Location</th>
                                    <th className="p-3 w-[6%]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurants.map((restaurant, index) => (
                                    <tr
                                        key={restaurant.id}
                                        className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-white' : 'bg-gray-50'}`}
                                        onClick={() => handleClick(restaurant)}
                                    >
                                        <td className="p-3 w-[30%]">{restaurant.hname}</td>
                                        <td className="p-3 w-[20%]">{restaurant.id}</td>
                                        <td className="p-3 w-[20%]">{restaurant.businessType}</td>
                                        <td className="p-3 w-[12%]">{restaurant.plan}</td>
                                        <td className="p-3 w-[12%]">{restaurant.haddress}</td>
                                        <td className="p-3 w-[6%] text-center">
                                            <span className="bg-[#179428] text-white rounded px-2 pb-1 cursor-pointer transition">
                                                <ArrowForwardIosIcon sx={{ fontSize: '14px' }} />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src="/images/png/empty_manage_org.png"
                            alt="Empty State"
                            width={400}
                            height={400}
                            className="object-contain"
                        />
                        <div>No Org to show</div>
                    </div>
                )}
            </div>
        </div>
    );
}
