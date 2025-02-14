import type { LeafletMouseEvent } from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet.css";
import styles from "./Map.module.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import React from "react";
import pinMapIcon from "../../../public/img/pinMap.svg";
import searchIcon from "../../../public/img/search.svg";
import type { ChristmasMarket } from "../../types/marker";
import { useAuth } from "../../contexts/AuthContext";

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: pinMapIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapsProps {
  center?: [number, number];
  zoom?: number;
}

function Maps({ center = [48.8566, 2.3522], zoom = 6 }: MapsProps) {
  const { user } = useAuth();
  const [isAddingMarket, setIsAddingMarket] = useState(false);
  const [markets, setMarkets] = useState<ChristmasMarket[]>([]);
  const [newMarketPosition, setNewMarketPosition] = useState<
    [number, number] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search and filter states
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    santaPresent: boolean;
    animalsForbidden: boolean;
  }>({
    santaPresent: false,
    animalsForbidden: false,
  });

  // Form states for new market
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [numberOfExponents, setNumberOfExponents] = useState<number>(0);
  const [numberOfCraftsmen, setNumberOfCraftsmen] = useState<number>(0);
  const [placeType, setPlaceType] = useState<string>("");
  const [animationType, setAnimationType] = useState<string[]>([]);
  const [animalsForbidden, setAnimalsForbidden] = useState<boolean>(false);
  const [exposition, setExposition] = useState<boolean>(false);
  const [santaPresent, setSantaPresent] = useState<boolean>(false);
  const [restauration, setRestauration] = useState<
    "food" | "drink" | "both" | "none"
  >("none");
  const [usualDays, setUsualDays] = useState<string[]>([]);

  // Fetch markets from the backend on component load
  useEffect(() => {
    fetchMarkets();
  }, []);

  // const fetchMarkets = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3310/api/christmas-markets",
  //     );
  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch markets: ${response.statusText}`);
  //     }
  //     const data: ChristmasMarket[] = await response.json();

  //     console.info("Raw API data:", data); // 🔍 Vérifier ici

  //     const parsedData = data.map((market) => {
  //       console.info("Market before parsing:", market); // Vérifier la structure
  //       return {
  //         ...market,
  //         usual_days:
  //           typeof market.usual_days === "string" && market.usual_days !== ""
  //             ? JSON.parse(market.usual_days)
  //             : Array.isArray(market.usual_days)
  //               ? market.usual_days
  //               : [], // Défaut : tableau vide si aucune donnée
  //       };
  //     });

  //     console.info("Parsed markets:", parsedData); // Vérifie après parsing

  //     setMarkets(parsedData);
  //   } catch (error) {
  //     console.error("Failed to fetch markets:", error);
  //   }
  // };
  const fetchMarkets = async () => {
    try {
      const response = await fetch(
        "http://localhost:3310/api/christmas-markets",
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }
      const data: ChristmasMarket[] = await response.json();

      // Debug: Check the structure of usual_days
      console.info("Fetched markets (before parsing):", data);

      // Parse usual_days into an array if it's a string
      const parsedData = data.map((market) => ({
        ...market,
        usual_days:
          typeof market.usual_days === "string"
            ? JSON.parse(market.usual_days)
            : market.usual_days,
      }));

      // Debug: Check the structure after parsing
      console.info("Fetched markets (after parsing):", parsedData);

      setMarkets(parsedData);
    } catch (error) {
      console.error("Failed to fetch markets:", error);
    }
  };

  const handleAddMarketButtonClick = () => {
    if (!user) {
      alert("Vous devez être connecté pour ajouter un marché.");
      return;
    }
    setIsAddingMarket((prev) => !prev);
  };

  const handleMapClick = (e: LeafletMouseEvent) => {
    if (isAddingMarket && user) {
      const { lat, lng } = e.latlng;
      setNewMarketPosition([lat, lng]);
      setIsModalOpen(true);
      setIsAddingMarket(false);
    }
  };

  const handleModalSubmit = async () => {
    if (!name || !address || !newMarketPosition) {
      alert("Please fill in all required fields.");
      return;
    }

    const newMarketData = {
      name,
      location: { lat: newMarketPosition[0], lng: newMarketPosition[1] },
      address,
      number_of_exponents: numberOfExponents,
      number_of_craftsmen: numberOfCraftsmen,
      place_type: placeType,
      animation_type: animationType,
      animals_forbidden: animalsForbidden,
      exposition,
      santa_present: santaPresent,
      restauration,
      usual_days: usualDays,
      user_id: user?.id,
    };

    try {
      const response = await fetch(
        "http://localhost:3310/api/christmas-markets",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMarketData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save market");
      }

      const data: ChristmasMarket = await response.json();
      setMarkets((prevMarkets) => [...prevMarkets, data]);

      // Reset the form
      setIsModalOpen(false);
      setNewMarketPosition(null);
      setName("");
      setAddress("");
      setNumberOfExponents(0);
      setNumberOfCraftsmen(0);
      setPlaceType("");
      setAnimationType([]);
      setAnimalsForbidden(false);
      setExposition(false);
      setSantaPresent(false);
      setRestauration("none");
      setUsualDays([]);
    } catch (error) {
      console.error("Failed to save market:", error);
      alert("Failed to save market. Please try again.");
    }
  };

  // Toggle search mode
  const toggleSearchMode = () => {
    setIsSearchMode((prev) => !prev);
  };

  const handleDaySelection = (day: string) => {
    console.info("Selected Day:", day); // Log the day being selected
    console.info("Current Selected Days (Before Update):", selectedDays); // Log the current state

    setSelectedDays((prevDays) => {
      const updatedDays = prevDays.includes(day)
        ? prevDays.filter((d) => d !== day) // Remove the day if it's already selected
        : [...prevDays, day]; // Add the day if it's not selected

      console.info("Updated Selected Days:", updatedDays); // Log the updated state
      return updatedDays;
    });
  };

  // Handle filter selection
  const handleFilterSelection = (filter: keyof typeof selectedFilters) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  const filteredMarkets = markets.filter((market) => {
    // Ensure market.usual_days is an array
    const marketDays = Array.isArray(market.usual_days)
      ? market.usual_days
      : [];

    // Filter by selected days (OR logic)
    if (selectedDays.length > 0) {
      const hasSelectedDays = selectedDays.some((day) =>
        marketDays.includes(day),
      );
      if (!hasSelectedDays) return false;
    }

    // Other filters (e.g., Santa Present, Animals Forbidden)
    if (selectedFilters.santaPresent && !market.santa_present) {
      return false;
    }
    if (selectedFilters.animalsForbidden && !market.animals_forbidden) {
      return false;
    }

    return true;
  });
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        {/* Add Market Button */}
        {user && (
          <button
            type="button"
            className={`${styles.icon} ${styles.searchIcon}`}
            style={{
              position: "absolute",
              top: "3%",
              right: "3%",
              zIndex: 1000,
              width: "5em",
              height: "5em",
            }}
            onClick={handleAddMarketButtonClick}
          >
            {/* {isAddingMarket ? "❌" : "📍"} */}
            {isAddingMarket ? (
              "❌"
            ) : (
              <img
                src={pinMapIcon}
                alt="Add Market"
                style={{ width: "80%", height: "80%" }}
              />
            )}
          </button>
        )}

        {/* Search Mode Button */}
        <button
          type="button"
          className={`${styles.icon} ${styles.searchIcon}`}
          style={{
            position: "absolute",
            top: "12%",
            right: "3%",
            zIndex: 1000,
            width: "5em",
            height: "5em",
          }}
          onClick={toggleSearchMode}
        >
          <img
            src={searchIcon}
            alt="Search"
            style={{ width: "5em", height: "5em" }}
          />
        </button>

        {/* Search Mode UI */}
        {isSearchMode && (
          <div className={styles.searchModeContainer}>
            <div className={styles.h3}>Filters</div>
            <div className={styles.dayCheckboxes}>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDaySelection(day)}
                  />
                  {day}
                </label>
              ))}
            </div>
            <div className={styles.additionalFilters}>
              <label className={styles.dayCheckboxes}>
                <input
                  type="checkbox"
                  checked={selectedFilters.santaPresent}
                  onChange={() => handleFilterSelection("santaPresent")}
                />
                Santa Present
              </label>
              <label className={styles.dayCheckboxes}>
                <input
                  type="checkbox"
                  checked={selectedFilters.animalsForbidden}
                  onChange={() => handleFilterSelection("animalsForbidden")}
                />
                Animals Forbidden
              </label>
            </div>
          </div>
        )}

        {/* Map Container */}
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          className={styles.maps}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Add the MapClickHandler component */}
          <MapClickHandler onClick={handleMapClick} />
          {/* Display Filtered Markets */}

          {filteredMarkets.map((market) => (
            <Marker
              key={market.id}
              position={[market.location.lat, market.location.lng]}
              icon={customIcon}
            >
              <Popup className={styles.customPopup}>
                <h3>{market.name}</h3>
                <p>
                  <strong>Address:</strong> {market.address}
                </p>
                <p>
                  <strong>Exponents:</strong> {market.number_of_exponents}
                </p>
                <p>
                  <strong>Craftsmen:</strong> {market.number_of_craftsmen}
                </p>
                <p>
                  <strong>Place Type:</strong> {market.place_type}
                </p>
                <p>
                  <strong>Animations:</strong>{" "}
                  {market.animation_type?.join(", ") || "None"}
                </p>
                <p>
                  <strong>Restauration:</strong> {market.restauration}
                </p>
                <p>
                  <strong>Animals Allowed:</strong>{" "}
                  {market.animals_forbidden ? (
                    <span className={styles.forbiddenIcon}>🚫🐾 Forbidden</span>
                  ) : (
                    <span className={styles.pawIcon}>🐾 Allowed</span>
                  )}
                </p>
                <p>
                  <strong>Exposition:</strong>{" "}
                  {market.exposition ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Santa Present:</strong>{" "}
                  {market.santa_present ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Usual Days:</strong>{" "}
                  {market.usual_days?.length ? "Yes" : "No"}
                </p>
              </Popup>
            </Marker>
          ))}

          {/* Render the new market with custom icon */}
          {newMarketPosition && (
            <Marker position={newMarketPosition} icon={customIcon}>
              <Popup>New Market</Popup>
            </Marker>
          )}
          <AdjustZoomControls />
        </MapContainer>
      </div>

      {/* Modal for adding market information */}
      {/* {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Add Christmas Market</h3>

            <label
              className={`${styles.modalLabel} ${styles.modalLabelMarket}`}
            >
              Market Name
              <input
                type="text"
                placeholder="Enter market name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.modalInput}
              />
            </label>

            <label className={styles.modalLabel}>
              Address
              <input
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={styles.modalInput}
              />
            </label>

            <label className={styles.modalLabel}>
              Number of Exponents
              <input
                type="number"
                placeholder="Enter number of exponents"
                value={numberOfExponents}
                onChange={(e) => setNumberOfExponents(Number(e.target.value))}
                className={styles.modalInput}
              />
            </label>

            <label className={styles.modalLabel}>
              Number of Craftsmen
              <input
                type="number"
                placeholder="Enter number of craftsmen"
                value={numberOfCraftsmen}
                onChange={(e) => setNumberOfCraftsmen(Number(e.target.value))}
                className={styles.modalInput}
              />
            </label>

            <label className={styles.modalLabel}>
              Place Type
              <select
                value={placeType}
                onChange={(e) => setPlaceType(e.target.value)}
                className={styles.modalInput}
              >
                <option value="" disabled>
                  Select Place Type
                </option>
                <option value="church">Church</option>
                <option value="main_square">Main Square</option>
                <option value="sport_hall">Sport Hall</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className={styles.modalLabel}>
              Animation Types (comma-separated)
              <input
                type="text"
                placeholder="Enter animation types"
                value={animationType.join(", ")}
                onChange={(e) => setAnimationType(e.target.value.split(", "))}
                className={styles.modalInput}
              />
            </label>

            <label className={styles.modalLabel}>
              Restauration
              <select
                value={restauration}
                onChange={(e) =>
                  setRestauration(
                    e.target.value as "food" | "drink" | "both" | "none",
                  )
                }
                className={styles.modalInput}
              >
                <option value="none">No Restauration</option>
                <option value="food">Food</option>
                <option value="drink">Drink</option>
                <option value="both">Food and Drink</option>
              </select>
            </label>

            <div className={styles.modalLabel}>
              <h4 className={styles.modalTitle}>Usual Days</h4>
              <div className={styles.dayCheckboxContainer}>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <label key={day} className={styles.dayCheckbox}>
                    <input
                      type="checkbox"
                      value={day}
                      checked={usualDays.includes(day)}
                      onChange={(e) =>
                        setUsualDays((prevDays) =>
                          e.target.checked
                            ? [...prevDays, day]
                            : prevDays.filter((d) => d !== day),
                        )
                      }
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            <label className={styles.dayCheckbox}>
              <input
                type="checkbox"
                checked={animalsForbidden}
                onChange={(e) => setAnimalsForbidden(e.target.checked)}
              />
              Animals Forbidden
            </label>

            <label className={styles.dayCheckbox}>
              <input
                type="checkbox"
                checked={exposition}
                onChange={(e) => setExposition(e.target.checked)}
              />
              Exposition
            </label>

            <label className={styles.dayCheckbox}>
              <input
                type="checkbox"
                checked={santaPresent}
                onChange={(e) => setSantaPresent(e.target.checked)}
              />
              Santa Present
            </label>

            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.saveButton}
                onClick={handleModalSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )} */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Add Christmas Market</h3>

            {/* Informations de Base */}
            <div className={styles.section}>
              <label className={styles.modalLabel}>
                Market Name
                <input
                  type="text"
                  placeholder="e.g., Paris Christmas Market"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.modalInput}
                />
              </label>

              <label className={styles.modalLabel}>
                Address
                <input
                  type="text"
                  placeholder="e.g., 123 Main Street, Paris"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={styles.modalInput}
                />
              </label>
            </div>

            {/* Informations Supplémentaires */}
            <div className={styles.section}>
              <label className={styles.modalLabel}>
                Number of Exponents
                <input
                  type="number"
                  placeholder="e.g., 50"
                  value={numberOfExponents}
                  onChange={(e) => setNumberOfExponents(Number(e.target.value))}
                  className={styles.modalInput}
                />
              </label>

              <label className={styles.modalLabel}>
                Number of Craftsmen
                <input
                  type="number"
                  placeholder="e.g., 20"
                  value={numberOfCraftsmen}
                  onChange={(e) => setNumberOfCraftsmen(Number(e.target.value))}
                  className={styles.modalInput}
                />
              </label>
            </div>

            {/* Options */}
            <div className={styles.section}>
              <label className={styles.modalLabel}>
                Place Type
                <select
                  value={placeType}
                  onChange={(e) => setPlaceType(e.target.value)}
                  className={styles.modalInput}
                >
                  <option value="" disabled>
                    Select Place Type
                  </option>
                  <option value="church">Church</option>
                  <option value="main_square">Main Square</option>
                  <option value="sport_hall">Sport Hall</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className={styles.modalLabel}>
                Restauration
                <select
                  value={restauration}
                  onChange={(e) =>
                    setRestauration(
                      e.target.value as "food" | "drink" | "both" | "none",
                    )
                  }
                  className={styles.modalInput}
                >
                  <option value="none">No Restauration</option>
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                  <option value="both">Food and Drink</option>
                </select>
              </label>
            </div>

            {/* Usual Days */}
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Usual Days</h4>
              <div className={styles.dayCheckboxContainer}>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <label key={day} className={styles.dayCheckbox}>
                    <input
                      type="checkbox"
                      value={day}
                      checked={usualDays.includes(day)}
                      onChange={(e) =>
                        setUsualDays((prevDays) =>
                          e.target.checked
                            ? [...prevDays, day]
                            : prevDays.filter((d) => d !== day),
                        )
                      }
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            {/* Options Supplémentaires */}
            <div className={styles.section}>
              <label className={styles.dayCheckbox}>
                <input
                  type="checkbox"
                  checked={animalsForbidden}
                  onChange={(e) => setAnimalsForbidden(e.target.checked)}
                />
                Animals Forbidden
              </label>

              <label className={styles.dayCheckbox}>
                <input
                  type="checkbox"
                  checked={exposition}
                  onChange={(e) => setExposition(e.target.checked)}
                />
                Exposition
              </label>

              <label className={styles.dayCheckbox}>
                <input
                  type="checkbox"
                  checked={santaPresent}
                  onChange={(e) => setSantaPresent(e.target.checked)}
                />
                Santa Present
              </label>
            </div>

            {/* Boutons */}
            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.saveButton}
                onClick={handleModalSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Create a component to handle map clicks
const MapClickHandler = ({
  onClick,
}: {
  onClick: (e: LeafletMouseEvent) => void;
}) => {
  useMapEvent("click", onClick);
  return null;
};

function AdjustZoomControls() {
  const map = useMap();

  React.useEffect(() => {
    map.zoomControl.setPosition("bottomright");
  }, [map]);

  return null;
}

export default Maps;
