import {
  INITIAL_CATEGORIES,
  INITIAL_FOODS,
  INITIAL_ORDERS,
  MockCategory,
  MockFood,
  MockOrder,
  MockOrderItem,
} from "./mockData";

export interface MockCartItem {
  id: string;
  cartId: string;
  foodId: string;
  food: MockFood;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface MockCart {
  id: string;
  guestId: string;
  items: MockCartItem[];
}

interface StoreState {
  categories: MockCategory[];
  foods: MockFood[];
  orders: MockOrder[];
  carts: Map<string, MockCartItem[]>;
}

declare global {
  // eslint-disable-next-line no-var
  var __mockRestaurantStore__: StoreState | undefined;
}

function getInitialState(): StoreState {
  return {
    categories: [...INITIAL_CATEGORIES],
    foods: [...INITIAL_FOODS],
    orders: [...INITIAL_ORDERS],
    carts: new Map<string, MockCartItem[]>(),
  };
}

const state: StoreState =
  globalThis.__mockRestaurantStore__ ?? (globalThis.__mockRestaurantStore__ = getInitialState());

export const mockStore = {
  // Categories
  getCategories: (): MockCategory[] => {
    return state.categories;
  },

  // Foods
  getAllFoods: (page = 1, limit = 6, categoryName?: string) => {
    let list = [...state.foods];

    if (categoryName && categoryName !== "All" && categoryName !== "all") {
      const target = categoryName.toLowerCase().trim();
      list = list.filter(
        (f) =>
          f.categoryName.toLowerCase() === target ||
          f.categoryId.toLowerCase() === target
      );
    }

    const totalItems = list.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const offset = (page - 1) * limit;
    const items = list.slice(offset, offset + limit);

    return {
      items,
      totalItems,
      totalPages,
      currentPage: page,
    };
  },

  getHomeFoods: (limit = 3): MockFood[] => {
    const popular = state.foods.filter((f) => f.isPopular);
    return popular.length >= limit ? popular.slice(0, limit) : state.foods.slice(0, limit);
  },

  getFoodById: (id: string): MockFood | undefined => {
    return state.foods.find((f) => f.id === id);
  },

  getSuggestedFoods: (categoryId: string, currentId: string, limit = 6): MockFood[] => {
    return state.foods
      .filter((f) => f.categoryId === categoryId && f.id !== currentId)
      .slice(0, limit);
  },

  addFood: (foodData: Partial<MockFood>): MockFood => {
    const category = state.categories.find((c) => c.id === foodData.categoryId);
    const newFood: MockFood = {
      id: `food-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: foodData.name || "Untitled Food",
      description: foodData.description || "",
      price: Number(foodData.price) || 9.99,
      weight: foodData.weight || "300 g",
      imageUrl: foodData.imageUrl || "/pizza1.jpg",
      categoryId: foodData.categoryId || "burger",
      categoryName: category?.name || foodData.categoryId || "burger",
      isPopular: foodData.isPopular ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    state.foods.unshift(newFood);
    return newFood;
  },

  updateFood: (id: string, updates: Partial<MockFood>): MockFood | null => {
    const index = state.foods.findIndex((f) => f.id === id);
    if (index === -1) return null;

    const existing = state.foods[index];
    const category = updates.categoryId
      ? state.categories.find((c) => c.id === updates.categoryId)
      : undefined;

    const updated: MockFood = {
      ...existing,
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : existing.price,
      categoryName: category ? category.name : existing.categoryName,
      updatedAt: new Date().toISOString(),
    };

    state.foods[index] = updated;
    return updated;
  },

  deleteFood: (id: string): boolean => {
    const initialLen = state.foods.length;
    state.foods = state.foods.filter((f) => f.id !== id);
    return state.foods.length < initialLen;
  },

  // Cart
  getCart: (guestId: string): MockCart => {
    const items = state.carts.get(guestId) || [];
    return {
      id: `cart-${guestId}`,
      guestId,
      items,
    };
  },

  addToCart: (guestId: string, foodId: string, quantity = 1): MockCartItem | null => {
    const food = state.foods.find((f) => f.id === foodId);
    if (!food) return null;

    let items = state.carts.get(guestId);
    if (!items) {
      items = [];
      state.carts.set(guestId, items);
    }

    const existingItem = items.find((i) => i.foodId === foodId);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.updatedAt = new Date().toISOString();
      return existingItem;
    }

    const newItem: MockCartItem = {
      id: `cart-item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      cartId: `cart-${guestId}`,
      foodId,
      food,
      quantity,
      price: food.price,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    items.push(newItem);
    return newItem;
  },

  updateCartItem: (guestId: string, itemId: string, quantity: number): MockCartItem | null => {
    const items = state.carts.get(guestId);
    if (!items) return null;

    const item = items.find((i) => i.id === itemId);
    if (!item) return null;

    if (quantity <= 0) {
      state.carts.set(
        guestId,
        items.filter((i) => i.id !== itemId)
      );
      return null;
    }

    item.quantity = quantity;
    item.updatedAt = new Date().toISOString();
    return item;
  },

  removeCartItem: (guestId: string, itemId: string): boolean => {
    const items = state.carts.get(guestId);
    if (!items) return false;

    const filtered = items.filter((i) => i.id !== itemId);
    state.carts.set(guestId, filtered);
    return true;
  },

  clearCart: (guestId: string): void => {
    state.carts.set(guestId, []);
  },

  // Orders
  getAllOrders: (): MockOrder[] => {
    return state.orders;
  },

  getOrderById: (id: string): MockOrder | undefined => {
    return state.orders.find((o) => o.id === id);
  },

  getLatestOrder: (guestId: string): MockOrder | undefined => {
    const userOrders = state.orders.filter((o) => o.guestId === guestId);
    if (userOrders.length > 0) {
      return userOrders[0]; // orders are sorted newest first
    }
    // Fallback to most recent order overall if guest has no specific order
    return state.orders[0];
  },

  createOrder: (data: {
    guestId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    notes?: string;
  }): MockOrder => {
    const cart = mockStore.getCart(data.guestId);
    const cartItems = cart.items.length > 0 ? cart.items : [
      // Fallback if cart was somehow empty in a quick demo
      {
        id: "demo-item",
        cartId: `cart-${data.guestId}`,
        foodId: state.foods[0].id,
        food: state.foods[0],
        quantity: 1,
        price: state.foods[0].price,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const orderId = `ord-${Date.now().toString().slice(-4)}`;
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const orderItems: MockOrderItem[] = cartItems.map((item) => ({
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      orderId,
      foodId: item.foodId,
      food: {
        id: item.food.id,
        name: item.food.name,
        imageUrl: item.food.imageUrl,
        price: item.food.price,
      },
      quantity: item.quantity,
      price: item.price,
      createdAt: new Date().toISOString(),
    }));

    const newOrder: MockOrder = {
      id: orderId,
      guestId: data.guestId,
      total,
      status: "pending",
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      city: data.city,
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: orderItems,
      info: {
        id: `info-${orderId}`,
        orderId,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        notes: data.notes,
        createdAt: new Date().toISOString(),
      },
    };

    state.orders.unshift(newOrder);
    mockStore.clearCart(data.guestId);

    return newOrder;
  },

  deleteOrder: (id: string): boolean => {
    const len = state.orders.length;
    state.orders = state.orders.filter((o) => o.id !== id);
    return state.orders.length < len;
  },
};
