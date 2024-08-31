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

const WelcomePage = ({ data, onMenuClick }: { data: any, onMenuClick: (type: string) => void }) => {
    const items = [
        { svg: '/images/svg/welcome_page/food_menu_icon.svg', text: 'Food Menu', type: 'foodMenu', showCard: true },
        { svg: '/images/svg/welcome_page/drinks_menu_icon.svg', text: 'Drinks Menu', type: 'drinksMenu', showCard: data.businessType == "restroBar" },
        { svg: '/images/svg/welcome_page/google_review_icon.svg', text: 'Google review', type: 'gReview', showCard: data.googleReviewLink },
        { svg: '/images/svg/welcome_page/instagram_icon.svg', text: 'Instagram', type: 'insta', showCard: data.instagramLink },
        { svg: '/images/svg/welcome_page/facebook_icon.svg', text: 'Facebook', type: 'fb', showCard: data.facebookLink },
        { svg: '/images/svg/welcome_page/youtube_icon.svg', text: 'Youtube', type: 'utube', showCard: data.youtubeLink },
        { svg: '/images/svg/welcome_page/payment_icon.svg', text: 'Pay Now', type: 'pay', showCard: data.paymentLink },
    ];

    const onCardClick = (type: string) => {
        if (type == 'foodMenu') {
            onMenuClick(type);
        } else if (type == "drinksMenu") {
            onMenuClick(type);
        } else if (type == "gReview") {
            window.open(data.googleReviewLink, '_blank');
        } else if (type == "insta") {
            window.open(data.instagramLink, '_blank');
        } else if (type == "fb") {
            window.open(data.facebookLink, '_blank');
        } else if (type == "utube") {
            window.open(data.youtubeLink, '_blank');
        } else if (type == "pay") {
            window.open(data.paymentLink, '_blank');
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
                    <div key={index} className="" onClick={() => { onCardClick(item.type) }}>
                        {item.showCard && <Card  svg={item.svg} text={item.text} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WelcomePage;
