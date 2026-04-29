import type { ReactNode } from 'react'

interface BadgeProps {
  count: number
  children: ReactNode
}

const Badge = ({ count, children }: BadgeProps) => (
  <div className="relative inline-flex">
    {children}
    {count > 0 && (
      <span
        aria-label={`${count} ${count === 1 ? 'item' : 'itens'} no carrinho`}
        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white"
      >
        {count > 99 ? '99+' : count}
      </span>
    )}
  </div>
)

export default Badge
