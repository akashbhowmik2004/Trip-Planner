import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";

import PlanTripPage from "./pages/PlanTripPage";
import DestinationsPage from "./pages/DestinationsPage";
import TripDetails from "./pages/TripDetails";
import NotFound from "./pages/NotFound";
import TripMapPage from "./pages/TripMapPage";
import OffersPage from "./pages/OffersPage";
import AboutPage from "./pages/AboutPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan-trip" element={<PlanTripPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/trip-details" element={<TripDetails />} />
        <Route path="/trip-map" element={<TripMapPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
 