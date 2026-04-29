export interface NavLink {
  label: string
  href: string
}

export interface NavCategory {
  label: string
  href: string
  subcategories?: NavCategory[]
}

export const mainNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Produtos', href: '/products' },
]

export const productCategories: NavCategory[] = [
  { label: 'Eletrônicos', href: '/products?category=electronics' },
  { label: 'Roupas', href: '/products?category=clothing' },
  { label: 'Casa & Jardim', href: '/products?category=home' },
  { label: 'Esportes', href: '/products?category=sports' },
  { label: 'Beleza', href: '/products?category=beauty' },
  { label: 'Livros', href: '/products?category=books' },
]

export const footerLinks = {
  empresa: [
    { label: 'Sobre nós', href: '/about' },
    { label: 'Carreiras', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  suporte: [
    { label: 'Contato', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Devoluções', href: '/returns' },
  ],
  politicas: [
    { label: 'Privacidade', href: '/privacy' },
    { label: 'Termos de uso', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ],
}
