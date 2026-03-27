'use client'

import { logIn } from "@/redux/features/isLoggedIn";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client"

export default function Login() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    function handleSubmit(e: any) {
        e.preventDefault();
        // console.log(socket.id);
        dispatch(logIn(name))

    }

    useEffect(() => {
        const socket = io("http://localhost:3030")
        socket.on('connect', () => {

            console.log(socket.id);
        })
        socket.on('welcome', (msg) => {
            console.log(msg);

        })


    }, [])

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="w-2/3 h-3/4 bg-gray-900 flex flex-col justify-start items-center gap-5 py-5">
                <h1 className="text-3xl capitalize">Please Login</h1>
                <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2 h-full w-full">
                    <input type="text" placeholder="your name" required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none bg-gray-800 px-2 py-1 rounded-lg text-lg" />
                    <button type="submit"
                        className="bg-gray-600 rounded-lg px-2 py-1 text-base font-bold cursor-pointer">Submit</button>
                </form>

            </div>

        </div>
    )
}