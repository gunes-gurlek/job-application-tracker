import { useState } from 'react'
import type { FormEvent } from 'react'
import { STATUSES } from '../Interfaces/Application'
import type { ApplicationInput, JobApplication, Status } from '../Interfaces/Application'

interface Props {
  initial?: JobApplication
  onSubmit: (data: ApplicationInput) => void
  onCancel: () => void
}

const today = () => new Date().toISOString().slice(0, 10)

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200'

export default function ApplicationForm({ initial, onSubmit, onCancel }: Props) {
  const [company, setCompany] = useState(initial?.company ?? '')
  const [position, setPosition] = useState(initial?.position ?? '')
  const [appliedDate, setAppliedDate] = useState(initial?.appliedDate ?? today())
  const [status, setStatus] = useState<Status>(initial?.status ?? 'Başvuruldu')
  const [notes, setNotes] = useState(initial?.notes ?? '')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({ company: company.trim(), position: position.trim(), appliedDate, status, notes: notes.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium">
        Şirket adı
        <input className={`${field} mt-1`} value={company} onChange={(e) => setCompany(e.target.value)} required autoFocus />
      </label>
      <label className="block text-sm font-medium">
        Pozisyon
        <input className={`${field} mt-1`} value={position} onChange={(e) => setPosition(e.target.value)} required />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-medium">
          Başvuru tarihi
          <input type="date" className={`${field} mt-1`} value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} required />
        </label>
        <label className="block text-sm font-medium">
          Durum
          <select className={`${field} mt-1`} value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium">
        Not
        <textarea className={`${field} mt-1`} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">
          Vazgeç
        </button>
        <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          {initial ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </form>
  )
}
