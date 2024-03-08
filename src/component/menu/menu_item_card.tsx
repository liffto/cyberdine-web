import { Item } from "@/model/products/items";
import Image from "next/image";

export default function MenuItemCard({index,setSelectedData,ele,catIndex}:{index: any, setSelectedData: (ele: Item) => void, ele: Item, catIndex: number}) {
    return <div
      key={index}
      onClick={() => {
        setSelectedData(ele);
      } }
      className="rounded-md boxshadow-3 md:rounded-md overflow-hidden max-h-[100px] flex "
    >
      <div className="relative z-0">
        <div className="h-full bg-slate-200  flex items-center">
          <Image
            src={ele.itemsImageUrl!}
            alt={ele.name!}
            height={80}
            width={80}
            priority={catIndex == 0 ? true : false}
            style={{
              objectFit: "cover",
              height: "80px",
            }} />
        </div>
        {ele.isSpecial && (
          <div className="absolute bottom-0 right-0 text-white bg-primary text-sm w-full text-center">
            Special
          </div>
        )}
      </div>
      <div className="flex items-center p-2 m-1 flex-1">
        <div className="flex flex-col  flex-1">
          <h1 className="text-base capitalize md:text-lg font-bold">
            {ele.name}
          </h1>
          <div className="text-sm md:text-base">
            {ele.foodType}
          </div>
        </div>
        <div className="font-bold">
          &#x20B9; {ele.price}
        </div>
      </div>
    </div>;
  }