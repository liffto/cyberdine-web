"use client";
import { Item } from "@/model/products/items";
import { Menu } from "@/model/products/menu";
import { FirebaseServices } from "@/service/firebase.service";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MenuItemCard from "./menu_item_card";
const DescriptionSheet = dynamic(() => import("./description_sheet"), {
  ssr: false,
});
export default function ProductDisplay({ restId }: { restId: string }) {
  const [menuData, setData] = useState<Menu | null>(null);
  const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
  const [category, setCategory] = useState<Array<string>>(['All']);
  const [selected, setSelected] = useState<string>("All");

  useEffect(() => {
    const catUnsub = FirebaseServices.shared.getRestCategory(
      restId,
      (cat:Array<string>)=>{setCategory(['All',...cat])}
    );
    const menuUnSub = FirebaseServices.shared.getOrgMenu(restId, setData);
    return () => {
      catUnsub();
      menuUnSub();
    };
  }, [restId, category]);

  const setSelectedData = (ele: Item) => {
    setSelectedMenuData(ele);
  };
  function CategoryList() {
    return (
      <div
        className={`overflow-x-scroll md:container max-w-screen py-2 ${
          selected != "All" ? "sticky top-[91px]" : ""
        } bg-white border-b z-20`}
      >
        <div className="flex gap-4 px-4">
          {category &&
            category!.map((ele, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelected(ele);
                  }}
                  className={`    ${
                    selected == ele ? "text-white bg-primary" : "text-primary"
                  } cursor-pointer rounded border whitespace-nowrap border-primary px-2 py-px text-primary`}
                >
                  {ele}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto  ">
      {menuData ? (
        <div className="">
          {CategoryList()}
          <div className="my-2 mx-4 flex justify-start items-center">
            <div className="circle pulse live"></div>
            <div className="mx-4 font-semibold text-appbg">Live menu</div>
          </div>

          <div>
            {category &&
              (selected == 'All'?category:[selected])!.map((ele, catIndex) => {
                return (
                  <div key={catIndex}>
                    {menuData &&
                      menuData.getActiveMenuByCat(ele) &&
                      menuData.getActiveMenuByCat(ele)!.length > 0 && (
                        <>
                          {selected == "All" && (
                            <div
                              className="sticky top-[91px] bg-white z-10"
                              id={ele}
                            >
                              <div className="px-4 py-2 font-bold   bg-secondary text-black capitalize ">
                                {ele}
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4 ">
                            {menuData.getActiveMenuByCat(ele) &&
                              menuData
                                .getActiveMenuByCat(ele)!
                                .map((ele: Item, index: any) => {
                                  return (
                                    <MenuItemCard index={index} setSelectedData={setSelectedData} ele={ele} catIndex={catIndex} />
                                    
                                  );
                                })}
                          </div>
                        </>
                      )}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center "
          style={{ height: "calc(100vh - 92px)" }}
        >
          <CircularProgress sx={{ color: "var(--primary-bg)" }} />
        </div>
      )}
      {selectedMenuData && (
        <DescriptionSheet
          setSelectedMenuData={setSelectedMenuData}
          selectedMenuData={selectedMenuData}
        />
      )}
    </div>
  );
}


