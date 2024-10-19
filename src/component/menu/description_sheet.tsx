"use client";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from "react";
import { MenuDataContext } from "@/context/menu.context";
import { Menu } from "@/model/products/menu";


export default function DescriptionSheet({
  setSelectedMenuData,
  selectedMenuData,
  bgColor,
  restId,
  deviceId,
  menu
}: {
  setSelectedMenuData: any;
  selectedMenuData: any;
  bgColor: string;
  restId: string;
  deviceId: string;
  menu: Menu;
}) {
  const { cartMenuData } = useContext(MenuDataContext);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    setImageError(false);

  }, [selectedMenuData]);

  const handleImageError = () => {
    setImageError(true);
  };

  const addToWishList = (itemCount: number) => {
    let temp: number | null;
    temp = itemCount;
    if (temp == 0 || temp == null) {
      temp = 1;
    } else if (temp > 0) {
      temp = null;
    }
    checkOrderList(temp);
  };

  const checkOrderList = (count: number | null) => {
    menu?.addQantity(selectedMenuData, count, restId, deviceId, (val: any) => {
      if (val == "remove" && cartMenuData && cartMenuData?.getMenuList()!.length < 2) {
        cartMenuData.makeCartMenuEmpty()
      }
      setSelectedMenuData(null);
    })
  }

  const description = () => {
    return (
      <div className="h-full flex flex-col justify-between">
        <div onClick={() => { setSelectedMenuData(null); }} className="text-white bg-black text-center rounded-full w-12 py-3 mx-auto mb-4">
          <CloseIcon />
        </div>
        <div className="bg-white " style={{ borderRadius: '16px 16px 0 0' }} >
          <div className="rounded overflow-hidden pb-3 px-4 pt-4">
            {imageError ? <div className=""></div> : selectedMenuData && selectedMenuData.itemsImageUrl && (
              <img
                src={selectedMenuData.itemsImageUrl!}
                alt={selectedMenuData.name!}
                onError={handleImageError}
                style={{
                  objectFit: "cover",
                  height: "250px",
                  width: "100%", // Make sure to set the width to cover the container, if necessary
                  background: "var(--secondary-bg)",
                  borderRadius: '12px',
                  boxShadow: "0px 0px 6px 0.5px rgb(0,0,0,0.16)"
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
          <div
            className={`text-lg text-center flex justify-between px-4 items-center w-full py-3 font-semibold`} style={{ backgroundColor: bgColor, boxShadow: "0px 0px 10px 0.5px #00000040" }}
          >
            <div className="flex-1 bg-white px-4 py-2 rounded font-semibold text-xl" onClick={() => { addToWishList(selectedMenuData.quantity); }} style={{ color: selectedMenuData && selectedMenuData.quantity != null ? '#DD0000' : bgColor }} >{selectedMenuData && selectedMenuData.quantity != null ? "Remove from wishlist" : "+ Add to wishlist"}</div>
          </div>
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
