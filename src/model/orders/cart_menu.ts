import { JsonUtiles } from "@/utils/jsonUtiles";
import { Item } from "../products/items";

export class CartMenu {
    cartMenuMap: Map<string, Map<string, Map<string, Item>>> | null = new Map();
    constructor(data?: { [outerKey: string]: { [middleKey: string]: { [innerKey: string]: any } } }) {
        this.cartMenuMap = new Map<string, Map<string, Map<string, Item>>>();
        if (data) {
            this.cartMenuMap = JsonUtiles.populateThreeLevelNestedMap(data, Item);
        }
    }

    getMenuList(): Item[] | null {
        if (!this.cartMenuMap) {
            return null;
        }
    
        let itemList: Item[] = [];
    
        // Convert outer map values iterator to an array
        Array.from(this.cartMenuMap.values()).forEach(middleMap => {
            // Convert middle map values iterator to an array
            Array.from(middleMap.values()).forEach(innerMap => {
                // Convert inner map values iterator to an array and push to itemList
                itemList.push(...Array.from(innerMap.values()));
            });
        });
    
        return itemList;
    }

    makeCartMenuEmpty() {
        this.cartMenuMap = new Map()
    }
}