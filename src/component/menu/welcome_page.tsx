"use client";
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// Card component
const Card = ({ svg, text }: { svg: string, text: string }) => (
    <div className="bg-black border border-white rounded-lg w-full max-w-sm flex items-center">
        <div className="flex-shrink-0 border-r border-white pr-4 flex items-center justify-center p-2">
            <img
                src={svg}
                alt={text}
                className="w-8 h-8 object-contain" // Adjust size and ensure the image fits
            />
        </div>
        <div className="flex-1 text-white text-lg font-semibold pl-2">{text}</div>
        <ArrowForwardIosIcon className="text-white pr-2" sx={{ fontSize: '28px' }} />
    </div>
);

const WelcomePage = ({ data, restId, table }: { data: any, restId: string; table: string }) => {
    const items = [
        { svg: '/images/svg/welcome_page/food_menu_icon.svg', text: 'Food Menu', type: 'foodMenu', showCard: true, link: `/rest/${restId}/menu?table=${table}` },
        { svg: '/images/svg/welcome_page/drinks_menu_icon.svg', text: 'Drinks Menu', type: 'drinksMenu', showCard: data.businessType == "restroBar", link: `/rest/${restId}/menu?table=${table}` },
        { svg: '/images/svg/welcome_page/google_review_icon.svg', text: 'Google review', type: 'gReview', showCard: data.googleReviewLink, link: data.googleReviewLink },
        { svg: '/images/svg/welcome_page/instagram_icon.svg', text: 'Instagram', type: 'insta', showCard: data.instagramLink, link: data.instagramLink },
        { svg: '/images/svg/welcome_page/facebook_icon.svg', text: 'Facebook', type: 'fb', showCard: data.facebookLink, link: data.facebookLink },
        { svg: '/images/svg/welcome_page/youtube_icon.svg', text: 'Youtube', type: 'utube', showCard: data.youtubeLink, link: data.youtubeLink },
        { svg: '/images/svg/welcome_page/payment_icon.svg', text: 'Pay Now', type: 'pay', showCard: data.paymentLink, link: data.paymentLink },
    ];

    const onClickMenu = (type: string) => {
        if (type == "foodMenu" || type == "drinksMenu") {
            localStorage.setItem("menuType", type);
        }
    }


    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center mt-2 mb-8 flex-1">
                <p className="text-xl font-normal">Welcome</p>
                <p className="text-3xl font-bold mt-2" style={{ fontFamily: 'mum mum restaurant' }}>
                    {data.hname}
                </p>
                <img
                    src={"/images/svg/welcome_page/welcome_page_icon.svg"}
                    alt={'Welcome Logo'}
                    className="w-26 h-26 my-4 object-contain m-auto" // Adjust size and ensure the image fits
                />
            </div>
            <div className="w-full flex flex-col gap-4 max-w-4xl">
                {items.map((item, index) => (
                    <a key={index} className="" href={item.link} >
                        {item.showCard && <div className="" onClick={() => { onClickMenu(item.type) }}><Card svg={item.svg} text={item.text} /></div>}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default WelcomePage;
