import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Future routes will be added here */}
    </Routes>
  );
};

export default AppRoutes;
