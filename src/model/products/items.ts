export class Item {
    category: string | null = null;
    id: string| null = null;
    isActive: boolean | null = null;
    isSpecial: boolean | null = null;
    itemsImageUrl: string | null = null;
    name: string | null = null;
    foodType: string | null = null;
    description: string | null = null;
    price: number | null = null;

    constructor(data?: Item) {
        if(data){
            this.category = data.category;
            this.id = data.id;
            this.isActive = data.isActive;
            this.isSpecial = data.isSpecial;
            this.itemsImageUrl = data.itemsImageUrl;
            this.name = data.name;
            this.foodType = data.foodType;
            this.description = data.description;
            this.price = data.price;
        }
    }
}