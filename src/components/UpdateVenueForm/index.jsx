import { useState } from "react";
import PropTypes from "prop-types";

const baseURL = "https://api.noroff.dev/api/v1";

export default function UpdateVenueForm({ venue, onClose, onUpdate }) {
  const [name, setName] = useState(venue.name || "");
  const [description, setDescription] = useState(venue.description || "");
  const [price, setPrice] = useState(venue.price || 0);
  const [maxGuests, setMaxGuests] = useState(venue.maxGuests || 0);
  const [wifi, setWifi] = useState(venue.meta?.wifi || false);
  const [parking, setParking] = useState(venue.meta?.parking || false);
  const [breakfast, setBreakfast] = useState(venue.meta?.breakfast || false);
  const [pets, setPets] = useState(venue.meta?.pets || false);
  const [address, setAddress] = useState(venue.location?.address || "");
  const [city, setCity] = useState(venue.location?.city || "");
  const [zip, setZip] = useState(venue.location?.zip || "");
  const [country, setCountry] = useState(venue.location?.country || "");
  const [continent, setContinent] = useState(venue.location?.continent || "");
  const [lat, setLat] = useState(venue.location?.lat || 0);
  const [lng, setLng] = useState(venue.location?.lng || 0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access_token");

      const requestData = {
        name,
        description,
        price: parseFloat(price),
        maxGuests: parseInt(maxGuests, 10),
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

      console.log("Request Data: ", requestData); // For debugging

      const response = await fetch(`${baseURL}/holidaze/venues/${venue.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      console.log("Response: ", response); // For debugging
      console.log("Response Data: ", data); // For debugging

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      onUpdate(data);
      setSuccessMessage("Venue updated successfully!");

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error updating venue:", error);
      setErrorMessage("Error updating venue. Please check the input data.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md h-full max-h-screen overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-black mb-4">Update Venue</h2>

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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border border-gray-300 py-1 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold leading-6 text-gray-900 "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update Venue
            </button>
          </div>
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}

UpdateVenueForm.propTypes = {
  venue: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
