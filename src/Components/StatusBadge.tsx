import type { Status } from '../Interfaces/Application'

export const STATUS_STYLES: Record<Status, string> = {
  Başvuruldu: 'bg-blue-100 text-blue-700 ring-blue-200',
  Mülakat: 'bg-amber-100 text-amber-700 ring-amber-200',
  Teklif: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  Red: 'bg-rose-100 text-rose-700 ring-rose-200',
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  )
}
