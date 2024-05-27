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

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {filteredVenues.map((venue) => (
          <a
            key={venue.id}
            href={`/venue/?id=${venue.id}`}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            {venue.media && venue.media.length > 0 ? (
              <img
                className="w-full h-48 object-cover rounded-t-md"
                src={
                  typeof venue.media[0] === "string"
                    ? venue.media[0]
                    : venue.media[0].url
                }
                alt={venue.name}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-md">
                <span className="text-gray-600">No Image Available</span>
              </div>
            )}
            <div className="mt-4">
              <h1 className="text-xl font-bold mb-2 text-gray-800">
                {venue.name}
              </h1>
              <p className="text-gray-600 mb-2">{venue.description}</p>
              <p className="text-gray-600 mb-2">Price: ${venue.price}</p>
              <p className="text-gray-600 mb-2">
                Max Guests: {venue.maxGuests}
              </p>
              <p className="text-gray-600 mb-2">Rating: {venue.rating}</p>
              {venue.meta && (
                <div className="text-gray-600 mb-2">
                  {venue.meta.wifi && <span className="mr-2">WiFi</span>}
                  {venue.meta.parking && <span className="mr-2">Parking</span>}
                  {venue.meta.breakfast && (
                    <span className="mr-2">Breakfast</span>
                  )}
                  {venue.meta.pets && <span>Pets</span>}
                </div>
              )}
              {venue.location && (
                <div className="text-gray-600 mb-4">
                  <p>Address: {venue.location.address}</p>
                  <p>City: {venue.location.city}</p>
                  <p>Zip: {venue.location.zip}</p>
                  <p>Country: {venue.location.country}</p>
                </div>
              )}
              <p className="text-blue-500 mt-4 font-semibold">See more</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
