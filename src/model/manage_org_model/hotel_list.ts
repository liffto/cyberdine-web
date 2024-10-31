export class Restaurant {
    address: string | null = null;
    businessType: string | null = null;
    customerDetails: boolean = false;
    fcmTopic: string | null = null;
    haddress: string | null = null;
    hcolor: string | null = null;
    hname: string | null = null;
    hphone: string | null = null;
    id: string | null = null;
    isNoticifation: boolean = false;
    isPayCompleted: boolean = false;
    logo: string | null = null;
    plan: string | null = null;
    ratingLimit: boolean = false;
    table: number | null = null;
    fcmToken: string | null = null;

    constructor(data?: Restaurant) {
        if (data) {
            this.address = data.address;
            this.businessType = data.businessType;
            this.customerDetails = data.customerDetails;
            this.fcmTopic = data.fcmTopic;
            this.haddress = data.haddress;
            this.hcolor = data.hcolor;
            this.hname = data.hname;
            this.hphone = data.hphone;
            this.id = data.id;
            this.isNoticifation = data.isNoticifation;
            this.isPayCompleted = data.isPayCompleted;
            this.logo = data.logo;
            this.plan = data.plan;
            this.ratingLimit = data.ratingLimit;
            this.table = data.table;
            this.fcmToken = data.fcmToken;
        }
    }
}


export class FoodItem {
    category: string | null = null;
    description: string | null = null;
    foodType: string | null = null;
    id: string | null = null;
    isActive: boolean = false;
    isSpecial: boolean = false;
    itemsImageUrl: string | null = null;
    imagePath: string | null = null;
    name: string | null = null;
    price: number | null = null;

    constructor(data?: Partial<FoodItem>) {
        if (data) {
            this.category = data.category ?? this.category;
            this.description = data.description ?? this.description;
            this.foodType = data.foodType ?? this.foodType;
            this.id = data.id ?? this.id;
            this.isActive = data.isActive ?? this.isActive;
            this.isSpecial = data.isSpecial ?? this.isSpecial;
            this.itemsImageUrl = data.itemsImageUrl ?? this.itemsImageUrl;
            this.imagePath = data.imagePath ?? this.imagePath;
            this.name = data.name ?? this.name;
            this.price = data.price ?? this.price;
        }
    }
}
