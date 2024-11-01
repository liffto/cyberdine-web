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
import SortIcon from '@mui/icons-material/Sort';

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
import ProductBottommButton from "./product_bottom_button";
import FoodMenuBanner from "../common/request_menu_bell_icon";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React from "react";

const notify = () => toast("Notified successfully");
const soldOutNotify = () => toast("Temporarily out of stock");
////asdasd

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
  topic,
  bgColor,
  notification,
  plan,
  isPayCompleted,
  customerDetails,
  review,
}: {
  menuTypes: string;
  restId: string;
  table: string;
  topic: string;
  bgColor: string;
  notification: boolean;
  plan: string;
  isPayCompleted: boolean;
  customerDetails: boolean;
  review: string;
}) {
  const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
  const [wait, setWait] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<Number>();
  const [filterList, setFilterList] = useState<Array<any>>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [preOrderData, setPreOrderData] = useState<boolean>(true);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [topItem, setTopItem] = useState(null);
  const { menuData, category, cartMenuData, deviceId, menuType, setMenuType } =
    useContext(MenuDataContext);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >('');
  const [items, setItems] = useState([]);
  const refs = useRef<(React.RefObject<HTMLDivElement>)[]>([]);

  const setSelectedData = (ele: Item) => {
    if (!ele.isActive) {
      soldOutNotify();
    } else {
      setSelectedMenuData(ele);
    }
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

  const handleCatClick = (catName: string, isFromSelected: boolean) => {
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

  const validatePhoneNumber = () => {
    // Check if the phone number contains only digits and has a length of 10
    if (phoneNumber) {
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
          ?.find((val) => val.id == each.id && !(each.isApproved == true) && !each.isOrdered);
        if (response != undefined) {
          response.quantity = each.quantity;
          setPreOrderData(false);
        }
      });
    }
  };

  const handleItemClick = (index: any) => {
    const element = document.getElementById(`${index}`);
    if (element) {
      const offset = element.getBoundingClientRect().top;
      window.scrollTo({ top: window.scrollY + offset, behavior: "smooth" });
    }
    setOpenMenu(false);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setOpenMenu(open);
  };

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
    const cat = menuTypes == "foodMenu" ? initialCategories : [];
    setFilterList(cat);
    // setSelFilterList(cat);
  }, []);

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
    if (preOrderData) {
      getQuantityFromOrder();
    }
  }, [cartMenuData, menu, preOrderData]);

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
        handleCatClick("Our Special", true);
      }}
      className={"bg-primary  rounded-md"}
    >
      <Image
        src="/images/svg/our_special_banner.svg"
        alt="restarunt logo"
        width="443"
        height="123"
        priority={true}
      />
    </div>
  );
  const GoogleReview = (
    <Link href={review} target="_blank" aria-label="Link to google review">
      <Image
        src="/images/svg/g_review_banner.svg"
        alt="restarunt logo"
        width="443"
        height="123"
        priority={true}
      />
    </Link>
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
          <div className="md:container mx-auto">
            {menu ? (
              <div className="">
                <div className="sticky top-0 z-20 bg-[#fafafa] w-full flex justify-between items-center px-4 pt-2">
                  <Link
                    href={`/rest/${restId}/search?table=${table}&query=&category=All`}
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
                <CategoryList
                  handleCatClick={handleCatClick}
                  filterList={filterList}
                />
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
                        <div key={catIndex} id={ele}>
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
                                bgColor={bgColor}
                                restId={restId}
                                deviceId={deviceId ?? ""}
                                menuTypes={menuType} onRemoveOrders={() => { setPreOrderData(true); }} table={table} />
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
            {selectedMenuData && (
              <DescriptionSheet
                menuType={menuType}
                setSelectedMenuData={setSelectedMenuData}
                selectedMenuData={selectedMenuData}
                bgColor={bgColor}
                restId={restId}
                deviceId={deviceId ?? ""} menu={menu ?? new Menu()} table={table} />
            )}
            <div className="relative">
              <SwipeableDrawer
                anchor='bottom'
                open={openMenu}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                  style: {
                    width: '90%', // Set width to 90%
                    height: menu && menu.getMenuLength(category[menuType], filterList) && menu.getMenuLength(category[menuType], filterList)! > 10 ? '70%' : '',
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
            {plan !== "basic" && menu && menu.getMenuLength(category[menuType], filterList) && menu && menu.getMenuLength(category[menuType], filterList)! > 0 && !openMenu && (
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
                <ProductBottommButton cartCount={cartMenuData.getCartLength()} pendingCount={cartMenuData.getPendingLength()} approvedCount={cartMenuData.getApprovedLength()} restId={restId} table={table} />
              )}
          </div>
        </div>
      )}
      <PhoneNoDialog
        showDialog={showDialog}
        handleNumberChange={handleNumberChange}
        addPhoneNumber={addPhoneNumber}
        validatePhoneNumber={validatePhoneNumber}
      />
    </div>
  );
}
