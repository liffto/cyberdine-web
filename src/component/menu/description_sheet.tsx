import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Image from "next/image";

export default function DescriptionSheet({
  setSelectedMenuData,
  selectedMenuData,
}: {
  setSelectedMenuData: any;
  selectedMenuData: any;
}) {
  const description = () => {
    return (
      <div className="h-full flex flex-col justify-between">
        <div className="p-6 text-black">
          <div className=" flex justify-between items-center">
            <div className="font-bold text-xl">{selectedMenuData?.name}</div>

            <div className={`flex justify-center items-center`}>
              <div
                className={`w-2 h-2 rounded-full mr-2 ${selectedMenuData?.foodType != "Veg" ? "bg-primary" : "bg-[#318c00]"}`}
              ></div>
              <div
                className={`text-base font-normal ${selectedMenuData?.foodType != "Veg" ? "text-primary" : "text-[#318c00]"}`}
              >
                {selectedMenuData?.foodType}
              </div>
            </div>
          </div>
          {selectedMenuData.itemsImageUrl && (
            <div className="rounded overflow-hidden mt-3 w-[100px]">
              <Image
                src={selectedMenuData.itemsImageUrl!}
                alt={selectedMenuData.name!}
                height={100}
                width={100}
                priority={false}
                style={{
                  objectFit: "cover",
                  height: "100px",
                 background:"var(--secondary-bg)"
                }}
              />
            </div>
          )}
          <div className="h-[1px] bg-gray-500 my-4"></div>
          <div className="text-lg font-semibold">Description</div>
          <div className="font-medium text-base">
            {selectedMenuData?.description
              ? selectedMenuData?.description
              : "Description not available"}
          </div>
        </div>
        <div
          onClick={() => {
            setSelectedMenuData(null);
          }}
          className="bg-primary text-white text-lg text-center  w-full py-4 font-semibold"
        >
          Done
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
            height: "fit-content",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
        }}
        onClose={() => {
          setSelectedMenuData(null);
        }}
        onOpen={() => {}}
      >
        <div>{description()}</div>
      </SwipeableDrawer>
    </div>
  );
}
