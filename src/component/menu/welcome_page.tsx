"use client";
import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarRating from './start_rating';
import { useRouter } from 'next/navigation';
// Card component
const Card = ({ svg, text }: { svg: string, text: string }) => (
    <div className="bg-white border-2 border-black rounded-lg w-full max-w-sm flex items-center">
        <div className="flex-shrink-0 border-r-2 border-black flex items-center justify-center p-2">
            <img
                src={svg}
                alt={text}
                className="w-8 h-8 object-contain" // Adjust size and ensure the image fits
            />
        </div>
        <div className="flex-1 text-black text-lg font-semibold pl-2">{text}</div>
        <ArrowForwardIosIcon className="text-black pr-2" sx={{ fontSize: '28px' }} />
    </div>
);

const WelcomePage = ({ data, restId, table, bgColor }: { data: any, restId: string; table: string, bgColor: string; }) => {
    const [ratingDrawerStatus, setratingDrawerStatus] = useState(false);
    const [link, setLink] = useState('');
    const router = useRouter();

    const items = [
        { svg: '/images/svg/welcome_page/food_menu_icon.svg', text: 'View Food Menu', type: 'foodMenu', showCard: true, link: `/rest/${restId}/menu?table=${table}` },
        { svg: '/images/svg/welcome_page/drinks_menu_icon.svg', text: 'View Drinks Menu', type: 'drinksMenu', showCard: data.businessType == "restroBar", link: `/rest/${restId}/menu?table=${table}` },
        { svg: '/images/svg/welcome_page/google_review_icon.svg', text: 'Google review', type: 'gReview', showCard: data.googleReviewLink, link: data.googleReviewLink },
        { svg: '/images/svg/welcome_page/instagram_icon.svg', text: 'Instagram', type: 'insta', showCard: data.instagramLink, link: data.instagramLink },
        { svg: '/images/svg/welcome_page/facebook_icon.svg', text: 'Facebook', type: 'fb', showCard: data.facebookLink, link: data.facebookLink },
        { svg: '/images/svg/welcome_page/whatsapp_icon.svg', text: 'WhatsApp', type: 'whatsApp', showCard: data.whatsappLink, link: data.whatsappLink },
        { svg: '/images/svg/welcome_page/youtube_icon.svg', text: 'Youtube', type: 'utube', showCard: data.youtubeLink, link: data.youtubeLink },
        { svg: '/images/svg/welcome_page/payment_icon.svg', text: 'Pay Now', type: 'pay', showCard: data.paymentLink, link: data.paymentLink },
    ];

    const onClickMenu = (type: string, link: string) => {
        if (type == "foodMenu" || type == "drinksMenu") {
            localStorage.setItem("menuType", type);
            router.push(link);
        } else if (type == "gReview") {
            if (!(data.ratingLimit == true)) {
                window.open(link, '_blank');
            } else {
                setratingDrawerStatus(true);
                setLink(link);
            }

        } else {
            router.push(link);
        }
    }

    function getTableNumber() {
        // Get the current URL (window.location.href)
        const url = window.location.href;

        // Create a new URL object from the current URL
        const urlObj = new URL(url);

        // Use searchParams to extract the value of the 'table' query parameter
        const tableNumber = urlObj.searchParams.get('table');

        return tableNumber;
    }

    return (
        <div className={`text-white min-h-screen flex flex-col items-center justify-center p-4`}
            style={{
                backgroundImage: 'url(/images/svg/home_background.svg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '100vh',
                backgroundColor: bgColor,
            }}
        >
            <div className="text-center mt-2 mb-8 flex-1">
                <p className="text-xl font-normal">Welcome</p>
                <p className="text-3xl font-bold mt-2" style={{ fontFamily: 'mum mum restaurant' }}>
                    {data.hname}
                </p>
                {data.logo && data.logo != "" ?
                    <div className=" w-full mt-8 flex items-center justify-center">
                        <div className="rounded-full overflow-hidden w-[150px] h-[150px]  boxshadow-3">
                            <img src={data.logo} alt="restarunt logo" height={150} width={150} />
                        </div>
                    </div>

                    : <img
                        src={"/images/svg/welcome_page/welcome_page_icon.svg"}
                        alt={'Welcome Logo'}
                        className="w-26 h-26 my-4 object-contain m-auto" // Adjust size and ensure the image fits
                    />}
                {getTableNumber() && <p className="text-2xl font-bold mt-4" style={{ fontFamily: 'mum mum restaurant' }}>
                    {`Table - ${getTableNumber()}`}
                </p>}
            </div>
            <div className={`w-full flex flex-col mb-14 max-w-4xl overflow-y-hidden	`}>
                {items.map((item, index) => (
                    <a key={index} className=""  >
                        {item.showCard && <div className="mb-4" onClick={() => { onClickMenu(item.type, item.link) }}><Card svg={item.svg} text={item.text} /></div>}
                    </a>
                ))}
            </div>
            <StarRating bgColor={bgColor} restId={restId} ratingDrawerStatus={ratingDrawerStatus} link={link} closeDrawer={() => { setratingDrawerStatus(false) }} />
        </div>
    );
};

export default WelcomePage;
