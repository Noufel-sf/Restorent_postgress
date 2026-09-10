import { Food, OrderInfoInput } from './../Utils/Types';
import api from "../Utils/api";

export const RestaurantServices = {
  getAllOrders: () => api.get("/orders").then(res => res.data),
  MakeOrder: (data: OrderInfoInput) => api.post("/orders", data).then(res => res.data),
  deleteOrder: (id: string) => api.delete(`/orders/${id}`).then(res => res.data),
  getLatestOrder: () => api.get(`/orders/latest`).then(res => res.data),
  getCart: () => api.get("/cart").then(res => res.data),
  AddToCart: (foodId: string) => api.post("/cart", { foodId }).then(res => res.data),
  updateCartItem: (itemId: string, quantity: number) => api.put(`/cart/${itemId}`, { quantity }).then(res => res.data),
  removeCartItem: (itemId: string) => api.delete(`/cart/${itemId}`).then(res => res.data),
  getAllFoods: () => api.get("/foods").then(res => res.data),
  AddFood: (data: FormData) => api.post("/foods", data).then(res => res.data),
  updateFood: (id: string, data: Food) => api.put(`/foods/${id}`, data).then(res => res.data),
  deleteFood: (id: string) => api.delete(`/foods/${id}`).then(res => res.data),
};
