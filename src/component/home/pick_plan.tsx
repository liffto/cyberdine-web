
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
      <div data-aos="zoom-in-up"  className="container pt-3 md:pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <div className="h-[45vh] md:h-[60vh] bg-white w-[220px] md:min-w-full rounded md:rounded-lg"></div>
        <div className="h-[45vh] md:h-[60vh] bg-white w-[220px] md:min-w-full rounded md:rounded-lg"></div>
        <div className="h-[45vh] md:h-[60vh] bg-white w-[220px] md:min-w-full rounded md:rounded-lg"></div>
      </div>
     
    </div>
  );
}
