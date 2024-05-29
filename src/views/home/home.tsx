import TopBar from "@/component/common/topbar";
import DemoLinkComponent from "@/component/home/demo_link";
import GivePremium from "@/component/home/give_premium";
import GrowYourBusiness from "@/component/home/grow_your_business";
import HowOurPageWorks from "@/component/home/how_app_works";
import OurClients from "@/component/home/our_clients";
import WhyUseOurApp from "@/component/home/why_use_app";

export default function HomePage() {
    return (
        <>
        <TopBar />
        <GrowYourBusiness />
        <OurClients />
        <GivePremium />
        <WhyUseOurApp />
        <HowOurPageWorks />
        <DemoLinkComponent />
        </>
    );
}