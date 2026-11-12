import { STATUSES } from '../Interfaces/Application'
import type { JobApplication, StatusFilter } from '../Interfaces/Application'
import { STATUS_STYLES } from './StatusBadge'

interface Props {
  applications: JobApplication[]
  active: StatusFilter
  onSelect: (s: StatusFilter) => void
}

export default function StatsBar({ applications, active, onSelect }: Props) {
  const items: { key: StatusFilter; count: number }[] = [
    { key: 'Tümü', count: applications.length },
    ...STATUSES.map((s) => ({ key: s, count: applications.filter((a) => a.status === s).length })),
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {items.map(({ key, count }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          aria-pressed={active === key}
          className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:shadow ${
            active === key ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'
          }`}
        >
          <div className="text-2xl font-bold">{count}</div>
          <div
            className={`mt-1 inline-block rounded-full px-2 text-xs font-medium ${
              key === 'Tümü' ? 'bg-slate-100 text-slate-600' : STATUS_STYLES[key]
            }`}
          >
            {key}
          </div>
        </button>
      ))}
    </div>
  )
}
