import { JsonUtiles } from "@/utils/jsonUtiles";
import { Item } from "../products/items";

export class CartMenu {
    cartMenuMap: Map<string, Map<string, Item>> | null = new Map();
    constructor(data?: CartMenu) {
        this.cartMenuMap = new Map<string, Map<string, Item>>();
        if (data) {
            this.cartMenuMap = JsonUtiles.populateNestedMap(data, Item);
        }
    }

    getMenuList(): Item[] | null {
        if (!this.cartMenuMap) {
            return null;
        }

        const cart = this.cartMenuMap?.values();
        let itemList: Item[] = [];
        Array.from(cart).forEach((each) => {
            Array.from(each.values()).map(element => {
                itemList.push(element)
            });
        })

        return itemList;
    }

    makeCartMenuEmpty() {
        this.cartMenuMap = new Map()
    }
}