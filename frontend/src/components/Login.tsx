'use client'

import { logIn, logOut } from "@/redux/features/isLoggedIn";
import { socket } from "@/socket/io";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export default function Login() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    function handleSubmit(e: any) {
        e.preventDefault();
        socket.emit('join', name)
        dispatch(logIn(name))
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected :" + socket.id);
        })
        socket.on('disconnect', () => {
            console.log("Disconnected :" + socket.id);
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

export function LogOut() {
    const dispatch = useDispatch();
    function handleLogOut() {
        dispatch(logOut())
        socket.disconnect();
        window.location.reload()
    }
    return (
        <button
            className="bg-gray-600 rounded-lg px-2 py-0.5 text-sm font-bold cursor-pointer"
            onClick={handleLogOut}>
            Logout
        </button>
    )
}