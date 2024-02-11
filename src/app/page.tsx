import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <div className="">
        <Image
          className=""
          src="/images/jpg/commingsoon.jpg"
          alt="Next.js Logo"
          width={1920}
          height={1080}
          priority
        />
      </div>
    </main>
  );
}
