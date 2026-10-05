import { Outlet } from "react-router-dom"
// import Sidebar from "../pages/sideBar"

export default function CustomerLayout() {
  return (
    <div dir="rtl" className="dashboard flex">
   
      {/* <aside className="min-h-screen"><Sidebar role={"customer"}/></aside> */}

      <div className="min-h-screen bg-dark ">  انا عند ال customer dashboard </div>
       <div className="content  flex-1">
        <Outlet />
      </div>
    </div>
  )
}
