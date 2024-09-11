export interface ThemeState {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export interface CartState {
  items: Product[];
  cartQuantity: number;
  addItem: (item: Product) => void;
  removeItem: (name: string) => void;
  updateItem: (name: string, updatedItem: Partial<Item>) => void;
  adjustQuantity: (name: string, quantity: number) => void;
}

export interface ResponseProduct {
  status: string;
  data: ProductData;
}

export interface ProductData {
  product: Product;
}

export interface Product {
  rating: Rating;
  _id: string;
  category: Category;
  subcategory: Subcategory;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  discount: number;
  description: string;
  thumbnail: string;
  images?: string[] | null;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}
export interface Rating {
  rate: number;
  count: number;
}

export interface Subcategory {
  _id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

export interface ResponseLogin {
  status: string;
  token: Token;
  data: LoginData;
}
export interface Token {
  accessToken: string;
  refreshToken: string;
}
export interface LoginData {
  user: User;
}
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  wishlist?: null[] | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken?: string;
}

export interface ResponseGenerateRefreshToken {
  status: string;
  token: Token;
}
export interface Token {
  accessToken: string;
}

export interface ResponseGetAllCategories {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: GetAllCategoriesData;
}

export interface GetAllCategoriesData {
  categories?: CategoriesEntity[] | null;
}

export interface CategoriesEntity {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

export interface ResponseGetCategoryById {
  status: string;
  data: GetCategoryByIdData;
}
export interface GetCategoryByIdData {
  category: Category;
}
export interface Category {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

export interface ResponseGetSubcategoryById {
  status: string;
  data: SubcategoryByIdData;
}
export interface SubcategoryByIdData {
  subcategory: SubcategoryById;
}
export interface SubcategoryById {
  _id: string;
  category: Category;
  name: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

export interface RequestOrder {
  user: string;
  products?: ProductsEntity[] | null;
  deliveryStatus: boolean;
}
export interface ProductsEntity {
  product: string | Product;
  count: number;
  _id?: string;
}

export interface ResponseGetOrderById {
  status: string;
  data: OrderData;
}
export interface OrderData {
  order: Order;
}
export interface Order {
  _id: string;
  user: User;
  products?: ProductsEntity[] | null;
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Root {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data;
}
export interface Data {
  orders?: Order[] | null;
}
