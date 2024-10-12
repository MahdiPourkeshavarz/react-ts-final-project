import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { Order, Product, ProductsEntity } from '../../../../../types'
import { numberWithCommas } from '../../../../../utils/dataConverter'

interface Props {
  open: boolean
  handleState: () => void
  order?: Order
  handleDelivered: (id: string) => void
}


export function EditOrderModal({
  open,
  handleState,
  order,
  handleDelivered,
}: Props) {

  return (
    <Dialog open={open} onClose={handleState}>
      <DialogTitle style={{ textAlign: 'center' }}>جزئیات سفارش</DialogTitle>
      <DialogContent>
        {order?.products?.map((item: ProductsEntity) => {
          const product = item.product as Product
          return (
            <Card
              key={product._id}
              sx={{
                display: 'flex',
                marginBottom: 2,
                backgroundColor: 'whitesmoke',
                color: 'black',
              }}
            >
              <CardMedia
                component='img'
                sx={{ width: 170 }}
                image={`http://${
                  product.images ? product.images[0] : product.thumbnail
                }`}
                alt={product.name}
              />
              <CardContent>
                <Typography variant='h6'>{product.name}</Typography>
                <Typography>تعداد: {item.count}</Typography>
                <Typography>
                  مجموع قیمت: {numberWithCommas(product.price * item.count)}
                </Typography>
              </CardContent>
            </Card>
          )
        })}
        <div className='flex flex-col'>
          <div className='flex items-center justify-between'>
            <Typography variant='h6'>مجموع کل سفارش: تومان</Typography>
            <Typography variant='h5'>
              {numberWithCommas(order?.totalPrice as number)}
            </Typography>
          </div>
          <div className='flex items-center justify-between'>
            <Typography>زمان ثبت سفارش:</Typography>
            <Typography>
              {new Date(order?.createdAt as string).toLocaleDateString('fa-IR')}
            </Typography>
          </div>
          <div className='flex items-center justify-between'>
            <Typography>زمان تحویل:</Typography>
            <Typography>
              {order?.updatedAt && order?.deliveryDate
                ? new Date(order.updatedAt).toLocaleDateString('fa-IR') >
                  new Date(order.deliveryDate).toLocaleDateString('fa-IR')
                  ? new Date(order.updatedAt).toLocaleDateString('fa-IR')
                  : new Date(order.deliveryDate).toLocaleDateString('fa-IR')
                : 'N/A'}{' '}
            </Typography>
          </div>
          <div className='flex items-center justify-between'>
            <Typography>وضعیت سفارش:</Typography>
            <Typography>
              {order?.deliveryStatus ? 'در حال تحویل' : 'تحویل شده'}
            </Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        {order?.deliveryStatus === true ? (
          <Button
            onClick={() => handleDelivered(order?._id)}
            style={{
              backgroundColor: 'skyblue',
              color: 'black',
              fontSize: '18px',
              fontWeight: 'bold',
              paddingRight: '24px',
              paddingLeft: '24px',
            }}
          >
            تحویل شد
          </Button>
        ) : (
          <Button
            onClick={handleState}
            style={{
              backgroundColor: 'springgreen',
              color: 'black',
              fontSize: '18px',
              fontWeight: 'bold',
              paddingRight: '24px',
              paddingLeft: '24px',
            }}
          >
            بستن
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
