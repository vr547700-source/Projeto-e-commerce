import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../contexts/cart/useCart'

interface FormData {
  name: string
  email: string
  address: string
  city: string
  zipcode: string
  card: string
  expiry: string
  cvv: string
}

const emptyForm: FormData = {
  name: '', email: '', address: '', city: '', zipcode: '',
  card: '', expiry: '', cvv: '',
}

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormData>(emptyForm)
  const [done, setDone] = useState(false)

  if (items.length === 0 && !done) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-32 text-center">
        <p className="text-slate-500">Seu carrinho está vazio.</p>
        <Link to="/products" className="mt-4 text-sm text-slate-700 underline dark:text-slate-300">
          Ver produtos
        </Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-32 text-center">
        <CheckCircleIcon className="mb-4 h-16 w-16 text-emerald-500" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Pedido realizado!</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Obrigado pela compra. Você receberá um e-mail de confirmação em breve.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 font-medium text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900"
        >
          Voltar ao início
        </button>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearCart()
    setDone(true)
  }

  const field = (
    id: keyof FormData,
    label: string,
    placeholder: string,
    type = 'text',
    className = ''
  ) => (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={form[id]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
      />
    </div>
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/cart"
        className="mb-8 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Voltar ao carrinho
      </Link>

      <div className="grid gap-8 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">
              Dados de entrega
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field('name', 'Nome completo', 'João Silva', 'text', 'sm:col-span-2')}
              {field('email', 'E-mail', 'joao@email.com', 'email', 'sm:col-span-2')}
              {field('address', 'Endereço', 'Rua das Flores, 123', 'text', 'sm:col-span-2')}
              {field('city', 'Cidade', 'São Paulo')}
              {field('zipcode', 'CEP', '01310-000')}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Pagamento</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field('card', 'Número do cartão', '0000 0000 0000 0000', 'text', 'sm:col-span-2')}
              {field('expiry', 'Validade', 'MM/AA')}
              {field('cvv', 'CVV', '123')}
            </div>
          </section>

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 py-3 font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            Confirmar pedido
          </button>
        </form>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Resumo</h2>
          <ul className="space-y-2">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate text-slate-600 dark:text-slate-400">
                  {product.title.slice(0, 24)}… × {quantity}
                </span>
                <span className="shrink-0 font-medium text-slate-900 dark:text-white">
                  {(product.price * quantity).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="flex justify-between font-bold text-slate-900 dark:text-white">
              <span>Total</span>
              <span>
                {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Checkout
