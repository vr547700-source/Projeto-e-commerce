import { useState, useEffect, useCallback } from 'react'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/auth/useAuth'

interface Review {
  id: string
  authorName: string
  rating: number
  body: string
  createdAt: string
}

const STORAGE_KEY = (id: number) => `reviews_product_${id}`

const loadReviews = (productId: number): Review[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(productId))
    return raw ? (JSON.parse(raw) as Review[]) : []
  } catch {
    return []
  }
}

const saveReviews = (productId: number, reviews: Review[]) => {
  localStorage.setItem(STORAGE_KEY(productId), JSON.stringify(reviews))
}

interface ReviewsSectionProps {
  productId: number
}

const ReviewsSection = ({ productId }: ReviewsSectionProps) => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews(productId))
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setReviews(loadReviews(productId))
  }, [productId])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!body.trim()) return
      setSubmitting(true)

      const newReview: Review = {
        id: crypto.randomUUID(),
        authorName: user ? `${user.name.firstname} ${user.name.lastname}` : 'Anônimo',
        rating,
        body: body.trim(),
        createdAt: new Date().toISOString(),
      }

      const updated = [newReview, ...reviews]
      setReviews(updated)
      saveReviews(productId, updated)
      setBody('')
      setRating(5)
      setSubmitting(false)
    },
    [body, rating, reviews, productId, user]
  )

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Avaliações</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
      >
        <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
          Deixe sua avaliação
        </p>

        <div className="mb-3 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1
            const filled = hoverRating ? value <= hoverRating : value <= rating
            return (
              <button
                key={i}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`${value} estrela${value > 1 ? 's' : ''}`}
              >
                {filled ? (
                  <StarSolid className="h-6 w-6 text-amber-400" />
                ) : (
                  <StarIcon className="h-6 w-6 text-slate-300 dark:text-slate-600" />
                )}
              </button>
            )
          })}
        </div>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={3}
          placeholder="Conte sua experiência com o produto..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={submitting || !body.trim()}
            className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Publicar avaliação
          </button>
        </div>
      </form>

      {reviews.length === 0 ? (
        <p className="mt-6 text-center text-sm text-slate-400 dark:text-slate-500">
          Nenhuma avaliação ainda. Seja o primeiro!
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-bold uppercase text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    {r.authorName[0]}
                  </div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {r.authorName}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarSolid
                      key={i}
                      className={`h-3.5 w-3.5 ${i < r.rating ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{r.body}</p>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                {new Date(r.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ReviewsSection
