import TopBar from "@/component/common/topbar";
import GivePremium from "@/component/home/give_premium";
import GrowYourBusiness from "@/component/home/grow_your_business";
import OurClients from "@/component/home/our_clients";

export default function HomePage() {
    return (
        <>
        <TopBar />
        <GrowYourBusiness />
        <OurClients />
        <GivePremium />
        </>
    );
}