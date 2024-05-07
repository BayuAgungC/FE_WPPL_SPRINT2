import axios from "axios";
import ENDPOINTS from "../../.config/.conf";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user_id = Cookies.get("user_id");
  const company_id = Cookies.get("company_id");
  const auth = Cookies.get("auth");

  const navigate = useNavigate();

  const getData = async () => {
    const result = await axios.get(
      `${ENDPOINTS.GET.SUMMARY.ITEMS}/${user_id}/${company_id}`
    );
    setData(result.data);
  };

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    getData();

    if (!auth) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8 w-full h-screen">
        <div className="w-full flex flex-col">
          <h1 className="font-extrabold p-2 text-sm lg:text-lg ">DASHBOARD</h1>
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
        </div>

        <div className="w-full overflow-auto">
          <table className=" min-w-max w-full text-center text-neutral-500">
            <thead>
              <tr className="border-b border-b-gray-200 text-xs font-semibold bg-gray-50">
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Brand</th>
                <th className="px-6 py-3">Made In</th>
                <th className="px-6 py-3">Received</th>
                <th className="px-6 py-3">Issued</th>
                <th className="px-6 py-3">Stock</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0
                ? data.slice(0, limit).map((items, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-b-gray-200 text-sm hover:bg-gray-400/10"
                      >
                        <td className="px-6 py-3">{index + 1}</td>
                        <td className="px-6 py-3">{items.NAME}</td>
                        <td className="px-6 py-3">{items.CODE}</td>
                        <td className="px-6 py-3">{items.BRAND}</td>
                        <td className="px-6 py-3">{items.MADE_IN}</td>
                        <td className="px-6 py-3">{items.RECEIVED}</td>
                        <td className="px-6 py-3">{items.ISSUED}</td>
                        <td className="px-6 py-3">{items.STOCK}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
