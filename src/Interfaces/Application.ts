export type Status = 'Başvuruldu' | 'Mülakat' | 'Teklif' | 'Red'

export const STATUSES: Status[] = ['Başvuruldu', 'Mülakat', 'Teklif', 'Red']

export interface JobApplication {
  id: string
  company: string
  position: string
  appliedDate: string // YYYY-MM-DD
  status: Status
  notes: string
}

export type ApplicationInput = Omit<JobApplication, 'id'>

export type StatusFilter = Status | 'Tümü'
