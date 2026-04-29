import FooterLinks from './FooterLinks'
import FooterNewsletter from './FooterNewsletter'

const Footer = () => (
  <footer role="contentinfo" className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <FooterNewsletter />
        <FooterLinks />
      </div>

      <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
        <p className="text-center text-sm text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} eShop. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
