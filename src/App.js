import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from './components/layouts/MainLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import Hardware from "./pages/Hardware";
import SourceCode from "./pages/SourceCode";
import Hosting from "./pages/Hosting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />

        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>}>
          <Route index element={<Hardware />} />
          <Route path="hardware" element={<Hardware />} />
          <Route path="sourcecode" element={<SourceCode />} />
          <Route path="hosting" element={<Hosting />} />
        </Route>
        <Route path="/gallery" element={<MainLayout><GalleryPage /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
