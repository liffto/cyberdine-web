export class Item {
    category: string | null = null;
    id: string | null = null;
    isActive: boolean | null = null;
    isSpecial: boolean | null = null;
    itemsImageUrl: string | null = null;
    name: string | null = null;
    foodType: string | null = null;
    description: string | null = null;
    price: number | null = null;
    quantity: number | null = null;

    constructor(data?: Item) {
        if (data) {
            this.category = data.category;
            this.id = data.id;
            this.isActive = data.isActive;
            this.isSpecial = data.isSpecial;
            this.itemsImageUrl = data.itemsImageUrl;
            this.name = data.name;
            this.foodType = data.foodType;
            this.description = data.description;
            this.price = data.price;
            this.quantity = data.quantity;
        }
    }

    capitalizeNameFirstLetter = () => {
        return this.name!.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

    capitalizeDescriptionFirstLetter = () => {
        return this.description &&  this.description!.charAt(0).toUpperCase() + this.description!.slice(1).toLowerCase();
    }
}