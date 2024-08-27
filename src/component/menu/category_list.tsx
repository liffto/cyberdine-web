import CloseIcon from "@mui/icons-material/Close";

import Image from "next/image";
export default function CategoryList({
  filterList,
  handleCatClick,
  selfilterList,
}: {
  selfilterList: string[];
  handleCatClick: (cat: string, isFromSelected: boolean) => void;
  filterList: string[];
}) {
  return (
    <div
      className={`overflow-x-scroll md:container max-w-screen py-2 bg-[#fafafa] z-20 sticky top-[55px]`}
    >
      <div className="flex gap-3 px-4">
        {selfilterList!.map((ele, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleCatClick(ele, false);
              }}
              className={`cursor-pointer rounded border whitespace-nowrap border-primary px-2 py-px text-gray-600 `}
            >
              <div className="flex justify-center items-center gap-2 py-1">
                <div className={`w-3 h-3`}>
                  <Image
                    src={
                      ele == "Veg"
                        ? "/images/svg/veg_icon.svg"
                        : ele == "Non Veg"
                        ? "/images/svg/non_veg_icon.svg"
                        : ele == "Egg"
                        ? "/images/svg/egg_icon.svg"
                        : "/images/svg/our_special_icon.svg"
                    }
                    alt={ele}
                    width={14}
                    height={14}
                  />
                </div>
                <div className="font-medium text-sm">{ele}</div>
                <div className=" rounded-full font-bold bg-primary border border-primary text-white w-4 h-4 flex justify-center items-center">
                  <CloseIcon sx={{ fontSize: "10px", fontWeight: "bold" }} />
                </div>
              </div>
            </div>
          );
        })}
        {filterList!.map((ele, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleCatClick(ele, true);
              }}
              className={`cursor-pointer rounded border whitespace-nowrap border-gray-300 px-2 py-px text-gray-600 bg-white`}
            >
              <div className="flex justify-center items-center gap-2 py-1 px-2">
                <div className="w-3 h-3">
                  <Image
                    src={
                      ele == "Veg"
                        ? "/images/svg/veg_icon.svg"
                        : ele == "Non Veg"
                        ? "/images/svg/non_veg_icon.svg"
                        : ele == "Egg"
                        ? "/images/svg/egg_icon.svg"
                        : "/images/svg/our_special_icon.svg"
                    }
                    alt={ele}
                    width={14}
                    height={14}
                  />
                </div>
                <div className="font-medium text-sm">{ele}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
