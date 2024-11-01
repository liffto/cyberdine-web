import { JsonUtiles } from "@/utils/jsonUtiles";
import { Item } from "./items";
import { FirebaseServices } from "@/service/firebase.service";

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
    const menu = Array.from(
      this.menuMap?.get(category)?.values() as Iterable<Item>
    );
    if (pref.length == 1 && pref.includes("Our Special")) {
      const ourSpeical = menu.filter((item: Item) => item.isSpecial == true);
      return ourSpeical;
    } else if (pref.length > 1 && pref.includes("Our Special")) {
      const ourSpeical = menu.filter(
        (item: Item) =>
          item.isSpecial == true && pref.some((each) => each == item.foodType)
      );
      return ourSpeical;
    } else {
      const filteredMenu = menu.filter((item: Item) =>
        pref.some((each) => each == item.foodType)
      );
      return pref && pref.length > 0 ? filteredMenu : menu;
    }
  }

  getSearchedMenu(
    searchString: string = "",
    pref: Array<string> = []
  ): Map<string, Item[]> | null {
    let response: Item[] = [];
    if (searchString == "") {
      return null;
    } else if (this.menuMap != null) {
      const categories = Array.from(this.menuMap!.values());
      categories.map((value, key) => {
        response = response.concat(Array.from(value.values()));
      });
      const menu = response
        .flat()
        .filter((item) =>
          item.name?.toLowerCase()?.includes(searchString?.toLowerCase())
        );
      if (pref.length == 1 && pref.includes("Our Special")) {
        const ourSpeical = menu.filter((item: Item) => item.isSpecial == true);

        return this.convertListToArray(ourSpeical);
      } else if (pref.length > 1 && pref.includes("Our Special")) {
        const ourSpeical = menu.filter(
          (item: Item) =>
            item.isSpecial == true && pref.some((each) => each == item.foodType)
        );
        return this.convertListToArray(ourSpeical);
      } else {
        const filteredMenu = menu.filter((item: Item) =>
          pref.some((each) => each == item.foodType)
        );
        return this.convertListToArray(pref && pref.length > 0 ? filteredMenu : menu);
      }
    } else {
      return null;
    }
  }

  getMenuLength(categories: string[], pref: Array<any> = []): number | null {
    let categoryCount = 0;

    for (const category of categories) {
      if (this.getMenuList(category, pref) && this.getMenuList(category, pref)?.length != 0) {
        categoryCount = categoryCount + 1;
      }
    }
    return categoryCount > 0 ? categoryCount : null;
  }

  convertListToArray(menu: Item[]) {
    const tempMap = new Map();
    menu.forEach((obj) => {
      const { category } = obj;
      if (!tempMap.has(category)) {
        tempMap.set(category, []);
      }
      tempMap.get(category).push(obj);
    });
    return tempMap;
  }

  async addQantity(menu: Item, count: number | null, restId: string, deviceId: string, type: string, table: string, callback?: (ele: string) => void) {
    let res = this.menuMap!.get(menu.category!)?.get(menu.id!);
    if (res != undefined) {
      res.quantity = 0;
      res.quantity = count;
      if (type == "add") {
        await FirebaseServices.shared.addToCart(res, restId, deviceId, `table${table}`, (val: any) => {
          callback && callback("add")
        });

      } else {
        await FirebaseServices.shared.removeToCart(res, restId, deviceId, `table${table}`, (val: any) => {
          callback && callback("remove")
        });

      }
    }
  }

}
