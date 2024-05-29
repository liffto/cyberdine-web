import Image from "next/image";

export default function DemoLinkComponent() {
  return (
    <div className="mt-6 md:mt-10 lg:mt-14 py-4 md:py-8 lg:py-12 bg-secondary text-center flex flex-col justify-center items-center">
      <div className="font-bold md:text-[45px] text-lg uppercase">
        See how it works in demo link
      </div>
      <div className="text-[11px] md:text-xl pt-2 md:pt-4">
        Just scan the QR code via phone camera or click the link below
      </div>
      <div data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className="pt-3 md:pt-6">
        <Image className="hidden lg:block " src={"/images/svg/qr_example.svg"} alt={"sample qr"} height={454} width={389} />
        <Image className="lg:hidden" src={"/images/svg/qr_example.svg"} alt={"sample qr"} height={300} width={250} />
      </div>
      <div className="text-primary font-bold text-sm md:text-[26px] pt-3 md:pt-6">
        Click to View Sample menu
      </div>
    </div>
  );
}
