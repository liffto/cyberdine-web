import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="" style={{ boxShadow: "0px 0px 6px 0px #00000040", zIndex: 100 }}>
      <div className="container" >
        <div className="pb-2 md:pb-3 border-b">
          <div className="h-full flex flex-col md:flex-row items-center  py-2 md:py-4  mx-auto">
            <Link href="/" className="flex-1 lg:flex-none py-4 md:py-0 pb-6 md:pb-0" >
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
            <div className="flex-1 flex flex-col md:flex-row items-center gap-4 lg:gap-6 xl:gap-8 justify-center nexa-regular">
              <Link href="/">Home</Link>
              <Link href="/">Features</Link>
              <Link href="/">Pricing</Link>
              <Link href="/">Testimonial</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center gap-4 md:flex-row justify-between  pt-4 pb-6">
          <div className=" text-sm md:text-lg text-center  text-[#00000050]">
            Copyright © 2024 Cyberdine. All rights reserved.
          </div>
          <Link className="text-sm md:text-lg text-center text-[#00000050] cursor-pointer" href={{
            pathname:'/legal/policy'
          }}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>

  );
}
