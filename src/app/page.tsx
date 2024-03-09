
export default function Home() {
  return (
    <div className=" min-h-screen bg-black flex items-center">

    <main className="py-4 grid h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 place-content-center  container mx-auto">
        <div className="mx-auto">
          <img src="/images/jpg/landing_2.jpg" className="h-full object-cover w-full " alt="" />
        </div>
        <div className="mx-auto">
          <img src="/images/jpg/landing_1.jpg" className="h-full object-cover w-full " alt="" />
        </div>
        <div className="mx-auto">
          <img src="/images/jpg/landing_3.jpg" className="h-full object-cover w-full " alt="" />
        </div>
    </main>
    </div>
  );
}
