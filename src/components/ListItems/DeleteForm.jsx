import { Dialog, Option, Select, Input } from "@material-tailwind/react";
import ENDPOINTS from "../../.config/.conf";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function DeleteForm(props) {

  const sendDataDelete = async () => {
    const data = new URLSearchParams();

    data.append("item_id", props.item_id);

    const result = await axios.post(
      `${ENDPOINTS.POST.ITEMS.LIST.DELETE}`,
      data
    );

    props.getData();
    props.setOpen(false);
  };

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
                onClick={() => {
                  props.setOpen(false);
                }}
                className="w-full rounded-md p-1 bg-[#AC2734] hover:bg-red-500/70 text-white font-medium"
              >
                Tidak
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}
