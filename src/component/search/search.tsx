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
import CategoryList from "../menu/category_list";
import ProductBottommButton from "../menu/product_bottom_button";

const initialCategories = [
  { name: "Veg", selected: false },
  { name: "Egg", selected: false },
  { name: "Our Special", selected: false },
  { name: "Non Veg", selected: false },
];
export default function SearchComponent({
  restId,
  bgColor,
  plan,
  table
}: {
  restId: string;
  bgColor: string;
  plan: string;
  table: string;
}) {
  const { menuData, category, cartMenuData, deviceId, menuType } = useContext(MenuDataContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, back } = useRouter();
  const [query, setQuery] = useState("");
  const [filterList, setFilterList] = useState<Array<any>>([]);
  const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null)
  const inputRef = useRef<HTMLInputElement>(null);
  const [preOrderData, setPreOrderData] = useState<boolean>(true);

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

  const handleCatClick = (catName: string) => {
    setFilterList((prevCats) => {
      return prevCats.map((cat) => {
        // Check if the current category is the one being clicked
        if (cat.name === catName) {
          // Toggle the selected state of the clicked category
          return { ...cat, selected: !cat.selected };
        }
        if (catName === "Veg") {
          if (cat.name === "Non Veg" || cat.name === "Egg") {
            return { ...cat, selected: false }; // Deselect Non Veg and Egg
          }
        }

        // Logic to deselect other categories based on the selected category
        if ((catName === "Non Veg" || catName === "Egg")) {
          // Deselect Veg
          if (cat.name === "Veg") {
            return { ...cat, selected: false };
          }
        }


        return cat; // Return other categories unchanged
      });
    });
  };

  const getQuantityFromOrder = () => {
    if (cartMenuData) {
      cartMenuData?.getMenuList()?.forEach((each) => {
        let response = menu
          ?.getMenuList(each.category!, [])
          ?.find((val) => val.id == each.id && !(each.isApproved == true) && !each.isOrdered);
        if (response != undefined) {
          response.quantity = each.quantity;
          setPreOrderData(false);
        }
      });
    }
  };

  useEffect(() => {
    if (preOrderData) {
      getQuantityFromOrder();
    }
  }, [cartMenuData, menu, preOrderData]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (menuData) {
      const menuInstance = new Menu(menuData[menuType]);
      setMenu(menuInstance)
    }
    const cat = menuType == "foodMenu" ? initialCategories : [];
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
                    if (query) {
                      setQuery('');
                    }
                  }}
                  position="end"
                  className="cursor-pointer"
                >
                  <div className="">
                    {query ? <CloseIcon sx={{ color: "black" }} /> : <SearchIcon sx={{ color: "black" }} />}

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

  const checkOrderList = (data: Item, type: string) => {
    menu?.addQantity(data, data.quantity, restId, deviceId ?? '', type, table, (val: any) => {
      if (val == "remove" && cartMenuData && cartMenuData?.getMenuList()!.length == 1 && data.quantity == null) {
        cartMenuData.makeCartMenuEmpty();
      }
    })
  }

  return (
    <div className="">
      {TopBar()}
      {filterList && filterList.length > 0 && <CategoryList
        handleCatClick={handleCatClick}
        filterList={filterList}
      />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 py-4 ">
        {menu &&
          menu.getSearchedMenu(query, filterList) &&
          Array.from(
            menu.getSearchedMenu(query, filterList)!.entries()
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
                            ele={item} /> : <MenuItemCard index={index} ele={item} setSelectedData={setSelectedData} bgColor={bgColor} addOrderItems={checkOrderList} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        {cartMenuData &&
          cartMenuData?.getMenuList() &&
          cartMenuData?.getMenuList()?.length != 0 && (
            <ProductBottommButton cartCount={cartMenuData.getCartLength()} pendingCount={cartMenuData.getPendingLength()} approvedCount={cartMenuData.getApprovedLength()} restId={restId} table={table} />
          )}
      </div>
      {selectedMenuData && (
        <DescriptionSheet
          menuType={menuType}
          setSelectedMenuData={setSelectedData}
          selectedMenuData={selectedMenuData} bgColor={bgColor} restId={restId} deviceId={deviceId ?? ""} menu={menu ?? new Menu()} table={table} />
      )}
    </div>
  );
}
