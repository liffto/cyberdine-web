"use client";
import { Item } from "@/model/products/items";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import MenuItemCard from "./menu_item_card";
import { MenuDataContext } from "@/context/menu.context";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TabGroup from "../common/tab";
import { FcmService } from "@/service/fcm_service";
const DescriptionSheet = dynamic(() => import("./description_sheet"), {
  ssr: false,
});
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Notified successfully');

export default function ProductDisplay({
  restId,
  table,
  topic,
  notification,
}: {
  restId: string;
  table: string;
  topic: string;
  notification: boolean;
}) {
  const [selectedMenuData, setSelectedMenuData] = useState<Item | null>(null);
  const [selected, setSelected] = useState<string>("All");
  const [preference, setPreference] = useState<string>("All");
  const [loading, setLoader] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(false);

  const { menuData, category } = useContext(MenuDataContext);

  const setSelectedData = (ele: Item) => {
    setSelectedMenuData(ele);
  };

  const sendFcm = async () => {
    var data = {
      data: {
        title: "Request Captain",
        body: `Request from table ${table}`,
      },
      topic:topic? topic.replace(" ", ""):"",
    };
    console.log("data", data);
    setLoader(true);
    setWait(true);
    await FcmService.shared.fcmTopic(data);
    setLoader(false);
    notify()
    setTimeout(() => {
      setWait(false);
    }, 1000 * 60);
  };

  function CategoryList() {
    return (
      <div
        className={`overflow-x-scroll md:container max-w-screen py-2 ${
          selected != "All" ? "sticky top-[91px]" : ""
        } bg-white border-b z-20`}
      >
        <div className="flex gap-4 px-4">
          {category &&
            category!
              .filter(
                (cat) =>
                  (menuData &&
                    menuData.getActiveMenuByCat(cat, preference) &&
                    menuData
                      .getActiveMenuByCat(cat, preference)
                      ?.some((ele) => ele.category == cat)) ||
                  cat == "All"
              )
              .map((ele, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelected(ele);
                    }}
                    className={`    ${
                      selected == ele ? "text-white bg-primary" : "text-primary"
                    } cursor-pointer rounded border whitespace-nowrap border-primary px-2 py-px text-primary`}
                  >
                    {ele}
                  </div>
                );
              })}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto  ">
      {menuData ? (
        <div className="">
          {CategoryList()}
          <Toaster position="top-center"  />
          <div className="flex justify-between items-center mx-4">
            <div className="my-2 flex justify-start items-center">
              <div className="circle pulse live"></div>
              <div className="mx-4 font-semibold text-appbg">Live menu</div>
            </div>
            {!notification && (
              <div
                className={`${wait?"bg-[#707070]":"bg-primary"}  text-white shadow px-4 rounded flex gap-1`}
                onClick={() => {
                  wait ? null : sendFcm();
                }}
              >
                <div className={`${loading ? "" : "hidden"}`}>
                  <CircularProgress
                    size={10}
                    sx={{
                      color: "white",
                      fontSize: "10px",
                      height: "10px",
                      width: "10px",
                    }}
                  />
                </div>
                {loading ? "Requesting" : "Request"}
              </div>
            )}
          </div>
          <div className="mb-20">
            {category &&
              (selected == "All" ? category : [selected])!.map(
                (ele, catIndex) => {
                  return (
                    <div key={catIndex}>
                      {menuData &&
                        menuData.getActiveMenuByCat(ele, preference) &&
                        menuData.getActiveMenuByCat(ele, preference)!.length >
                          0 && (
                          <>
                            {selected == "All" && (
                              <div
                                className="sticky top-[91px] bg-white z-10"
                                id={ele}
                              >
                                <div className="px-4 py-2 font-bold   bg-secondary text-black capitalize ">
                                  {ele}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4 px-4 mb-4">
                              {menuData.getActiveMenuByCat(ele, preference) &&
                                menuData
                                  .getActiveMenuByCat(ele, preference)!
                                  .map((ele: Item, index: any) => {
                                    return (
                                      <div key={index} className="">
                                        <MenuItemCard
                                          index={index}
                                          setSelectedData={setSelectedData}
                                          ele={ele}
                                          catIndex={catIndex}
                                        />
                                      </div>
                                    );
                                  })}
                            </div>
                          </>
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
          selectedMenuData={selectedMenuData}
        />
      )}
      <div className="fixed bottom-4 inset-x-4 z-10 flex items-center justify-center gap-4">
        <TabGroup setPreference={setPreference} preference={preference} />
        <Link
          href={`/rest/${restId}/search?query=&category=All`}
          className=" bg-primary rounded-full"
        >
          <Fab
            sx={{
              background: "var(--primary-bg)",
              "&:hover": {
                background: "var(--primary-bg)",
              },
            }}
            size="medium"
            aria-label="add"
          >
            <SearchRoundedIcon sx={{ color: "white" }} fontSize="medium" />
          </Fab>
        </Link>
      </div>
    </div>
  );
}
