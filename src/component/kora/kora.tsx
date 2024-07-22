import Image from "next/image";
import Link from "next/link";

export default function KoraPage() {
    return (
        <div className=" mt-6 md:mt-10 lg:mt-14 py-4 md:py-8 lg:py-12 text-center  items-center">
            <div className="px-4 flex items-center justify-center">
                <Image
                    className="lg:block rounded-t-xl"
                    src={'/images/png/kora_food_street.png'}
                    alt={"Kora food street"}
                    width={409}
                    height={383}
                    priority
                ></Image>
            </div>
            <div className="text-xl font-semibold py-4 md:py-8">
                Now Available On
            </div>
            <div

                className="container pt-3 md:pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 "
            >
                <Link href='https://www.zomato.com/chennai/restaurants/in/kora-food-street-anna-nagar-west' className="w-[300px] md:min-w-full rounded md:rounded-lg mx-auto">
                    <Image
                        className="lg:block rounded-t-xl"
                        src={'/images/svg/kora_zomoto.svg'}
                        alt={"Kora zomoto"}
                        width={409}
                        height={383}
                        priority
                    ></Image>
                </Link>
                <Link href='https://www.zomato.com/chennai/restaurants/in/kora-food-street-anna-nagar-west' className="w-[300px] md:min-w-full rounded md:rounded-lg mx-auto">
                    <Image
                        className="lg:block rounded-t-xl"
                        src={'/images/svg/kora_swiggy.svg'}
                        alt={"Kora swiggy"}
                        width={409}
                        height={383}
                        priority
                    ></Image>
                </Link>
            </div>
        </div>
    );
}
