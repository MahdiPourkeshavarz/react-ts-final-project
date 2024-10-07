import { useLoaderData } from 'react-router-dom'

export function OrderStatusPage() {
  const isPaymentSuccessful = useLoaderData()

  return (
    <div className='mx-auto flex justify-center'>
      {isPaymentSuccessful ? <h2>successful</h2> : <h2>failed</h2>}
    </div>
  )
}

interface TParams {
  status?: string
}

export async function orderStatusLoader({ params }: { params: TParams }) {
  const paymentStatus = params.status
  console.log(paymentStatus)
  if (paymentStatus === 'success') {
    return true
  } else {
    return false
  }
}
