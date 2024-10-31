"use client"

import { Restaurant } from "@/model/manage_org_model/hotel_list";
import { useEffect, useState } from "react"
import data from '../../../../../public/json/hotelDashBoard.json';
import LandingPageCard from "../../landingPage/landingPageCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRouter } from "next/navigation";

export default function HotelDashBoardCompoent({ onCardClicked }: { onCardClicked: () => void }) {
    const [restaurantsDetail, setRestaurantsDetail] = useState<Restaurant>();
    const router = useRouter(); // Initialize the router
    useEffect(() => {
        let hotelDetails = localStorage.getItem("restaurantData");
        if (hotelDetails) {
            setRestaurantsDetail(JSON.parse(hotelDetails))
        }
    }, []);


    const handleBackClick = () => {
        localStorage.removeItem('manageOrgType');
        router.back();
    };


    return <div className="">
        <div className="flex items-center mb-4 mt-8">
            <button onClick={handleBackClick} className="mr-2">
                <ArrowBackIosIcon className="text-gray-700" />
            </button>
            <h1 className="text-2xl font-semibold">{restaurantsDetail?.hname ?? ''}</h1>
        </div>
        <div className="flex flex-wrap justify-start">
            {data.hotelDashBoard.map((dashboard, index) => (
                <div key={index} className="flex w-full sm:w-1/2 lg:w-[28%] my-4">
                    <LandingPageCard
                        title={dashboard.title}
                        content={dashboard.content}
                        type={dashboard.type}
                        onCardClicked={onCardClicked} localStorageType={"manageOrgType"} />
                </div>
            ))}
        </div>
    </div>


}