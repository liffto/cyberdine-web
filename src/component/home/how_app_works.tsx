import Image from "next/image"

const cards: any[] = [
  { image: "/images/png/how_app_works.png", title: "Create Your Restaurant with your branding", description: "Start by adding your restaurant details like Name, Phone number, Logo & your brand color" },
  { image: "/images/png/how_app_works.png", title: "Start adding Category & Items", description: "Create your category And Start adding items in that Category by adding item name, item name, Food typePrice, Descriptions." },
  { image: "/images/png/how_app_works.png", title: "Scan QR & View the live menu in real time", description: "Now customer can scan the QR code and Enjoy lighting Fast Access to your menu card With Specialized FeaturesTo enhance the customer experience" },
];
export default function HowOurPageWorks() {
  return (
    <>
      <div className="font-bold container md:text-[45px] text-center text-lg uppercase pt-8 md:pt-12 lg:pt-16">
        Watch the video to get started
      </div>
      <div className=" container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-between pt-6 md:pt-10 lg:pt-14">
        {cards.map((card, index) => {
          return (
            <div data-aos-anchor-placement="center-bottom" data-aos={index == 0 ? "fade-left" : index == 2 ? "fade-right" : "fade-in"} key={card.title} >
              <HowWorksCard card={card} index={index + 1} />
            </div>
          );
        })}
      </div>
    </>
  );
}
function HowWorksCard({ card, index }: { card: any; index: number }) {
  return (
    <div className="max-w-[300px] md:max-w-auto mx-auto">
      <Image
        className="lg:hidden bg-secondary rounded-t-md"
        src={card.image}
        alt={"banner image"}
        width={300}
        height={280}
        quality={100}
        priority
      ></Image>
      <Image
        className="hidden bg-secondary lg:block rounded-t-xl"
        src={card.image}
        alt={"banner image"}
        width={409}
        height={383}
        priority
      ></Image>
      <div className="font-bold text-xl lg:text-[45px] pt-2 md:pt-4 lg:pt-6">0{index}</div>
      <div className="font-bold text-sm lg:text-[26px] lg:leading-8 md:pt-2 lg:pt-4">
        {card.title}
      </div>
      <div className=" text-xs lg:text-sm md:pt-2 lg:pt-4">{card.description}</div>
    </div>
  );
}
