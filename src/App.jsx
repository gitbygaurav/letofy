import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import ShareSheetProvider from './context/ShareSheetProvider'

function App() {
  return (
    <ShareSheetProvider>
      <section className="bg-[#fffc00] h-full pb-10 min-h-screen">
        <Navbar/>
        <Outlet/>
      </section>
    </ShareSheetProvider>
  )
}

export default App
