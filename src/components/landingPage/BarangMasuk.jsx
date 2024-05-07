import axios from "axios";
import ENDPOINTS from "../../.config/.conf";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Dialog, Option, Select, Input } from "@material-tailwind/react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [receive, setReceive] = useState({
    id: "",
    item_id: "",
    qty: "",
  });
  const [remove, setRemove] = useState({
    id: "",
    company_id: "",
  });
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [edit, setEdit] = useState(false);
  const [limit, setLimit] = useState(20);

  const user_id = Cookies.get("user_id");
  const company_id = Cookies.get("company_id");
  const auth = Cookies.get("auth");

  const navigate = useNavigate();
  const getData = async () => {
    const result = await axios.get(
      `${ENDPOINTS.GET.ITEMS.RECEIVE}/${user_id}/${company_id}`
    );
    setData(result.data);
  };

  const getList = async () => {
    const result = await axios.get(
      `${ENDPOINTS.GET.ITEMS.LIST}/${user_id}/${company_id}`
    );
    setList(result.data);
  };

  const sendData = async () => {
    const data = new URLSearchParams();
    const currentDate = new Date().toISOString();

    data.append("item_id", receive.item_id);
    data.append("qty", receive.qty);
    data.append("input_by", user_id);
    data.append("input_date", currentDate);
    data.append("company_id", company_id);

    const result = await axios.post(
      `${ENDPOINTS.POST.ITEMS.RECEIVE.ADD}`,
      data
    );

    getData();
    getList();

    setReceive({
      qty: "",
    });
  };

  const sendDataEdit = async () => {
    const data = new URLSearchParams();

    data.append("item_id", receive.id);
    data.append("id", receive.item_id);
    data.append("qty", receive.qty);
    data.append("input_by", user_id);
    data.append("company_id", company_id);

    const result = await axios.post(
      `${ENDPOINTS.POST.ITEMS.RECEIVE.EDIT}`,
      data
    );

    setReceive({
      id: "",
      item_id: "",
      qty: "",
    });

    getData();
    getList();
    setEdit(false);
  };

  const sendDataDelete = async () => {
    const data = new URLSearchParams();
    const currentDate = new Date().toISOString();

    data.append("id", remove.id);
    data.append("company_id", company_id);

    const result = await axios.post(
      `${ENDPOINTS.POST.ITEMS.RECEIVE.DELETE}`,
      data
    );

    getData();
    getList();
    setOpenRemove(false);
  };

  useEffect(() => {
    getData();
    getList();

    if (!auth) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {/* EDIT FORM */}
      <Dialog
        open={edit}
        handler={setEdit}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="md"
        className="rounded-md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendDataEdit();
          }}
          className="flex flex-col w-full justify-center items-center gap-2 bg-white shadow-xl rounded-lg p-3 pt-1 z-20"
        >
          <div className="w-full flex items-start justify-between mb-3">
            <div className="w-full">
              <h1 className="font-semibold text-[#2E3192]">Update</h1>
            </div>
            <div className="flex w-full justify-end">
              <div
                onClick={() => {
                  setEdit(false);
                }}
                className="group p-1 -mr-2 rounded hover:bg-red-500 transition-all duration-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  className="w-[20px] md:w-[25px] fill-[#2E3192] group-hover:fill-white transition-all duration-100"
                >
                  <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div className="mb-5">
              <select
                disabled
                color="indigo"
                label="Select Items"
                className="w-full border px-3 py-2 rounded bg-gray-300/50"
                value={receive.id}
              >
                {list.length > 0
                  ? list.map((item) => (
                      <option key={item.ID} value={item.ID}>
                        {item.NAME}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            {/* QTY OF ADDED RECEIVE ITEMS */}
            <div className="mb-5">
              <Input
                required
                color="indigo"
                label="Qty"
                value={receive.qty}
                onChange={(e) => {
                  setReceive({
                    ...receive,
                    qty: e.target.value,
                  });
                }}
              />
            </div>

            {/* EDIT BUTTON OF ADDED RECEIVE ITEMS */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="w-full rounded-md p-1 bg-[#2E3192]/90 hover:bg-[#2E3192]/70 text-white font-medium"
              >
                Update
              </button>
              <button
                type="reset"
                onClick={() => setEdit(false)}
                className="w-full rounded-md p-1 bg-[#2E3192]/90 hover:bg-[#2E3192]/70 text-white font-medium"
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </Dialog>

      {/* DELETE FORM */}
      <Dialog
        open={openRemove}
        handler={setOpenRemove}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="md"
        className="rounded-md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendDataDelete();
          }}
          className="flex flex-col w-full justify-center items-center gap-2 bg-white shadow-xl rounded-lg p-3 pt-1 z-20"
        >
          <div className="w-full flex items-start justify-between mb-3">
            <div className="w-full">
              <h1 className="font-semibold text-red-500">Delete</h1>
            </div>
            <div className="flex w-full justify-end">
              <div
                onClick={() => {
                  setOpenRemove(false);
                }}
                className="group p-1 -mr-2 rounded hover:bg-red-500 transition-all duration-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  className="w-[20px] md:w-[25px] fill-[#2E3192] group-hover:fill-white transition-all duration-100"
                >
                  <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div className="mb-5">
              Menghapus barang akan mengakibatkan barang tersebut tidak tersedia
              di dalam data gudang. Apakah Anda yakin ingin menghapus barang
              tersebut?
            </div>

            {/* INPUT BUTTON OF ADDED RECEIVE ITEMS */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="w-full rounded-md p-1 bg-red-500 hover:bg-red-500/70 text-white font-medium"
              >
                Ya
              </button>
              <button
                type="reset"
                onClick={() => setOpenRemove(false)}
                className="w-full rounded-md p-1 bg-[#AC2734] hover:bg-red-500/70 text-white font-medium"
              >
                Tidak
              </button>
            </div>

            <div className="w-full flex flex-col mb-3"></div>
          </div>
        </form>
      </Dialog>

      {/* ADD FORM */}
      <Dialog
        open={open}
        handler={setOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="md"
        className="rounded-md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendData();
          }}
          className="flex flex-col w-full justify-center items-center gap-2 bg-white shadow-xl rounded-lg p-3 pt-1 z-20"
        >
          <div className="w-full flex items-start justify-between mb-3">
            <div className="w-full">
              <h1 className="font-semibold text-[#2E3192]">Receive</h1>
            </div>
            <div className="flex w-full justify-end">
              <div
                onClick={() => {
                  setOpen(false);
                }}
                className="group p-1 -mr-2 rounded hover:bg-red-500 transition-all duration-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  className="w-[20px] md:w-[25px] fill-[#2E3192] group-hover:fill-white transition-all duration-100"
                >
                  <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div className="mb-5">
              <Select
                children
                color="indigo"
                label="Select Items"
                className="focus:outline-none"
                onChange={(val) => {
                  setReceive({
                    ...receive,
                    item_id: val,
                  });
                }}
              >
                {list.length > 0
                  ? list.map((item) => (
                      <Option key={item.ID} value={item.ID.toString()}>
                        {item.NAME}
                      </Option>
                    ))
                  : null}
              </Select>
            </div>

            {/* QTY OF ADDED RECEIVE ITEMS */}
            <div className="mb-5">
              <Input
                required
                color="indigo"
                label="Qty"
                value={receive.qty}
                onChange={(e) => {
                  setReceive({
                    ...receive,
                    qty: e.target.value,
                  });
                }}
              />
            </div>

            {/* INPUT BUTTON OF ADDED RECEIVE ITEMS */}
            <div className="">
              <button
                type="submit"
                className="w-full rounded-md p-1 bg-[#2E3192]/90 hover:bg-[#2E3192]/70 text-white font-medium"
              >
                Input
              </button>
            </div>

            <div className="w-full flex flex-col mb-3"></div>
          </div>
        </form>
      </Dialog>

      <div className="flex flex-col gap-8 w-full h-screen">
        <div className="w-full flex flex-col">
          <h1 className="font-extrabold p-2 text-sm lg:text-lg ">RECEIVED</h1>
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
              onClick={() => setOpen(true)}
              disabled={list.length && list.length > 0 ? false : true}
              className="font-xs text-white text-sm bg-blue-600 border-r shadow-md lg:w-[8%] rounded p-1 my-2 disabled:cursor-not-allowed disabled:bg-blue-600/50 "
            >
              Barang Masuk
            </button>
          </div>
        </div>

        <div className="w-full overflow-auto shadow">
          <table className=" min-w-max w-full text-center">
            <thead>
              <tr className="border-b border-b-gray-200 text-xs font-semibold bg-gray-50">
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Brand</th>
                <th className="px-6 py-3">Made In</th>
                <th className="px-6 py-3">Quantity</th>
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
                        <td className="px-6 py-3">{items.MADE_IN}</td>
                        <td className="px-6 py-3">{items.QTY}</td>
                        <td className="px-6 py-3">{items.INPUT_DATE}</td>
                        <td className="px-6 py-3">{items.INPUT_BY}</td>
                        <td className="px-6 py-3">{items.COMPANY_NAME}</td>
                        {/* EDIT BUTTON */}
                        <td className="px-6 py-3">
                          <button
                            onClick={() => {
                              setReceive({
                                id: items.ID,
                                item_id: items.ITEM_ID,
                                qty: items.QTY,
                              });
                              setEdit(true);
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
                        {/* DELETE BUTTON */}
                        <td className="px-6 py-3">
                          <button
                            onClick={() => {
                              setRemove({ id: items.ITEM_ID });
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
      </div>
    </>
  );
}
