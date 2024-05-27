import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";

const baseURL = "https://api.noroff.dev/api/v1";

export default function VenueCreationForm({ onAddVenue }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVenueManager, setIsVenueManager] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const venueManagerStatus = JSON.parse(localStorage.getItem("venueManager"));
    setIsVenueManager(venueManagerStatus);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVenueManager) {
      setErrorMessage("You are not authorized to create a venue.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");

      const requestData = {
        name,
        description,
        price: parseFloat(price),
        maxGuests: parseInt(maxGuests, 10),
        media: [mediaUrl],
        meta: {
          wifi,
          parking,
          breakfast,
          pets,
        },
        location: {
          address: address || null,
          city: city || null,
          zip: zip || null,
          country: country || null,
          continent: continent || null,
          lat: lat ? parseFloat(lat) : 0,
          lng: lng ? parseFloat(lng) : 0,
        },
      };

      const response = await fetch(`${baseURL}/holidaze/venues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (typeof onAddVenue === "function") {
        onAddVenue(data);
      }

      setSuccessMessage("Venue created successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error creating venue:", error);
      setErrorMessage("Error creating venue. Please check the input data.");
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-full px-4 py-6 bg-white lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 px-4 py-6 shadow-md sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <h2 className="text-2xl font-bold text-black mb-6">Create a Venue</h2>

        {!isVenueManager && (
          <p className="text-red-500 mb-4">
            You are not authorized to create a venue.
          </p>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="maxGuests"
            className="block text-sm font-medium text-gray-700"
          >
            Max Guests
          </label>
          <input
            type="number"
            id="maxGuests"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor="mediaUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Media URL
          </label>
          <input
            type="text"
            id="mediaUrl"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            required
          />
        </div>

        <div className="flex space-x-4">
          <label
            htmlFor="wifi"
            className="block text-sm font-medium text-gray-700"
          >
            Wifi
          </label>
          <input
            type="checkbox"
            id="wifi"
            checked={wifi}
            onChange={(e) => setWifi(e.target.checked)}
          />
        </div>

        <div className="flex space-x-4">
          <label
            htmlFor="parking"
            className="block text-sm font-medium text-gray-700"
          >
            Parking
          </label>
          <input
            type="checkbox"
            id="parking"
            checked={parking}
            onChange={(e) => setParking(e.target.checked)}
          />
        </div>

        <div className="flex space-x-4">
          <label
            htmlFor="breakfast"
            className="block text-sm font-medium text-gray-700"
          >
            Breakfast
          </label>
          <input
            type="checkbox"
            id="breakfast"
            checked={breakfast}
            onChange={(e) => setBreakfast(e.target.checked)}
          />
        </div>

        <div className="flex space-x-4">
          <label
            htmlFor="pets"
            className="block text-sm font-medium text-gray-700"
          >
            Pets
          </label>
          <input
            type="checkbox"
            id="pets"
            checked={pets}
            onChange={(e) => setPets(e.target.checked)}
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="zip"
            className="block text-sm font-medium text-gray-700"
          >
            ZIP
          </label>
          <input
            type="text"
            id="zip"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="continent"
            className="block text-sm font-medium text-gray-700"
          >
            Continent
          </label>
          <input
            type="text"
            id="continent"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="lat"
            className="block text-sm font-medium text-gray-700"
          >
            Latitude
          </label>
          <input
            type="number"
            id="lat"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="lng"
            className="block text-sm font-medium text-gray-700"
          >
            Longitude
          </label>
          <input
            type="number"
            id="lng"
            className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Venue
          </button>
        </div>
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
}

VenueCreationForm.propTypes = {
  onAddVenue: PropTypes.func,
};
