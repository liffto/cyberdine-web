import { Item } from "@/model/products/items";
import { Menu } from "@/model/products/menu";
import Image from "next/image";

export default function ProductDisplay({ menu }: { menu: Menu }) {
  console.log(JSON.stringify(menu), "items");
  const menuData = new Menu(menu);
  return (
    <div className="md:px-4 container mx-auto  text-white">
      <div className="px-4 md:px-0 py-4 bg-black sticky top-0">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold">Products</h3>
      </div>
      <div >
        {Array.from(menuData.menuMap?.keys() as Iterable<string>).map(
          (ele, index) => {
            return (
              <div key={index} >
                <div className="px-4 md:px-0 pt-4 font-bold text-lg capitalize">{ele}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-4">

                {Array.from(
                  menuData.menuMap?.get(ele)?.values() as Iterable<Item>
                ).map((ele: Item, index: any) => {
                  return (
                    <div
                      key={index}
                      className="rounded-lg md:rounded-xl overflow-hidden shadow-lg max-h-[100px] bg-gray-800 flex "
                    >
                      <Image
                        src={ele.itemsImageUrl!}
                        alt={ele.name!}
                        height={100}
                        width={100}
                        style={{ objectFit: "cover" }}
                      />
                      <div className="flex flex-col p-4 ">
                        <h1 className="text-base capitalize md:text-lg font-bold">{ele.name}</h1>
                        <div className="text-sm md:text-base">{ele.price}</div>
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
