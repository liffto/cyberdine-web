import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';

export default function DescriptionSheet({
  setSelectedMenuData,
  selectedMenuData,
  bgColor,
}: {
  setSelectedMenuData: any;
  selectedMenuData: any;
  bgColor: string;
}) {
  const description = () => {
    return (
      <div className="h-full flex flex-col justify-between">
        <div onClick={() => { setSelectedMenuData(null); }} className="text-white bg-black text-center rounded-full w-12 py-3 mx-auto mb-4">
          <CloseIcon />
        </div>
        <div className="bg-white">
          {selectedMenuData.itemsImageUrl && (
            <div className="rounded overflow-hidden mb-3 ">
              <Image
                src={selectedMenuData.itemsImageUrl!}
                alt={selectedMenuData.name!}
                height={163}
                width={475}
                priority={false}
                style={{
                  objectFit: "cover",
                  height: "250px",
                  background: "var(--secondary-bg)"
                }}
              />
            </div>
          )}
          <div className="px-4 py-2 text-black">
            <div className="mb-2">
              <div className=" flex justify-between items-center">
                <div className="font-bold text-xl">{selectedMenuData?.name}</div>

                <div className={`flex justify-center items-center`}>
                  <Image
                    src={selectedMenuData?.foodType != "Veg" ? "/images/svg/veg_icon.svg" : "/images/svg/non_veg_icon.svg"}
                    alt={selectedMenuData.name!}
                    height={16}
                    width={16}
                    priority={false}
                    style={{
                      objectFit: "cover",
                      background: "var(--secondary-bg)"
                    }}
                  />
                  <div
                    className={`ml-2 text-base font-normal text-black`}
                  >
                    {selectedMenuData?.foodType}
                  </div>
                </div>
              </div>
              <div className={`font-bold text-black`}>&#x20B9; {selectedMenuData?.price}</div>
            </div>
            {selectedMenuData?.description && <div className="font-medium text-base mb-2">
              {selectedMenuData?.description}
            </div>}
          </div>
          <div
            onClick={() => {
              setSelectedMenuData(null);
            }}
            className={` text-white text-lg text-center flex justify-evenly items-center w-full py-2 font-semibold`} style={{ backgroundColor: bgColor }}
          >
            <div className="" onClick={()=>{setSelectedMenuData(null);}} >Cancel</div>
            <div className="bg-white px-8 py-2 rounded-md font-bold text-base" style={{color: bgColor}} >ADD TO CART</div>
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
