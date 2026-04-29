import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { productId } = useParams()
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Produto #{productId}</h1>
    </div>
  )
}

export default ProductDetail
