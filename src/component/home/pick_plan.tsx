import Image from "next/image";

export default function PickPlan() {
  return (
    <div className=" mt-6 md:mt-10 lg:mt-14 py-4 md:py-8 lg:py-12 bg-secondary text-center  items-center">
      <div className="font-bold md:text-[45px] text-lg uppercase">
        Choose your favorite plan
      </div>
      <div className="text-[11px] md:text-xl pt-2 md:pt-4">
        Pick the perfect plan for your preferences
      </div>
      <div

        className="container pt-3 md:pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
      >
        <div data-aos={"fade-left"} data-aos-anchor-placement="center-bottom" className="  w-[220px] md:min-w-full rounded md:rounded-lg mx-auto">
          <Image
            className=" bg-secondary lg:block rounded-t-xl"
            src={'/images/svg/starter.svg'}
            alt={"starter price"}
            width={409}
            height={383}
            priority
          ></Image>
        </div>
        <div data-aos={"fade-in"} data-aos-anchor-placement="center-bottom" className="  w-[220px] md:min-w-full rounded md:rounded-lg mx-auto">
        <Image
            className=" bg-secondary lg:block rounded-t-xl"
            src={'/images/svg/premium.svg'}
            alt={"premium price"}
            width={409}
            height={383}
            priority
          ></Image>
        </div>
        <div data-aos={"fade-right"} data-aos-anchor-placement="center-bottom" className="  w-[220px] md:min-w-full rounded md:rounded-lg mx-auto">
        <Image
            className=" bg-secondary lg:block rounded-t-xl"
            src={'/images/svg/basic.svg'}
            alt={"basic price"}
            width={409}
            height={383}
            priority
          ></Image>
        </div>
      </div>
    </div>
  );
}
