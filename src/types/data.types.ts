
export type Category = {
    id: string;
    name: string;
    image: string;
};

export type Dish = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    restaurantId: string;
};

export type Restaurant = {
    id: string;
    name: string;
    image: string;
    categoryId: string;
    address: string;
    lat: number;
    lng: number;
    rating: number;
    reviews: number;
    description: string;
    dishes: Dish[];
    deliveryFee: number;
};


