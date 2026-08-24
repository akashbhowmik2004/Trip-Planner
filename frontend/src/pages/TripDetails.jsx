import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router";
import api from "../lib/api.js";
import BudgetModal from "../components/BudgetModal.jsx";
import { useNavigate } from "react-router";
import {
  FaArrowRight,
  FaBed,
  FaCalendarAlt,
  FaCheck,
  FaChevronRight,
  FaCloudRain,
  FaCloudSun,
  FaEuroSign,
  FaHeart,
  FaMapMarkerAlt,
  FaPlus,
  FaRegClock,
  FaStar,
  FaSun,
  FaTrash,
  FaWind,
  FaUmbrellaBeach,
} from "react-icons/fa";

const photos = [
  "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85",
];

const defaultActivities = [
  {
    title: "Oia sunset walk",
    type: "Scenic stroll",
    time: "Day 1 · 18:30",
    icon: "◒",
    completed: false,
  },
  {
    title: "Catamaran cruise",
    type: "On the water",
    time: "Day 3 · 10:00",
    icon: "⌁",
    completed: false,
  },
  {
    title: "Akrotiri ruins",
    type: "History & culture",
    time: "Day 4 · 09:30",
    icon: "⌂",
    completed: false,
  },
];

const hotels = [
  {
    name: "Canaves Oia Hotel",
    detail: "Oia · Boutique stay",
    price: "₹20,000",
    rating: "4.9",
    image: photos[1],
  },
  {
    name: "Aqua Luxury Suites",
    detail: "Imerovigli · Sea view",
    price: "₹18,400",
    rating: "4.7",
    image: photos[4],
  },
];

const TripDetails = () => {
  const location = useLocation();
  const [countryDetails, setCountryDetails] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [famousPlaces, setFamousPlaces] = useState([]);
  const [placesImages, setPlacesImages] = useState([]);
  const [destinationImages, setDestinationImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState({ stay: 20000, food: 3400, fun: 50000 });
  const [currency, setCurrency] = useState("INR");
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [plannedActivities, setPlannedActivities] = useState(defaultActivities);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: "", type: "", time: "" });
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [editDraft, setEditDraft] = useState({ title: "", type: "", time: "" });
  const navigate = useNavigate();

  const toggleActivity = (title) => {
    setPlannedActivities((current) =>
      current.map((activity) =>
        activity.title === title
          ? { ...activity, completed: !activity.completed }
          : activity,
      ),
    );
  };

  const removeActivity = (title) => {
    setPlannedActivities((current) => current.filter((activity) => activity.title !== title));
  };

  const startEditing = (activity) => {
    setEditingActivityId(activity.title);
    setEditDraft({ title: activity.title, type: activity.type, time: activity.time });
  };

  const saveEdit = (originalTitle) => {
    if (!editDraft.title.trim()) return;
    setPlannedActivities((current) =>
      current.map((activity) =>
        activity.title === originalTitle
          ? { ...activity, title: editDraft.title.trim(), type: editDraft.type.trim(), time: editDraft.time.trim() }
          : activity,
      ),
    );
    setEditingActivityId(null);
  };

  const addActivity = (event) => {
    event.preventDefault();
    if (!newActivity.title.trim() || !newActivity.type.trim() || !newActivity.time.trim()) return;
    setPlannedActivities((current) => [
      ...current,
      { ...newActivity, title: newActivity.title.trim(), type: newActivity.type.trim(), time: newActivity.time.trim(), icon: "✦", completed: false },
    ]);
    setNewActivity({ title: "", type: "", time: "" });
    setIsAddingActivity(false);
  };

  const tripData = location.state || [];
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const getDayName = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };
  const fetchTripDetails = async () => {
    try {
      setLoading(true);

      // 1. Get location
      const locationResponse = await api.post("/countries/search-location", {
        query: tripData.destination,
      });

      const countryDetails = locationResponse.data;

      setCountryDetails(countryDetails);

      const lat = Number(countryDetails?.lat);
      const lon = Number(countryDetails?.lon);

      // 2. Fetch weather, places and destination images
      const [weatherResponse, placesResponse, imageResponse] =
        await Promise.all([
          api.post("/weather/get-weather", {
            lat,
            lon,
          }),

          api.post("/places/get-famous-places", {
            lat,
            lon,
          }),

          api.post("/places/get-destination-images", {
            destination: tripData.destination,
          }),
        ]);

      const places = placesResponse.data.results || [];

      const topPlaces = places.slice(0, 6);

      const imagePromises = topPlaces.map(async (place) => {
        const response = await api.post("/places/get-places-images", {
          placeName: place.name,
        });

        return response.data;
      });

      const imageResults = await Promise.all(imagePromises);

      setWeatherDetails(weatherResponse.data);
      setFamousPlaces(places);
      setDestinationImages(imageResponse.data || []);
      setPlacesImages(imageResults);

      console.log("Fetched data:", {
        countryDetails,
        weatherDetails: weatherResponse.data,
        famousPlaces: places,
        destinationImages: imageResponse.data,
        placesImages: imageResults,
      });
    } catch (error) {
      console.error(
        "Error fetching trip details:",
        error.response?.data || error.message,
      );
      console.log(error.response?.status);
      if (error.response?.status === 404) {
        navigate("/not-found");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const apiPlaceCards = famousPlaces.slice(0, 6).map((place, index) => ({
    title: place?.name,
    description: place?.location?.formatted_address,
    image: placesImages[index]?.[1]?.imageUrl || photos[index % photos.length],
  }));
  const placesToRender = apiPlaceCards.length > 0 ? apiPlaceCards : [];

  const weatherMain = weatherDetails?.weather?.[0]?.main || "Clear";
  const weatherDescription =
    weatherDetails?.weather?.[0]?.description || "clear sky";
  const weatherMainLower = weatherMain.toLowerCase();

  const weatherMood =
    weatherMainLower.includes("rain") ||
    weatherMainLower.includes("drizzle") ||
    weatherMainLower.includes("thunder")
      ? "rainy"
      : weatherMainLower.includes("cloud") ||
          weatherMainLower.includes("mist") ||
          weatherMainLower.includes("haze") ||
          weatherMainLower.includes("fog")
        ? "cloudy"
        : "sunny";

  const weatherIcon =
    weatherMood === "rainy" ? (
      <FaCloudRain />
    ) : weatherMood === "cloudy" ? (
      <FaCloudSun />
    ) : (
      <FaSun />
    );

  const temp = Math.round(weatherDetails?.main?.temp ?? 24);
  const feelsLike = Math.round(weatherDetails?.main?.feels_like ?? 25);
  const humidity = weatherDetails?.main?.humidity ?? 64;
  const windSpeedKmh = Math.round((weatherDetails?.wind?.speed ?? 3.3) * 3.6);
  const budgetTotal = budget.stay + budget.food + budget.fun;
  const currencySymbols = { INR: "₹", EUR: "€", USD: "$" };
  const currencySymbol = currencySymbols[currency];
  useEffect(() => {
    fetchTripDetails();
  }, [tripData.destination]);

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <div className="loading-panel" role="status" aria-live="polite">
            <div className="loading-route" aria-hidden="true">
              <span className="loading-route-line" />
              <span className="loading-route-dot loading-route-start" />
              <span className="loading-route-dot loading-route-end" />
              <span className="loading-route-plane">✈</span>
            </div>
            <p className="loading-eyebrow">Preparing your itinerary</p>
            <h1>{tripData.destination || "Your next escape"}</h1>
            <p className="loading-message">
              Gathering the best places, weather, and stays for your journey.
            </p>
            <div className="loading-skeletons" aria-hidden="true">
              <span className="loading-skeleton loading-skeleton-wide" />
              <span className="loading-skeleton loading-skeleton-short" />
              <span className="loading-skeleton loading-skeleton-card" />
            </div>
            <span className="loading-indicator">Finding your way</span>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="trip-details-page">
            <div className="trip-breadcrumb">
              <span>My trips</span>
              <FaChevronRight />
              <strong>Santorini</strong>
            </div>

            <section className="trip-heading">
              <div>
                <p className="eyebrow">Your next escape</p>
                <h1>
                  {countryDetails?.name} <span>·</span>{" "}
                  {countryDetails?.address?.country}
                </h1>
                <p className="trip-location">
                  <FaMapMarkerAlt />{" "}
                  {famousPlaces?.[0]?.location?.formatted_address}{" "}
                </p>
              </div>
              <button className="icon-button" aria-label="Save trip">
                <FaHeart />
              </button>
            </section>

            <section className="trip-overview">
              <div className="photo-mosaic">
                {destinationImages.map((photo, index) => (
                  <div
                    key={photo}
                    className={`trip-photo photo-${index + 1}`}
                    style={{ backgroundImage: `url(${photo.originalUrl})` }}
                  />
                ))}
              </div>
              <div className="trip-facts">
                <div className="date-fact">
                  <span>
                    <FaCalendarAlt /> Starting date
                  </span>
                  <strong>{formatDate(tripData.departure)}</strong>
                  <small>{getDayName(tripData.departure)}</small>
                </div>
                <div className="date-fact">
                  <span>
                    <FaCalendarAlt /> Ending date
                  </span>
                  <strong>{formatDate(tripData.returnDate)}</strong>
                  <small>
                    {getDayName(tripData.returnDate)} ·Trip Type-
                    {tripData.tripType} · {tripData.travelers} travelers
                  </small>
                </div>
                <div className="trip-note">
                  <FaUmbrellaBeach />
                  <p>
                    <strong>Best time to visit</strong>
                    <br />
                    Warm, sunny days with a soft Aegean breeze.
                  </p>
                </div>
                <div className={`weather-card weather-${weatherMood}`}>
                  <div className="weather-card-heading">
                    <span>{weatherIcon} Weather now</span>
                    <small>
                      {countryDetails?.name || "Oia"},{" "}
                      {countryDetails?.address?.country || "Greece"}
                    </small>
                  </div>
                  <div className="weather-current">
                    <strong>{temp}°</strong>
                    <span>{weatherDescription}</span>
                  </div>
                  <div className="weather-sections">
                    <article className="weather-section-item">
                      <small>Weather</small>
                      <strong>{weatherMain}</strong>
                    </article>
                    <article className="weather-section-item">
                      <small>Wind speed</small>
                      <strong>
                        <FaWind /> {windSpeedKmh} km/h
                      </strong>
                    </article>
                  </div>
                  <div className="weather-meta">
                    <span>
                      Feels like <strong>{feelsLike}°</strong>
                    </span>
                    <span>
                      Wind <strong>{windSpeedKmh} km/h</strong>
                    </span>
                    <span>
                      Humidity <strong>{humidity}%</strong>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <div className="details-grid">
              <div className="details-main">
                <section className="details-section places-section">
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">Build your days</p>
                      <h2>Places to visit</h2>
                    </div>
                    <Link
                      className="text-button"
                      to="/trip-map"
                      state={{ tripData, countryDetails, famousPlaces }}
                    >
                      View map <FaArrowRight />
                    </Link>
                  </div>
                  <div className="place-cards">
                    {placesToRender.map(({ title, description, image }) => (
                      <article className="place-card" key={title}>
                        <div
                          className="place-image"
                          style={{ backgroundImage: `url(${image})` }}
                        />
                        <div>
                          <h3>{title}</h3>
                          <p>{description}</p>
                        </div>
                        <FaChevronRight />
                      </article>
                    ))}
                  </div>
                </section>

                <section className="details-section">
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">Make it yours</p>
                      <h2>Plan activities</h2>
                    </div>
                    <button
                      className="outline-button"
                      type="button"
                      onClick={() => setIsAddingActivity((current) => !current)}
                    >
                      <FaPlus /> Add activity
                    </button>
                  </div>
                  {isAddingActivity && (
                    <form className="activity-form" onSubmit={addActivity}>
                      <input
                        aria-label="Activity name"
                        placeholder="Activity name"
                        value={newActivity.title}
                        onChange={(event) => setNewActivity({ ...newActivity, title: event.target.value })}
                      />
                      <input
                        aria-label="Activity type"
                        placeholder="Type, e.g. Food & culture"
                        value={newActivity.type}
                        onChange={(event) => setNewActivity({ ...newActivity, type: event.target.value })}
                      />
                      <input
                        aria-label="Activity time"
                        placeholder="Time, e.g. Day 2 · 11:00"
                        value={newActivity.time}
                        onChange={(event) => setNewActivity({ ...newActivity, time: event.target.value })}
                      />
                      <button className="primary activity-save" type="submit">Save</button>
                    </form>
                  )}
                  <div className="activity-list">
                    {plannedActivities.length === 0 && (
                      <p className="activity-empty">No activities planned yet. Add one to shape your day.</p>
                    )}
                    {plannedActivities.map((activity) => (
                      <article className={`activity-row ${activity.completed ? "activity-completed" : ""}`} key={activity.title}>
                        <button
                          className="activity-check"
                          type="button"
                          aria-label={`${activity.completed ? "Mark" : "Complete"} ${activity.title}`}
                          aria-pressed={activity.completed}
                          onClick={() => toggleActivity(activity.title)}
                        >
                          {activity.completed && <FaCheck />}
                        </button>
                        {editingActivityId === activity.title ? (
                          <div className="activity-edit-fields">
                            <input aria-label="Edit activity name" value={editDraft.title} onChange={(event) => setEditDraft({ ...editDraft, title: event.target.value })} />
                            <input aria-label="Edit activity type" value={editDraft.type} onChange={(event) => setEditDraft({ ...editDraft, type: event.target.value })} />
                            <input aria-label="Edit activity time" value={editDraft.time} onChange={(event) => setEditDraft({ ...editDraft, time: event.target.value })} />
                          </div>
                        ) : (
                          <div>
                            <h3>{activity.title}</h3>
                            <p>{activity.type}</p>
                          </div>
                        )}
                        {editingActivityId === activity.title ? (
                          <button className="activity-control" type="button" aria-label="Save activity" onClick={() => saveEdit(activity.title)}><FaCheck /></button>
                        ) : (
                          <span className="activity-time"><FaRegClock /> {activity.time}</span>
                        )}
                        <div className="activity-actions">
                          <button className="activity-control" type="button" aria-label={`Edit ${activity.title}`} onClick={() => startEditing(activity)}><FaPlus className="edit-icon" /></button>
                          <button className="activity-control activity-delete" type="button" aria-label={`Remove ${activity.title}`} onClick={() => removeActivity(activity.title)}><FaTrash /></button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="details-sidebar">
                <section className="budget-panel">
                  <div className="panel-title">
                    <div>
                      <p className="eyebrow">Keep it on track</p>
                      <h2>Budget planner</h2>
                    </div>
                    <FaEuroSign className="panel-symbol" />
                  </div>
                  <div className="budget-total">
                    <span>Estimated total</span>
                    <strong>
                      {currencySymbol}
                      {budgetTotal.toLocaleString("en-GB")}
                    </strong>
                    <small>
                      {currencySymbol}
                      {Math.round(budgetTotal / 2).toLocaleString("en-GB")} per
                      traveler
                    </small>
                  </div>
                  <div className="budget-bar">
                    <span />
                  </div>
                  <div className="budget-legend">
                    <span>
                      <i className="stay-dot" /> Stay{" "}
                      <strong>
                        {currencySymbol}
                        {budget.stay.toLocaleString("en-GB")}
                      </strong>
                    </span>
                    <span>
                      <i className="food-dot" /> Food{" "}
                      <strong>
                        {currencySymbol}
                        {budget.food.toLocaleString("en-GB")}
                      </strong>
                    </span>
                    <span>
                      <i className="fun-dot" /> Fun{" "}
                      <strong>
                        {currencySymbol}
                        {budget.fun.toLocaleString("en-GB")}
                      </strong>
                    </span>
                  </div>
                  <button
                    className="budget-action"
                    type="button"
                    onClick={() => setIsBudgetModalOpen(true)}
                  >
                    Edit budget <FaArrowRight />
                  </button>
                </section>

                <section className="hotel-panel">
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">Rest easy</p>
                      <h2>Nearby hotels</h2>
                    </div>
                    <FaBed className="panel-symbol" />
                  </div>
                  <div className="hotel-list">
                    {hotels.map((hotel) => (
                      <article className="hotel-row" key={hotel.name}>
                        <div
                          className="hotel-image"
                          style={{ backgroundImage: `url(${hotel.image})` }}
                        />
                        <div className="hotel-info">
                          <h3>{hotel.name}</h3>
                          <p>{hotel.detail}</p>
                          <span>
                            <FaStar /> {hotel.rating}
                          </span>
                        </div>
                        <strong>
                          {hotel.price}
                          <small>/ night</small>
                        </strong>
                      </article>
                    ))}
                  </div>
                  <button className="book-button">
                    Explore stays <FaArrowRight />
                  </button>
                </section>
              </aside>
            </div>
          </main>
          <BudgetModal
            isOpen={isBudgetModalOpen}
            onClose={() => setIsBudgetModalOpen(false)}
            budget={budget}
            currency={currency}
            onSave={({ budget: nextBudget, currency: nextCurrency }) => {
              setBudget(nextBudget);
              setCurrency(nextCurrency);
            }}
          />
        </>
      )}
    </>
  );
};

export default TripDetails;
