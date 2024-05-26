import AppleIcon from "@mui/icons-material/Apple";
import Link from "next/link";
import Image from "next/image";

const demoLink = "/";
const productTourLink = "/";
const googlePlay = "/images/svg/google_play_white.svg";
const apple = "/images/svg/apple_icon.svg";
const cards = [
  {
    title: "Premium experience",
    description:
      "Indulge your restaurant patrons in a premium dining experience with our digital menu, offering seamless navigation and enticing visuals for an unforgettable meal.",
  },
  {
    title: "Customers don't need to wait ",
    description:
      "Eliminate the wait for menus—go digital for instant access to all your offerings.",
  },
  {
    title: "Waiter calling system",
    description:
      "Efficiently summon your waiter with our digital menu's integrated calling system. Seamlessly elevate service and enhance the dining experience.",
  },
  {
    title: "Increase your scales by 30 - 50%",
    description:
      "Boost your revenue with our digital menu solution for restaurants. upsell efficiently, and enhance customer satisfaction effortlessly.",
  },
];
export default function WhyUseOurApp() {
  return (
    <div className="container pt-8 md:pt-12 lg:pt-16">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <TextAndButtons />
        <div className="flex-1 grid grid-cols-2 gap-4 lg:gap-6 pt-4 lg:pt-0">
            {cards.map((card,index)=>{
                return (
                    <div key={card.title}  className="rounded-md lg:rounded-lg  boxshadow-4 p-4 lg:p-6">
                        <div className="text-primary font-bold text-xl lg:text-[45px]">0{index}</div>
                        <div className="font-bold text-sm lg:text-[26px] lg:leading-8 pt-4">{card.title}</div>
                        <div className=" text-xs lg:text-sm pt-4">{card.description}</div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}
function TextAndButtons() {
  return (
    <div className="flex-1 flex flex-col items-center lg:items-start ">
      <div className="text-lg lg:text-[45px] lg:leading-[2.8rem] uppercase font-bold">
        Why You must use our app
      </div>
      <div className="text-[10px] lg:text-xl text-center lg:text-left pt-2 lg:pt-4">
        Embrace the efficiency and convenience of digital menu app for
        streamlined ordering and enhanced customer experience.
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-left gap-4 pt-4">
        <Link href={demoLink}>
          <div className="flex items-center justify-center font-semibold bg-primary text-white rounded-md w-[200px] xl:w-[220px] py-3 text-sm lg:text-xl gap-4">
            <Image
              src={googlePlay}
              width={24}
              height={24}
              alt={"google play app icon"}
            />
            <div className="">Download App</div>
          </div>
        </Link>
        <Link href={productTourLink}>
          <div className="flex gap-2 items-center justify-center font-semibold text-primary border-2 border-primary rounded-md w-[200px] xl:w-[220px] py-3 text-sm lg:text-xl gap-4">
            <Image
              src={apple}
              width={24}
              height={24}
              alt={"apple store icon"}
            />
            <div className="">Download App</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
