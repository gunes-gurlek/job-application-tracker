import { useCallback, useEffect, useState } from 'react'
import type { ApplicationInput, JobApplication } from '../Interfaces/Application'

const STORAGE_KEY = 'job-tracker:applications'

function load(): JobApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as JobApplication[]) : []
  } catch {
    return []
  }
}

export function useApplications() {
  const [applications, setApplications] = useState<JobApplication[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
    } catch {
      /* depolama kullanılamıyor */
    }
  }, [applications])

  const add = useCallback((input: ApplicationInput) => {
    setApplications((prev) => [{ ...input, id: crypto.randomUUID() }, ...prev])
  }, [])

  const update = useCallback((id: string, input: ApplicationInput) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...input, id } : a)))
  }, [])

  const remove = useCallback((id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id))
  }, [])

  return { applications, add, update, remove }
}
