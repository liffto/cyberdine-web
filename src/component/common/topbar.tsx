import Image from "next/image";
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
export default function TopBar() {
  return (
    <div className="h-[50px] md:h-[80px] sticky top-0 bg-appbg" style={{ boxShadow: "0px 0px 6px 0px #00000040",zIndex:100 }}>
      <div className="h-full flex items-center container py-2 md:py-4  mx-auto">
        <Link href="/" className="flex-1 lg:flex-none ">
          <Image
            className="md:hidden"
            src={"/images/svg/cyberdine_logo.svg"}
            alt={"logo"}
            width={55}
            height={25}
          ></Image>
          <Image
            className="hidden md:block"
            src={"/images/svg/cyberdine_logo.svg"}
            alt={"logo"}
            width={80}
            height={35}
          ></Image>
        </Link>
        <div className="flex-1 hidden lg:flex gap-4 xl:gap-6 justify-center nexa-bold">
            <Link href="/">Products</Link>
            <Link href="/">Features</Link>
            <Link href="/">About</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Contact</Link>
        </div>
        
        <div className="hidden lg:flex items-center justify-center bg-primary text-white rounded-md  lg:w-[150px] h-[45px] text-sm lg:text-lg">
          Sign In
        </div>
      
        <div className="lg:hidden">
        <MenuIcon />
        </div>
      </div>
    </div>
  );
}
