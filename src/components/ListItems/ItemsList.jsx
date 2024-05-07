import axios from "axios";
import ENDPOINTS from "../../.config/.conf";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";

export default function ItemsList() {
  const user_id = Cookies.get("user_id");
  const company_id = Cookies.get("company_id");
  const auth = Cookies.get("auth");

  const navigate = useNavigate();

  const getData = async () => {
    const result = await axios.get(
      `${ENDPOINTS.GET.ITEMS.LIST}/${user_id}/${company_id}`
    );
    setData(result.data);
    setLoading(true);
  };

  const [openRemove, setOpenRemove] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [limit, setLimit] = useState(20);
  const [remove, setRemove] = useState({
    item_id: "",
  });
  const [item, setItem] = useState({
    item_id: "",
    name: "",
    code: "",
    brand: "",
    made_in: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();

    if (!auth) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <AddForm open={open} setOpen={setOpen} getData={getData} />
      <DeleteForm
        open={openRemove}
        setOpen={setOpenRemove}
        getData={getData}
        item_id={remove.item_id}
      />
      <EditForm
        open={openEdit}
        setOpen={setOpenEdit}
        getData={getData}
        item={item}
      />
      <div className="flex flex-col gap-8 w-full h-full">
        <div className="w-full flex flex-col">
          <h1 className="font-extrabold p-2 text-sm lg:text-lg ">ITEMS LIST</h1>
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
          <div className="flex mt-2">
            <button
              onClick={() => setOpen(!open)}
              className="font-xs text-white text-sm bg-blue-600 border-r shadow-md lg:w-[8%] rounded p-1 my-2"
            >
              Tambah Barang
            </button>
          </div>
        </div>

        {loading ? (
          <div className="w-full overflow-auto shadow">
            <table className=" min-w-max w-full text-center">
              <thead>
                <tr className="border-b border-b-gray-200 text-xs font-semibold bg-gray-50">
                  <th className="px-6 py-3">No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Code</th>
                  <th className="px-6 py-3">Brand</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Made In</th>
                  <th className="px-6 py-3">Input Date</th>
                  <th className="px-6 py-3">Input By</th>
                  <th className="px-6 py-3">Company Name</th>
                  <th className="px-6 py-3">Edit</th>
                  <th className="px-6 py-3">Delete</th>
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
                          <td className="px-6 py-3">{items.LOCATION}</td>
                          <td className="px-6 py-3">{items.MADE_IN}</td>
                          <td className="px-6 py-3">{items.INPUT_DATE}</td>
                          <td className="px-6 py-3">{items.INPUT_BY}</td>
                          <td className="px-6 py-3">{items.COMPANY_NAME}</td>
                          <td className="px-6 py-3">
                            <button
                              onClick={() => {
                                setItem({
                                  item_id: items.ID,
                                  name: items.NAME,
                                  code: items.CODE,
                                  brand: items.BRAND,
                                  made_in: items.MADE_IN,
                                });
                                setOpenEdit(true);
                              }}
                              className="bg-[#6226EF]/30 px-3 py-1 rounded"
                            >
                              <svg
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.79297 2.70728H3.1263C2.77268 2.70728 2.43354 2.84775 2.18349 3.0978C1.93344 3.34785 1.79297 3.68699 1.79297 4.04061V13.3739C1.79297 13.7276 1.93344 14.0667 2.18349 14.3168C2.43354 14.5668 2.77268 14.7073 3.1263 14.7073H12.4596C12.8133 14.7073 13.1524 14.5668 13.4024 14.3168C13.6525 14.0667 13.793 13.7276 13.793 13.3739V8.70728"
                                  stroke="#6226EF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.793 1.70718C13.0582 1.44197 13.4179 1.29297 13.793 1.29297C14.168 1.29297 14.5278 1.44197 14.793 1.70718C15.0582 1.9724 15.2072 2.33211 15.2072 2.70718C15.2072 3.08226 15.0582 3.44197 14.793 3.70718L8.45964 10.0405L5.79297 10.7072L6.45964 8.04052L12.793 1.70718Z"
                                  stroke="#6226EF"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </td>
                          <td className="px-6 py-3">
                            <button
                              onClick={() => {
                                setRemove({ item_id: items.ID });
                                setOpenRemove(true);
                              }}
                              className="bg-[#EF3826]/30 px-3 py-1 rounded"
                            >
                              <svg
                                width="20"
                                height="16"
                                viewBox="0 0 23 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.25 5.5H5.08333H19.75"
                                  stroke="#EF3826"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M17.9166 5.49992V18.3333C17.9166 18.8195 17.7234 19.2858 17.3796 19.6296C17.0358 19.9734 16.5695 20.1666 16.0833 20.1666H6.91659C6.43035 20.1666 5.96404 19.9734 5.62022 19.6296C5.27641 19.2858 5.08325 18.8195 5.08325 18.3333V5.49992M7.83325 5.49992V3.66659C7.83325 3.18036 8.02641 2.71404 8.37022 2.37022C8.71404 2.02641 9.18035 1.83325 9.66659 1.83325H13.3333C13.8195 1.83325 14.2858 2.02641 14.6296 2.37022C14.9734 2.71404 15.1666 3.18036 15.1666 3.66659V5.49992"
                                  stroke="#EF3826"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.66675 10.0833V15.5833"
                                  stroke="#EF3826"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.3333 10.0833V15.5833"
                                  stroke="#EF3826"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner className="h-8 w-8" color="indigo" />
          </div>
        )}
      </div>
    </>
  );
}
