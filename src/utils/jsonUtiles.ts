export class JsonUtiles{
    static shared:JsonUtiles=new JsonUtiles();
    static MapOfString<T>(data: { [itemId: string]: any }, constructor: { new(...args: any[]): T }): Map<string, T> {
        const map = new Map<string, T>();
        for (const itemId in data) {
            if (Object.prototype.hasOwnProperty.call(data, itemId)) {
                const item = data[itemId];
                const newItem = new constructor(item);
                map.set(itemId, newItem);
            }
        }
        return map;
    }
    static populateNestedMap<T>(data: { [itemId: string]: any }, constructor: { new(...args: any[]): T }): Map<string, Map<string, T>> {
        const nestedMap = new Map<string, Map<string, T>>();
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const innerData = data[key];
                const innerMap = new Map<string, T>();
                for (const itemId in innerData) {
                    if (Object.prototype.hasOwnProperty.call(innerData, itemId)) {
                        const item = innerData[itemId];
                        const newItem = new constructor(item);
                        innerMap.set(itemId, newItem);
                    }
                }
                nestedMap.set(key, innerMap);
            }
        }
        return nestedMap;
    }
}