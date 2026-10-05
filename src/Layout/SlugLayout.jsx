import { Outlet } from "react-router-dom"


export default function SlugLayout() {
  return (
<>
    <div dir="rtl" className="dashboard flex">

      {/* <div className="min-h-screen bg-dark "> <NavBar /></div> */}
      <div className="min-h-screen bg-dark ">  انا عند ال slug </div>


      <div className="content flex-1">
        <Outlet />
      </div>

    </div>

</>


  )
}
