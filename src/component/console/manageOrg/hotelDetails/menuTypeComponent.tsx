import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import data from '../../../../../public/json/menuTypeJson.json';
import LandingPageCard from '../../landingPage/landingPageCard';

export default function MenuTypeComponents({ onBackClicked, onCardClicked }: { onBackClicked: () => void, onCardClicked: () => void }) {
    const handleBackClick = () => {
        onBackClicked();
    };
    const handleCardClicked = (orgMenuType: string) => {
        localStorage.setItem("orgMenuType", orgMenuType);
        onCardClicked();
    }
    const enableDrinksMenu = (type: string) => {
        return (JSON.parse(localStorage.getItem("restaurantData")!).businessType == 'restroBar' && type == "drinksMenu" || type == "foodMenu")
    }

    return <div className="">
        <div className="flex items-center mb-4 mt-8">
            <button onClick={handleBackClick} className="mr-2">
                <ArrowBackIosIcon className="text-gray-700" />
            </button>
            <h1 className="text-2xl font-semibold">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-start">
            {data.orgMenuType.map((dashboard, index) => (
                enableDrinksMenu(dashboard.type) && <div key={index} className="flex w-full sm:w-1/2 lg:w-[28%] my-4">
                    <LandingPageCard
                        title={dashboard.title}
                        content={dashboard.content}
                        type={dashboard.type}
                        onCardClicked={() => { handleCardClicked(dashboard.type) }} localStorageType={"manageOrgType"} />
                </div>
            ))}
        </div>
    </div>
}