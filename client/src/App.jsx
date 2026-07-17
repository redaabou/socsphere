import { Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import History from "./pages/History";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
