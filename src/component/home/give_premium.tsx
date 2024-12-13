import Image from "next/image";


const givePremiumLg = "/images/png/give_premium_lg.png"
const givePremiumSm = "/images/png/give_premium_sm.png"
export default function GivePremium() {
  return (
    <div className="bg-secondary py-4 md:py-6 lg:py-8">
      <div className="container mx-auto flex lg:gap-10 xl:gap-14 flex-col lg:flex-row-reverse items-center">
        <TitleAndSub />
        <PremiumImage />
      </div>
    </div>
  );
}

function TitleAndSub() {
  return (
    <div data-aos="fade-left" className="flex-1">
      <div className="text-lg md:text-2xl font-bold lg:text-[45px] lg:leading-[3rem] uppercase text-center lg:text-left mx-auto lg:mx-0 md:max-w-[450px] text-wrap break-words">
        Give the Premium experience to your customers
      </div>
      <div className="text-[10px] md:text-[16px] text-center lg:text-left">
        Our lighting Fast QR menus offer exceptional speed and privacy. We
        collects no cookies, ensuring data protection and a user experience
        where customers don’t have to wait to see your menus.
      </div>
    </div>
  );
}

function PremiumImage() {
  return (
    <div data-aos="fade-right" className="flex-1">
      <img
        className="lg:hidden"
        src={givePremiumSm}
        alt={"give premium experience image"}
        width={252}
        height={353}
      />
      <img
        className="hidden lg:block"
        src={givePremiumLg}
        alt={"give premium experience  image"}
        width={514}
        height={844}
      />
    </div>
  )
}