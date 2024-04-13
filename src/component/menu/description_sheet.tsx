import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { MenuDataContext } from "@/context/menu.context";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import toast, { Toaster } from "react-hot-toast";

const itemAdd = () => toast('Item successfully added to wishlist');
const itemRemove = () => toast('Item successfully removed to wishlist');

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
  const [itemCount, setItemCount] = useState<number | null>(selectedMenuData.quantity && selectedMenuData.quantity != undefined ? selectedMenuData.quantity : null);
  const { menuData, cartMenuData } = useContext(MenuDataContext);

  const addToWishList = () => {
    let temp: number | null;
    temp = itemCount;
    if (temp == 0 || temp == null) {
      temp = 1;
      itemAdd();
    } else if (temp > 0) {
      temp = null;
      itemRemove();
    }
    setItemCount(temp);
    checkOrderList(temp);
  };

  // const itemCountFunc = () => {
  //   let temp = itemCount;
  //   if (temp == 0) {
  //     temp = temp + 1;
  //   } else if (temp > 0) {
  //     temp = temp - 1;
  //   }
  //   setItemCount(temp);
  // };

  const checkOrderList = (count:number|null) => {
    menuData?.addQantity(selectedMenuData, count, restId, deviceId, (val: any) => {
      if (val == "remove" && cartMenuData && cartMenuData?.getMenuList()!.length < 2 && (itemCount == 1)) {
        cartMenuData.makeCartMenuEmpty()
      }
      setSelectedMenuData(null);

    })

  }

  const description = () => {
    return (
      <div className="h-full flex flex-col justify-between">
        <Toaster position="top-center" />
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
                <div className="flex-1 font-bold text-xl">{selectedMenuData?.capitalizeNameFirstLetter()}</div>

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
              {selectedMenuData?.capitalizeDescriptionFirstLetter()}
            </div>}
          </div>
          <div
            className={`text-lg text-center flex justify-between px-4 items-center w-full py-3 font-semibold`} style={{ backgroundColor: bgColor }}
          >
            <div className="flex-1 bg-white px-4 py-2 rounded font-semibold text-xl" onClick={() => { setSelectedMenuData(null); }} style={{ color: bgColor }} >Cancel</div>
            <div onClick={() => { addToWishList(); }} className="border-2 border-white px-[8px] ml-3 py-[7px] rounded"  >{itemCount != null ? <BookmarkIcon sx={{ color: "white" }} /> : <BookmarkBorderIcon sx={{ color: "white" }} />}</div>
          </div>
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
