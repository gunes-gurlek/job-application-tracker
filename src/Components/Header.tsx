interface Props {
  onAdd: () => void
}

export default function Header({ onAdd }: Props) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">İş Başvuru Takip Panosu</h1>
          <p className="text-sm text-indigo-100">Tüm başvurularını tek yerden takip et.</p>
        </div>
        <button
          onClick={onAdd}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          + Yeni Başvuru
        </button>
      </div>
    </header>
  )
}
