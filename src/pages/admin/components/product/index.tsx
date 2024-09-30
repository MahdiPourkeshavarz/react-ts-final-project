import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { httpRequest } from "../../../../lib/axiosConfig";
import { API_ROUTES } from "../../../../constants";
import { useGetData } from "../../../../hooks/useGetAction";
import {
  SubcategoryById,
  TResponseGetAllCategories,
  TResponseGetAllSubCategories,
} from "../../../../types";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    quantity: "",
    brand: "",
    discount: "",
    description: "",
    thumbnail: null,
    images: [],
  });

  const [subEndpoint, setSubEndpoint] = useState(API_ROUTES.SUBCATEGORIES_BASE);

  const { data: categoriesList, refetch } =
    useGetData<TResponseGetAllCategories>(API_ROUTES.CATEGORY_BASE);

  const { data: subcategoriesList } =
    useGetData<TResponseGetAllSubCategories>(subEndpoint);

  const handleCategoryChange = async (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    setSubEndpoint(
      `${API_ROUTES.SUBCATEGORIES_BASE}?category=${selectedCategory}`
    );
  }, [selectedCategory]);

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.delete("images");
    formData.delete("thumbnail");

    const images = e.currentTarget["images"].files;
    const thumbnail = e.currentTarget["thumbnail"].files[0];
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // Append the single thumbnail file
    formData.append("thumbnail", thumbnail);

    formData.append("category", selectedCategory);

    formData.append("subcategory", selectedSubcategory);
    console.log(formData.get("images"));
    try {
      await httpRequest.post(API_ROUTES.PRODUCT_BASE, formData);
      alert("Product added successfully!");
      setProductData({
        name: "",
        price: "",
        quantity: "",
        brand: "",
        discount: "",
        description: "",
        thumbnail: null,
        images: [],
      });
      setSelectedCategory("");
      setSelectedSubcategory("");
      refetch();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex flex-col px-16 lg:px-36 gap-y-6 text-center" dir="rtl">
      <form onSubmit={handleAddProduct}>
        <div className="flex flex-col gap-y-6">
          <FormControl fullWidth dir="rtl">
            <InputLabel>انتخاب دسته بندی</InputLabel>
            <Select value={selectedCategory} onChange={handleCategoryChange}>
              {categoriesList?.data?.categories?.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>انتخاب زیر دسته بندی</InputLabel>
            <Select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              {subcategoriesList?.data?.subcategories.map(
                (subcategory: SubcategoryById) => (
                  <MenuItem key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
        <div className="grid grid-cols-2 gap-2 py-6">
          <TextField
            label="نام محصول"
            name="name"
            id="name"
            variant="outlined"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
          <TextField
            dir="rtl"
            label="قیمت"
            name="price"
            id="price"
            variant="outlined"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
          />
          <TextField
            label="تعداد"
            name="quantity"
            id="quantity"
            variant="outlined"
            value={productData.quantity}
            onChange={(e) =>
              setProductData({ ...productData, quantity: e.target.value })
            }
          />
          <TextField
            label="برند"
            variant="outlined"
            name="brand"
            id="brand"
            value={productData.brand}
            onChange={(e) =>
              setProductData({ ...productData, brand: e.target.value })
            }
          />
          <TextField
            label="تخفیف"
            name="discount"
            id="discount"
            variant="outlined"
            value={productData.discount}
            onChange={(e) =>
              setProductData({ ...productData, discount: e.target.value })
            }
          />
          <TextField
            label="توضیحات"
            variant="outlined"
            name="description"
            id="description"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
          <label
            for="thumbnail"
            className="flex items-center p-4 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-300 cursor-pointer"
          >
            <div className="space-y-2 mx-auto">
              <h4 className="text-base text-sm font-semibold text-gray-700 sm:text-xs">
                Upload a file for thumbnail
              </h4>
              <span className="text-sm text-gray-500 sm:text-xs">Max 1 Mb</span>
            </div>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="png, jpg"
              hidden
              onChange={(e) =>
                setProductData({ ...productData, thumbnail: e.target.files[0] })
              }
            />
          </label>
          <label
            for="images"
            className="flex items-center p-2 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-300 cursor-pointer"
          >
            <div className="space-y-1 mx-auto">
              <h4 className="text-base text-sm font-semibold text-gray-700 sm:text-xs">
                Upload a file for image gallery
              </h4>
              <span className="text-sm text-gray-500 sm:text-xs">Max 1 Mb</span>
            </div>
            <input
              type="file"
              id="images"
              name="images"
              accept="png, jpg"
              multiple
              hidden
              onChange={(e) =>
                setProductData({
                  ...productData,
                  images: Array.from(e.target.files),
                })
              }
            />
          </label>
        </div>
        <Button variant="contained" color="inherit" type="submit">
          اضافه کردن محصول
        </Button>
      </form>
    </div>
  );
};

export default Products;
