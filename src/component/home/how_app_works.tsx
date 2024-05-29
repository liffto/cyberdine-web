import Image from "next/image"

const cards: any[] = [
  { image: "/images/png/how_app_works.png", title: "Create Your Restaurant with your branding", description: "Start by adding your restaurant details like Name, Phone number, Logo & your brand color" },
  { image: "/images/png/how_app_works.png", title: "Start adding Category & Items", description: "Create your category And Start adding items in that Category by adding item name, item name, Food typePrice, Descriptions." },
  { image: "/images/png/how_app_works.png", title: "Scan QR & View the live menu in real time", description: "Now customer can scan the QR code and Enjoy lighting Fast Access to your menu card With Specialized FeaturesTo enhance the customer experience" },
];
export default function HowOurPageWorks() {
  return (
    <div className=" container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-between pt-8 md:pt-12 lg:pt-16">
      {cards.map((card, index) => {
        return (
          <div data-aos="zoom-in-up" key={card.title} >
            <HowWorksCard card={card} index={index+1} />
          </div>
        );
      })}
    </div>
  );
}
function HowWorksCard({ card, index }: { card: any; index: number }) {
  return (
    <>
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
      <div className="font-bold text-sm lg:text-[26px] lg:leading-8 pt-4">
        {card.title}
      </div>
      <div className=" text-xs lg:text-sm pt-4">{card.description}</div>
    </>
  );
}
