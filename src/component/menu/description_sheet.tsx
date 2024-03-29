import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { MenuDataContext } from "@/context/menu.context";

export default function DescriptionSheet({
  setSelectedMenuData,
  selectedMenuData,
  bgColor,
  restId,
  deviceId,
}: {
  setSelectedMenuData: any;
  selectedMenuData: any;
  bgColor: string;
  restId: string;
  deviceId: string;
}) {
  const [itemCount, setItemCount] = useState<number>(selectedMenuData.quantity && selectedMenuData.quantity != undefined ? selectedMenuData.quantity : null);
  const { menuData, cartMenuData } = useContext(MenuDataContext);

  const itemCountFunc = (type: string) => {
    let temp = itemCount;
    if (type == "add") {
      temp = temp + 1;
    } else if(temp > 0) {
      temp = temp - 1;
    }
    setItemCount(temp);
  };

  const description = () => {
    return (
      <div className="h-full flex flex-col justify-between">
        <div onClick={() => { setSelectedMenuData(null); }} className="text-white bg-black text-center rounded-full w-12 py-3 mx-auto mb-4">
          <CloseIcon />
        </div>
        <div className="bg-white" style={{ borderRadius: '20px 20px 0 0' }} >
          {selectedMenuData.itemsImageUrl && (
            <div className="rounded overflow-hidden mb-3 ">
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
            </div>
          )}
          <div className="px-4 py-2 text-black">
            <div className="mb-2">
              <div className=" flex justify-between items-center">
                <div className="font-bold text-xl">{selectedMenuData?.name}</div>

                <div className={`flex justify-center items-center`}>
                  <div className="">
                    <Image
                      src={selectedMenuData?.foodType == "Veg" ? "/images/svg/veg_icon.svg" : "/images/svg/non_veg_icon.svg"}
                      alt={selectedMenuData.name!}
                      height={16}
                      width={16}
                      priority={false}
                      style={{
                        objectFit: "cover",
                        background: "var(--secondary-bg)"
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
              <div className={`font-medium text-gray-400`}>&#x20B9; {selectedMenuData?.price}</div>
            </div>
            {selectedMenuData?.description && <div className="font-medium text-base mb-2">
              {selectedMenuData?.description}
            </div>}
          </div>
          {itemCount == null ? <div
            className={` text-white text-lg text-center flex justify-between px-4 items-center w-full py-3 font-semibold`} style={{ backgroundColor: bgColor }}
          >
            <div className="pl-8" onClick={() => { setSelectedMenuData(null); }} >Cancel</div>
            <div onClick={() => { itemCountFunc("add"); }} className="bg-white px-8 py-2 rounded-md font-semibold text-xl" style={{ color: bgColor }} >ADD TO WISHLIST</div>
          </div> : <div
            className={` text-white text-lg text-center flex justify-between px-4 items-center w-full py-3 font-semibold`} style={{ backgroundColor: bgColor }}
          >
            <div className="" >
              <div className="flex justify-start items-center">
                <div onClick={() => { itemCountFunc("remove"); }} className="bg-black w-14 h-11 pt-2 rounded-l-md"><RemoveIcon /></div>
                <div className="font-bold bg-white text-lg text-black w-14 h-11 pt-[8px]">{itemCount}</div>
                <div onClick={() => { itemCountFunc("add"); }} className="bg-black w-14 h-11 pt-2 rounded-r-md"><AddIcon /></div>
              </div>
            </div>
            <div onClick={() => { menuData?.addQantity(selectedMenuData, itemCount, restId, deviceId, cartMenuData?.getMenuList() ?? [], setSelectedMenuData(null)) }} className="bg-white px-8 py-2 rounded-md font-bold text-xl w-[48%]" style={{ color: bgColor }} >{itemCount ==0 ? "REMOVE" : "ADD"}</div>
          </div>}
        </div>
      </div>
    );
  };
  return (
    <div className="md:hidden block">
      <SwipeableDrawer
        disableSwipeToOpen={true}
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
