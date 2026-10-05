import { Outlet } from "react-router-dom"
import Navbar from "../pages/navigator/navBar"
import Footer from "../pages/footers/platformFooter"
// import NavBar from "../pages/navNar"

export default function PlatformLayout() {
  return (
<>
    <div dir="rtl" className="dashboard ">

      <div className="   "> <Navbar /></div>

  
      <div className="content flex-1 pt-16">
        <Outlet />
      </div>


    <div className="   "> <Footer /></div>
      

    </div>

</>


  )
}
