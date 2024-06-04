import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div>
            <div className="h-full flex items-center container py-2 md:py-4  mx-auto">
        <div className="flex-1 lg:flex-none ">
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
        </div>
        <div className="flex-1 hidden lg:flex gap-4 xl:gap-6 justify-center nexa-bold">
            <Link href="/">Products</Link>
            <Link href="/">Features</Link>
            <Link href="/">About</Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Contact</Link>
        </div>
        
        
      </div>
        </div>
    );
}