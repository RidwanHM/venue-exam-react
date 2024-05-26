import { useState } from "react";
import PropTypes from "prop-types";

const baseURL = "https://api.noroff.dev/api/v1";

function formatDate(date) {
  return date.split("T")[0];
}

export default function UpdateBookingForm({ booking, onClose, onUpdate }) {
  const [dateFrom, setDateFrom] = useState(formatDate(booking.dateFrom));
  const [dateTo, setDateTo] = useState(formatDate(booking.dateTo));
  const [guests, setGuests] = useState(booking.guests);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access_token");

      const requestData = {
        dateFrom,
        dateTo,
        guests: parseInt(guests, 10),
      };

      const response = await fetch(
        `${baseURL}/holidaze/bookings/${booking.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      onUpdate(data);
      setSuccessMessage("Booking updated successfully!");

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error updating booking:", error);
      setErrorMessage("Error updating booking. Please check the input data.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-black mb-6">Update Booking</h2>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <div>
            <label
              htmlFor="dateFrom"
              className="block text-sm font-medium text-gray-700"
            >
              Date From
            </label>
            <input
              type="date"
              id="dateFrom"
              className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="dateTo"
              className="block text-sm font-medium text-gray-700"
            >
              Date To
            </label>
            <input
              type="date"
              id="dateTo"
              className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="guests"
              className="block text-sm font-medium text-gray-700"
            >
              Guests
            </label>
            <input
              type="number"
              id="guests"
              className="mt-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UpdateBookingForm.propTypes = {
  booking: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
