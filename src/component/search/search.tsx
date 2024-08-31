"use client";
import { MenuDataContext } from "@/context/menu.context";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Item } from "@/model/products/items";
import MenuItemCard from "../menu/menu_item_card";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionSheet from "../menu/description_sheet";
import BasicMenuItemCard from "../menu/basic_menu_item_card";
import { Menu } from "@/model/products/menu";

export default function SearchComponent({
  restId,
  bgColor,
  plan
}: {
  restId: string;
  bgColor: string;
  plan: string;
}) {
  const { menuData, category, deviceId, menuType } = useContext(MenuDataContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, back } = useRouter();
  const [filter, setFilter] = useState(false);
  const [query, setQuery] = useState("");
  const [selfilterList, setSelFilterList] = useState<Array<string>>([]);
  const [filterList, setFilterList] = useState<Array<string>>([]);
  const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null)
  const inputRef = useRef<HTMLInputElement>(null);

  const setSelectedData = (ele: Item) => {
    setSelectedMenuData(ele);
  };

  function handleCat(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleCatClick = (cat: string, isFromSelected: boolean) => {
    if (isFromSelected) {
      if (cat === "Our Special") {
        if (!selfilterList.includes("Our Special")) {
          setSelFilterList((prevCats) => [...prevCats, cat]);
          setFilterList((prevSelectedCats) =>
            prevSelectedCats.filter((selectedCat) => selectedCat !== cat)
          );
        } else {
          setSelFilterList((prevSelectedCats) =>
            prevSelectedCats.filter((selectedCat) => selectedCat !== cat)
          );
        }
      } else {
        if (
          selfilterList.includes("Veg") &&
          (cat === "Non Veg" || cat === "Egg")
        ) {
          setSelFilterList((prevCats) => [...prevCats, cat]);
          setSelFilterList((prevSelectedCats) =>
            prevSelectedCats.filter((selectedCat) => selectedCat !== "Veg")
          );
          setFilterList((prevSelectedCats) =>
            prevSelectedCats.filter((selectedCat) => selectedCat !== cat)
          );
          setFilterList((prevCats) => [...prevCats, "Veg"]);
        } else if (
          (selfilterList.includes("Non Veg") ||
            selfilterList.includes("Egg")) &&
          cat === "Veg"
        ) {
          setSelFilterList((prevCats) => [...prevCats, cat]);
          setSelFilterList((prevSelectedCats) =>
            prevSelectedCats.filter(
              (selectedCat) =>
                selectedCat !== "Non Veg" && selectedCat !== "Egg"
            )
          );
          setFilterList((prevSelectedCats) =>
            prevSelectedCats.filter((selectedCat) => selectedCat !== cat)
          );
          if (
            selfilterList.includes("Non Veg") &&
            selfilterList.includes("Egg")
          ) {
            setFilterList((prevCats) => [...prevCats, ...["Non Veg", "Egg"]]);
          } else if (selfilterList.includes("Egg")) {
            setFilterList((prevCats) => [...prevCats, "Egg"]);
          } else {
            setFilterList((prevCats) => [...prevCats, "Non Veg"]);
          }
        } else {
          setSelFilterList((prevCats) => [...prevCats, cat]);
          setFilterList((prevSelectedCats) =>
            prevSelectedCats.filter((selectedCat) => selectedCat !== cat)
          );
        }
      }
    } else {
      if (cat === "Our Special") {
        setFilterList((prevSelectedCats) => [...prevSelectedCats, cat]);
        setSelFilterList((prevSelectedCats) =>
          prevSelectedCats.filter((selectedCat) => selectedCat !== cat)
        );
      } else {
        if (
          selfilterList.includes("Veg") &&
          (cat === "Non Veg" || cat === "Egg")
        ) {
          setFilterList([]);
        } else {
          setFilterList((prevSelectedCats) => [...prevSelectedCats, cat]);
        }
        setSelFilterList((prevCats) =>
          prevCats.filter((prevCat) => prevCat !== cat)
        );
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (menuData) {
      const menuInstance = new Menu(menuData[menuType]);
      setMenu(menuInstance)
    }
    const cat = menuType == "foodMenu" ? ["Veg", "Egg", "Non Veg", "Our Special"] : [];
    setFilterList(cat);
  }, []);

  function TopBar() {
    return (
      <div className="sticky top-0 bg-white z-40">
        <div className="px-4 md:container py-2">
          <TextField
            placeholder="Search"
            fullWidth
            value={query ?? ""}
            inputRef={inputRef}
            onChange={(ele) => {
              setQuery(ele.target.value ?? "");
            }}
            sx={inputStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  onClick={() => {
                    back();
                  }}
                  position="end"
                  className="cursor-pointer"
                >
                  <div className="">
                    <ArrowBackIosIcon sx={{ color: "black" }} />
                  </div>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  onClick={() => {
                    setFilter(true);
                  }}
                  position="end"
                  className="cursor-pointer"
                >
                  <div className="">
                    <SearchIcon sx={{ color: "black" }} />
                  </div>
                </InputAdornment>
              ),
            }}
          />
        </div>
        {searchParams.get("category") != "All" ? (
          <div className="bg-secondary py-1 px-4 md:container flex items-center">
            <div className="flex-1">{searchParams.get("category")}</div>
            <div onClick={() => handleCat("All")} className="">
              <CancelIcon sx={{ color: "var(--primary-bg)" }} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  function CategoryList() {
    return (
      <div
        className={`overflow-x-scroll md:container max-w-screen py-2 bg-white z-20 sticky top-[72px]`}
      >
        <div className="flex gap-4 px-4">
          {selfilterList!.map((ele, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  handleCatClick(ele, false);
                }}
                className={`cursor-pointer rounded border whitespace-nowrap border-primary px-2 py-px text-gray-600`}
              >
                <div className="flex justify-center items-center gap-2">
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
                  <div className="">{ele}</div>
                  <div className="rounded-full border border-primary text-primary w-4 h-4 flex justify-center items-center">
                    <CloseIcon sx={{ fontSize: "10px" }} />
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
                className={`cursor-pointer rounded border whitespace-nowrap border-gray-400 px-2 py-px text-gray-600`}
              >
                <div className="flex justify-center items-center gap-2">
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
                  <div className="">{ele}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }


  const inputStyles = {
    '& .MuiInputBase-input': {
      color: '#000', // Change text color
    },
    '& .MuiOutlinedInput-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #000', // Change border color on hover
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #000', // Change border color when focused
      },
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #000', // Default border color
    },
  };

  return (
    <div className="">
      {TopBar()}
      {CategoryList()}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 py-4 ">
        {menu &&
          menu.getSearchedMenu(query, selfilterList) &&
          Array.from(
            menu.getSearchedMenu(query, selfilterList)!.entries()
          ).map((value, index) => {
            return (
              <div className="" key={index}>
                <div className="" >
                  <div className="sticky top-[115px] bg-white z-10 pb-3">
                    <div className="px-4 py-2 font-bold   bg-secondary text-black capitalize flex justify-between items-center">
                      <div className=" ">{value[0]}</div>
                    </div>
                  </div>
                  <div className="px-4 py-1">
                    {value[1].map((item, key) => {
                      return (
                        <div className="pb-4" key={key} >
                          {plan === "basic" ? <BasicMenuItemCard
                            index={index}
                            ele={item} /> : <MenuItemCard index={index} ele={item} setSelectedData={setSelectedData} bgColor={bgColor} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {selectedMenuData && (
        <DescriptionSheet
          menuType={menuType}
          setSelectedMenuData={setSelectedData}
          selectedMenuData={selectedMenuData} bgColor={bgColor} restId={restId} deviceId={deviceId ?? ""} />
      )}
    </div>
  );
}
