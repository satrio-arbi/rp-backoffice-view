import create from 'zustand'

export const updateJournalUmumContext = create( set => ({
    updateJournalUmumStore : null,
    setUpdateJournalUmumStore : param => set (() => ({updateJournalUmumStore:param}))
  }))