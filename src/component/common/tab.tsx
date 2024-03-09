import * as React from "react";

export default function TabGroup({setPreference,preference}:{setPreference:Function,preference:string}) {
  return (
    <div className="rounded-full flex  overflow-hidden divide-x boxshadow-2">
      {["All", "Non Veg", "Veg"].map((ele,index) => {
        return (
          <div key={index} onClick={()=>{setPreference(ele)}} className={`${preference.replaceAll(" ","").toLowerCase() ==ele.replaceAll(" ","").toLowerCase()?"bg-white text-primary font-bold":`bg-primary text-white`} cursor-pointer text-sm w-[90px] text-center px-4 py-3 whitespace-nowrap `}>{ele}</div>
        );
      })}
    </div>
  );
}
