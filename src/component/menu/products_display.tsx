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

const notify = () => toast("Notified successfully");
const soldOutNotify = () => toast("Temporarily out of stock");

export default function ProductDisplay({
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
  const [selfilterList, setSelFilterList] = useState<Array<string>>([]);
  const [filterList, setFilterList] = useState<Array<string>>([]);
  const [isCircle, setIsCircle] = useState<boolean>(true);
  const [preOrderData, setPreOrderData] = useState<boolean>(true);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { menuData, category, cartMenuData, deviceId } =
    useContext(MenuDataContext);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(category[0]);

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
        let response = menuData
          ?.getMenuList(each.category!, [])
          ?.find((val) => val.id == each.id);
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
  };

  useEffect(() => {
    // Ensure category is not null and has at least one item before setting selectedCategoryName
    if (category && category.length > 0) {
      setSelectedCategoryName(category[0]);
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
  }, [category]);

  useEffect(() => {
    getQuantityFromOrder();
  }, [cartMenuData, preOrderData]);

  useEffect(() => {
    const cat = ["Veg", "Egg", "Non Veg", "Our Special"];
    setFilterList(cat);
    // Function to handle clicks outside the div
    const handleClickOutside = (event: any) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCircle(true); // Clicked outside the div, set isCircle to true
      }
    };

    // Attach the event listener to the document body
    document.body.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          <div className="md:container mx-auto  ">
            {menuData ? (
              <div className="">
                <div className="sticky top-0 z-20 bg-[#fafafa] w-full flex justify-between items-center px-4 pt-2">
                  <Link
                    href={`/rest/${restId}/search?query=&category=All`}
                    className="w-full"
                  >
                    <div className="my-2 flex justify-start items-center w-full bg-white">
                      <div
                        className={`border border-gray-300 text-gray-300 rounded w-full py-[6px] ${
                          notification ? "mr-2" : ""
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
                          <svg
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
                          </svg>
                        </div>
                        <div className="ml-3 leading-3 mt-[2px]">
                          <div
                            className={`${
                              wait ? "text-[#c2beb4]" : "text-primary"
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
                  selfilterList={selfilterList}
                  handleCatClick={handleCatClick}
                  filterList={filterList}
                />
              {selfilterList.length == 0 &&  <HorizontalScrollSnap
                  items={[ OurSpecial,review&&GoogleReview]}
                />}

                <Toaster position="top-center" />
                <div className="mb-20">
                  {category &&
                    category!.map((ele, catIndex) => {
                      return (
                        <div key={catIndex} id={ele}>
                          {menuData &&
                            menuData.getMenuList(ele, selfilterList) &&
                            menuData.getMenuList(ele, selfilterList)!.length >
                              0 &&
                            (plan === "basic" ? (
                              <BasicCard
                                setCatName={setCatName}
                                ele={ele}
                                menuData={menuData}
                                selfilterList={selfilterList}
                                selectedCategoryName={selectedCategoryName}
                              />
                            ) : (
                              <ProCard
                                ele={ele}
                                menuData={menuData}
                                selfilterList={selfilterList}
                                setSelectedData={setSelectedData}
                                catIndex={catIndex}
                                bgColor={bgColor}
                              />
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
                setSelectedMenuData={setSelectedMenuData}
                selectedMenuData={selectedMenuData}
                bgColor={bgColor}
                restId={restId}
                deviceId={deviceId ?? ""}
              />
            )}
            {plan !== "basic" && (
              <div className="">
                <div
                  className={`category_shape fixed z-10 ${
                    cartMenuData &&
                    cartMenuData?.getMenuList() &&
                    cartMenuData?.getMenuList()?.length != 0
                      ? "bottom-16"
                      : "bottom-6"
                  }  right-6 ${isCircle ? "circle" : "rectangle"}`}
                  onClick={() => setIsCircle(!isCircle)}
                >
                  {isCircle ? (
                    <div className="category_text text-center flex justify-center items-center flex-col">
                      <div className="">
                        <Image
                          src="/images/svg/menu_icon.svg"
                          alt="menu icon"
                          width="16"
                          height="16"
                          priority={true}
                        />
                      </div>
                      <div className="p-1 text-xs font-semibold">Menu</div>
                    </div>
                  ) : (
                    <div ref={categoryRef} className="category_text">
                      <ul className="">
                        {category.map(
                          (item, index) =>
                            menuData &&
                            menuData.getMenuList(item, selfilterList) &&
                            menuData.getMenuList(item, selfilterList)!.length >
                              0 && (
                              <li
                                onClick={() => handleItemClick(item)}
                                className="pb-2 cursor-pointer capitalize text-lg font-medium"
                                key={index}
                              >
                                {item}
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  )}
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
                      <div className="">
                        <div className="text-sm font-semibold">
                          {cartMenuData?.getMenuList()?.length} Items in
                          wishlist
                        </div>
                        <div className="text-xs">View Now</div>
                      </div>
                      <ArrowRightIcon fontSize="large" />
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
        addPhoneNumber={addPhoneNumber}
        validatePhoneNumber={validatePhoneNumber}
      />
    </div>
  );
}
