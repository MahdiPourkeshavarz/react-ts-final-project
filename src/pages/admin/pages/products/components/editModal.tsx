import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { GeneralProductsEntity } from "../../../../../types";

interface Props {
  open: boolean;
  handleState: () => void;
  product: GeneralProductsEntity;
  handleEditProduct: (updatedProduct: Partial<GeneralProductsEntity>) => void;
}

export function EditModal({
  open,
  handleState,
  product,
  handleEditProduct,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleState}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);

          // Get the FileList from the input for images (multiple files)
          const images = event.currentTarget["images"].files;
          const thumbnail = event.currentTarget["thumbnail"].files[0]; // Single file
          formData.delete("images");
          formData.delete("thumbnail");
          // Append each image file individually to FormData
          for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
          }

          // Append the single thumbnail file
          formData.append("thumbnail", thumbnail);

          formData.append("category", product?.category?._id);

          formData.append("subcategory", product?.subcategory?._id);

          // If your backend expects the rest of the fields, they are already in `formData`
          console.log(formData);
          // Send formData to your backend directly
          handleEditProduct(formData); // Adjust your backend logic to accept FormData

          handleState(); // Close the modal
        },
      }}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-y-4 mx-auto">
          <img
            src={`http://${product?.images[1]}`}
            alt="Product Preview"
            style={{
              width: "120px",
              marginBottom: "16px",
              marginRight: "220px",
              borderRadius: "8px",
            }}
          />
          <input
            id="img"
            name="images"
            accept="image/*"
            type="file"
            multiple
            className="bg-inherit border-none w-full py-2 pr-56"
          />
          <input
            id="thumb"
            name="thumbnail"
            accept="image/*"
            type="file"
            className="bg-inherit border-none w-full py-2 pr-56"
          />
        </div>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={product?.name}
        />
        <TextField
          dir="ltr"
          margin="dense"
          id="price"
          name="price"
          label="Price"
          type="number"
          fullWidth
          variant="standard"
          defaultValue={product?.price}
        />
        <TextField
          dir="ltr"
          margin="dense"
          id="quantity"
          name="quantity"
          label="Quantity"
          type="number"
          fullWidth
          variant="standard"
          defaultValue={product?.quantity}
        />
        <TextField
          margin="dense"
          id="brand"
          name="brand"
          label="Brand"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={product?.brand}
        />
        <TextField
          dir="ltr"
          margin="dense"
          id="discount"
          name="discount"
          label="Discount"
          type="number"
          fullWidth
          variant="standard"
          defaultValue={product?.discount}
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          multiline
          defaultValue={product?.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleState}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
// react-dropzone
