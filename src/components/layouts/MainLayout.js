import Sidebar from "../Sidebar/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="gap-4 p-4 grid grid-cols-[64px,_1fr] min-h-screen bg-gray-800 text-white">
      <div className="sticky top-4 h-fit z-50">
        <Sidebar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
