import { useMemo, useState } from 'react'
import ApplicationCard from '../Components/ApplicationCard'
import ApplicationForm from '../Components/ApplicationForm'
import EmptyState from '../Components/EmptyState'
import Header from '../Components/Header'
import Modal from '../Components/Modal'
import StatsBar from '../Components/StatsBar'
import Toolbar from '../Components/Toolbar'
import type { SortOrder } from '../Components/Toolbar'
import { useApplications } from '../hooks/useApplications'
import type { ApplicationInput, JobApplication, Status, StatusFilter } from '../Interfaces/Application'

export default function BoardPage() {
  const { applications, add, update, remove } = useApplications()
  const [filter, setFilter] = useState<StatusFilter>('Tümü')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOrder>('newest')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<JobApplication | undefined>()
  const [deleting, setDeleting] = useState<JobApplication | undefined>()

  const visible = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('tr')
    return applications
      .filter((a) => filter === 'Tümü' || a.status === filter)
      .filter((a) => !q || [a.company, a.position, a.notes].some((t) => t.toLocaleLowerCase('tr').includes(q)))
      .sort((x, y) =>
        sort === 'newest' ? y.appliedDate.localeCompare(x.appliedDate) : x.appliedDate.localeCompare(y.appliedDate),
      )
  }, [applications, filter, search, sort])

  const closeForm = () => {
    setFormOpen(false)
    setEditing(undefined)
  }

  const handleSubmit = (data: ApplicationInput) => {
    if (editing) update(editing.id, data)
    else add(data)
    closeForm()
  }

  const changeStatus = (id: string, status: Status) => {
    const a = applications.find((x) => x.id === id)
    if (a) update(id, { ...a, status })
  }

  return (
    <div className="min-h-screen">
      <Header onAdd={() => setFormOpen(true)} />
      <main className="mx-auto max-w-6xl space-y-5 px-4 py-6">
        <StatsBar applications={applications} active={filter} onSelect={setFilter} />
        <Toolbar search={search} onSearch={setSearch} sort={sort} onSort={setSort} />
        {visible.length === 0 ? (
          <EmptyState filtered={applications.length > 0} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((a) => (
              <ApplicationCard
                key={a.id}
                application={a}
                onEdit={(x) => {
                  setEditing(x)
                  setFormOpen(true)
                }}
                onDelete={setDeleting}
                onStatusChange={changeStatus}
              />
            ))}
          </div>
        )}
      </main>

      {formOpen && (
        <Modal title={editing ? 'Başvuruyu Düzenle' : 'Yeni Başvuru'} onClose={closeForm}>
          <ApplicationForm initial={editing} onSubmit={handleSubmit} onCancel={closeForm} />
        </Modal>
      )}

      {deleting && (
        <Modal title="Başvuruyu sil" onClose={() => setDeleting(undefined)}>
          <p className="text-sm text-slate-600">
            <strong>{deleting.company}</strong> – {deleting.position} başvurusu silinecek. Emin misin?
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={() => setDeleting(undefined)} className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">
              Vazgeç
            </button>
            <button
              onClick={() => {
                remove(deleting.id)
                setDeleting(undefined)
              }}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Sil
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
