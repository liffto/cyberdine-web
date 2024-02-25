import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-white flex justify-center items-center">
        <Image
          className=""
          src="/assets/images/jpg/comingsoon.jpg"
          alt="coming soon"
          width={500}
          height={335}
          priority
        />
    </main>
  );
}
