// src/StarRating.tsx
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { inputStyles } from '../styles/menu/input';
import { FeedBackDetailsModel } from '@/model/feedback_detail/feedback_details';
import SwipeableDrawer from '@mui/material/SwipeableDrawer/SwipeableDrawer';
import { FirebaseServices } from '@/service/firebase.service';

interface StarRatingProps {
    totalStars?: number;
    bgColor: string;
    restId: string;
    ratingDrawerStatus: boolean;
    link: string;
    closeDrawer: () => void;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, bgColor, restId, ratingDrawerStatus, link, closeDrawer }) => {
    const [rating, setRating] = useState<number>(0);
    const [customerName, setCustomerName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
        closeDrawer();
    };
    const resetForm = () => {
        setRating(0);
        setCustomerName('');
        setPhoneNumber('');
        setFeedback('');
        setDrawerOpen(ratingDrawerStatus);
    };

    useEffect(() => {
        resetForm();
    }, [closeDrawer])

    const handleClick = (star: number) => {
        setRating(star);
        if (star > 3) {
            window.open(link, '_blank');
            setDrawerOpen(false);
            closeDrawer();
        }
    };

    const generateFeedbackId = (): string => {
        return `feedback${Date.now()}`;
    };

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const [month, day, year] = formattedDate.split(' ');
        const formatedDate = `${day} ${month} ${year}`
        return formatedDate.replace(',', ''); // Rearranged to '19 Oct 2024'
    };

    const handleSubmit = () => {
        const feedbackDetails = new FeedBackDetailsModel({
            customerName: customerName,
            phoneNumber: parseFloat(phoneNumber),
            starCounnt: rating,
            feedBack: feedback,
            date: formatDate(new Date()),
            feedBackId: generateFeedbackId()
        });
        addFeedbackDetails(feedbackDetails);
        setDrawerOpen(false);
        closeDrawer();
    };

    const addFeedbackDetails = (data: FeedBackDetailsModel) => {
        FirebaseServices.shared.addFeedbackDetails(
            data,
            restId,
            data!.feedBackId!,
            (val: any) => {
                // setShowDialog(false);
            }
        );
    };

    const isFormValid = () => {
        return rating > 0 && customerName.trim() !== '' && phoneNumber.trim().length == 10 && feedback.trim() !== '';
    };

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            PaperProps={{
                style: {
                    width: '100%',
                    borderRadius: '20px 20px 0 0'
                },
            }}
        >
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
                                    fontSize: '40px',
                                    color: starValue <= rating ? '#FABD3B' : 'gray',
                                    transition: 'color 0.2s ease',
                                }}
                            >
                                ★
                            </span>
                        );
                    })}
                </div>
                <div className="w-full px-8 pt-4">
                    <TextField
                        label="Enter Name"
                        fullWidth
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        sx={inputStyles} />
                </div>
                <div className="w-full px-8 py-4">
                    <TextField
                        label="Enter Mobile Number"
                        fullWidth
                        value={phoneNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Allow only digits and limit to 10 characters
                            if (/^\d{0,10}$/.test(value)) {
                                setPhoneNumber(value);
                            }
                        }}
                        inputProps={{ maxLength: 10 }}
                        sx={inputStyles} />
                </div>
                <div className="w-full px-8 pb-2">
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        sx={inputStyles} />
                </div>

                <div
                    className={`mt-4 text-lg text-center flex justify-between px-4 items-center w-full p-3 font-semibold`}
                    style={{ backgroundColor: bgColor, boxShadow: "0px 0px 10px 0.5px #00000040" }}
                >

                    <button
                        className={`flex-1 bg-white px-4 py-2 rounded font-semibold text-xl ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={isFormValid() ? handleSubmit : undefined}
                        style={{ color: bgColor }}
                        disabled={!isFormValid()}
                    >
                        {"Submit"}
                    </button>

                </div>
            </div>
        </SwipeableDrawer>
    );
};

export default StarRating;