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

    getPendingLength(): number {
        const pending = this.cartMenuMap?.get('pending');
        return pending ? Array.from(pending.values()).reduce((count, category) => count + category.size, 0) : 0;
    }

    getApprovedLength(): number {
        const approved = this.cartMenuMap?.get('approved');
        return approved ? Array.from(approved.values()).reduce((count, category) => count + category.size, 0) : 0;
    }

    getCartLength(): number {
        const approved = this.cartMenuMap?.get('pending');
        if (!approved) return 0;

        return Array.from(approved.values()).reduce((count, category) => {
            return count + Array.from(category.values()).filter(item => !item.isOrdered).length;
        }, 0);
    }

    getFirstDateAndTime(): { date: string; time: string; timestamp: string } | null {
        const items = this.getMenuList();

        if (!items) return null;

        const firstItemWithDate = items.find(item => item.dateAndTime);

        if (firstItemWithDate && firstItemWithDate.dateAndTime) {
            const dateTimeString = firstItemWithDate.dateAndTime;
            const dateObj = new Date(dateTimeString);

            // Format date as "DD MMM YYYY"
            const day = dateObj.getDate().toString().padStart(2, '0');
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[dateObj.getMonth()];
            const year = dateObj.getFullYear();
            const formattedDate = `${day} ${month} ${year}`; // "12 Jan 2024"

            // Format time as "hh:mm AM/PM"
            const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
            const formattedTime = dateObj.toLocaleTimeString('en-US', optionsTime); // e.g., "04:04 PM"

            // Calculate sixDigitId
            const lastTwoDigitsOfYear: number = year % 100; // Last two digits of the year
            const monthValue: number = dateObj.getMonth() + 1; // Month (1-12)
            const dayValue: number = dateObj.getDate(); // Day (1-31)

            // Break down the calculation into steps
            const yearContribution: number = lastTwoDigitsOfYear * 10000;
            const monthContribution: number = monthValue * 100;
            const total: number = yearContribution + monthContribution + dayValue;
            const timestamp: string = (total % 1000000).toString().padStart(6, '0'); // Ensure it is 6 digits


            return {
                date: formattedDate,
                time: formattedTime,
                timestamp, // Return the Unix timestamp
            };
        }

        return null; // No dateAndTime found
    }

    makeCartMenuEmpty() {
        this.cartMenuMap = new Map()
    }
}