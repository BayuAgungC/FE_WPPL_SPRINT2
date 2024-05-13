import axios from "axios";
import ENDPOINTS from "../../.config/.conf";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Dialog, Option, Select, Input } from "@material-tailwind/react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(20);
  const [selectedLocation, setSelectedLocation] = useState("");

  const user_id = Cookies.get("user_id");
  const company_id = Cookies.get("company_id");
  const auth = Cookies.get("auth");

  const getData = async () => {
    const result = await axios.get(
      `${ENDPOINTS.GET.ITEMS.RECEIVE}/${user_id}/${company_id}`
    );
    setData(result.data);
  };

  useEffect(() => {
    getData();

    if (!auth) {
      navigate("/login");
    }
  }, []);

  // Filter data by location
  const filteredData = selectedLocation
    ? data.filter((item) => item.LOCATION === selectedLocation)
    : data;

  return (
    <div className="flex flex-col gap-8 w-full h-screen">
      <div className="w-full flex flex-col">
        <h1 className="font-extrabold p-2 text-sm lg:text-lg ">Item Location</h1>
        <form
          className="relative flex w-full flex-wrap items-stretch"
          onSubmit={(e) => {
            e.preventDefault();
            //   hasilFilter();
          }}
        >
          <input
            type="search"
            className="relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={(e) => {
              // setSearch(e.target.value);
            }}
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
        <div className="mt-4">
          <Select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            color="lightBlue"
            size="regular"
            outline={true}
            placeholder="Filter by Location"
          >
            <Option value="">All Locations</Option>
            {/* Assuming you have a list of locations */}
            <Option value="Location1">Rak A</Option>
            <Option value="Location2">Rak B</Option>
            <Option value="Location3">Rak C</Option>
            {/* Add more options as needed */}
          </Select>
        </div>
      </div>
      <div className="w-full overflow-auto shadow">
        <table className="min-w-max w-full text-center">
          <thead>
            <tr className="border-b border-b-gray-200 text-xs font-semibold bg-gray-50">
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 &&
              filteredData.slice(0, limit).map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-b-gray-200 text-sm hover:bg-gray-400/10"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{item.NAME}</td>
                  <td className="px-6 py-3">{item.BRAND}</td>
                  <td className="px-6 py-3">{item.CODE}</td>
                  <td className="px-6 py-3">{item.LOCATION}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
