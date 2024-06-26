import Footer from "@/component/common/footer";
import TopBar from "@/component/common/topbar";
import DemoLinkComponent from "@/component/home/demo_link";
import DemoVideoComponent from "@/component/home/demo_video";
import GivePremium from "@/component/home/give_premium";
import GrowYourBusiness from "@/component/home/grow_your_business";
import HowOurPageWorks from "@/component/home/how_app_works";
import OurClients from "@/component/home/our_clients";
import PickPlan from "@/component/home/pick_plan";
import WhyUseOurApp from "@/component/home/why_use_app";

export default function HomePage() {
    return (
        <div className="overflow-x-hidden max-w-screen">
        <TopBar />
        <GrowYourBusiness />
        <OurClients />
        <GivePremium />
        <WhyUseOurApp />
        <HowOurPageWorks />
        <DemoLinkComponent />
        <DemoVideoComponent />
        <PickPlan />
        <Footer />
        </div>
    );
}