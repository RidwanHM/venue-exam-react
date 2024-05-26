import { useState, useEffect } from "react";

export default function Homefetch() {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const apiUrl =
      "https://api.noroff.dev/api/v1/holidaze/venues?sort=created&sortOrder=desc";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debugging: Check the fetched data
        setVenues(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto bg-white p-4">
      <input
        type="text"
        placeholder="Search venues..."
        className="mb-4 p-3 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {filteredVenues.map((venue) => (
          <a
            key={venue.id}
            href={`/venue/?id=${venue.id}`}
            className="bg-white-100 p-6 rounded-md border-2 border-blue-300 block"
          >
            {venue.media && venue.media.length > 0 ? (
              <>
                {console.log(
                  "Image URL:",
                  typeof venue.media[0] === "string"
                    ? venue.media[0]
                    : venue.media[0].url
                )}{" "}
                {/* Debugging: Check the image URL */}
                <img
                  className="mt-4"
                  src={
                    typeof venue.media[0] === "string"
                      ? venue.media[0]
                      : venue.media[0].url
                  }
                  alt={venue.name}
                />
              </>
            ) : (
              <div className="mt-4 bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-600">No Image Available</span>
              </div>
            )}
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
          </a>
        ))}
      </div>
    </div>
  );
}
