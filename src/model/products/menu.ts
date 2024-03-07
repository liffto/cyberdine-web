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
}
