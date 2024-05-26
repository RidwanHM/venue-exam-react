import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../DatePickerModal.css";

const baseURL = "https://api.noroff.dev/api/v1";

const DatePickerModal = ({ onClose, venue }) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (venue && venue.id) {
      fetchBookings();
    } else {
      setError("Invalid venue ID");
    }
  }, [venue]);

  const fetchBookings = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      const response = await fetch(
        `${baseURL}/holidaze/bookings?_venue=${venue.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch bookings. Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error("No bookings found for this venue.");
      }

      const processedBookings = data.map((booking) => ({
        start: new Date(booking.dateFrom),
        end: new Date(booking.dateTo),
      }));

      setBookings(processedBookings);
    } catch (error) {
      setError(error.message);
    }
  };

  const tileDisabled = ({ date }) => {
    const disabled = bookings.some(
      (booking) => date >= booking.start && date <= booking.end
    );

    if (disabled) {
      // If the date is disabled, find the booking that matches the date
      const matchingBooking = bookings.find(
        (booking) => date >= booking.start && date <= booking.end
      );

      if (matchingBooking) {
        console.log("Date:", date);
        console.log("Booking Info:", matchingBooking);
      }
    }

    return disabled;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md h-full max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold text-black mb-4">Available Dates</h2>
        <button
          onClick={onClose}
          className="text-sm font-semibold leading-6 text-gray-900 mb-4"
        >
          Close
        </button>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Calendar tileDisabled={tileDisabled} className="custom-calendar" />
        )}
      </div>
    </div>
  );
};

DatePickerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
};

export default DatePickerModal;
