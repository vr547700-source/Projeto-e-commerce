import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { mutate } from 'swr'
import { useProducts, useCategories } from '../../hooks/useProducts'
import { productsService } from '../../services/products.service'
import type { Product, CreateProductPayload } from '../../types/product'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import ErrorMessage from '../../components/shared/ErrorMessage'
import Modal from '../../components/shared/Modal'

type ModalMode = 'create' | 'edit'

const emptyForm: CreateProductPayload = {
  title: '', price: 0, description: '', category: '', image: '',
}

const AdminProducts = () => {
  const { data: products, error, isLoading } = useProducts()
  const { data: categories } = useCategories()
  const [modal, setModal] = useState<{ mode: ModalMode; product?: Product } | null>(null)
  const [form, setForm] = useState<CreateProductPayload>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const openCreate = () => {
    setForm(emptyForm)
    setModal({ mode: 'create' })
  }

  const openEdit = (product: Product) => {
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    })
    setModal({ mode: 'edit', product })
  }

  const closeModal = () => setModal(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, price: Number(form.price) }
      if (modal?.mode === 'edit' && modal.product) {
        await productsService.update(modal.product.id, payload)
      } else {
        await productsService.create(payload)
      }
      mutate('/products')
      closeModal()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    setDeleteId(id)
    try {
      await productsService.remove(id)
      mutate('/products')
    } finally {
      setDeleteId(null)
    }
  }

  if (isLoading) return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>
  if (error) return <ErrorMessage onRetry={() => mutate('/products')} />

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Produtos</h1>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900"
        >
          <PlusIcon className="h-4 w-4" />
          Novo produto
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">Produto</th>
              <th className="hidden px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400 md:table-cell">Categoria</th>
              <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-400">Preço</th>
              <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-400">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {products?.map((product) => (
              <tr key={product.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-10 w-10 shrink-0 rounded-lg border border-slate-100 object-contain p-1 dark:border-slate-800"
                    />
                    <span className="line-clamp-1 font-medium text-slate-900 dark:text-white">
                      {product.title}
                    </span>
                  </div>
                </td>
                <td className="hidden px-4 py-3 capitalize text-slate-500 dark:text-slate-400 md:table-cell">
                  {product.category}
                </td>
                <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(product)}
                      aria-label="Editar produto"
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product.id)}
                      aria-label="Excluir produto"
                      disabled={deleteId === product.id}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 disabled:opacity-50 dark:hover:bg-rose-900/20"
                    >
                      {deleteId === product.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <TrashIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={modal.mode === 'create' ? 'Novo produto' : 'Editar produto'}
          onClose={closeModal}
        >
          <form onSubmit={handleSave} className="space-y-4">
            {(
              [
                { name: 'title' as const, label: 'Título', placeholder: 'Nome do produto', type: 'text' },
                { name: 'image' as const, label: 'URL da imagem', placeholder: 'https://...', type: 'text' },
                { name: 'price' as const, label: 'Preço', placeholder: '0.00', type: 'number' },
              ]
            ).map(({ name, label, placeholder, type }) => (
              <div key={name}>
                <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type ?? 'text'}
                  required
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-slate-400 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            ))}

            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Categoria
              </label>
              <select
                id="category"
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-slate-400 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="">Selecione</option>
                {categories?.map((cat) => (
                  <option key={cat} value={cat} className="capitalize">{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Descrição do produto"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm focus:border-slate-400 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-slate-900"
              >
                {saving && <LoadingSpinner size="sm" />}
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default AdminProducts
