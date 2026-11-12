import { STATUSES } from '../Interfaces/Application'
import type { JobApplication, Status } from '../Interfaces/Application'
import StatusBadge from './StatusBadge'

interface Props {
  application: JobApplication
  onEdit: (a: JobApplication) => void
  onDelete: (a: JobApplication) => void
  onStatusChange: (id: string, status: Status) => void
}

export default function ApplicationCard({ application: a, onEdit, onDelete, onStatusChange }: Props) {
  const date = new Date(a.appliedDate + 'T00:00:00').toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{a.company}</h3>
          <p className="truncate text-sm text-slate-600">{a.position}</p>
        </div>
        <StatusBadge status={a.status} />
      </div>
      <p className="mt-2 text-xs text-slate-400">Başvuru: {date}</p>
      {a.notes && <p className="mt-3 whitespace-pre-line text-sm text-slate-600">{a.notes}</p>}
      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <select
          value={a.status}
          onChange={(e) => onStatusChange(a.id, e.target.value as Status)}
          aria-label={`${a.company} durumunu değiştir`}
          className="rounded-md border border-slate-200 px-2 py-1 text-xs"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <div className="flex gap-1">
          <button onClick={() => onEdit(a)} className="rounded-md px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50">
            Düzenle
          </button>
          <button onClick={() => onDelete(a)} className="rounded-md px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50">
            Sil
          </button>
        </div>
      </div>
    </article>
  )
}
