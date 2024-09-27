import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface props {
  open: boolean;
  handleState: () => void;
  productName: string;
  handleDeleteProduct: () => void;
}

export function DeleteModal({
  open,
  handleState,
  productName,
  handleDeleteProduct,
}: props) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleState}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"آیا مطمعنید ؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            با تایید شما محصول {productName} از روی دیتابیس پاک خواهد شد.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleState}>انصراف</Button>
          <Button onClick={handleDeleteProduct} autoFocus>
            تایید میکنم
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
