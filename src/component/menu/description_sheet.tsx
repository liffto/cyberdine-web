"use client";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { MenuDataContext } from "@/context/menu.context";
import { Menu } from "@/model/products/menu";
import { Item } from "@/model/products/items";

export default function DescriptionSheet({
  menuType,
  setSelectedMenuData,
  selectedMenuData,
  bgColor,
  restId,
  deviceId,
  menu,
  table,
  isOrderFlow
}: {
  menuType: string;
  setSelectedMenuData: any;
  selectedMenuData: Item;
  bgColor: string;
  restId: string;
  deviceId: string;
  menu: Menu;
  table: string;
  isOrderFlow: boolean;
}) {
  const [itemCount, setItemCount] = useState<number | null>(selectedMenuData.quantity && selectedMenuData.quantity != undefined ? selectedMenuData.quantity : null);
  const { cartMenuData } = useContext(MenuDataContext);

  const addToItems = (type: string) => {
    if (type == "add" && selectedMenuData.quantity == 0 || selectedMenuData.quantity == null) {
      selectedMenuData.quantity = 1;
      checkOrderList(selectedMenuData, type);
    } else if (type == "add") {
      selectedMenuData.quantity = selectedMenuData.quantity + 1;
      checkOrderList(selectedMenuData, type);
    } else if (type == "remove" && selectedMenuData.quantity > 0) {
      if (selectedMenuData.quantity > 1) {
        selectedMenuData.quantity = selectedMenuData.quantity - 1;
      } else {
        selectedMenuData.quantity = null;
      }
      checkOrderList(selectedMenuData, type);
    }
  };

  const checkOrderList = (data: Item, type: string) => {
    menu?.addQantity(data, data.quantity, restId, deviceId ?? '', type, table, (val: any) => {
      if (val == "remove" && cartMenuData && cartMenuData?.getMenuList()!.length == 1 && data.quantity == null) {
        cartMenuData.makeCartMenuEmpty();
      }
    })
  }

  const addWishList = () => {
    if (selectedMenuData.quantity == undefined || selectedMenuData.quantity == 0 || selectedMenuData.quantity == null) {
      selectedMenuData.quantity = 1;
      checkOrderList(selectedMenuData, "add");
    } else {
      if (selectedMenuData.quantity > 1) {
        selectedMenuData.quantity = selectedMenuData.quantity - 1;
      } else {
        selectedMenuData.quantity = null;
      }
      checkOrderList(selectedMenuData, "remove");
    }
  };

  const description = () => {
    return (
      <div className="h-full flex flex-col justify-between">
        <div onClick={() => { setSelectedMenuData(null); }} className="text-white bg-black text-center rounded-full w-12 py-3 mx-auto mb-4">
          <CloseIcon />
        </div>
        <div className="bg-white " style={{ borderRadius: '16px 16px 0 0' }} >
          <div className="rounded overflow-hidden pb-3 px-4 pt-4">
            {selectedMenuData && selectedMenuData.itemsImageUrl && (
              <Image
                src={selectedMenuData.itemsImageUrl!}
                alt={selectedMenuData.name!}
                height={163}
                width={475}
                priority={true}
                style={{
                  objectFit: "cover",
                  height: "250px",
                  background: "var(--secondary-bg)",
                  borderRadius: '20px 20px 0 0'
                }}
              />
            )}
          </div>

          <div className="px-4 pb-2 text-black">
            <div className="mb-3">
              <div className=" flex justify-between items-center">
                <div className="flex-1 font-bold text-xl">{selectedMenuData?.capitalizeNameFirstLetter()}</div>

                <div className={`flex justify-center items-center`}>
                  <div className="">
                    <Image
                      src={selectedMenuData?.foodType === "Egg" ? "/images/svg/egg_icon.svg" : selectedMenuData?.foodType == "Drinks" ? "/images/svg/liquor_icon.svg" : selectedMenuData?.foodType == "Veg" ? "/images/svg/veg_icon.svg" : selectedMenuData?.foodType == "Non Veg" ? "/images/svg/non_veg_icon.svg" : ""}
                      alt={selectedMenuData?.name!}
                      height={16}
                      width={16}
                      priority={false}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div
                    className={`ml-2 text-base font-normal text-black`}
                  >
                    {selectedMenuData?.foodType}
                  </div>
                </div>
              </div>
              {selectedMenuData?.price && <div className={`pt-[1px] font-medium text-[#7A7A7A]`}>&#x20B9; {selectedMenuData?.price}</div>}
            </div>
            {selectedMenuData && selectedMenuData?.description && <div className="text-[#7A7A7A] text-base mb-2">
              {selectedMenuData?.capitalizeDescriptionFirstLetter()}
            </div>}
          </div>
          {isOrderFlow ? <div
            className={`text-lg text-center flex gap-4 justify-between px-4 items-center w-full py-3 font-semibold`} style={{ backgroundColor: bgColor, boxShadow: "0px 0px 10px 0.5px #00000040" }}
          >
            <div className="flex-1 bg-white flex items-center justify-between rounded font-semibold text-xl"  >
              <div className="bg-gray-900 py-2 px-4 rounded-tl rounded-bl text-white" onClick={() => { addToItems("remove") }}>
                <RemoveIcon />
              </div>
              <div className="">{selectedMenuData.quantity ?? '0'}</div>
              <div className="bg-gray-900 py-2 px-4 rounded-tr rounded-br text-white" onClick={() => { addToItems("add") }}>
                <AddIcon />
              </div>
            </div>
            <div className="flex-1 bg-white px-4 py-2 rounded font-semibold text-xl" onClick={() => { setSelectedMenuData(null); }} style={{ color: bgColor }} >{"Add Item"}</div>
          </div> : <div
            className={`text-lg text-center flex justify-between px-4 items-center w-full py-3 font-semibold`} style={{ backgroundColor: bgColor, boxShadow: "0px 0px 10px 0.5px #00000040" }}
          >
            <div className="flex-1 bg-white px-4 py-2 rounded font-semibold text-xl" onClick={() => { addWishList(); }} style={{ color: selectedMenuData && selectedMenuData.quantity != null ? '#DD0000' : bgColor }} >{selectedMenuData && selectedMenuData.quantity != null ? "Remove from wishlist" : "+ Add to wishlist"}</div>
          </div>}
        </div>
      </div>
    );
  };
  return (
    <div className="md:hidden block">
      <SwipeableDrawer
        open={selectedMenuData != null}
        anchor="bottom"
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            height: "fit-content",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
        }}
        closeAfterTransition
        onClose={() => {
          setSelectedMenuData(null);
        }}
        onOpen={() => { }}
      >
        <div>{description()}</div>
      </SwipeableDrawer>
    </div>
  );
}
