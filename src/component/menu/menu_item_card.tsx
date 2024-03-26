import { Item } from "@/model/products/items";
import Image from "next/image";
import { useState } from "react";

export default function MenuItemCard({
  index,
  setSelectedData,
  ele,
  catIndex,
}: {
  index: any;
  setSelectedData?: (ele: Item) => void;
  ele: Item;
  catIndex?: number;
}) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div
      key={index}
      onClick={() => {
        setSelectedData && setSelectedData(ele);
      }}
      className="rounded-md boxshadow-3 md:rounded-md overflow-hidden max-h-[100px] flex "
    >
      <div className="relative z-0">
        <div className= {`h-full bg-slate-200  flex items-center`}>
          {imageError ? (
            <Image
              src="/images/png/empty_menu_item.png"
              alt={ele.name! + "empty"}
              height={80}
              width={80}
              style={{ objectFit: "cover", height: "80px" }}
            />
          ) : (
            <Image
              src={ele.itemsImageUrl ?? '/images/png/empty_menu_item.png'}
              alt={ele.name!}
              height={80}
              width={80}
              priority={catIndex ? false : catIndex == 0 ? true : false}
              onError={handleImageError}
              style={{
                objectFit: "cover",
                height: "80px", 
              }}
            />
          )}
        </div>
        {ele.isSpecial && (
          <div className="absolute bottom-0 right-0 text-white bg-primary text-sm w-full text-center">
            Special
          </div>
        )}
        {!ele.isActive && (
          <div className="absolute bottom-[38%] right-0 text-white bg-primary text-sm w-full text-center">
            Sold Out
          </div>
        )}
      </div>
      <div className="flex items-center p-2 m-1 flex-1">
        <div className="flex flex-col  flex-1">
          <h1 className={`text-base capitalize md:text-lg font-bold ${!ele.isActive ? "text-gray-300" : "text-black"}`}>
            {ele.name}
          </h1>
          <div
            className={`text-xs md:text-sm  ${!ele.isActive ? "text-gray-300" : "text-gray-700"} font-medium`}
          >
            {ele.foodType}
          </div>
        </div>
        <div className={`font-bold ${!ele.isActive ? "text-gray-300" : "text-gray-700"}`}>&#x20B9; {ele.price}</div>
      </div>
    </div>
  );
}
