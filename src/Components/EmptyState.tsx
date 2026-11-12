export default function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
      <p className="text-lg font-medium">{filtered ? 'Sonuç bulunamadı' : 'Henüz başvuru yok'}</p>
      <p className="mt-1 text-sm">
        {filtered ? 'Arama veya filtreyi değiştirmeyi dene.' : '"Yeni Başvuru" ile ilk kaydını ekle.'}
      </p>
    </div>
  )
}
