import { useEffect } from "react"
import MainRoutes from './routes/MainRoutes'
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import ScrollToTop from "./components/ScrollToTop"

const App = () => {



  return (
    <div className='flex bg-zinc-50 dark:bg-[#080E0B] text-black dark:text-white '>
<ScrollToTop/>
      <Sidebar />
      <div id="main-scroll-container" className=" flex-1 flex flex-col h-screen  overflow-y-auto ">
        <Header />
        <MainRoutes />
      </div>

    </div>
  )
}

export default App