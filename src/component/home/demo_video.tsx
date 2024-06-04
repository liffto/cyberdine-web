import Image from "next/image";

export default function DemoVideoComponent() {
  return (
    <div className="mt-6 md:mt-10 lg:mt-14 py-4 md:py-8 lg:py-12 text-center flex flex-col justify-center items-center">
      <div className="font-bold md:text-[45px] text-lg uppercase">
        Watch the video to get started
      </div>
      <div className="text-[11px] md:text-xl pt-2 md:pt-4">
        Working with our service is incredibly simple, try to make your own menu
      </div>
      <div
        data-aos="fade-in"
        className="pt-3 md:pt-6"
      >
        <Image
          className="hidden lg:block "
          src={"/images/svg/demo_video.svg"}
          alt={"sample video"}
          height={1271}
          width={715}
        />
        <Image
          className="lg:hidden"
          src={"/images/svg/demo_video.svg"}
          alt={"sample video"}
          height={335}
          width={200}
        />
      </div>
    </div>
  );
}
