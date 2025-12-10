// lib/types.ts or components/Utils/Types.ts

export type Food = {
  id?: string;
  name: string;
  description?: string | null;
  price: number;
  weight?: string | null;
  imageUrl?: string;
  categoryId: string;
  categoryName?: string | null;
  isPopular?: boolean;
  createdAt?: Date | null;
  updatedAt?: Date;
};

export type Offer = {
  id: string;
  name: string;
  description: string;
  discount?: number;
  price: string;
  image: string;
  bgColor?: string;
};



export type OrderItemType = {
  id: string;
  orderId: string;
  food: Food;
  quantity: number;
  price: number;
};

export type OrderInfoType = {
  id: string;
  orderId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  notes?: string;
  createdAt: string;
};

export type OrderInfoInput = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  notes?: string;
};

export type OrderType = {
  id: string;
  guestId: string;
  fullName:string ;
  notes?: string ;
  phoneNumber:string ;
  email:string ;
  address:string;
  total: number;
  city:string ;
  status:  "Completed" | "pending" | "Canceled";
  info: OrderInfoType;
  createdAt: string;
  updatedAt: string;
  items: OrderItemType[];
};


export type CategoryType = {
  id: string;
  name: string;
  imageUrl?: string;
};

export type CartItemType = {
  id: string;
  name: string;
  imageUrl: string;
  color?: string;
  food: Food;
  foodId: string;
  price: number;
  quantity: number;
};