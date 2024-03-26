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
  getActiveMenuByCat(category:string,pref:string="All"):Item[] | null{
    if(!this.menuMap?.has(category)){
      return null;
    }
    const menu = Array.from(this.menuMap?.get(category)?.values() as Iterable<Item>)
    const filteredMenu = menu.filter((item:Item)=>  item.isActive&& (item.category == category || category == "All") && this.hasPreference(pref,item))
    return filteredMenu;
  }


  getMenuList(category:string,pref:string="All"):Item[] | null{
    if(!this.menuMap?.has(category)){
      return null;
    }
    const menu = Array.from(this.menuMap?.get(category)?.values() as Iterable<Item>)
    const filteredMenu = menu.filter((item:Item)=>  (item.category == category || category == "All") && this.hasPreference(pref,item))
    return filteredMenu;
  }


  hasPreference(pref:string,item:Item){
    return pref =="" || pref =="All"?true:item.foodType?.toLowerCase() == pref?.toLowerCase()
  }
  getSearchedMenuByCat(category:string,searchString:string="",):Item[] | null{
    let response: Item[] =[];
    if(category == "All" && searchString==""){
      return []
    }
    else if(category == "All" && this.menuMap != null){
      const categories = Array.from(this.menuMap!.values());
      categories.map((value,key)=>{
        response= response.concat( Array.from(value.values()))
      })
      return response.flat().filter((item)=>item.name?.toLowerCase()?.includes(searchString?.toLowerCase()))
    } 
    else if(!this.menuMap?.has(category)){
      return null;
    }
   else{
   return  Array.from(this.menuMap.get(category)!.values()).filter((item)=>item.name?.toLowerCase()?.includes(searchString?.toLowerCase()))
   }
  }
}
