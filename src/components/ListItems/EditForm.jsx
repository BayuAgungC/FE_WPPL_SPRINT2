import { Dialog, Option, Select, Input } from "@material-tailwind/react";
import ENDPOINTS from "../../.config/.conf";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function EditForm(props) {
  const [data, setData] = useState({
    item_id: "",
    name: "",
    code: "",
    brand: "",
    made_in: "",
  });

  const user_id = Cookies.get("user_id");
  const company_id = Cookies.get("company_id");

  const sendData = async () => {
    const dataAdd = new URLSearchParams();
    const currentDate = new Date().toISOString();

    dataAdd.append("item_id", data.item_id);
    dataAdd.append("name", data.name);
    dataAdd.append("code", data.code);
    dataAdd.append("brand", data.brand);
    dataAdd.append("made_in", data.made_in);
    dataAdd.append("input_by", user_id);
    dataAdd.append("company_id", company_id);

    const result = await axios.post(
      `${ENDPOINTS.POST.ITEMS.LIST.EDIT}`,
      dataAdd
    );

    props.getData();
    setData({
      name: "",
      code: "",
      brand: "",
      made_in: "",
    });
    props.setOpen(false);
  };

  useEffect(() => {
    setData({
      item_id: props.item.item_id,
      name: props.item.name,
      code: props.item.code,
      brand: props.item.brand,
      made_in: props.item.made_in,
    });
  }, [props.item]);
  return (
    <>
      <Dialog
        open={props.open}
        handler={props.setOpen}
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
              <h1 className="font-semibold text-[#2E3192]">Edit</h1>
            </div>
            <div className="flex w-full justify-end">
              <div
                onClick={() => {
                  props.setOpen(false);
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
            <div className="flex flex-col items-center justify-between md:flex-row md:gap-3">
              <div className="mb-3 w-full md:w-1/2">
                <Input
                  required
                  color="indigo"
                  label="Name"
                  value={data.name}
                  //   defaultValue={props.item.name}
                  onChange={(e) => {
                    setData({
                      ...data,
                      name: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3 w-full md:w-1/2">
                <Input
                  required
                  color="indigo"
                  label="Code"
                  value={data.code}
                  //   defaultValue={props.item.code}
                  onChange={(e) => {
                    setData({
                      ...data,
                      code: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <Input
                required
                color="indigo"
                label="Brand"
                value={data.brand}
                // defaultValue={props.item.brand}
                onChange={(e) => {
                  setData({
                    ...data,
                    brand: e.target.value,
                  });
                }}
              />
            </div>

            <div className="mb-3">
              <Input
                required
                color="indigo"
                label="Made In"
                value={data.made_in}
                // defaultValue={props.item.made_in}
                onChange={(e) => {
                  setData({
                    ...data,
                    made_in: e.target.value,
                  });
                }}
              />
            </div>

            <div className="">
              <button
                type="submit"
                className="w-full rounded-md p-1 bg-[#2E3192]/90 hover:bg-[#2E3192]/70 text-white font-medium"
              >
                Update
              </button>
            </div>

            <div className="w-full flex flex-col mb-3"></div>
          </div>
        </form>
      </Dialog>
    </>
  );
}
