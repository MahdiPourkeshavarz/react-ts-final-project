import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { httpRequest } from "../../../../lib/axiosConfig";
import { API_ROUTES } from "../../../../constants";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = async () => {
    try {
      await httpRequest.post(API_ROUTES.CATEGORY_BASE, { name: categoryName });
      setCategoryName("");
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="flex flex-col px-16 gap-y-6 text-center lg:px-36">
      <TextField
        label="نام دسته بندی"
        variant="outlined"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <Button variant="contained" color="inherit" onClick={handleAddCategory}>
        اضافه کردن دسته بندی
      </Button>
    </div>
  );
};

export default Categories;
