import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { FaInfo } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";

const Sidebar = () => {
    return (
        <div className="rounded-lg p-2 top-4 left-0 h-fit w-16 m-0 flex flex-col bg-gray-900 text-white shadow">
            <SideBarIcon icon={<MdSpaceDashboard />} text="Dashboard" link="/" />
            <SideBarIcon icon={<FaInfo />} text="About" link="/about" />
            <SideBarIcon icon={<AiFillPicture />} text="Gallery" link="/gallery" />
        </div>
    );
};

const SideBarIcon = ({ icon, text, link }) => (
    <Link to={link} className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </Link>
);

export default Sidebar;
