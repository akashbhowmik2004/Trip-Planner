import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaPlaneDeparture,
  FaSearch,
} from "react-icons/fa";
import { useNavigate} from "react-router";
import {useLocation} from "react-router";

const PlanTripPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {offer, destination} = location.state || {};
  const todayDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    destination: offer?.destination || destination || "",
    departure: todayDate,
    returnDate: "",
    tripType: "Solo",
    travelers: "1",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useState(() => {
    if(offer){
      console.log("Offer details from location state:", offer);
    }
  },[offer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.destination || !formData.departure || !formData.returnDate || !formData.tripType || !formData.travelers) { 
      toast.error("Please fill in all fields.");
      return;
    }
    navigate("/trip-details", { state: formData });
    console.log("Plan trip form values:", formData);
  };

  return (
    <>
      <Navbar />
      <div className="plan-trip-page">
        <main className="plan-trip-shell">
          <section className="plan-trip-card">
            <div className="plan-trip-header">
              <p className="eyebrow">Plan your perfect route</p>
              <h1>Design your next getaway.</h1>
            </div>

            <form className="plan-trip-form" onSubmit={handleSubmit}>
              <div className="field full-width">
                <span className="field-icon">
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <small>Destination</small>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <span className="field-icon">
                    <FaCalendarAlt />
                  </span>
                  <div>
                    <small>Departure</small>
                    <input
                      type="date"
                      name="departure"
                      value={formData.departure}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <span className="field-icon">
                    <FaCalendarAlt />
                  </span>
                  <div>
                    <small>Return</small>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <span className="field-icon">
                    <FaPlaneDeparture />
                  </span>
                  <div>
                    <small>Trip type</small>
                    <input
                      type="text"
                      name="tripType"
                      value={formData.tripType}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <span className="field-icon">
                    <FaUsers />
                  </span>
                  <div>
                    <small>Travelers</small>
                    <input
                      type="text"
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="primary plan-trip-button">
                Search trips <FaSearch />
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default PlanTripPage;
