import type { Product } from '../types/product'
import type { User } from '../types/user'

const KEY = 'admin_overrides'

interface ProductOverrides {
  created: Product[]
  updated: Record<number, Product>
  deleted: number[]
}

interface UserOverrides {
  created: User[]
  updated: Record<number, User>
  deleted: number[]
}

interface Store {
  products: ProductOverrides
  users: UserOverrides
}

const empty = (): Store => ({
  products: { created: [], updated: {}, deleted: [] },
  users: { created: [], updated: {}, deleted: [] },
})

const load = (): Store => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Store) : empty()
  } catch {
    return empty()
  }
}

const save = (store: Store) => localStorage.setItem(KEY, JSON.stringify(store))

// ── Apply overrides ──────────────────────────────────────────────────────────

export const applyProductOverrides = (items: Product[]): Product[] => {
  const { products } = load()
  const deleted = new Set(products.deleted)
  const merged = items
    .filter((p) => !deleted.has(p.id))
    .map((p) => products.updated[p.id] ?? p)
  return [...merged, ...products.created]
}

export const applyUserOverrides = (items: User[]): User[] => {
  const { users } = load()
  const deleted = new Set(users.deleted)
  const merged = items
    .filter((u) => !deleted.has(u.id))
    .map((u) => users.updated[u.id] ?? u)
  return [...merged, ...users.created]
}

// ── Product CRUD ─────────────────────────────────────────────────────────────

export const storeCreateProduct = (product: Product) => {
  const store = load()
  store.products.created = [...store.products.created, product]
  save(store)
}

export const storeUpdateProduct = (product: Product) => {
  const store = load()
  const isLocal = store.products.created.some((p) => p.id === product.id)
  if (isLocal) {
    store.products.created = store.products.created.map((p) =>
      p.id === product.id ? product : p
    )
  } else {
    store.products.updated[product.id] = product
  }
  save(store)
}

export const storeDeleteProduct = (id: number) => {
  const store = load()
  const isLocal = store.products.created.some((p) => p.id === id)
  if (isLocal) {
    store.products.created = store.products.created.filter((p) => p.id !== id)
  } else {
    delete store.products.updated[id]
    store.products.deleted = [...store.products.deleted, id]
  }
  save(store)
}

// ── User CRUD ────────────────────────────────────────────────────────────────

export const storeCreateUser = (user: User) => {
  const store = load()
  store.users.created = [...store.users.created, user]
  save(store)
}

export const storeUpdateUser = (user: User) => {
  const store = load()
  const isLocal = store.users.created.some((u) => u.id === user.id)
  if (isLocal) {
    store.users.created = store.users.created.map((u) =>
      u.id === user.id ? user : u
    )
  } else {
    store.users.updated[user.id] = user
  }
  save(store)
}

export const storeDeleteUser = (id: number) => {
  const store = load()
  const isLocal = store.users.created.some((u) => u.id === id)
  if (isLocal) {
    store.users.created = store.users.created.filter((u) => u.id !== id)
  } else {
    delete store.users.updated[id]
    store.users.deleted = [...store.users.deleted, id]
  }
  save(store)
}
