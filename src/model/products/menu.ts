import { JsonUtiles } from "@/utils/jsonUtiles";
import { Item } from "./items";

export class Menu {
  menuMap: Map<string,Map<string, Item>> | null = new Map();
  constructor(data?: Menu) {
    this.menuMap = new Map<string,Map<string, Item>>();
    if (data) {
      this.menuMap = JsonUtiles.populateNestedMap(data, Item);
    }
  }
  getActiveMenuByCat(category:string):Item[] | null{
    if(!this.menuMap?.has(category)){
      return null;
    }
    const menu = Array.from(this.menuMap?.get(category)?.values() as Iterable<Item>)
    const filteredMenu = menu.filter((item:Item)=>item.isActive&& (item.category == category || category == "All"))
    return filteredMenu;
  }
  getSearchedMenuByCat(category:string,searchString:string="")
  // :Item[] | null
  {
    let response: Item[] =[];
    if(category == "All" && searchString==""){
      return []
    }
    else if(category == "All" && this.menuMap != null){
      // this.menuMap?.forEach((value,key)=>{
      //   response.concat( Array.from(value.values()))
      // })
      const categories = Array.from(this.menuMap!.values());
      categories.map((value,key)=>{
        response= response.concat( Array.from(value.values()))
      })
      return response.flat().filter((item)=>item.name?.includes(searchString))
    } 
    else if(!this.menuMap?.has(category)){
      return null;
    }
   else{
   return  Array.from(this.menuMap.get(category)!.values()).filter((item)=>item.name?.includes(searchString))
   }

    // const menu = Array.from(this.menuMap?.get(category)?.values() as Iterable<Item>)
    // const filteredMenu = menu.filter((item:Item)=>item.isActive&& (item.category == category || category == "All"))
    // return filteredMenu;
  }
}
