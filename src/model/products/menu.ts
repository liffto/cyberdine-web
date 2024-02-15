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
}
