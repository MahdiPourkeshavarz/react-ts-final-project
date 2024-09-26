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
          const formJson = Object.fromEntries(formData.entries());
          handleEditProduct({
            ...formJson,
          } as Partial<GeneralProductsEntity>);
          handleState();
        },
      }}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-y-4 mx-auto">
          <img
            src={`http://${product?.images[0]}`}
            alt="Product Preview"
            style={{
              width: "120px",
              marginBottom: "16px",
              marginRight: "220px",
              borderRadius: "8px",
            }}
          />
          <input
            accept="image/*"
            type="file"
            onChange={(e) => console.log(e)}
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
