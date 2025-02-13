import { useState } from 'react'
import ShareSheet from '../components/ShareSheet'
import ShareSheetContext from './shareSheetContext'

export default function ShareSheetProvider({ children }) {
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false)
  const [shareType, setShareType] = useState("Receive")
  const [shareMessage, setShareMessage] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  const [letterData, setLetterData] = useState(null)

  const openShareSheet = (data) => {
    setLetterData(data);
    setIsShareSheetOpen(true);
  }
  const closeShareSheet = () => {
    setIsShareSheetOpen(false);
    setLetterData(null);
  }

  return (
    <ShareSheetContext.Provider
      value={{
        isShareSheetOpen,
        openShareSheet,
        closeShareSheet,
        shareType,
        setShareType,
        shareMessage,
        setShareMessage,
        shareUrl,
        setShareUrl,
        letterData
      }}
    >
      {children}
      <ShareSheet />
    </ShareSheetContext.Provider>
  )
}