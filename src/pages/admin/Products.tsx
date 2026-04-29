import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { mutate } from 'swr'
import { useProducts, useCategories } from '../../hooks/useProducts'
import { productsService } from '../../services/products.service'
import { storeCreateProduct, storeUpdateProduct, storeDeleteProduct } from '../../store/adminStore'
import type { Product, CreateProductPayload } from '../../types/product'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import ErrorMessage from '../../components/shared/ErrorMessage'
import Modal from '../../components/shared/Modal'
import AppDialog from '../../components/ui/AppDialog'
import InputField from '../../components/ui/InputField'
import SelectField from '../../components/ui/SelectField'
import TextAreaField from '../../components/ui/TextAreaField'
import { useToast } from '../../contexts/toast/useToast'

type ModalMode = 'create' | 'edit'

const emptyForm: CreateProductPayload = {
  title: '', price: 0, description: '', category: '', image: '',
}

const PRODUCTS_KEY = '/products'

const AdminProducts = () => {
  const { data: products, error, isLoading } = useProducts()
  const { data: categories } = useCategories()
  const { toast } = useToast()
  const [modal, setModal] = useState<{ mode: ModalMode; product?: Product } | null>(null)
  const [form, setForm] = useState<CreateProductPayload>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [confirmId, setConfirmId] = useState<number | null>(null)
  const [confirmInput, setConfirmInput] = useState('')
  const [deleting, setDeleting] = useState(false)

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

  const openConfirm = (id: number) => {
    setConfirmId(id)
    setConfirmInput('')
  }

  const closeConfirm = () => {
    setConfirmId(null)
    setConfirmInput('')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, price: Number(form.price) }
      if (modal?.mode === 'edit' && modal.product) {
        const updated: Product = { ...modal.product, ...payload }
        await productsService.update(modal.product.id, payload)
        storeUpdateProduct(updated)
        mutate(PRODUCTS_KEY, (prev: Product[] | undefined) =>
          prev?.map((p) => (p.id === modal.product!.id ? updated : p)), { revalidate: false }
        )
        toast('Produto atualizado com sucesso.', 'success')
      } else {
        await productsService.create(payload)
        const newProduct: Product = {
          ...payload,
          id: Date.now(),
          rating: { rate: 0, count: 0 },
        }
        storeCreateProduct(newProduct)
        mutate(PRODUCTS_KEY, (prev: Product[] | undefined) =>
          prev ? [...prev, newProduct] : [newProduct], { revalidate: false }
        )
        toast('Produto criado com sucesso.', 'success')
      }
      closeModal()
    } catch {
      toast('Erro ao salvar produto. Tente novamente.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (confirmId === null || String(confirmId) !== confirmInput) return
    setDeleting(true)
    try {
      await productsService.remove(confirmId)
      storeDeleteProduct(confirmId)
      mutate(PRODUCTS_KEY, (prev: Product[] | undefined) =>
        prev?.filter((p) => p.id !== confirmId), { revalidate: false }
      )
      toast('Produto excluído com sucesso.', 'success')
      closeConfirm()
    } catch {
      toast('Erro ao excluir produto. Tente novamente.', 'error')
    } finally {
      setDeleting(false)
    }
  }

  if (isLoading) return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>
  if (error) return <ErrorMessage onRetry={() => mutate(PRODUCTS_KEY)} />

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
                      onClick={() => openConfirm(product.id)}
                      aria-label="Excluir produto"
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/20"
                    >
                      <TrashIcon className="h-4 w-4" />
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
            <InputField
              label="Título"
              name="title"
              placeholder="Nome do produto"
              required
              value={form.title}
              onChange={handleChange}
            />
            <InputField
              label="URL da imagem"
              name="image"
              placeholder="https://..."
              required
              value={form.image}
              onChange={handleChange}
            />
            <InputField
              label="Preço"
              name="price"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={handleChange}
            />
            <SelectField
              label="Categoria"
              name="category"
              required
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {categories?.map((cat) => (
                <option key={cat} value={cat} className="capitalize">{cat}</option>
              ))}
            </SelectField>
            <TextAreaField
              label="Descrição"
              name="description"
              rows={3}
              placeholder="Descrição do produto"
              required
              value={form.description}
              onChange={handleChange}
            />

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

      <AppDialog open={confirmId !== null} onClose={closeConfirm} title="Confirmar exclusão" maxWidth="sm">
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          Esta ação não pode ser desfeita. Digite o ID{' '}
          <strong className="text-slate-900 dark:text-white">{confirmId}</strong> para confirmar.
        </p>
        <InputField
          label="Confirmação"
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          placeholder={`Digite ${confirmId}`}
        />
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeConfirm}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={String(confirmId) !== confirmInput || deleting}
            className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-700 disabled:opacity-50"
          >
            {deleting && <LoadingSpinner size="sm" />}
            {deleting ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </AppDialog>
    </div>
  )
}

export default AdminProducts
