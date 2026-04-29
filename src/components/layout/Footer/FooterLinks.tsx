import { Link } from 'react-router-dom'
import { footerLinks } from '../../../constants/navigation'

const sections = [
  { title: 'Empresa', links: footerLinks.empresa },
  { title: 'Suporte', links: footerLinks.suporte },
  { title: 'Políticas', links: footerLinks.politicas },
]

const FooterLinks = () => (
  <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
    {sections.map((section) => (
      <div key={section.title}>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
          {section.title}
        </h3>
        <ul className="space-y-3">
          {section.links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

export default FooterLinks
