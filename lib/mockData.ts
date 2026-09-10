export interface MockCategory {
  id: string;
  name: string;
  image: string;
}

export interface MockFood {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  imageUrl: string;
  categoryId: string;
  categoryName: string;
  isPopular?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  avatar: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
}

export interface MockOrderItem {
  id: string;
  orderId: string;
  foodId: string;
  food: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  };
  quantity: number;
  price: number;
  createdAt: string;
}

export interface MockOrderInfo {
  id: string;
  orderId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  notes?: string;
  createdAt: string;
}

export interface MockOrder {
  id: string;
  guestId: string;
  total: number;
  status: "Completed" | "pending" | "Canceled";
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items: MockOrderItem[];
  info: MockOrderInfo;
}

export const INITIAL_CATEGORIES: MockCategory[] = [
  { id: "burger", name: "burger", image: "/p2.png" },
  { id: "pizza", name: "pizza", image: "/pizza1.jpg" },
  { id: "chicken", name: "chicken", image: "/pot.png" },
  { id: "ramen", name: "ramen", image: "/ham.png" },
  { id: "plates", name: "plates", image: "/sb.png" },
  { id: "dessert", name: "dessert", image: "/pot.png" },
];

export const INITIAL_FOODS: MockFood[] = [
  {
    id: "food-1",
    name: "Classic Cheeseburger",
    description: "Juicy prime beef patty, melted cheddar, crisp lettuce, fresh tomato, and house secret sauce on a toasted brioche bun.",
    price: 12.99,
    weight: "320 g",
    imageUrl: "/b.png",
    categoryId: "burger",
    categoryName: "burger",
    isPopular: true,
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "food-2",
    name: "Double Bacon Deluxe",
    description: "Two smashed beef patties, smoked crispy bacon, caramelized onions, and barbecue sauce on a buttered sesame bun.",
    price: 15.50,
    weight: "380 g",
    imageUrl: "/p2.png",
    categoryId: "burger",
    categoryName: "burger",
    isPopular: true,
    createdAt: "2026-03-01T10:05:00Z",
    updatedAt: "2026-03-01T10:05:00Z",
  },
  {
    id: "food-3",
    name: "Crispy Pepperoni Pizza",
    description: "Hand-stretched artisanal dough topped with Italian tomato marinara, fresh mozzarella, and cup-and-char pepperoni slices.",
    price: 18.00,
    weight: "550 g",
    imageUrl: "/pizza1.jpg",
    categoryId: "pizza",
    categoryName: "pizza",
    isPopular: true,
    createdAt: "2026-03-01T10:10:00Z",
    updatedAt: "2026-03-01T10:10:00Z",
  },
  {
    id: "food-4",
    name: "Margherita Tradizionale",
    description: "Classic Neapolitan style pizza with sweet San Marzano tomatoes, whole milk buffalo mozzarella, and fresh sweet basil leaves.",
    price: 14.50,
    weight: "480 g",
    imageUrl: "/p.png",
    categoryId: "pizza",
    categoryName: "pizza",
    isPopular: false,
    createdAt: "2026-03-01T10:15:00Z",
    updatedAt: "2026-03-01T10:15:00Z",
  },
  {
    id: "food-5",
    name: "Smokey BBQ Chicken Pizza",
    description: "Tender fire-roasted chicken strips, sweet BBQ sauce swirl, red onions, cilantro, and smoked gouda cheese blend.",
    price: 17.50,
    weight: "520 g",
    imageUrl: "/p2.png",
    categoryId: "pizza",
    categoryName: "pizza",
    isPopular: true,
    createdAt: "2026-03-01T10:20:00Z",
    updatedAt: "2026-03-01T10:20:00Z",
  },
  {
    id: "food-6",
    name: "Truffle Mushroom Pizza",
    description: "Wild portobello and cremini mushrooms, white truffle oil glaze, creamy ricotta cheese, and freshly cracked black pepper.",
    price: 19.99,
    weight: "500 g",
    imageUrl: "/p3.png",
    categoryId: "pizza",
    categoryName: "pizza",
    isPopular: true,
    createdAt: "2026-03-01T10:25:00Z",
    updatedAt: "2026-03-01T10:25:00Z",
  },
  {
    id: "food-7",
    name: "Golden Fried Chicken Basket",
    description: "Ultra-crispy buttermilk soaked chicken fried to golden perfection, served with sweet honey mustard and garlic dip.",
    price: 13.99,
    weight: "400 g",
    imageUrl: "/ch.png",
    categoryId: "chicken",
    categoryName: "chicken",
    isPopular: true,
    createdAt: "2026-03-01T10:30:00Z",
    updatedAt: "2026-03-01T10:30:00Z",
  },
  {
    id: "food-8",
    name: "Fiery Buffalo Wings",
    description: "Tossed in authentic spicy cayenne buffalo glaze, served with blue cheese dip and crunchy fresh celery sticks.",
    price: 11.50,
    weight: "350 g",
    imageUrl: "/ch2.png",
    categoryId: "chicken",
    categoryName: "chicken",
    isPopular: false,
    createdAt: "2026-03-01T10:35:00Z",
    updatedAt: "2026-03-01T10:35:00Z",
  },
  {
    id: "food-9",
    name: "Crispy Chicken Tenders",
    description: "Hand-breaded whole white meat chicken breast strips served with smokey barbecue sauce and seasoned fries.",
    price: 12.00,
    weight: "320 g",
    imageUrl: "/ch3.png",
    categoryId: "chicken",
    categoryName: "chicken",
    isPopular: true,
    createdAt: "2026-03-01T10:40:00Z",
    updatedAt: "2026-03-01T10:40:00Z",
  },
  {
    id: "food-10",
    name: "Tonkotsu Pork Ramen",
    description: "Rich 16-hour simmered pork bone broth, wavy ramen noodles, chashu pork belly, ajitsuke tamago egg, and scallions.",
    price: 16.50,
    weight: "650 g",
    imageUrl: "/ham.png",
    categoryId: "ramen",
    categoryName: "ramen",
    isPopular: true,
    createdAt: "2026-03-01T10:45:00Z",
    updatedAt: "2026-03-01T10:45:00Z",
  },
  {
    id: "food-11",
    name: "Spicy Miso Ramen",
    description: "Fermented red miso broth with chili oil, ground pork, sweet corn, nori sheets, bamboo shoots, and sesame seeds.",
    price: 15.99,
    weight: "630 g",
    imageUrl: "/sb.png",
    categoryId: "ramen",
    categoryName: "ramen",
    isPopular: true,
    createdAt: "2026-03-01T10:50:00Z",
    updatedAt: "2026-03-01T10:50:00Z",
  },
  {
    id: "food-12",
    name: "Grilled Ribeye Steak Plate",
    description: "Prime black Angus steak charbroiled to medium-rare, served with garlic herb butter, roasted asparagus, and mashed potatoes.",
    price: 24.99,
    weight: "500 g",
    imageUrl: "/richa.png",
    categoryId: "plates",
    categoryName: "plates",
    isPopular: true,
    createdAt: "2026-03-01T10:55:00Z",
    updatedAt: "2026-03-01T10:55:00Z",
  },
  {
    id: "food-13",
    name: "Mediterranean Harvest Bowl",
    description: "Warm quinoa, roasted chickpeas, cucumber, cherry tomatoes, kalamata olives, crumbled feta cheese, and lemon tahini dressing.",
    price: 13.50,
    weight: "420 g",
    imageUrl: "/veg.png",
    categoryId: "plates",
    categoryName: "plates",
    isPopular: false,
    createdAt: "2026-03-01T11:00:00Z",
    updatedAt: "2026-03-01T11:00:00Z",
  },
  {
    id: "food-14",
    name: "Molten Chocolate Lava Cake",
    description: "Decadent warm chocolate cake with a gooey liquid fudge core, dusted with powdered sugar and served warm.",
    price: 8.50,
    weight: "180 g",
    imageUrl: "/pot.png",
    categoryId: "dessert",
    categoryName: "dessert",
    isPopular: true,
    createdAt: "2026-03-01T11:05:00Z",
    updatedAt: "2026-03-01T11:05:00Z",
  },
  {
    id: "food-15",
    name: "Caramel Cheesecake Slice",
    description: "New York style velvety cheesecake on a graham cracker crust, drizzled with sea salt dulce de leche caramel.",
    price: 7.99,
    weight: "200 g",
    imageUrl: "/m.png",
    categoryId: "dessert",
    categoryName: "dessert",
    isPopular: false,
    createdAt: "2026-03-01T11:10:00Z",
    updatedAt: "2026-03-01T11:10:00Z",
  },
  {
    id: "food-16",
    name: "Artisanal Gelato Trio",
    description: "Three generous scoops of handcrafted Italian gelato: Madagascar Vanilla, Dark Chocolate Truffle, and Wild Pistachio.",
    price: 6.99,
    weight: "220 g",
    imageUrl: "/z.png",
    categoryId: "dessert",
    categoryName: "dessert",
    isPopular: true,
    createdAt: "2026-03-01T11:15:00Z",
    updatedAt: "2026-03-01T11:15:00Z",
  },
];

export const INITIAL_ORDERS: MockOrder[] = [
  {
    id: "ord-801",
    guestId: "guest-default",
    total: 30.99,
    status: "Completed",
    fullName: "Alex Johnson",
    email: "alex@example.com",
    phoneNumber: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace",
    city: "Springfield",
    notes: "Leave by front porch please.",
    createdAt: "2026-03-09T18:45:00Z",
    updatedAt: "2026-03-09T19:20:00Z",
    items: [
      {
        id: "item-801-1",
        orderId: "ord-801",
        foodId: "food-1",
        food: {
          id: "food-1",
          name: "Classic Cheeseburger",
          imageUrl: "/b.png",
          price: 12.99,
        },
        quantity: 1,
        price: 12.99,
        createdAt: "2026-03-09T18:45:00Z",
      },
      {
        id: "food-3",
        orderId: "ord-801",
        foodId: "food-3",
        food: {
          id: "food-3",
          name: "Crispy Pepperoni Pizza",
          imageUrl: "/pizza1.jpg",
          price: 18.00,
        },
        quantity: 1,
        price: 18.00,
        createdAt: "2026-03-09T18:45:00Z",
      },
    ],
    info: {
      id: "info-801",
      orderId: "ord-801",
      fullName: "Alex Johnson",
      email: "alex@example.com",
      phoneNumber: "+1 (555) 234-5678",
      address: "742 Evergreen Terrace",
      city: "Springfield",
      notes: "Leave by front porch please.",
      createdAt: "2026-03-09T18:45:00Z",
    },
  },
  {
    id: "ord-802",
    guestId: "guest-maria",
    total: 42.49,
    status: "Completed",
    fullName: "Maria Lopez",
    email: "maria.lopez@foodblog.com",
    phoneNumber: "+1 (555) 987-6543",
    address: "10880 Wilshire Blvd #1101",
    city: "Los Angeles",
    notes: "Please call upon arrival.",
    createdAt: "2026-03-09T19:15:00Z",
    updatedAt: "2026-03-09T19:50:00Z",
    items: [
      {
        id: "item-802-1",
        orderId: "ord-802",
        foodId: "food-12",
        food: {
          id: "food-12",
          name: "Grilled Ribeye Steak Plate",
          imageUrl: "/richa.png",
          price: 24.99,
        },
        quantity: 1,
        price: 24.99,
        createdAt: "2026-03-09T19:15:00Z",
      },
      {
        id: "item-802-2",
        orderId: "ord-802",
        foodId: "food-5",
        food: {
          id: "food-5",
          name: "Smokey BBQ Chicken Pizza",
          imageUrl: "/p2.png",
          price: 17.50,
        },
        quantity: 1,
        price: 17.50,
        createdAt: "2026-03-09T19:15:00Z",
      },
    ],
    info: {
      id: "info-802",
      orderId: "ord-802",
      fullName: "Maria Lopez",
      email: "maria.lopez@foodblog.com",
      phoneNumber: "+1 (555) 987-6543",
      address: "10880 Wilshire Blvd #1101",
      city: "Los Angeles",
      notes: "Please call upon arrival.",
      createdAt: "2026-03-09T19:15:00Z",
    },
  },
  {
    id: "ord-803",
    guestId: "guest-james",
    total: 28.50,
    status: "pending",
    fullName: "James Carter",
    email: "james.carter@tech.co",
    phoneNumber: "+1 (555) 345-6789",
    address: "450 Sutter Street",
    city: "San Francisco",
    notes: "Extra napkins please.",
    createdAt: "2026-03-10T00:10:00Z",
    updatedAt: "2026-03-10T00:10:00Z",
    items: [
      {
        id: "item-803-1",
        orderId: "ord-803",
        foodId: "food-10",
        food: {
          id: "food-10",
          name: "Tonkotsu Pork Ramen",
          imageUrl: "/ham.png",
          price: 16.50,
        },
        quantity: 1,
        price: 16.50,
        createdAt: "2026-03-10T00:10:00Z",
      },
      {
        id: "item-803-2",
        orderId: "ord-803",
        foodId: "food-9",
        food: {
          id: "food-9",
          name: "Crispy Chicken Tenders",
          imageUrl: "/ch3.png",
          price: 12.00,
        },
        quantity: 1,
        price: 12.00,
        createdAt: "2026-03-10T00:10:00Z",
      },
    ],
    info: {
      id: "info-803",
      orderId: "ord-803",
      fullName: "James Carter",
      email: "james.carter@tech.co",
      phoneNumber: "+1 (555) 345-6789",
      address: "450 Sutter Street",
      city: "San Francisco",
      notes: "Extra napkins please.",
      createdAt: "2026-03-10T00:10:00Z",
    },
  },
  {
    id: "ord-804",
    guestId: "guest-sophia",
    total: 35.49,
    status: "Completed",
    fullName: "Sophia Chen",
    email: "sophia.chen@design.org",
    phoneNumber: "+1 (555) 432-1098",
    address: "210 5th Avenue, Suite 600",
    city: "New York",
    notes: "Ring the buzzer for 6th floor.",
    createdAt: "2026-03-09T14:30:00Z",
    updatedAt: "2026-03-09T15:10:00Z",
    items: [
      {
        id: "item-804-1",
        orderId: "ord-804",
        foodId: "food-6",
        food: {
          id: "food-6",
          name: "Truffle Mushroom Pizza",
          imageUrl: "/p3.png",
          price: 19.99,
        },
        quantity: 1,
        price: 19.99,
        createdAt: "2026-03-09T14:30:00Z",
      },
      {
        id: "item-804-2",
        orderId: "ord-804",
        foodId: "food-2",
        food: {
          id: "food-2",
          name: "Double Bacon Deluxe",
          imageUrl: "/p2.png",
          price: 15.50,
        },
        quantity: 1,
        price: 15.50,
        createdAt: "2026-03-09T14:30:00Z",
      },
    ],
    info: {
      id: "info-804",
      orderId: "ord-804",
      fullName: "Sophia Chen",
      email: "sophia.chen@design.org",
      phoneNumber: "+1 (555) 432-1098",
      address: "210 5th Avenue, Suite 600",
      city: "New York",
      notes: "Ring the buzzer for 6th floor.",
      createdAt: "2026-03-09T14:30:00Z",
    },
  },
  {
    id: "ord-805",
    guestId: "guest-david",
    total: 20.48,
    status: "Canceled",
    fullName: "David Miller",
    email: "david.m@workspace.io",
    phoneNumber: "+1 (555) 789-0123",
    address: "88 Colin P Kelly Jr St",
    city: "San Francisco",
    notes: "Cancel requested by customer.",
    createdAt: "2026-03-08T12:00:00Z",
    updatedAt: "2026-03-08T12:15:00Z",
    items: [
      {
        id: "item-805-1",
        orderId: "ord-805",
        foodId: "food-8",
        food: {
          id: "food-8",
          name: "Fiery Buffalo Wings",
          imageUrl: "/ch2.png",
          price: 11.50,
        },
        quantity: 1,
        price: 11.50,
        createdAt: "2026-03-08T12:00:00Z",
      },
      {
        id: "item-805-2",
        orderId: "ord-805",
        foodId: "food-14",
        food: {
          id: "food-14",
          name: "Molten Chocolate Lava Cake",
          imageUrl: "/pot.png",
          price: 8.98,
        },
        quantity: 1,
        price: 8.98,
        createdAt: "2026-03-08T12:00:00Z",
      },
    ],
    info: {
      id: "info-805",
      orderId: "ord-805",
      fullName: "David Miller",
      email: "david.m@workspace.io",
      phoneNumber: "+1 (555) 789-0123",
      address: "88 Colin P Kelly Jr St",
      city: "San Francisco",
      notes: "Cancel requested by customer.",
      createdAt: "2026-03-08T12:00:00Z",
    },
  },
];

export const MOCK_USERS: MockUser[] = [
  {
    id: "u_admin",
    name: "Chef Mario (Admin)",
    email: "admin@pepper.com",
    role: "admin",
    avatar: "/chef1.png",
    phoneNumber: "+1 (555) 888-9999",
    address: "Pepper Restaurant HQ, 100 Main St",
    city: "New York",
  },
  {
    id: "u_customer",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "customer",
    avatar: "/chef2.png",
    phoneNumber: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace",
    city: "Springfield",
  },
];
