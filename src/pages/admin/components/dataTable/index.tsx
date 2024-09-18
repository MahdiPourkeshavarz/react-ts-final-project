/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  CategoriesEntity,
  GeneralProductsEntity,
  Order,
  Product,
  SubcategoryById,
  TAllOrderResponse,
  TAllProductsResponse,
  TResponseGetAllCategories,
  TResponseGetAllSubCategories,
} from "../../../../types";
import { useGetData } from "../../../../hooks/useGetAction";
import { API_ROUTES } from "../../../../constants";
import { useStore } from "../../../../context/shopStore";

// const saveProductChanges = async (updatedProduct: Product) => {
//   await httpRequest.put(`/api/products/${updatedProduct._id}`, updatedProduct);
// };

interface TableProps {
  selected: string;
}

export function DataTable({ selected }: TableProps) {
  const { theme } = useStore();
  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [endpoint, setEndpoint] = useState(
    `${
      selected === "کالاها"
        ? API_ROUTES.PRODUCT_BASE
        : selected === "سفارش ها"
        ? API_ROUTES.ORDERS_BASE
        : API_ROUTES.PRODUCT_BASE
    }`
  );

  const [categoryId, setcategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subEndpoint, setSubEndpoint] = useState("");

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetData<TAllProductsResponse>(endpoint);

  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
  } = useGetData<TAllOrderResponse>(endpoint);

  const { data: categoriesList } = useGetData<TResponseGetAllCategories>(
    API_ROUTES.CATEGORY_BASE
  );

  const { data: subcategoriesList } =
    useGetData<TResponseGetAllSubCategories>(subEndpoint);

  // const handleSave = () => {
  //   if (editingProduct) {
  //     mutation.mutate(editingProduct);
  //     setEditingProduct(null);
  //   }
  // };

  useEffect(() => {
    const baseEndpoint =
      selected === "کالاها"
        ? API_ROUTES.PRODUCT_BASE
        : selected === "سفارش ها"
        ? API_ROUTES.ORDERS_BASE
        : API_ROUTES.PRODUCT_BASE;

    const queryParams = new URLSearchParams();

    if (categoryId) {
      queryParams.append("category", categoryId);
      setSubEndpoint(`${API_ROUTES.SUBCATEGORIES_BASE}?category=${categoryId}`);
    }

    if (subcategoryId) {
      queryParams.append("subcategory", subcategoryId);
    }

    const limit = "4";

    if (page) {
      queryParams.set("page", page.toString());
      queryParams.set("limit", limit);
    }

    setEndpoint(`${baseEndpoint}?${queryParams.toString()}`);
  }, [page, selected, categoryId, subcategoryId]);

  function handleNextPage() {
    setPage((prev) => (prev == productsData?.total_pages ? prev : prev + 1));
  }

  function handlePrevPage() {
    setPage((prev) => (prev == 1 ? prev : prev - 1));
  }

  if (productsLoading || ordersLoading) return <div>Loading...</div>;
  if (productsError || ordersError) return <div>your encontering error...</div>;
  return (
    <div className="px-4 py-8 flex flex-col">
      {selected !== "سفارش ها" ? (
        <div className="flex py-3 gap-x-6 items-center">
          <select
            className={
              theme === "dark"
                ? "bg-slate-900 text-blue-500 px-2 py-1 rounded-lg w-40 "
                : "bg-slate-200"
            }
            name="categoryList"
            id="categoryList"
            onChange={(e) => {
              setcategoryId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">دسته بندی</option>
            {categoriesList?.data?.categories?.map(
              (category: CategoriesEntity) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              )
            )}
          </select>
          <select
            className={
              theme === "dark"
                ? "bg-slate-900 text-blue-500 px-2 py-1 rounded-lg w-40 "
                : "bg-slate-200 px-2 py-1 rounded-lg w-40"
            }
            name="subcategoryList"
            id="subcategoryList"
            onChange={(e) => {
              setSubcategoryId(e.target.value);
              setPage(1);
            }}
          >
            <option value="">زیر دسته بندی</option>
            {subcategoriesList?.data?.subcategories.map(
              (subcategory: SubcategoryById) => (
                <option value={subcategory._id} key={subcategory._id}>
                  {subcategory.name}
                </option>
              )
            )}
          </select>
        </div>
      ) : (
        ""
      )}
      <table
        className={
          theme === "dark"
            ? "min-w-full border-gray-200 shadow-md rounded-lg bg-slate-800 text-blue-400"
            : "min-w-full border-gray-200 shadow-md rounded-lg bg-slate-200 text-slate-700"
        }
      >
        <thead>
          <tr>
            {selected === "کالاها" && <th className="py-3">Product Name</th>}
            {selected === "موجودی و قیمت ها" && (
              <>
                <th className="py-3 ">Product Name</th>
                <th className="py-3 ">Quantity</th>
                <th className="py-3 ">Price</th>
              </>
            )}
            {selected === "سفارش ها" && (
              <>
                <th className="py-3 ">Customer Name</th>
                <th className="py-3 ">Date</th>
                <th className="py-3 ">Total Price</th>
              </>
            )}
            <th className="py-3 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selected !== "سفارش ها" &&
            productsData?.data?.products?.map(
              (product: GeneralProductsEntity) => (
                <tr key={product._id} className="hover:bg-[#f0f8ff21]">
                  {selected === "کالاها" && (
                    <td className="px-3 py-4">{product.name}</td>
                  )}
                  {selected === "موجودی و قیمت ها" && (
                    <>
                      <td className="px-1 py-4">{product.name}</td>
                      <td className="px-1 py-4">
                        <input
                          type="number"
                          className="rounded px-1 py-1 outline-none focus:outline focus:outline-blue-500 bg-inherit"
                          value={product.quantity}
                        />
                      </td>
                      <td className="px-1 py-4">
                        <input
                          type="number"
                          className="rounded px-1 py-1 outline-none focus:outline focus:outline-blue-500 bg-inherit"
                          value={product.price}
                        />
                      </td>
                    </>
                  )}
                  <td className="px-3 py-4">
                    <button className="text-blue-500 hover:underline ml-3">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          {selected === "سفارش ها" &&
            ordersData?.data?.orders?.map((order: Order) => (
              <tr
                key={order._id}
                className="hover:border hover:border-slate-700"
              >
                <td className="px-3 py-4">{order.updatedAt}</td>
                <td className="px-3 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-4">{order.totalPrice}</td>
                <td className="px-3 py-4">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={handleNextPage}
        >
          Next
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={handlePrevPage}
        >
          Previous
        </button>
      </div>
      {editingProduct && (
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
          Save
        </button>
      )}
    </div>
  );
}
