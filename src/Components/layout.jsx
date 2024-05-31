import MainSideBar from "./SideBar"
import Header from "./Header"
import { Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <div className="page">
            <MainSideBar/>
            <Header/>
            
            <div className="main">
                
                
                <Outlet/>
                
                
            </div>
            
        </div>
    )
}

export default Layout;