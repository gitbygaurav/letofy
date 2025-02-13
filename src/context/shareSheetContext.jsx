import { createContext, useContext } from 'react'

const ShareSheetContext = createContext()

export function useShareSheet() {
  const context = useContext(ShareSheetContext)
  if (context === undefined) {
    throw new Error('useShareSheet must be used within a ShareSheetProvider')
  }
  return context
}

// Add types for better understanding
export const ShareTypes = {
  RECEIVE: 'Receive',
  SEND: 'Send'
}

export default ShareSheetContext