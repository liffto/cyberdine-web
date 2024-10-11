// src/StarRating.tsx
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { inputStyles } from '../styles/menu/input';

interface StarRatingProps {
    totalStars?: number;
    onSubmit?: (rating: number) => void;
    bgColor: string;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onSubmit, bgColor }) => {
    const [rating, setRating] = useState<number>(0);

    const handleClick = (star: number) => {
        setRating(star);
        if (onSubmit && star > 3) {
            onSubmit(star);
        }
    };

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(rating);
        }
    };

    return (
        <div className="star-rating flex flex-col items-center">
            <div className="text-center text-black font-semibold py-4 text-xl">Review us on google</div>
            <div className="flex justify-between w-full px-8">
                {[...Array(totalStars)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <span
                            key={starValue}
                            className={`star ${starValue <= rating ? 'filled' : ''}`}
                            onClick={() => handleClick(starValue)}
                            style={{
                                cursor: 'pointer',
                                fontSize: '40px', // Increase star size
                                color: starValue <= rating ? '#FABD3B' : 'gray', // Change color to yellow if filled
                                transition: 'color 0.2s ease', // Smooth color transition
                            }}
                        >
                            ★
                        </span>
                    );
                })}
            </div>
            <div className="w-full px-8 py-4">
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    sx={inputStyles} />
            </div>

            <div
                className={` mt-4 text-lg text-center flex justify-between px-4 items-center w-full p-3 font-semibold`} style={{ backgroundColor: bgColor, boxShadow: "0px 0px 10px 0.5px #00000040" }}
            >
                <div className="flex-1 bg-white px-4 py-2 rounded font-semibold text-xl" onClick={() => { handleSubmit() }} style={{ color: bgColor }} >{"Submit"}</div>
            </div>
        </div>
    );
};

export default StarRating;
