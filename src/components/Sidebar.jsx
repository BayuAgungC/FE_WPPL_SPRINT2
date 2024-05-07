import Cookies from "js-cookie";
import Avatar from "../assets/svg/Avatar.svg";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";


export default function Sidebar() {
    const [isOpen, setOpen] = useState(false);
    const Navigate = useNavigate();
    const location = useLocation();

    const username = Cookies.get("username")
    const level = Cookies.get("level")

    useEffect(() => {
        if (location.pathname === "/") {
            Navigate("/dashboard")
        }
    }, [])

    return (
        <>
            <div className='flex h-screen'>

                <div className={`h-full ${isOpen ? "w-2/3" : "w-[16%] md:w-[7%] lg:w-[4%]"} duration-300 fixed z-10 md:w-2/5 lg:w-1/5 flex flex-col bg-white border-r shadow-sm`}>
                    <div className={`p-2 pb-2 flex justify-between items-center ${!isOpen && ""}`}>
                        <div className={`flex ${!isOpen && "hidden"}`}>
                            <img src='https://img.logoipsum.com/234.svg' className='w-12' alt='logo idk' />
                            <h1 className="p-2 font-bold text-xs md:text-lg lg:text-base">Hello, {username}👋</h1>
                            <h1></h1>
                        </div>

                        <div className="flex">
                            <div className='w-10 flex flex-col gap-0.5 p-2' onClick={() => setOpen(!isOpen)}>
                                <div className="w-full h-1 bg-black/60 rounded"></div>
                                <div className="w-full h-1 bg-black/60 rounded"></div>
                                <div className="w-full h-1 bg-black/60 rounded"></div>
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-col p-6 ${!isOpen && "hidden"}`}>
                        <h1 className="font-bold text-xs md:text-lg">Sistem Informasi</h1>
                        <h1 className="font-bold text-xs md:text-lg">Manajemen Warehouse</h1>
                    </div>

                    <div className="flex flex-col h-full justify-between">
                        <div className="flex flex-col">
                            <Tooltip
                                placement="right"
                                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                animate={{
                                    mount: { scale: 1, y: 0, x: 30 },
                                    unmount: { scale: 0, y: 0, x: -50 },
                                }}
                                content={
                                    <div className="w-max">
                                        <h1 className="text-sm font-bold uppercase text-[#263238]">
                                            Dashboard
                                        </h1>
                                        <p className="text-xs text-[#525C61]">
                                            Summary of Items!
                                        </p>
                                    </div>
                                }
                            >
                                <div onClick={() => {
                                    Navigate('/Dashboard')
                                }} className={`flex mx-3 transition-all duration-200 my-1 p-1 w-[90%] rounded-md text-gray-600 group hover:text-black hover:font-bold hover:bg-gray-100 hover:cursor-pointer ${!isOpen && "w-[52%] lg:w-[50%] my-2"}`}>
                                    <svg className="fill-[#6B7280] group-hover:fill-black" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 3H5C3.89543 3 3 3.89543 3 5V9C3 10.1046 3.89543 11 5 11H9C10.1046 11 11 10.1046 11 9V5C11 3.89543 10.1046 3 9 3Z" />
                                        <path d="M19 3H15C13.8954 3 13 3.89543 13 5V9C13 10.1046 13.8954 11 15 11H19C20.1046 11 21 10.1046 21 9V5C21 3.89543 20.1046 3 19 3Z" />
                                        <path d="M9 13H5C3.89543 13 3 13.8954 3 15V19C3 20.1046 3.89543 21 5 21H9C10.1046 21 11 20.1046 11 19V15C11 13.8954 10.1046 13 9 13Z" />
                                        <path d="M19 13H15C13.8954 13 13 13.8954 13 15V19C13 20.1046 13.8954 21 15 21H19C20.1046 21 21 20.1046 21 19V15C21 13.8954 20.1046 13 19 13Z" />
                                    </svg>
                                    <h1 className={`ml-3 text-sm md:text-lg ${!isOpen && "hidden"}`}>Dashboard</h1>
                                </div>
                            </Tooltip>

                            <Tooltip
                                placement="right"
                                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                animate={{
                                    mount: { scale: 1, y: 0, x: 30 },
                                    unmount: { scale: 0, y: 0, x: -50 },
                                }}
                                content={
                                    <div className="w-max">
                                        <h1 className="text-sm font-bold uppercase text-[#263238]">
                                            Barang Masuk
                                        </h1>
                                        <p className="text-xs text-[#525C61]">
                                            Items Receive!
                                        </p>
                                    </div>
                                }
                            >

                                <div onClick={() => {
                                    Navigate('/Received')
                                }} className={`flex mx-3 transition-all duration-200 my-1 p-1 w-[90%] rounded-md text-gray-600 group hover:text-black hover:font-bold hover:bg-gray-100 hover:cursor-pointer ${!isOpen && "w-[52%] lg:w-[50%] my-2"}`}>
                                    <svg className="fill-[#6B7280] group-hover:fill-black" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.25 11.8301L3 8.36011V16.0901C3.00888 16.7483 3.3991 17.3414 4 17.6101L11.19 21.0001H11.25V11.8301Z" />
                                        <path d="M12 10.5L20.51 6.93001C20.3668 6.77089 20.1934 6.64173 20 6.55001L12.8 3.18001C12.2936 2.94032 11.7064 2.94032 11.2 3.18001L3.99999 6.55001C3.80655 6.64173 3.63321 6.77089 3.48999 6.93001L12 10.5Z" />
                                        <path d="M12.75 11.8301V21.0001H12.8L20 17.6101C20.5977 17.3429 20.9873 16.7546 21 16.1001V8.36011L12.75 11.8301Z" />
                                    </svg>

                                    <h1 className={`ml-3 text-sm md:text-lg ${!isOpen && "hidden"}`}>Barang Masuk</h1>
                                </div>
                            </Tooltip>

                            <Tooltip
                                placement="right"
                                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                animate={{
                                    mount: { scale: 1, y: 0, x: 30 },
                                    unmount: { scale: 0, y: 0, x: -50 },
                                }}
                                content={
                                    <div className="w-max">
                                        <h1 className="text-sm font-bold uppercase text-[#263238]">
                                            Barang Keluar
                                        </h1>
                                        <p className="text-xs text-[#525C61]">
                                            Items Issued!
                                        </p>
                                    </div>
                                }
                            >
                                <div onClick={() => {
                                    Navigate('/Issued')
                                }} className={`flex mx-3 transition-all duration-200 my-1 p-1 w-[90%] rounded-md text-gray-600 group hover:text-black hover:font-bold hover:bg-gray-100 hover:cursor-pointer ${!isOpen && "w-[52%] lg:w-[50%] my-2"}`}>
                                    <svg className="fill-[#6B7280] group-hover:fill-black" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.25 11.8301L3 8.36011V16.0901C3.00888 16.7483 3.3991 17.3414 4 17.6101L11.19 21.0001H11.25V11.8301Z" />
                                        <path d="M12 10.5L20.51 6.93001C20.3668 6.77089 20.1934 6.64173 20 6.55001L12.8 3.18001C12.2936 2.94032 11.7064 2.94032 11.2 3.18001L3.99999 6.55001C3.80655 6.64173 3.63321 6.77089 3.48999 6.93001L12 10.5Z" />
                                        <path d="M12.75 11.8301V21.0001H12.8L20 17.6101C20.5977 17.3429 20.9873 16.7546 21 16.1001V8.36011L12.75 11.8301Z" />
                                    </svg>
                                    <h1 className={`ml-3 text-sm md:text-lg ${!isOpen && "hidden"}`}>Barang Keluar</h1>
                                </div>
                            </Tooltip>


                            <Tooltip
                                placement="right"
                                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                animate={{
                                    mount: { scale: 1, y: 0, x: 30 },
                                    unmount: { scale: 0, y: 0, x: -50 },
                                }}
                                content={
                                    <div className="w-max">
                                        <h1 className="text-sm font-bold uppercase text-[#263238]">
                                            Daftar Barang
                                        </h1>
                                        <p className="text-xs text-[#525C61]">
                                            List of Items!
                                        </p>
                                    </div>
                                }
                            >
                                <div onClick={() => {
                                    Navigate('/items')
                                }} className={`flex mx-3 transition-all duration-200 my-1 p-1 w-[90%] rounded-md text-gray-600 group hover:text-black hover:font-bold hover:bg-gray-100 hover:cursor-pointer ${!isOpen && "w-[52%] lg:w-[50%] my-2"}`}>
                                    <svg className="fill-[#6B7280] group-hover:fill-black" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.25 11.8301L3 8.36011V16.0901C3.00888 16.7483 3.3991 17.3414 4 17.6101L11.19 21.0001H11.25V11.8301Z" />
                                        <path d="M12 10.5L20.51 6.93001C20.3668 6.77089 20.1934 6.64173 20 6.55001L12.8 3.18001C12.2936 2.94032 11.7064 2.94032 11.2 3.18001L3.99999 6.55001C3.80655 6.64173 3.63321 6.77089 3.48999 6.93001L12 10.5Z" />
                                        <path d="M12.75 11.8301V21.0001H12.8L20 17.6101C20.5977 17.3429 20.9873 16.7546 21 16.1001V8.36011L12.75 11.8301Z" />
                                    </svg>
                                    <h1 className={`ml-3 text-sm md:text-lg ${!isOpen && "hidden"}`}>Daftar Barang</h1>
                                </div>
                            </Tooltip>

                            <Tooltip
                                placement="right"
                                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                animate={{
                                    mount: { scale: 1, y: 0, x: 30 },
                                    unmount: { scale: 0, y: 0, x: -50 },
                                }}
                                content={
                                    <div className="w-max">
                                        <h1 className="text-sm font-bold uppercase text-[#263238]">
                                            History Barang
                                        </h1>
                                        <p className="text-xs text-[#525C61]">
                                            History of Items!
                                        </p>
                                    </div>
                                }
                            >
                                <div className={`flex mx-3 transition-all duration-200 my-1 p-1 w-[90%] rounded-md text-gray-600 group hover:text-black hover:font-bold hover:bg-gray-100 hover:cursor-pointer ${!isOpen && "w-[52%] lg:w-[50%] my-2"}`}>
                                    <svg className="fill-[#6B7280] group-hover:fill-black" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.3 2.32994L19.74 7.32994C19.9067 7.51333 19.9994 7.7521 20 7.99994V19.4999C19.9921 20.1709 19.7179 20.8113 19.2378 21.2802C18.7577 21.749 18.111 22.0079 17.44 21.9999H6.56C5.88899 22.0079 5.24229 21.749 4.76218 21.2802C4.28208 20.8113 4.00791 20.1709 4 19.4999V4.49994C4.00791 3.82892 4.28208 3.18854 4.76218 2.71969C5.24229 2.25084 5.88899 1.99193 6.56 1.99994H14.56C14.8422 2.0006 15.1109 2.12046 15.3 2.32994ZM12 11.9999H9C8.44772 11.9999 8 12.4477 8 12.9999C8 13.5522 8.44772 13.9999 9 13.9999H12C12.5523 13.9999 13 13.5522 13 12.9999C13 12.4477 12.5523 11.9999 12 11.9999ZM9 17.9999C8.44772 17.9999 8 17.5522 8 16.9999C8 16.4477 8.44772 15.9999 9 15.9999H15C15.5523 15.9999 16 16.4477 16 16.9999C16 17.5522 15.5523 17.9999 15 17.9999H9ZM14 7.14994C13.9652 7.5795 14.2811 7.9577 14.71 7.99994H17.74L14 3.99994V7.14994Z" />
                                    </svg>
                                    <h1 className={`ml-3 text-sm md:text-lg ${!isOpen && "hidden"}`}>History</h1>
                                </div>
                            </Tooltip>

                            <Tooltip
                                placement="right"
                                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                animate={{
                                    mount: { scale: 1, y: 0, x: 30 },
                                    unmount: { scale: 0, y: 0, x: -50 },
                                }}
                                content={
                                    <div className="w-max">
                                        <h1 className="text-sm font-bold uppercase text-[#263238]">
                                            Location
                                        </h1>
                                        <p className="text-xs text-[#525C61]">
                                            Location of Items!
                                        </p>
                                    </div>
                                }
                            >
                                <div className={`flex mx-3 transition-all duration-200 my-1 p-1 w-[90%] rounded-md text-gray-600 group hover:text-black hover:font-bold hover:bg-gray-100 hover:cursor-pointer ${!isOpen && "w-[52%] lg:w-[50%] my-2"}`}>
                                    <svg className="fill-[#6B7280] group-hover:fill-black" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.01" width="24" height="24" />
                                        <path d="M18 4V7C18 8.10457 17.1046 9 16 9H8C6.89543 9 6 8.10457 6 7V4C4.34315 4 3 5.34315 3 7V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V7C21 5.34315 19.6569 4 18 4Z" />
                                        <rect x="7" y="2" width="10" height="6" rx="1" />
                                    </svg>

                                    <h1 className={`ml-3 text-sm md:text-lg ${!isOpen && "hidden"}`}>Locations</h1>
                                </div>
                            </Tooltip>

                            <Tooltip
                                placement="right"
                                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                animate={{
                                    mount: { scale: 1, y: 0, x: 30 },
                                    unmount: { scale: 0, y: 0, x: -50 },
                                }}
                                content={
                                    <div className="w-max">
                                        <h1 className="text-sm font-bold uppercase text-[#263238]">
                                            Help
                                        </h1>
                                        <p className="text-xs text-[#525C61]">
                                            you need help?
                                        </p>
                                    </div>
                                }
                            >
                                <div className={`flex mx-3 transition-all duration-200 my-1 p-1 w-[90%] rounded-md text-gray-600 group hover:text-black hover:font-bold hover:bg-gray-100 hover:cursor-pointer ${!isOpen && "w-[52%] lg:w-[50%] my-2"}`}>
                                    <svg className="fill-[#6B7280] group-hover:fill-black" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" />
                                        <path d="M19.23 9.37H20.32C21.2495 9.3755 22 10.1305 22 11.06V13C21.9952 13.901 21.2805 14.6378 20.38 14.67H19.29C19.1589 14.6811 19.046 14.7667 19 14.89C18.927 15.0025 18.927 15.1475 19 15.26L19.73 15.99C20.0457 16.3035 20.2233 16.7301 20.2233 17.175C20.2233 17.6199 20.0457 18.0465 19.73 18.36L18.39 19.7C18.0801 20.0189 17.6546 20.1991 17.21 20.2C16.7635 20.1941 16.3367 20.0148 16.02 19.7L15.26 18.93C15.1475 18.857 15.0025 18.857 14.89 18.93C14.74 18.99 14.63 19.09 14.63 19.23V20.32C14.6245 21.2495 13.8695 22 12.94 22H11.05C10.1451 22.0006 9.40232 21.2843 9.37 20.38V19.29C9.35895 19.1589 9.27326 19.046 9.15 19C9.02506 18.9199 8.86494 18.9199 8.74 19L7.97 19.74C7.65648 20.0557 7.22994 20.2333 6.785 20.2333C6.34006 20.2333 5.91352 20.0557 5.6 19.74L4.26 18.38C3.93962 18.067 3.75931 17.6379 3.76 17.19C3.76586 16.7435 3.94517 16.3167 4.26 16L5.07 15.26C5.14298 15.1475 5.14298 15.0025 5.07 14.89C5.01 14.74 4.91 14.63 4.77 14.63H3.68C2.75055 14.6245 1.99998 13.8695 2 12.94V11.05C2 10.1222 2.75216 9.37 3.68 9.37H4.71C4.84109 9.35895 4.95403 9.27326 5 9.15C5.08005 9.02506 5.08005 8.86494 5 8.74L4.26 8C3.93494 7.68539 3.75142 7.25237 3.75142 6.8C3.75142 6.34763 3.93494 5.91461 4.26 5.6L5.63 4.26C5.9399 3.94115 6.36536 3.76087 6.81 3.76C7.25653 3.76586 7.68328 3.94517 8 4.26L8.74 5.07C8.85254 5.14298 8.99746 5.14298 9.11 5.07C9.26 5.01 9.37 4.91 9.37 4.77V3.68C9.3755 2.75055 10.1305 1.99998 11.06 2H13C13.9083 2.02704 14.6304 2.77134 14.63 3.68V4.71C14.6411 4.84109 14.7267 4.95403 14.85 5C14.9749 5.08005 15.1351 5.08005 15.26 5L16.03 4.26C16.3435 3.94428 16.7701 3.76672 17.215 3.76672C17.6599 3.76672 18.0865 3.94428 18.4 4.26L19.74 5.63C20.0594 5.94362 20.2396 6.37235 20.24 6.82C20.2414 7.2651 20.0608 7.69143 19.74 8L18.93 8.74C18.857 8.85254 18.857 8.99746 18.93 9.11C18.99 9.26 19.09 9.37 19.23 9.37ZM8.76642 13.3394C9.30816 14.6473 10.5844 15.5 12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.5844 14.6473 9.30816 13.3394 8.76642C12.0315 8.22469 10.5261 8.52413 9.52513 9.52513C8.52413 10.5261 8.22469 12.0315 8.76642 13.3394Z" />
                                    </svg>
                                    <h1 className={`ml-3 text-sm md:text-lg ${!isOpen && "hidden"}`}>Help</h1>
                                </div>
                            </Tooltip>
                        </div>

                        <Tooltip
                            placement="right"
                            className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                            animate={{
                                mount: { scale: 1, y: 0, x: 30 },
                                unmount: { scale: 0, y: 0, x: -50 },
                            }}
                            content={
                                <div className="w-max">
                                    <h1 className="text-sm font-bold uppercase text-[#263238]">
                                        THIS IS YOU!
                                    </h1>
                                    <p className="text-xs text-[#525C61]">
                                        {level >= 2 ? "Admin huh? not bad" : "Pffftt"}
                                    </p>
                                </div>
                            }
                        >

                            <div className='flex m-3'>
                                <img className='w-10 h-10' src={Avatar} alt="" />
                                <div className="flex justify-between items-center w-52 ml-3 mb-2">
                                    <div className={`flex flex-col leading-6 ${!isOpen && "hidden"}`}>
                                        <h4 className="font-semibold text-sm md:text-sm lg:text-base">{username}</h4>
                                        <span className="text-xs text-gray-600 md:text-sm lg:text-base">{level >= 2 ? "Admin" : "Guest"}</span>
                                    </div>
                                </div>
                            </div>
                        </Tooltip>
                    </div>

                </div>

                <div className="w-full p-12 ml-10">
                    <Outlet />
                </div>
            </div>
        </>
    );
}