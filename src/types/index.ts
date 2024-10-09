export interface ThemeState {
  theme: string
  toggleTheme: () => void
}

export interface CartState {
  items: CartProduct[]
  cartQuantity: number
  addItem: (item: CartProduct) => void
  removeItem: (_id: string) => void
  updateItem: (_id: string, updatedItem: Partial<CartProduct>) => void
  clearCart: () => void
  sort: string
  setSortOption: (option: string) => void
}

export interface CartProduct {
  _id: string | undefined
  quantity: number
  imgSrc: string
  name: string
  price: number
}

export interface ResponseProduct {
  status: string
  data: ProductData
}

export interface ProductData {
  product: Product
}

export interface Product {
  rating: Rating
  _id: string
  category: Category
  subcategory: Subcategory
  name: string
  price: number
  quantity: number
  brand: string
  discount: number
  description: string
  thumbnail: string
  images?: string[] | null
  createdAt: string
  updatedAt: string
  slugname: string
  __v: number
}

export interface AuthformData {
  password?: string
  createpassword?: string
  repeatpassword?: string | null
  username: string
}

export interface Rating {
  rate: number
  count: number
}

export interface Subcategory {
  _id: string
  category: string
  name: string
  createdAt: string
  updatedAt: string
  slugname: string
  __v: number
}

export type TResponseLogin = {
  status: string
  token: Token
  data: LoginData
}
export interface Token {
  accessToken: string
  refreshToken: string
}
export interface LoginData {
  data: userData
  token: Token
}

export interface userData {
  user: User
}

export interface User {
  _id: string
  firstname: string
  lastname: string
  username: string
  password: string
  phoneNumber: string
  address: string
  wishlist?: null[] | null
  role: string
  createdAt: string
  updatedAt: string
  __v: number
  refreshToken?: string
}

export type TResponseGenerateRefreshToken = {
  status: string
  token: Token
}
export interface Token {
  accessToken: string
}

export type TResponseGetAllCategories = {
  status: string
  page: number
  per_page: number
  total: number
  total_pages: number
  data: GetAllCategoriesData
}

export interface GetAllCategoriesData {
  categories?: CategoriesEntity[] | null
}

export interface CategoriesEntity {
  _id: string
  name: string
  icon: string
  createdAt: string
  updatedAt: string
  slugname: string
}

export interface ResponseGetCategoryById {
  status: string
  data: GetCategoryByIdData
}
export interface GetCategoryByIdData {
  category: Category
}
export interface Category {
  _id: string
  name: string
  icon: string
  createdAt: string
  updatedAt: string
  slugname: string
  __v: number
}

export type TResponseGetAllSubCategories = {
  status: string
  page: number
  per_page: number
  total: number
  total_pages: number
  data: SubcategoryByIdData
}

export interface ResponseGetSubcategoryById {
  status: string
  data: SubcategoryByIdData
}
export interface SubcategoryByIdData {
  subcategories: SubcategoryById[]
}
export interface SubcategoryById {
  _id: string
  category: Category
  name: string
  createdAt: string
  updatedAt: string
  slugname: string
  __v: number
}

export interface RequestOrder {
  user: string
  products?: ProductsEntity[] | null
  deliveryStatus: boolean
}
export interface ProductsEntity {
  product: string | Product
  count: number
  _id?: string
}

export interface ResponseGetOrderById {
  status: string
  data: OrderData
}
export interface OrderData {
  orders: Order[]
}
export interface Order {
  _id: string
  user: User
  products?: ProductsEntity[] | null
  totalPrice: number
  deliveryDate: string
  deliveryStatus: boolean
  createdAt: string
  updatedAt: string
  __v?: number
}

export type TAllProductsResponse = {
  status: string
  page: number
  per_page: number
  total: number
  total_pages: number
  data: GetAllProductsData
}
export interface GetAllProductsData {
  products?: GeneralProductsEntity[]
}

export interface GeneralProductsEntity {
  rating: Rating
  _id: string | undefined
  category: Category
  subcategory: Subcategory
  name: string
  price: number
  quantity: number
  brand: string
  discount: number
  description: string
  thumbnail: string
  images?: string[] | null | undefined
  createdAt: string
  updatedAt: string
  slugname: string
}

export type TAllOrderResponse = {
  status: string
  page: number
  per_page: number
  total: number
  total_pages: number
  data: OrderData
}

export type TGetData = TAllOrderResponse & TAllProductsResponse

export type TResponseCreatingUser = {
  status: string
  data: UserData
}
export interface UserData {
  user: User
}

export interface LoginForm {
  username: string
  password: string
}

export interface SignUpForm extends LoginForm {
  firstname: string
  lastname: string
  phoneNumber: string
  address: string
}

export type AuthForm = LoginForm | SignUpForm

export type TResponseGetUser = {
  status: string
  data: GetUserData
}
export interface GetUserData {
  user: User
}

export interface TOrderRequest {
  user: string
  products?: OrderProductsEntity[] | null
  deliveryStatus: boolean
}
export interface OrderProductsEntity {
  product: string
  count: number
}
