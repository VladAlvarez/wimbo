import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";

const About = () => {
  return (
    <div>
      <Topbar />

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default About;
