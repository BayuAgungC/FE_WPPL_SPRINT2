import React, { useState, useEffect } from "react";
import axios from "axios";
import ENDPOINTS from "../../.config/.conf";

const LocationPage = () => {
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET.ITEMS.LIST);
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };


    const fetchLocations = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET.LOCATIONS);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchItems();
    fetchLocations();
  }, []);


  const handleLocationFilterChange = (e) => {
    setSelectedLocation(e.target.value);
    if (e.target.value === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.location === e.target.value);
      setFilteredItems(filtered);
    }
  };


  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold my-4">Items by Location</h1>


      <div className="w-full flex flex-col">
        <form
          className="relative flex w-full flex-wrap items-stretch mb-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="search"
            className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-gray-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={handleSearchInputChange}
          />
          <button
            type="submit"
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="fill-[#2E3192] h-5 w-5"
            >
              <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
            </svg>
          </button>
        </form>
      </div>


      <div className="mb-4 flex items-center">
        <label htmlFor="locationFilter" className="mr-2">
          Filter by Location:
        </label>
        <select
          id="locationFilter"
          value={selectedLocation}
          onChange={handleLocationFilterChange}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full overflow-auto shadow">
        <table className="min-w-max w-full text-center">
          <thead>
            <tr className="border-b border-b-gray-200 text-xs font-semibold bg-gray-50">
              <th className="px-6 py-3 ">No</th>
              <th className="px-6 py-3 ">Name</th>
              <th className="px-6 py-3 ">Brand</th>
              <th className="px-6 py-3 ">Code</th>
              <th className="px-6 py-3 ">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-b-gray-200 text-sm hover:bg-gray-400/10"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationPage;
