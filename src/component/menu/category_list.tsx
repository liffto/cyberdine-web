import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

export default function CategoryList({
  filterList,
  handleCatClick,
}: {
  handleCatClick: (cat: string, isFromSelected: boolean) => void;
  filterList: { name: string; selected: boolean; }[];
}) {
  return (
    <div className="relative z-20 sticky top-[58px]">
      <div className="bg-[#fafafa] h-[42px]"></div>
      <div
        className={`overflow-x-scroll md:container max-w-screen pt-1 pb-2 bg-[#fafafa] absolute z-20 inset-0 mr-4`}
      >
        <div className="flex gap-2 px-4">
          {filterList.map((ele, index) => {
            const isSelected = ele.selected;
            return (
              <div
                key={index}
                onClick={() => handleCatClick(ele.name, isSelected)}
                className={`cursor-pointer rounded border whitespace-nowrap ${isSelected ? "border-primary text-gray-600 px-2" : "border-gray-300 bg-white text-gray-600 px-4"}`}
              >
                <div className="flex justify-center items-center gap-2 py-1">
                  <div className={`w-3 h-3`}>
                    <img
                      src={
                        ele.name === "Veg"
                          ? "/images/svg/veg_icon.svg"
                          : ele.name === "Non Veg"
                            ? "/images/svg/non_veg_icon.svg"
                            : ele.name === "Egg"
                              ? "/images/svg/egg_icon.svg"
                              : "/images/svg/our_special_icon.svg"
                      }
                      alt={ele.name}
                      width={14}
                      height={14}
                    />
                  </div>
                  <div className="font-medium text-sm">{ele.name}</div>
                  {isSelected && (
                    <div className="rounded-full font-bold bg-primary border border-primary text-white w-4 h-4 flex justify-center items-center">
                      <CloseIcon sx={{ fontSize: "10px", fontWeight: "bold" }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
