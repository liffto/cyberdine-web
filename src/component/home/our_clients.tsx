import Image from "next/image";

export default function OurClients() {
  return (
    <div
      className="py-6 md:py-8 lg:py-10 "
      style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
    >
      <div data-aos="fade-left" className="text-center font-bold md:text-2xl lg:text-[40px]">
        Our clients
      </div>
      <div className="relative flex overflow-x-hidden gap-4 md:gap-8 lg:gap-8">
        <div className="py-4 md:py-6 lg:py-10 flex animate-marquee whitespace-nowrap gap-4 md:gap-8 lg:gap-12">
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/vayal.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/corridor.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/hotel_surya.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/mum_mum.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/polo.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
        </div>
        <div className="absolute flex left-4 md:left-8 lg:left-12 top-0 py-4 md:py-6 lg:py-10 animate-marquee2 whitespace-nowrap gap-4 md:gap-8 lg:gap-12">
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/vayal.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/corridor.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/hotel_surya.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/mum_mum.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
          <div className="h-[40px] w-[100px] md:h-[120px] md:w-[300px]">
            <img
              className=""
              src={"/images/svg/client/polo.svg"}
              alt={"sample video"}
              height={400}
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
