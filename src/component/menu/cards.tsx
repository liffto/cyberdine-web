import { Menu } from "@/model/products/menu";
import { Item } from "@/model/products/items";
import BasicMenuItemCard from "./basic_menu_item_card";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuItemCard from "./menu_item_card";
import { useContext } from "react";
import { MenuDataContext } from "@/context/menu.context";

export function ProCard({
  bgColor,
  catIndex,
  ele,
  menuData,
  selfilterList,
  setSelectedData,
  restId,
  deviceId,
  menuTypes,
  table,
  onRemoveOrders
}: {
  ele: string;
  menuData: Menu | null;
  selfilterList: string[];
  setSelectedData: (ele: Item) => void;
  catIndex: number;
  bgColor: string;
  restId: string;
  deviceId: string;
  menuTypes: string;
  table: string;
  onRemoveOrders: (menuData: Menu) => void;
}) {
  const { cartMenuData } = useContext(MenuDataContext);

  const checkOrderList = (data: Item, type: string) => {
    if (data.dateAndTime == null) {
      data.dateAndTime = new Date().toISOString();
    }
    menuData?.addQantity(data, data.quantity, restId, deviceId, type, table, (val: any) => {
      if (val == "remove" && cartMenuData && cartMenuData?.getMenuList()!.length == 1 && data.quantity == null) {
        cartMenuData.makeCartMenuEmpty();
        onRemoveOrders(menuData);
      }
    })
  }

  return (
    <>
      <div className={`sticky ${menuTypes == "foodMenu" ? "top-[102px]" : "top-[70px]"}  bg-[#fafafa] z-10`}>
        <div className="px-4 py-2 font-bold text-sm bg-secondary text-black capitalize flex justify-between items-center">
          <div className=" ">{ele}</div>
          <div className="pr-2">
            {menuData?.getMenuList(ele, selfilterList)!.length}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
        {menuData?.getMenuList(ele, selfilterList) &&
          menuData
            .getMenuList(ele, selfilterList)!
            .map((ele: Item, index: any) => {
              return (
                <div key={index} className="">
                  <MenuItemCard
                    index={index}
                    setSelectedData={setSelectedData}
                    ele={ele}
                    catIndex={catIndex}
                    bgColor={bgColor} addOrderItems={checkOrderList} />
                </div>
              );
            })}
      </div>
    </>
  );
}

export function BasicCard({
  ele,
  menuData,
  selectedCategoryName,
  selfilterList,
  setCatName,
}: {
  setCatName: (categoryName: string) => void;
  ele: string;
  menuData: Menu;
  selfilterList: string[];
  selectedCategoryName: string | null;
}) {
  return (
    <>
      <div
        onClick={() => {
          setCatName(ele);
        }}
        className="px-4 py-2 font-bold text-sm bg-secondary text-black capitalize flex justify-between items-center"
      >
        <div className=" ">
          {`${ele} (${menuData?.getMenuList(ele, selfilterList)!.length})`}
        </div>
        <div className="pr-2">
          {ele === selectedCategoryName ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </div>
      </div>
      <div className="h-1"></div>
      <Collapse in={ele === selectedCategoryName}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 py-4">
          {menuData?.getMenuList(ele, selfilterList) &&
            menuData
              .getMenuList(ele, selfilterList)!
              .map((each: Item, index: any) => {
                return (
                  <div key={index} className="">
                    <BasicMenuItemCard
                      index={index}
                      ele={each}
                      isLast={
                        menuData?.getMenuList(ele, selfilterList)?.length !==
                        index + 1
                      }
                    />
                  </div>
                );
              })}
        </div>
      </Collapse>
    </>
  );
}