import axios from "axios"
import ENDPOINTS from "../../.config/.conf"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const reqLogin = async () => {
        const data = new URLSearchParams()
        data.append("email", user.email)
        data.append("password", user.password)
        const result = await axios.post(ENDPOINTS.POST.LOGIN, data)
        console.log(result.data["user"])
        if (result.data["user"]["authentication"]) {
            Cookies.set("auth", result.data["user"]["authentication"])
            Cookies.set("user_id", result.data["user"]["id"])
            Cookies.set("username", result.data["user"]["username"])
            Cookies.set("level", result.data["user"]["level"])
            Cookies.set("company_id", result.data["user"]["company_id"])
            // Cookies.set("user_id", result.data["user"]["user_id"])
            navigate("/dashboard")
        }
    }
    useEffect(() => {
        console.log(user)
    }, [user])
    return (
        <>
            <div className="h-screen w-screen flex justify-center item-center bg-blue-500">
                <div className="w-4/5 md:w-full flex flex-col justify-center items-center">
                    <div className="w-80 md:w-1/2 lg:w-[25%] h-auto p-8 m-4 flex border shadow-lg rounded-lg bg-white">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            reqLogin()
                        }} className="flex flex-col justify-center">

                            <div className="flex flex-col items-center mb-10">
                                <h1 className="text-lg md:text-xl font-bold">Login to Account</h1>
                                <h2 className="text-xs md:text-sm text-center">Please enter your email and password to continue</h2>
                            </div>

                            <div className="flex flex-col w-full mb-5">
                                <label htmlFor="" className="mb-2 text-xs md:text-sm">Email Address</label>
                                <input type="email" placeholder="nama@gmail.com" onChange={(e) => {
                                    setUser({
                                        ...user,
                                        email: e.target.value,
                                    })
                                }} className="bg-gray-100 w-64 md:w-80 lg:w-80 rounded-lg p-2 lg:p-3" />
                            </div>

                            <div className="flex flex-col w-full mb-2">
                                <div className="flex w-full justify-between md:w-80">
                                    <label htmlFor="" className="mb-2 text-xs md:text-sm">Password</label>
                                    <label htmlFor="" className="mb-2 text-xs md:text-sm">Forget Password?</label>
                                </div>
                                <input type="password" onChange={(e) => {
                                    setUser({
                                        ...user,
                                        password: e.target.value,
                                    })
                                }} placeholder="" className="bg-gray-100 w-64 md:w-80 lg:w-80 rounded-lg p-2 lg:p-3" />
                            </div>

                            <div className="flex mb-5">
                                <input type="checkbox" />
                                <label htmlFor="Remember Me" className="text-gray-700 text-xs ml-2">Remember Password</label>
                            </div>

                            <button type="submit" className="font-xs text-white text-sm bg-blue-500 w-64 md:w-80 rounded-md p-2 my-6">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
