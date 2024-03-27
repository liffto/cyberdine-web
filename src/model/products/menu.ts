import { JsonUtiles } from "@/utils/jsonUtiles";
import { Item } from "./items";

export class Menu {
  menuMap: Map<string, Map<string, Item>> | null = new Map();
  constructor(data?: Menu) {
    this.menuMap = new Map<string, Map<string, Item>>();
    if (data) {
      this.menuMap = JsonUtiles.populateNestedMap(data, Item);
    }
  }



  getMenuList(category: string, pref: Array<string> = []): Item[] | null {
    if (!this.menuMap?.has(category)) {
      return null;
    }
    const menu = Array.from(this.menuMap?.get(category)?.values() as Iterable<Item>)
    if (pref.length == 1 && pref.includes('Our Special')) {
      const ourSpeical = menu.filter((item: Item) => item.isSpecial == true)
      return ourSpeical;

    } else if (pref.length > 1 && pref.includes('Our Special')) {
      const ourSpeical = menu.filter((item: Item) => item.isSpecial == true && pref.some((each) => each == item.foodType))
      return ourSpeical;

    } else {
      const filteredMenu = menu.filter((item: Item) => pref.some((each) => each == item.foodType))
      return pref && pref.length > 0 ? filteredMenu : menu;

    }
  }

  getSearchedMenuByCat(category: string, searchString: string = "",): Item[] | null {
    let response: Item[] = [];
    if (category == "All" && searchString == "") {
      return []
    }
    else if (category == "All" && this.menuMap != null) {
      const categories = Array.from(this.menuMap!.values());
      categories.map((value, key) => {
        response = response.concat(Array.from(value.values()))
      })
      return response.flat().filter((item) => item.name?.toLowerCase()?.includes(searchString?.toLowerCase()))
    }
    else if (!this.menuMap?.has(category)) {
      return null;
    }
    else {
      return Array.from(this.menuMap.get(category)!.values()).filter((item) => item.name?.toLowerCase()?.includes(searchString?.toLowerCase()))
    }
  }
}
