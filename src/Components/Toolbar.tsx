export type SortOrder = 'newest' | 'oldest'

interface Props {
  search: string
  onSearch: (v: string) => void
  sort: SortOrder
  onSort: (v: SortOrder) => void
}

export default function Toolbar({ search, onSearch, sort, onSort }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Şirket, pozisyon veya not ara…"
        aria-label="Ara"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value as SortOrder)}
        aria-label="Sırala"
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        <option value="newest">Önce en yeni</option>
        <option value="oldest">Önce en eski</option>
      </select>
    </div>
  )
}
