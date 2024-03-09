"use client";
import FilterDrawer from "@/component/search/filter";
import { MenuDataContext } from "@/context/menu.context";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Item } from "@/model/products/items";
import MenuItemCard from "../menu/menu_item_card";

export default function SearchComponent() {
  const { menuData, category } = useContext(MenuDataContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace,back } = useRouter();
  const [filter, setFilter] = useState(false);

  function handleCat(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("category", term);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function TopBar() {
    function handleSearch(term: string) {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }
    return (
      <div className="sticky top-0 shadow bg-white z-40">
        <div className="px-4 md:container pb-2">
          <div className="flex gap-2 items-center pt-4 pb-2">
            <ArrowCircleLeftIcon
            onClick={()=>{back()}}
              fontSize="large"
              sx={{ color: "var(--primary-bg)" }}
            />
            <h2 className="text-xl md:text-2xl font-bold">Search</h2>
          </div>
          <TextField
            placeholder="Dosa"
            fullWidth
            value={searchParams.get('query')??""}
            onChange={(ele)=>{handleSearch(ele.target.value)}}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  onClick={() => {
                    setFilter(true);
                  }}
                  position="end"
                  className="cursor-pointer"
                >
                  <FilterAltIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {searchParams.get("category") != "All" ? (
          <div className="bg-secondary py-1 px-4 md:container flex items-center">
            <div className="flex-1">{searchParams.get("category")}</div>
            <div onClick={()=>handleCat("All")} className="">
              <CancelIcon sx={{ color: "var(--primary-bg)" }} />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  return (
    <div className="">
      {TopBar()}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4 ">
      {menuData
        ?.getSearchedMenuByCat(
          searchParams.get("category")!,
          searchParams.get("query") ?? ""
        )
        ?.map((item: Item,index:number) => {
          return <MenuItemCard index={index} ele={item} />;
        })}
      </div>
      <FilterDrawer
        categories={category}
        selectedCategory={searchParams.get("category") ?? "All"}
        setSelectedCategory={handleCat}
        isOpen={filter}
        toggleDrawer={setFilter}
      />
    </div>
  );
}
