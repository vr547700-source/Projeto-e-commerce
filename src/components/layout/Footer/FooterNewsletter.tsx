import { useState } from 'react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

const FooterNewsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section aria-label="Cadastro na newsletter" className="max-w-sm">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
        Newsletter
      </h3>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Receba ofertas exclusivas e novidades diretamente no seu e-mail.
      </p>

      {submitted ? (
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          Obrigado! Você está inscrito.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <EnvelopeIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              aria-label="Seu endereço de e-mail"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Inscrever
          </button>
        </form>
      )}
    </section>
  )
}

export default FooterNewsletter
