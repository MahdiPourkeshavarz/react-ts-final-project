import { useEffect, useState } from "react";
import { API_ROUTES } from "../../../../constants";
import { useStore } from "../../../../context/shopStore";
import { useGetData } from "../../../../hooks/useGetAction";
import {
  CategoriesEntity,
  GeneralProductsEntity,
  SubcategoryById,
  TAllProductsResponse,
  TResponseGetAllCategories,
  TResponseGetAllSubCategories,
} from "../../../../types";
import { useDeleteMutation } from "../../../../hooks/useDeleteActionMutation";
import { DeleteModal } from "./components/deleteModal";
import { EditModal } from "./components/editModal";

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const [categoryId, setcategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subEndpoint, setSubEndpoint] = useState("");
  const [endpoint, setEndpoint] = useState(API_ROUTES.PRODUCT_BASE);
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({
    name: "",
    id: "",
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<GeneralProductsEntity>();

  function handleEditModalState() {
    setEditModalOpen((prev) => !prev);
  }

  function handleModalState() {
    setOpen((prev) => !prev);
  }

  const { theme } = useStore();

  const { data, isLoading, refetch } =
    useGetData<TAllProductsResponse>(endpoint);

  const { mutate: deleteMutate } = useDeleteMutation();

  const { data: categoriesList } = useGetData<TResponseGetAllCategories>(
    API_ROUTES.CATEGORY_BASE
  );

  const { data: subcategoriesList } =
    useGetData<TResponseGetAllSubCategories>(subEndpoint);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (categoryId) {
      queryParams.append("category", categoryId);
      setSubEndpoint(`${API_ROUTES.SUBCATEGORIES_BASE}?category=${categoryId}`);
    }

    if (subcategoryId) {
      queryParams.append("subcategory", subcategoryId);
    }

    queryParams.set("page", page.toString());
    queryParams.set("limit", "4");

    setEndpoint(`${API_ROUTES.PRODUCT_BASE}?${queryParams.toString()}`);
  }, [page, categoryId, subcategoryId]);

  function handleDeleteProduct() {
    setOpen(false);
    const endpoint = `${API_ROUTES.PRODUCT_BASE}/${deleteItem.id}`;
    deleteMutate(endpoint);
    refetch();
  }

  function handleEditProduct(data: any) {
    console.log(data);
  }

  function handlePageChange(increment: number) {
    if (page == data?.total_pages) {
      return;
    } else if (page === 1 && increment === -1) {
      return;
    }
    setPage((prev) => Math.max(1, prev + increment));
  }

  return (
    <div className="px-4 py-8 flex flex-col">
      <DeleteModal
        open={open}
        handleState={handleModalState}
        productName={deleteItem.name}
        handleDeleteProduct={handleDeleteProduct}
      />
      <EditModal
        open={editModalOpen}
        handleState={handleEditModalState}
        product={productToEdit}
        handleEditProduct={handleEditProduct}
      />
      <div className="flex py-3 items-center justify-between px-3">
        <div className="flex gap-x-6">
          <select
            className={
              theme === "dark"
                ? "bg-slate-900 text-blue-500 px-2 py-1 rounded-lg w-40"
                : "bg-slate-200 px-2 py-1 rounded-lg w-40"
            }
            name="categoryList"
            id="categoryList"
            onChange={(e) => {
              setcategoryId(e.target.value);
              setSubcategoryId("");
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
                ? "bg-slate-900 text-blue-500 px-2 py-1 rounded-lg w-40"
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
      </div>
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
        <table
          className={`min-w-full rounded-lg ${
            theme === "dark"
              ? "bg-slate-800 text-blue-400"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          <thead>
            <tr>
              <th className="py-3 text-right pr-3">تصویر</th>
              <th className="py-3 text-right pr-3">نام محصول</th>
              <th className="py-3 text-right pr-3">عملیات ها</th>
            </tr>
          </thead>
          <tbody className="h-72">
            {data?.data?.products?.map((product) => (
              <tr key={product._id} className="hover:bg-[#bcc3c921] pr-3">
                <td>
                  <img
                    className="rounded-lg mr-3"
                    width="40px"
                    src={`http://${product.images[0]}`}
                    alt="_"
                  />
                </td>
                <td className="pr-3">{product.name}</td>
                <td className="px-3 py-4">
                  <button
                    className="text-blue-500 hover:underline ml-3"
                    onClick={() => {
                      setProductToEdit(product);
                      handleEditModalState();
                    }}
                  >
                    <img width="28px" src="/Edit.png" alt="_" />
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => {
                      setDeleteItem({
                        name: product.name,
                        id: product._id,
                      });
                      handleModalState();
                    }}
                  >
                    <img width="30px" src="/Delete.png" alt="_" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between px-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => handlePageChange(+1)}
        >
          بعدی
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => handlePageChange(-1)}
        >
          قبلی
        </button>
      </div>
    </div>
  );
}
