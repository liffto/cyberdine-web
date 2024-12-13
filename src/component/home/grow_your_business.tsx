import Link from "next/link";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Image from "next/image";

const demoLink = "tel:9843137477";
const productTourLink = "/";
const bannerLg = "/images/png/home_banner_lg.png";
const bannerSm = "/images/png/home_banner_sm.png";
export default function GrowYourBusiness() {
  return (
    <div data-aos="zoom-out-down" className="container mx-auto">
      <HighLightText />
      <DemoTourButtons />
      <BannerImage />
    </div>
  );
}
function HighLightText() {
  return (
    <>
      <div  className="uppercase text-[22px] md:text-[37px] lg:text-[55px] text-center  font-bold pt-6 md:pt-10 lg:pt-14">
        grow your restaurant
        <br /> business With Cyberdine
      </div>
      <div  className="text-center text-sm md:text-lg lg:text-xl pt-2 md:pt-4">
        Using The power of cloud-based technology, Discover how 1000+
        <br />
        restaurants use Cyberdine to grow their restaurant’s brand.
      </div>
    </>
  );
}

function DemoTourButtons() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center md:w-auto gap-3 md:gap-5 pt-6 md:pt-12">
      {/* <Link href={demoLink}>
        <div className="flex items-center justify-center bg-primary text-white rounded-md w-[200px] md:w-[250px] py-3 text-sm md:text-xl">
          Book a Demo
        </div>
      </Link> */}
      <Link href={demoLink}>
        <div className="flex items-center justify-center bg-primary text-white rounded-md w-[200px] md:w-[250px] py-3 text-sm md:text-xl">
          Contact Us
        </div>
      </Link>
      <Link href={productTourLink}>
        <div className="flex gap-2 items-center justify-center text-primary border border-primary rounded-md w-[200px] md:w-[250px] py-3 text-sm md:text-xl">
          <div className="text-primary">
            <PlayCircleIcon sx={{ marginTop: "-2px" }} />
          </div>
          <div className="">Watch product tour</div>
        </div>
      </Link>
    </div>
  );
}
function BannerImage() {
  return (
    <div  className="pt-4 md:pt-6 lg:pt-8 flex justify-center">
      <img
        className="lg:hidden"
        src={bannerSm}
        alt={"banner image"}
        width={325}
        height={153}
        // quality={100}
        // priority
      />
      <img
        className="hidden lg:block"
        src={bannerLg}
        alt={"banner image"}
        width={916}
        height={432}
        // priority
      />
    </div>
  );
}
