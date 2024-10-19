import React from 'react';

interface FoodMenuBannerProps {
    width?: number;
    height?: number;
    bgColor: string;
    wait: boolean;
}

const FoodMenuBanner: React.FC<FoodMenuBannerProps> = ({ width = 20, height = 21, bgColor = "#000", wait = false }) => {
    return (
       <div className=""></div>

    );
};

export default FoodMenuBanner;
