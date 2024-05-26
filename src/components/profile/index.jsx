import { useState, useEffect } from "react";
import UpdateVenueForm from "../UpdateVenueForm";
import UpdateBookingForm from "../UpdateBookingForm";

const baseURL = "https://api.noroff.dev/api/v1";

function ProfileVenues() {
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVenueManager, setIsVenueManager] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("user_name");
    const storedUserAvatar = localStorage.getItem("user_avatar");
    const storedVenueManager = JSON.parse(localStorage.getItem("venueManager"));

    if (storedUserName && storedUserAvatar) {
      setUserName(storedUserName);
      setUserAvatar(storedUserAvatar);
      setIsVenueManager(storedVenueManager);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const storedUserName = localStorage.getItem("user_name");

      if (!storedUserName) {
        console.error("No user name found in local storage.");
        setLoading(false);
        return;
      }

      try {
        if (isVenueManager) {
          const venueResponse = await fetch(
            `${baseURL}/holidaze/profiles/${storedUserName}/venues`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          if (!venueResponse.ok) {
            if (venueResponse.status === 401) {
              console.error("Unauthorized. Please log in.");
            } else {
              console.error(
                `Request failed with status: ${venueResponse.status}`
              );
            }
            throw new Error("API request failed.");
          }

          const venuesData = await venueResponse.json();
          console.log("Fetched venues:", venuesData); // Debugging: Check the fetched data
          setVenues(venuesData);

          const bookingsResponse = await fetch(
            `${baseURL}/holidaze/bookings?_venue=true`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          if (!bookingsResponse.ok) {
            if (bookingsResponse.status === 401) {
              console.error("Unauthorized. Please log in.");
            } else {
              console.error(
                `Request failed with status: ${bookingsResponse.status}`
              );
            }
            throw new Error("API request failed.");
          }

          const bookingsData = await bookingsResponse.json();
          console.log("Fetched bookings:", bookingsData); // Debugging: Check the fetched data
          setBookings(bookingsData.data || []);
        } else {
          const bookingsResponse = await fetch(
            `${baseURL}/holidaze/profiles/${storedUserName}/bookings?_venue=true`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          if (!bookingsResponse.ok) {
            if (bookingsResponse.status === 401) {
              console.error("Unauthorized. Please log in.");
            } else {
              console.error(
                `Request failed with status: ${bookingsResponse.status}`
              );
            }
            throw new Error("API request failed.");
          }

          const bookingsData = await bookingsResponse.json();
          console.log("Fetched bookings:", bookingsData); // Debugging: Check the fetched data
          setBookings(bookingsData.data || []);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (userName) {
      fetchData();
    }
  }, [isVenueManager, userName]);

  useEffect(() => {
    console.log("Venues state:", venues);
    console.log("Bookings state:", bookings);

    // Check the structure of each booking to ensure venue information is present
    bookings.forEach((booking) => {
      console.log(
        "Booking venue ID:",
        booking.venue ? booking.venue.id : "No venue"
      );
    });

    if (isVenueManager) {
      const venueIds = venues.map((venue) => venue.id);
      console.log("Venue IDs:", venueIds);
      const filtered = bookings.filter((booking) => {
        return venueIds.includes(booking.venue?.id);
      });
      console.log("Filtered bookings:", filtered);
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  }, [venues, bookings, isVenueManager]);

  const handleChangeAvatar = async () => {
    const newAvatar = prompt("Enter the new avatar URL:");
    if (newAvatar) {
      try {
        const endpoint = `${baseURL}/holidaze/profiles/${userName}/media`;

        const response = await fetch(endpoint, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ avatar: newAvatar }),
        });

        if (!response.ok) {
          throw new Error("Failed to update avatar");
        }

        const updatedProfile = await response.json();

        localStorage.setItem("user_avatar", updatedProfile.avatar);
        setUserAvatar(updatedProfile.avatar);
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }
  };

  const handleUpdateItem = (item) => {
    setSelectedItem(item);
  };

  const handleDeleteItem = async (itemId, isVenue) => {
    const endpoint = isVenue
      ? `${baseURL}/holidaze/venues/${itemId}`
      : `${baseURL}/holidaze/bookings/${itemId}`;

    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(endpoint, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete item");
        }

        if (isVenue) {
          setVenues((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
        } else {
          setBookings((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
          setFilteredBookings((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleUpdate = async (updatedItem, isVenue) => {
    if (!isVenueManager) {
      try {
        const response = await fetch(
          `${baseURL}/holidaze/bookings/${updatedItem.id}?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch updated booking details");
        }

        const updatedBooking = await response.json();

        setBookings((prevItems) =>
          prevItems.map((item) =>
            item.id === updatedBooking.id ? updatedBooking : item
          )
        );
        setFilteredBookings((prevItems) =>
          prevItems.map((item) =>
            item.id === updatedBooking.id ? updatedBooking : item
          )
        );
      } catch (error) {
        console.error("Error fetching updated booking details:", error);
      }
    } else {
      setVenues((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    }
    setSelectedItem(null);
  };

  const handleCloseUpdateForm = () => {
    setSelectedItem(null);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <div className="p-4 w-full max-w-2xl bg-white rounded-lg shadow-md py-6 px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Your Profile
          </h2>
          <div className="flex items-center justify-center mt-4">
            <img
              className="w-16 h-16 rounded-full border-2 border-blue-500 mr-4"
              src={userAvatar}
              alt={`${userName}'s Avatar`}
            />
            <div>
              <p className="font-semibold text-lg text-black">{userName}</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors duration-200"
            onClick={handleChangeAvatar}
          >
            Change Avatar
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mt-6 mb-4">My Venues</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 py-6 px-4">
            {venues.length > 0 ? (
              venues.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-white p-6 rounded-md border-2 border-blue-300"
                >
                  <h1 className="text-2xl font-bold mb-2 text-black overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                    {venue.name}
                  </h1>
                  <p className="text-gray-600">{venue.description}</p>
                  <p className="text-gray-600">Price: ${venue.price}</p>
                  <p className="text-gray-600">Max Guests: {venue.maxGuests}</p>
                  <p className="text-gray-600">Rating: {venue.rating}</p>
                  {venue.meta && (
                    <div className="mt-2 text-gray-600">
                      {venue.meta.wifi && <span>WiFi</span>}
                      {venue.meta.parking && <span>Parking</span>}
                      {venue.meta.breakfast && <span>Breakfast</span>}
                      {venue.meta.pets && <span>Pets</span>}
                    </div>
                  )}
                  {venue.location && (
                    <div className="mt-2 text-gray-600">
                      <p>Address: {venue.location.address}</p>
                      <p>City: {venue.location.city}</p>
                      <p>Zip: {venue.location.zip}</p>
                      <p>Country: {venue.location.country}</p>
                    </div>
                  )}
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                      onClick={() => handleUpdateItem(venue)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
                      onClick={() => handleDeleteItem(venue.id, true)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-black">No venues available.</p>
            )}
          </div>
          {isVenueManager && (
            <>
              <h2 className="text-2xl font-bold mt-6 mb-4">
                Bookings on Venues
              </h2>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 py-6 px-4">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white p-6 rounded-md border-2 border-blue-300"
                    >
                      <h1 className="text-2xl font-bold mb-2 text-black overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                        {booking.venue?.name || "Unknown Venue"}
                      </h1>
                      <p className="text-gray-600">
                        Booking for {booking.guests} guests from{" "}
                        {formatDate(booking.dateFrom)} to{" "}
                        {formatDate(booking.dateTo)}
                      </p>
                      <div className="flex justify-between mt-4">
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                          onClick={() => handleUpdateItem(booking)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
                          onClick={() => handleDeleteItem(booking.id, false)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-black">No bookings available.</p>
                )}
              </div>
            </>
          )}
        </>
      )}
      {selectedItem && isVenueManager && (
        <UpdateVenueForm
          venue={selectedItem}
          onClose={handleCloseUpdateForm}
          onUpdate={handleUpdate}
        />
      )}
      {selectedItem && !isVenueManager && (
        <UpdateBookingForm
          booking={selectedItem}
          onClose={handleCloseUpdateForm}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default ProfileVenues;
