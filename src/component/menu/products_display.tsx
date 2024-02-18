'use client'
import { Item } from "@/model/products/items";
import { Menu } from "@/model/products/menu";
import { FirebaseServices } from "@/service/firebase.service";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductDisplay({restId}:{restId:string}) {
  const [menuData,setData] = useState<Menu | null>(null);
    useEffect(()=>{
      FirebaseServices.shared.getOrgMenu(restId,setData);
    },[restId])
  // console.log(JSON.stringify(menu), "items");
  return (
    <div className="container mx-auto  ">
      <div>
        {menuData && Array.from(menuData.menuMap?.keys() as Iterable<string>).map((ele, index) => {
          return (
            <div key={index}>
              {Array.from(menuData.menuMap?.get(ele)?.values() as Iterable<Item>).filter((ele)=>ele.isActive)?.length>0&& <div className="px-4 py-2 my-2 font-bold  bg-secondary text-black capitalize">{ele}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4 ">
                {Array.from(menuData.menuMap?.get(ele)?.values() as Iterable<Item>).filter((ele)=>ele.isActive).map((ele: Item, index: any) => {
                  return (
                    <div
                      key={index}
                      className="rounded-lg boxshadow-3 md:rounded-xl overflow-hidden   max-h-[100px]  flex transform transition-transform hover:scale-105 "
                    >
                      <div className="h-[100px]">
                      <Image
                        src={ele.itemsImageUrl!}
                        alt={ele.name!}
                        height={100}
                        width={100}
                        priority={index <2?true:false}
                        style={{ objectFit: "cover",height:"100px" }}
                      />
                      </div>
                      <div className="flex items-center p-4 m-1 flex-1">
                      <div className="flex flex-col  flex-1">
                        <h1 className="text-base capitalize md:text-lg font-bold">{ele.name}</h1>
                        <div className="text-sm md:text-base">{ele.category}</div>
                      </div>
                      <div className="text-lg">
                      {ele.price}
                      </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
