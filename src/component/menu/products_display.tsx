"use client";
import { Item } from "@/model/products/items";
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import MenuItemCard from "./menu_item_card";
import { MenuDataContext } from "@/context/menu.context";
import Image from "next/image";
import Link from "next/link";
import { FcmService } from "@/service/fcm_service";
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const DescriptionSheet = dynamic(() => import("./description_sheet"), {
  ssr: false,
});
import toast, { Toaster } from 'react-hot-toast';
import BasicMenuItemCard from "./basic_menu_item_card";

const notify = () => toast('Notified successfully');
const soldOutNotify = () => toast('Temporarily out of stock');

export default function ProductDisplay({
  restId,
  table,
  topic,
  bgColor,
  notification,
  plan
}: {
  restId: string;
  table: string;
  topic: string;
  bgColor: string;
  notification: boolean;
  plan: string;
}) {
  const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
  const [wait, setWait] = useState<boolean>(false);
  const [selfilterList, setSelFilterList] = useState<Array<string>>([]);
  const [filterList, setFilterList] = useState<Array<string>>([]);
  const [isCircle, setIsCircle] = useState<boolean>(true);
  const [preOrderData, setPreOrderData] = useState<boolean>(true);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { menuData, category, cartMenuData, deviceId } = useContext(MenuDataContext);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);


  const setSelectedData = (ele: Item) => {
    if (!ele.isActive) {
      soldOutNotify()
    } else {
      setSelectedMenuData(ele);
    }
  };

  const setCatName = (categoryName: string) => {
    if (categoryName === selectedCategoryName) {
      setSelectedCategoryName('');
    } else {
      setSelectedCategoryName(categoryName);
    }
  };

  const sendFcm = async () => {
    if (table != null && table != undefined) {
      var data = {
        'data': {
          'title': `Table ${table} `,
          'body': `Requesting for Captain`
        },
        topic: `${restId}table${table}`,
      };
      setWait(true);
      await FcmService.shared.fcmTopic(data);
      notify()
      setTimeout(() => {
        setWait(false);
      }, 1000 * 60);
    }
  };

  const handleCatClick = (cat: string, isFromSelected: boolean) => {
    if (isFromSelected) {
      if (cat === 'Our Special') {
        if (!selfilterList.includes('Our Special')) {
          setSelFilterList(prevCats => [...prevCats, cat]);
          setFilterList(prevSelectedCats => prevSelectedCats.filter(selectedCat => selectedCat !== cat));
        } else {
          setSelFilterList(prevSelectedCats => prevSelectedCats.filter(selectedCat => selectedCat !== cat));
        }
      } else {
        if (selfilterList.includes('Veg') && (cat === 'Non Veg' || cat === 'Egg')) {
          setSelFilterList(prevCats => [...prevCats, cat]);
          setSelFilterList(prevSelectedCats => prevSelectedCats.filter(selectedCat => selectedCat !== "Veg"));
          setFilterList(prevSelectedCats => prevSelectedCats.filter(selectedCat => selectedCat !== cat));
          setFilterList(prevCats => [...prevCats, "Veg"]);
        } else if ((selfilterList.includes('Non Veg') || selfilterList.includes('Egg')) && (cat === 'Veg')) {
          setSelFilterList(prevCats => [...prevCats, cat]);
          setSelFilterList(prevSelectedCats => prevSelectedCats.filter(selectedCat => selectedCat !== "Non Veg" && selectedCat !== "Egg"));
          setFilterList(prevSelectedCats => prevSelectedCats.filter(selectedCat => selectedCat !== cat));
          if (selfilterList.includes('Non Veg') && selfilterList.includes('Egg')) {
            setFilterList(prevCats => [...prevCats, ...["Non Veg", "Egg"]]);
          } else if (selfilterList.includes('Egg')) {
            setFilterList(prevCats => [...prevCats, "Egg"]);
          } else {
            setFilterList(prevCats => [...prevCats, "Non Veg"]);
          }
        } else {
          setSelFilterList(prevCats => [...prevCats, cat]);
          setFilterList(prevSelectedCats => prevSelectedCats.filter(selectedCat => selectedCat !== cat));
        }
      }
    } else {
      if (cat === 'Our Special') {
        setFilterList(prevSelectedCats => [...prevSelectedCats, cat]);
        setSelFilterList(prevSelectedCats => prevSelectedCats.filter(selectedCat => selectedCat !== cat));
      } else {
        if (selfilterList.includes('Veg') && (cat === 'Non Veg' || cat === 'Egg')) {
          setFilterList([]);
        } else {
          setFilterList(prevSelectedCats => [...prevSelectedCats, cat]);
        }
        setSelFilterList(prevCats => prevCats.filter(prevCat => prevCat !== cat));
      }
    }
  };

  const getQuantityFromOrder = () => {
    if (cartMenuData) {
      cartMenuData?.getMenuList()?.forEach((each) => {
        let response = menuData?.getMenuList(each.category!, [])?.find((val) => val.id == each.id);
        if (response != undefined) {
          response.quantity = each.quantity;
          setPreOrderData(false)
        }
      })
    }

  }

  const handleItemClick = (index: any) => {
    const element = document.getElementById(`${index}`);
    if (element) {
      const offset = element.getBoundingClientRect().top;
      window.scrollTo({ top: window.scrollY + offset, behavior: 'smooth' });
    }
  };



  useEffect(() => {
    getQuantityFromOrder()
  }, [cartMenuData, preOrderData])

  useEffect(() => {
    const cat = ['Veg', 'Egg', 'Non Veg', 'Our Special'];
    setFilterList(cat);
    // Function to handle clicks outside the div
    const handleClickOutside = (event: any) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCircle(true); // Clicked outside the div, set isCircle to true
      }
    };

    // Attach the event listener to the document body
    document.body.addEventListener('click', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [])


  function CategoryList() {
    return (
      <div
        className={`overflow-x-scroll md:container max-w-screen py-2 bg-[#fafafa] z-20 sticky top-[55px]`}
      >
        <div className="flex gap-3 px-4">
          {selfilterList!
            .map((ele, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleCatClick(ele, false)
                  }}
                  className={`cursor-pointer rounded border whitespace-nowrap border-primary px-2 py-px text-gray-600 `}
                >
                  <div className="flex justify-center items-center gap-2 py-1">
                    <div className={`w-3 h-3`}>
                      <Image src={ele == "Veg" ? "/images/svg/veg_icon.svg" : ele == "Non Veg" ? "/images/svg/non_veg_icon.svg" : ele == "Egg" ? "/images/svg/egg_icon.svg" : "/images/svg/our_special_icon.svg"} alt={ele} width={14} height={14} />
                    </div>
                    <div className="font-medium text-sm">{ele}</div>
                    <div className=" rounded-full font-bold bg-primary border border-primary text-white w-4 h-4 flex justify-center items-center"><CloseIcon sx={{ fontSize: "10px", fontWeight: "bold" }} /></div>
                  </div>
                </div>
              );
            })}
          {filterList!
            .map((ele, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    handleCatClick(ele, true)
                  }}
                  className={`cursor-pointer rounded border whitespace-nowrap border-gray-300 px-2 py-px text-gray-600 bg-white`}
                >
                  <div className="flex justify-center items-center gap-2 py-1 px-2">
                    <div className="w-3 h-3">
                      <Image src={ele == "Veg" ? "/images/svg/veg_icon.svg" : ele == "Non Veg" ? "/images/svg/non_veg_icon.svg" : ele == "Egg" ? "/images/svg/egg_icon.svg" : "/images/svg/our_special_icon.svg"} alt={ele} width={14} height={14} />
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

  // pro card design
  function proCard(ele: string, catIndex: number) {
    return <>
      <div
        className="sticky top-[102px] bg-[#fafafa] z-10"

      >
        <div className="px-4 py-2 font-bold text-sm bg-secondary text-black capitalize flex justify-between items-center">
          <div className=" ">
            {ele}
          </div>
          <div className="pr-2">
            {menuData?.getMenuList(ele, selfilterList)!.length}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4">
        {menuData?.getMenuList(ele, selfilterList) &&
          menuData
            .getMenuList(ele, selfilterList)!
            .map((ele: Item, index: any) => {
              return (
                <div key={index} className="">
                  <MenuItemCard
                    index={index}
                    setSelectedData={setSelectedData}
                    ele={ele}
                    catIndex={catIndex} bgColor={bgColor} />
                </div>
              );
            })}
      </div>
    </>
  }

  function basicCard(ele: string) {
    return <>
      <div onClick={() => { setCatName(ele) }} className="px-4 py-2 font-bold text-sm bg-secondary text-black capitalize flex justify-between items-center">
        <div className=" ">
          {`${ele} (${menuData?.getMenuList(ele, selfilterList)!.length})`}
        </div>
        <div className="pr-2">
          {ele === selectedCategoryName ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>
      </div>
      <div className="h-1"></div>
      <Collapse in={ele === selectedCategoryName}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 py-4">
          {menuData?.getMenuList(ele, selfilterList) &&
            menuData
              .getMenuList(ele, selfilterList)!
              .map((each: Item, index: any) => {
                return (
                  <div key={index} className="">
                    <BasicMenuItemCard
                      index={index}
                      ele={each}
                      isLast={menuData?.getMenuList(ele, selfilterList)?.length !== (index+1)} />
                  </div>
                );
              })}
        </div>
      </Collapse>
    </>
  }

  return (
    <div className="md:container mx-auto  ">
      {menuData ? (
        <div className="">
          <div className="sticky top-0 z-20 bg-[#fafafa] w-full flex justify-between items-center px-4 pt-2">
            <Link
              href={`/rest/${restId}/search?query=&category=All`}
              className="w-full"
            >
              <div className="my-2 flex justify-start items-center w-full bg-white">
                <div className={`border border-gray-300 text-gray-300 rounded w-full py-[6px] ${notification ? "mr-2" : ""}  text-sm`}>
                  <SearchIcon sx={{ marginRight: "10px", marginLeft: "10px" }} />
                  Search for dish
                </div>
              </div>
            </Link>
            {notification && plan !== "basic" && (
              <div
                className={`bg-white border border-primary w-[45%]  rounded p-[4px]`}
                onClick={() => {
                  wait ? null : sendFcm();
                }}
              >
                <div className="flex justify-center items-center pl-3 ">
                  <div className="">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.5781 6.10578V5.86245C11.5745 5.68408 11.502 5.51403 11.3759 5.38791C11.2497 5.2618 11.0796 5.18941 10.9012 5.18591H8.5988C8.42043 5.18941 8.25033 5.2618 8.12414 5.38791C7.99796 5.51403 7.92547 5.68408 7.92188 5.86245V6.10578C9.13096 5.88872 10.369 5.88872 11.5781 6.10578ZM9.14062 3.61719V4.52966H10.3594V3.61719C9.96197 3.73706 9.53803 3.73706 9.14062 3.61719Z" fill={wait ? "#c2beb4" : bgColor} />
                      <path d="M9.7515 3.04988C10.5937 3.04988 11.2764 2.36714 11.2764 1.52494C11.2764 0.682738 10.5937 0 9.7515 0C8.9093 0 8.22656 0.682738 8.22656 1.52494C8.22656 2.36714 8.9093 3.04988 9.7515 3.04988Z" fill={wait ? "#c2beb4" : bgColor} />
                      <path d="M15.8546 8.93428C14.7272 7.8947 13.3461 7.17017 11.85 6.83348C11.8296 6.83098 11.8095 6.82655 11.7899 6.82027C10.4479 6.52361 9.05738 6.52345 7.71534 6.8198C7.69576 6.82589 7.67564 6.8301 7.65525 6.83236C6.15907 7.16949 4.77796 7.89442 3.65067 8.93433C2.11612 10.3583 1.23581 12.2159 1.14844 14.2315H18.3568C18.2694 12.2159 17.3891 10.3583 15.8546 8.93428Z" fill={wait ? "#c2beb4" : bgColor} />
                      <path d="M16.6875 16.7168H2.8125V18.3105H16.6875V16.7168Z" fill={wait ? "#c2beb4" : bgColor} />
                      <path d="M19.5 14.8887H0V16.0605H19.5V14.8887Z" fill={wait ? "#c2beb4" : bgColor} />
                      <path d="M19.5 18.9668H0V20.1387H19.5V18.9668Z" fill={wait ? "#c2beb4" : bgColor} />
                    </svg>
                  </div>
                  <div className="ml-3 leading-3 mt-[2px]">
                    <div className={`${wait ? "text-[#c2beb4]" : "text-primary"} font-bold text-sm p-0 leading-3`} >
                      {"Request"} <span className="font-medium text-xs">{"Waiter"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {CategoryList()}
          {selfilterList.length == 0 &&
            <div onClick={() => { handleCatClick("Our Special", true) }} className="bg-primary mt-2 mb-4 mx-4 rounded-md" >
              <Image src="/images/svg/our_special_banner.svg" alt="restarunt logo" width="443" height="123" priority={true} />
            </div>}
          <Toaster position="top-center" />
          <div className="mb-20">
            {category && category!.map(
              (ele, catIndex) => {
                return (
                  <div key={catIndex} id={ele}>
                    {menuData &&
                      menuData.getMenuList(ele, selfilterList) &&
                      menuData.getMenuList(ele, selfilterList)!.length >
                      0 && (
                        plan === 'basic' ? basicCard(ele) : proCard(ele, catIndex)
                      )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center "
          style={{ height: "calc(100vh - 92px)" }}
        >
          <CircularProgress sx={{ color: "var(--primary-bg)" }} />
        </div>
      )}
      {selectedMenuData && (
        <DescriptionSheet
          setSelectedMenuData={setSelectedMenuData}
          selectedMenuData={selectedMenuData} bgColor={bgColor} restId={restId} deviceId={deviceId ?? ""} />
      )}
      {plan !== "basic" && <div className="">
        <div
          className={`category_shape fixed z-10 ${cartMenuData && cartMenuData?.getMenuList() && cartMenuData?.getMenuList()?.length != 0 ? "bottom-16" : "bottom-6"}  right-6 ${isCircle ? "circle" : "rectangle"}`}
          onClick={() => setIsCircle(!isCircle)}
        >
          {isCircle ? (
            <div className="category_text text-center flex justify-center items-center flex-col">
              <div className="">
                <Image src="/images/svg/menu_icon.svg" alt="menu icon" width="16" height="16" priority={true} />
              </div>
              <div className="p-1 text-xs font-semibold">Menu</div>
            </div>
          ) : (
            <div ref={categoryRef} className="category_text">
              <ul className="">
                {category.map((item, index) => (
                  menuData &&
                  menuData.getMenuList(item, selfilterList) &&
                  menuData.getMenuList(item, selfilterList)!.length >
                  0 && <li onClick={() => handleItemClick(item)} className="pb-2 cursor-pointer capitalize text-lg font-medium" key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>}
      {cartMenuData && cartMenuData?.getMenuList() && cartMenuData?.getMenuList()?.length != 0 && <Link
        href={`/rest/${restId}/cart?table=${table}`}
        className="w-full"
      >
        <div className="fixed bottom-0 z-20 bg-primary w-full px-4 py-3">
          <div className="text-[#fafafa] flex justify-between items-center">
            <div className="">
              <div className="text-sm font-semibold">{cartMenuData?.getMenuList()?.length} Items in wishlist</div>
              <div className="text-xs">View Now</div>
            </div>
            <ArrowRightIcon fontSize="large" />
          </div>
        </div>
      </Link>}
    </div>
  );
}
