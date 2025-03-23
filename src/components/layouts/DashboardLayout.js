const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-gray-800 h-screen text-white">
      <div className="">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
