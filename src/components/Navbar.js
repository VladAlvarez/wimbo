import { MdSpaceDashboard  } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow">

            <SideBarIcon icon={<MdSpaceDashboard />} text='Dashboard' />
            <SideBarIcon icon={<FaInfo />} text='About' />
            <SideBarIcon icon={<AiFillPicture text='Gallery' />} />
        </div>
    )
}

const SideBarIcon= ({ icon, text }) => (
    <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
)

export default Navbar