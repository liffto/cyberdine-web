"use client";
import { Item } from "@/model/products/items";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MenuDataContext } from "@/context/menu.context";
import Image from "next/image";
import Link from "next/link";
import { FcmService } from "@/service/fcm_service";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const DescriptionSheet = dynamic(() => import("./description_sheet"), {
  ssr: false,
});
import toast, { Toaster } from "react-hot-toast";

import { FirebaseServices } from "@/service/firebase.service";
import { CustomerDetails } from "@/model/customer_detail/customer_details";
import CategoryList from "./category_list";
import PhoneNoDialog from "./phoneNoDialog";
import { BasicCard, ProCard } from "./cards";
import HorizontalScrollSnap from "../common/horizontal_scroll_snap";
import { Menu } from "@/model/products/menu";
import { SwipeableDrawer } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import React from "react";
import StarRating from "./start_rating";
import FoodMenuBanner from "../common/request_menu_bell_icon";
const notify = () => toast("Notified successfully");
const soldOutNotify = () => toast("Temporarily out of stock");

const initialCategories = [
  { name: "Veg", selected: false },
  { name: "Egg", selected: false },
  { name: "Our Special", selected: false },
  { name: "Non Veg", selected: false },
];

export default function ProductDisplay({
  menuTypes,
  restId,
  table,
  bgColor,
  notification,
  plan,
  isPayCompleted,
  customerDetails,
  review,
  ratingLimit,
}: {
  menuTypes: string;
  restId: string;
  table: string;
  bgColor: string;
  notification: boolean;
  plan: string;
  isPayCompleted: boolean;
  customerDetails: boolean;
  review: string;
  ratingLimit: boolean;
}) {
  const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
  const [wait, setWait] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<Number>();
  const [customerName, setCustomerName] = useState<string>();
  const [filterList, setFilterList] = useState<Array<any>>([]);
  const [preOrderData, setPreOrderData] = useState<boolean>(true);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [ratingDrawerStatus, setratingDrawerStatus] = useState(false);
  const { menuData, category, cartMenuData, deviceId, menuType, setMenuType } =
    useContext(MenuDataContext);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >('');
  const [items, setItems] = useState([]);
  const refs = useRef<(React.RefObject<HTMLDivElement>)[]>([]); // Correctly type the refs
  const [topItem, setTopItem] = useState(null);


  const setSelectedData = (ele: Item) => {
    if (!ele.isActive) {
      soldOutNotify();
    } else {
      setSelectedMenuData(ele);
    }
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setOpenMenu(open);
  };

  const setCatName = (categoryName: string) => {
    if (categoryName === selectedCategoryName) {
      setSelectedCategoryName("");
    } else {
      setSelectedCategoryName(categoryName);
    }
  };

  const sendFcm = async () => {
    if (table != null && table != undefined) {
      var data = {
        data: {
          title: `Table ${table} `,
          body: `Requesting for Captain`,
        },
        topic: `${restId}table${table}`,
      };

      setWait(true);
      await FcmService.shared.fcmTopic(data);
      notify();
      setTimeout(() => {
        setWait(false);
      }, 1000 * 60);
    }
  };

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

  const handleNumberChange = (event: any) => {
    const { value } = event.target;
    setPhoneNumber(value);
  };

  const handleNameChange = (event: any) => {
    const { value } = event.target;
    setCustomerName(value);
  };

  const validatePhoneNumber = () => {
    if (phoneNumber && customerName) {
      return /^\d{10}$/.test(phoneNumber!.toString());
    }
  };

  const addPhoneNumber = () => {
    if (validatePhoneNumber()) {
      addFirebase();
    }
  };

  const addFirebase = () => {
    const customerDetails = new CustomerDetails({
      phoneNumber: phoneNumber!,
      customerName: customerName!,
      date: getCurrentDate(),
      deviceId: deviceId,
    });
    FirebaseServices.shared.addCustomerDetails(
      customerDetails,
      restId,
      deviceId!,
      (val: any) => {
        setShowDialog(false);
      }
    );
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const getQuantityFromOrder = () => {
    if (cartMenuData) {
      cartMenuData?.getMenuList()?.forEach((each) => {
        let response = menu
          ?.getMenuList(each.category!, [])
          ?.find((val) => val.id == each.id);
        if (response != undefined) {
          response.quantity = each.quantity;
          setPreOrderData(false);
        }
      });
    }
  };

  const googleReviewRedirection = () => {
    if (ratingLimit == true) {
      setratingDrawerStatus(true);
    } else {
      window.open(review, '_blank');
    }
  }

  const handleItemClick = (index: any) => {
    const element = document.getElementById(`${index}`);
    if (element) {
      const offset = element.getBoundingClientRect().top;
      window.scrollTo({ top: window.scrollY + offset, behavior: "smooth" });
    }
    setOpenMenu(false);
  };

  useEffect(() => {
    // Ensure category is not null and has at least one item before setting selectedCategoryName
    if (!menuTypes) {
      const value = localStorage.getItem('menuType');
      setMenuType(value!);
      menuTypes = value!;
    }
    if (category && category[menuTypes]!.length > 0) {
      setSelectedCategoryName(category[menuTypes]![0]);
    }
    if (menuData) {
      const menuInstance = new Menu(menuData[menuTypes]);
      setMenu(menuInstance);
      setMenuType(menuTypes);
    }
    if (deviceId && customerDetails) {
      const response = FirebaseServices.shared.getCustomerDetails(
        restId,
        deviceId!,
        setShowDialog
      );
      return () => {
        response();
      };
    }
  }, [category, menuData]);

  useEffect(() => {
    getQuantityFromOrder();
  }, [cartMenuData, preOrderData, menu]);

  useEffect(() => {
    const cat = menuTypes == "foodMenu" ? initialCategories : [];
    setFilterList(cat);
  }, []);


  // First useEffect to set items when menuType changes
  useEffect(() => {
    if (category && menuType && menu) {
      const newItems = (category[menuType] || [])
        .map((item: any) => {
          // Only include the item if it is not null and has valid menu items
          if (item && menu.getMenuList(item, filterList) && menu.getMenuList(item, filterList)!.length > 0) {
            return item;
          }
          return null; // Return null for filtering
        })
        .filter((item: any): item is string => item !== null); // Filter out null values
      setItems(newItems);
      refs.current = newItems.map(() => React.createRef()); // Reset refs for new items
    }
  }, [menuType, category, menu]);


  useEffect(() => {
    const checkTopItem = () => {
      const offset = 240; // Height of each item
      for (let i = 0; i < refs.current.length; i++) {
        const element = refs.current[i]?.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the element is at the top of the viewport
          if (rect.top >= 0 && rect.top < offset) {
            setTopItem(items[i]);
            break; // Stop after finding the first top item
          }
        }
      }
    };

    // Initial check
    checkTopItem();

    // Add scroll event listener
    window.addEventListener('scroll', checkTopItem);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', checkTopItem);
    };
  }, [items]);

  const OurSpecial = (
    <div
      onClick={() => {
        handleCatClick("Our Special");
      }}
      className={"bg-primary  rounded-md"}
    >
      {menuType == "foodMenu" ? <Image
        src="/images/svg/our_special_banner.svg"
        alt="our special banner"
        width="443"
        height="123"
        priority={true}
      /> : <Image
        src="/images/svg/drinks_menu_banner.svg"
        alt="drinks menu banner"
        width="453"
        height="123"
        priority={true}
      />}
    </div>
  );
  const GoogleReview = (
    <div onClick={() => { googleReviewRedirection() }} className="">
      <Image
        src="/images/svg/g_review_banner.svg"
        alt="google review banner"
        width="443"
        height="123"
        priority={true}
      />
    </div>
  );
  return (
    <div className="">
      {isPayCompleted ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <Image
            src="/images/svg/no_dishes.svg"
            alt="no dishes"
            width="280"
            height="123"
            priority={true}
          />
          <div className="mt-4 font-semibold text-black">No dishes found</div>
        </div>
      ) : (
        <div className="">
          <div className="md:container mx-auto  ">
            {menu ? (
              <div className="">
                <div className="sticky top-0 z-20 bg-[#fafafa] w-full flex justify-between items-center px-4 pt-2">
                  <Link
                    href={`/rest/${restId}/search?query=&category=All`}
                    className="w-full"
                  >
                    <div className="my-2 flex justify-start items-center w-full bg-white">
                      <div
                        className={`border border-gray-300 text-gray-300 rounded w-full py-[6px] ${notification ? "mr-2" : ""
                          }  text-sm`}
                      >
                        <SearchIcon
                          sx={{ marginRight: "10px", marginLeft: "10px" }}
                        />
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
                          <FoodMenuBanner bgColor={bgColor} wait={wait} />
                          {/* <svg
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.5781 6.10578V5.86245C11.5745 5.68408 11.502 5.51403 11.3759 5.38791C11.2497 5.2618 11.0796 5.18941 10.9012 5.18591H8.5988C8.42043 5.18941 8.25033 5.2618 8.12414 5.38791C7.99796 5.51403 7.92547 5.68408 7.92188 5.86245V6.10578C9.13096 5.88872 10.369 5.88872 11.5781 6.10578ZM9.14062 3.61719V4.52966H10.3594V3.61719C9.96197 3.73706 9.53803 3.73706 9.14062 3.61719Z"
                              fill={wait ? "#c2beb4" : bgColor}
                            />
                            <path
                              d="M9.7515 3.04988C10.5937 3.04988 11.2764 2.36714 11.2764 1.52494C11.2764 0.682738 10.5937 0 9.7515 0C8.9093 0 8.22656 0.682738 8.22656 1.52494C8.22656 2.36714 8.9093 3.04988 9.7515 3.04988Z"
                              fill={wait ? "#c2beb4" : bgColor}
                            />
                            <path
                              d="M15.8546 8.93428C14.7272 7.8947 13.3461 7.17017 11.85 6.83348C11.8296 6.83098 11.8095 6.82655 11.7899 6.82027C10.4479 6.52361 9.05738 6.52345 7.71534 6.8198C7.69576 6.82589 7.67564 6.8301 7.65525 6.83236C6.15907 7.16949 4.77796 7.89442 3.65067 8.93433C2.11612 10.3583 1.23581 12.2159 1.14844 14.2315H18.3568C18.2694 12.2159 17.3891 10.3583 15.8546 8.93428Z"
                              fill={wait ? "#c2beb4" : bgColor}
                            />
                            <path
                              d="M16.6875 16.7168H2.8125V18.3105H16.6875V16.7168Z"
                              fill={wait ? "#c2beb4" : bgColor}
                            />
                            <path
                              d="M19.5 14.8887H0V16.0605H19.5V14.8887Z"
                              fill={wait ? "#c2beb4" : bgColor}
                            />
                            <path
                              d="M19.5 18.9668H0V20.1387H19.5V18.9668Z"
                              fill={wait ? "#c2beb4" : bgColor}
                            />
                          </svg> */}
                        </div>
                        <div className="ml-3 leading-3 mt-[2px]">
                          <div
                            className={`${wait ? "text-[#c2beb4]" : "text-primary"
                              } font-bold text-sm p-0 leading-3`}
                          >
                            {"Request"}{" "}
                            <span className="font-medium text-xs">
                              {"Waiter"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {filterList && filterList.length > 0 && <CategoryList
                  handleCatClick={handleCatClick}
                  filterList={filterList}
                />}

                {!(filterList && filterList.some(cat => cat.selected === true)) &&
                  <HorizontalScrollSnap
                    items={review && GoogleReview ? [OurSpecial, review && GoogleReview] : [OurSpecial]}
                  />
                }
                <Toaster position="top-center" />
                <div className="mb-20">
                  {category &&
                    category[menuType]?.map((ele: any, catIndex: any) => {
                      return (
                        <div key={catIndex} id={ele} ref={refs.current[catIndex]}>
                          {menu &&
                            menu.getMenuList(ele, filterList) &&
                            menu.getMenuList(ele, filterList)!.length >
                            0 &&
                            (plan === "basic" ? (
                              <BasicCard
                                setCatName={setCatName}
                                ele={ele}
                                menuData={menu}
                                selfilterList={filterList}
                                selectedCategoryName={selectedCategoryName}
                              />
                            ) : (
                              <ProCard
                                ele={ele}
                                menuData={menu}
                                selfilterList={filterList}
                                setSelectedData={setSelectedData}
                                catIndex={catIndex}
                                bgColor={bgColor} menuTypes={menuType} />
                            ))}
                        </div>
                      );
                    })}
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

            <DescriptionSheet
              setSelectedMenuData={setSelectedMenuData}
              selectedMenuData={selectedMenuData}
              bgColor={bgColor}
              restId={restId}
              deviceId={deviceId ?? ""} menu={menu ?? new Menu()} />
            <div className="relative">
              <SwipeableDrawer
                anchor='bottom'
                open={openMenu}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                  style: {
                    width: '90%', // Set width to 90%
                    maxHeight: '70%',
                    position: 'absolute', // Use absolute positioning
                    bottom: cartMenuData &&
                      cartMenuData?.getMenuList() &&
                      cartMenuData?.getMenuList()?.length != 0 ? '70px' : '20px', // Position it 90px above the bottom
                    margin: 'auto',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                }}
              >
                <div className="" style={{ display: 'flex', flexDirection: 'column', height: '100%' }} >
                  <div style={{ flex: '1', overflowY: 'auto', backgroundColor: bgColor }} className="flex px-6 py-3 rounded-lg text-white">
                    <ul className="w-[100%] ">
                      {category && category[menuType] && category[menuType]!.map(
                        (item: any, index: any) =>
                          menu &&
                          menu.getMenuList(item, filterList) &&
                          menu.getMenuList(item, filterList)!.length >
                          0 && (
                            <li
                              onClick={() => handleItemClick(item)}
                              className="pb-2 cursor-pointer capitalize font-medium"
                              key={index}
                            >
                              <div className=" w-full flex item-center justify-between">
                                <div className={`${topItem && topItem == item ? 'font-bold text-lg ' : 'font-normal text-base opacity-80'}`}>{item}</div>
                                <div className={`${topItem && topItem == item ? 'font-bold text-lg ' : 'font-normal text-base opacity-80'}`}>{menu.getMenuList(item, filterList)!.length}</div>
                              </div>
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                  <div className="flex item-center justify-center mt-6">
                    <div style={{ backgroundColor: bgColor }} className=" text-white flex items-center justify-center rounded-md py-3 w-28" onClick={() => { setOpenMenu(false) }} >
                      <div className="">
                        <Image
                          src="/images/svg/close_icon.svg"
                          alt="menu icon"
                          width="20"
                          height="20"
                          priority={true}
                        />
                      </div>
                      <div className="text-base pl-2 font-semibold">Close</div>
                    </div>
                  </div>
                </div>
              </SwipeableDrawer>
            </div>
            {plan !== "basic" && !openMenu && (
              <div className={`flex item-center justify-center sticky ${cartMenuData &&
                cartMenuData?.getMenuList() &&
                cartMenuData?.getMenuList()?.length != 0 ? 'bottom-[70px]' : 'bottom-5'} z-10`}>
                <div style={{ boxShadow: "0px 0px 6px 0px gray" }} className="bg-primary text-white flex item-center justify-center rounded-md py-3 w-28" onClick={() => { setOpenMenu(true) }} >
                  <div className="">
                    <SortIcon />
                  </div>
                  <div className="text-base pl-2 font-semibold">Sort</div>
                </div>
              </div>
            )}
            {cartMenuData &&
              cartMenuData?.getMenuList() &&
              cartMenuData?.getMenuList()?.length != 0 && (
                <Link
                  href={`/rest/${restId}/cart?table=${table}`}
                  className="w-full"
                >
                  <div className="fixed bottom-0 z-20 bg-primary w-full px-4 py-3">
                    <div className="text-[#fafafa] flex justify-between items-center">

                      <div className="flex gap-3 items-center justify-center">
                        <div className="">
                          <img src="/images/svg/bookmark_icon.svg"
                            alt="book mark icon" />
                        </div>
                        <div className="">
                          <div className="text-sm font-semibold">
                            {cartMenuData?.getMenuList()?.length} Items in
                            wishlist
                          </div>
                          <div className="text-xs">View Now</div>
                        </div>
                      </div>
                      <Image
                        src="/images/svg/arrow_right_svg.svg"
                        alt="menu icon"
                        width="30"
                        height="30"
                        priority={true}
                      />
                    </div>
                  </div>
                </Link>
              )}
          </div>
        </div>
      )}
      <PhoneNoDialog
        showDialog={showDialog}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        addPhoneNumber={addPhoneNumber}
        validatePhoneNumber={validatePhoneNumber}
      />
      <StarRating bgColor={bgColor} restId={restId} ratingDrawerStatus={ratingDrawerStatus} link={review} closeDrawer={() => { setratingDrawerStatus(false) }} />
    </div>
  );
}
