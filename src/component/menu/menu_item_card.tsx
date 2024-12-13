import { Item } from "@/model/products/items";
import Image from "next/image";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
export default function MenuItemCard({
  index,
  setSelectedData,
  ele,
  catIndex,
  bgColor,
  addOrderItems,
  isOrderFlow
}: {
  index: any;
  setSelectedData?: (ele: Item) => void;
  ele: Item;
  catIndex?: number;
  bgColor: string;
  addOrderItems: (ele: Item, type: string) => void;
  isOrderFlow: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const addToItems = (type: string) => {
    if (type == "add" && ele.quantity == 0 || ele.quantity == null) {
      ele.quantity = 1;
      addOrderItems(ele, type);
    } else if (type == "add") {
      ele.quantity = ele.quantity + 1;
      addOrderItems(ele, type);
    } else if (type == "remove" && ele.quantity > 0) {
      if (ele.quantity > 1) {
        ele.quantity = ele.quantity - 1;
      } else {
        ele.quantity = null;
      }
      addOrderItems(ele, type);
    }
  };
  const addWishList = () => {
    if (ele.quantity == undefined || ele.quantity == 0 || ele.quantity == null) {
      ele.quantity = 1;
      addOrderItems(ele, "add");
    } else {
      if (ele.quantity > 1) {
        ele.quantity = ele.quantity - 1;
      } else {
        ele.quantity = null;
      }
      addOrderItems(ele, "remove");
    }
  };
  return (
    <div
      key={index}

      className={`rounded-md boxshadow-3 md:rounded-md overflow-hidden max-h-[100px] flex bg-white`}
    >
      <div className="relative z-0" onClick={() => {
        setSelectedData && setSelectedData(ele);
      }}>
        <div className={`h-full bg-slate-200  flex items-center`}>
          {
            imageError ? (
              <img
                src="/images/png/empty_menu_item.png"
                alt={ele.name! + "empty"}
                height={80}
                width={80}
                style={{ objectFit: "cover", height: "80px" }}
              />
            ) :
              (
                <img
                  src={ele.itemsImageUrl && ele.itemsImageUrl != "" ? ele.itemsImageUrl : '/images/png/empty_menu_item.png'}
                  alt={ele.name!}
                  height={80}
                  width={80}
                  // priority={catIndex ? false : catIndex == 0 ? true : false}
                  onError={handleImageError}
                  style={{
                    objectFit: "cover",
                    height: "80px",
                    opacity: ele.isSoldOut ? 0.4 : 1
                  }}
                />
              )}
        </div>
        {!ele.isSoldOut && ele.isSpecial && (
          <div className="absolute bottom-0 right-0 text-white bg-primary text-sm w-full text-center">
            Special
          </div>
        )}
        {ele.isSoldOut && (
          <div className="absolute bottom-[38%] right-0 text-white bg-[#d71d25] text-sm w-full text-center">
            Sold Out
          </div>
        )}
      </div>
      <div className={`relative z-0 flex items-center rounded-e-md p-2 flex-1`}>
        <div className="flex flex-col  flex-1 pl-1" onClick={() => {
          setSelectedData && setSelectedData(ele);
        }}>
          <h1 className={`text-base capitalize md:text-lg font-bold ${ele.isSoldOut ? "text-gray-400" : "text-black"}`}>
            {ele.capitalizeNameFirstLetter()}
          </h1>
          <div
            className={`text-xs md:text-sm overflow-hidden ${ele.isSoldOut ? "text-gray-300" : "text-gray-800"} font-medium`} style={{ maxWidth: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          >
            {ele?.capitalizeDescriptionFirstLetter() && ele?.capitalizeDescriptionFirstLetter()!.length > 0 ? ele?.capitalizeDescriptionFirstLetter() : ele.foodType}
          </div>
          <div className={`font-bold pr-1 text-sm pt-1 ${ele.isSoldOut ? "text-gray-300" : "text-gray-700"}`}>&#x20B9; {ele.price}</div>
        </div>
        {isOrderFlow ? !ele.isSoldOut ?
          ele.quantity != null && ele.quantity > 0 ?
            <div className="flex justify-center items-center rounded border-2 border-primary mb-1">
              <div onClick={() => { addToItems("remove") }} className="bg-primary px-1"><RemoveIcon sx={{ fontSize: '13px', color: 'white' }} /></div>
              <div className="px-2">{ele.quantity ?? 0}</div>
              <div onClick={() => { addToItems("add") }} className="bg-primary px-1"><AddIcon sx={{ fontSize: '13px', color: 'white' }} /></div>
            </div>
            :
            <div onClick={() => { addToItems("add") }} className={`flex justify-center items-center pl-4 pr-3 py-1 rounded border-2 border-primary text-primary`}>
              <div className="text-xs pr-1">Add</div>
              <AddIcon sx={{ fontSize: '13px' }} />
            </div> : <div className={`flex justify-center items-centser pl-4 pr-3 py-1 rounded border-2 border-gray text-gray-400`}>
            <div className="text-xs pr-1">Add</div>
            <AddIcon sx={{ fontSize: '13px' }} />
          </div> : <div onClick={() => { addWishList() }} style={{ border: `1px solid ${bgColor}`, borderRadius: '3px', marginRight: '6px' }}>
          {ele.quantity != null && ele.quantity > 0 ? <BookmarkIcon sx={{ color: bgColor, width: '34px', height: '34px', padding: '3px 2px' }} /> : <BookmarkBorderIcon sx={{ color: bgColor, width: '34px', height: '34px', padding: '3px 2px' }} />}
        </div>
        }
      </div>
    </div>
  );
}
