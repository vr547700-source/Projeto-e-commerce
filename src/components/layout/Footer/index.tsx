import FooterBrand from './FooterBrand'
import FooterNewsletter from './FooterNewsletter'

const Footer = () => (
  <footer role="contentinfo" className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 sm:grid-cols-2">
        <FooterBrand />
        <FooterNewsletter />
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6 dark:border-slate-800">
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} eShop. Todos os direitos reservados. Preços e disponibilidade sujeitos a alterações.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
