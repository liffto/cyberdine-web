'use client'
import { Item } from "@/model/products/items";
import { Menu } from "@/model/products/menu";
import { FirebaseServices } from "@/service/firebase.service";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductDisplay({ restId }: { restId: string }) {
  const [menuData, setData] = useState<Menu | null>(null);
  const [category, setCategory] = useState<Array<string> | null>(null);
  const [selected, setSelected] = useState<string | null>('All');
  useEffect(() => {
    if(!category){
      FirebaseServices.shared.getRestCategory(restId, setCategory);
    }
    if(category){
      FirebaseServices.shared.getOrgMenu(restId, setData);
    }
  }, [restId,category])

  return (
    <div className="container mx-auto  ">
      {menuData ?
        <div className="">
          <div className={`overflow-x-scroll md:container mx-auto py-2 ${selected != "All" ? "sticky top-[91px]" : ""} bg-white border-b`}>
            <div className="flex gap-4">
              <div onClick={() => {
                setSelected('All')
              }} className={`ml-4 rounded border border-primary px-2 py-px ${selected == "All" ? "text-white bg-primary" : "text-primary"} ${selected == "All" ? "" : ""} cursor-pointer`}>
                All
              </div>
              {category && category!.map((ele, index) => {
                return (
                  <div key={index} onClick={() => {
                    setSelected(ele)
                  }} className={`${index == category!.length - 1 ? "mr-4" : ""}  ${selected == ele ? "text-white bg-primary" : "text-primary"} cursor-pointer rounded border whitespace-nowrap border-primary px-2 py-px text-primary`}>
                    {ele}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="my-2 mx-4 flex justify-start items-center">
            <div className="circle pulse live"></div>
            <div className="mx-4 font-semibold text-appbg">Live menu</div>
          </div>

          <div>
            {category && category!.map((ele, index) => {
              return (
                <div key={index}>
                  {menuData && menuData.menuMap?.has(ele) && Array.from(menuData.menuMap?.get(ele)?.values() as Iterable<Item>).filter((ele) => ele.isActive && (ele.category == selected || selected == 'All'))?.length > 0 &&
                    <>
                      {selected == "All" && <div className="sticky top-[91px] bg-white" id={ele}>
                        <div className="px-4 py-2 font-bold   bg-secondary text-black capitalize ">{ele}</div>
                      </div>}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4 ">
                        {Array.from(menuData.menuMap?.get(ele)?.values() as Iterable<Item>).filter((ele) => ele.isActive && (ele.category == selected || selected == 'All')).map((ele: Item, index: any) => {
                          return (
                            <div
                              key={index}
                              className="rounded-md boxshadow-3 md:rounded-md overflow-hidden max-h-[100px] flex "
                            >
                              <div className="h-full bg-slate-200  flex items-center">
                                <Image
                                  src={ele.itemsImageUrl!}
                                  alt={ele.name!}
                                  height={80}
                                  width={80}
                                  priority={index < 2 ? true : false}
                                  style={{ objectFit: "cover", height: "80px" }}
                                />
                              </div>
                              <div className="flex items-center p-2 m-1 flex-1">
                                <div className="flex flex-col  flex-1">
                                  <h1 className="text-base capitalize md:text-lg font-bold">{ele.name}</h1>
                                  <div className="text-sm md:text-base">{ele.category}</div>
                                </div>
                                <div className="font-bold">
                                  &#x20B9; {ele.price}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  }
                </div>
              );
            })}
          </div>
        </div>
        : <div className="flex justify-center items-center " style={{height:"calc(100vh - 92px)"}}>
          <CircularProgress sx={{ color: 'var(--primary-bg)' }} />
        </div>}
    </div>
  );
}
