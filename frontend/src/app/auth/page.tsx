'use client'

import { logIn, logOut } from "@/redux/features/isLoggedIn";
import { socket } from "@/socket/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type User = {
    username: string,
    email: string,
    password: string
}

export default function auth() {
    const [showSignIn, setShowSignIn] = useState(true)
    return (
        showSignIn ?
            <Signin set={setShowSignIn} /> :
            <Signup set={setShowSignIn} />
    )
}

// COMPONENTS
export function Signup(prop: { set: Function }) {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        username: "",
        email: "",
        password: "",
    });
    const [conform_password, setConform_password] = useState("")
    const dispatch = useDispatch();

    function handleSubmit(e: any) {
        e.preventDefault();
        if (user.password != conform_password) return alert("password not matched")
        socket.emit('join', user.username)
        dispatch(logIn(user.username))
        router.push('/')
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
        <div id="main" className="h-screen w-full flex flex-col gap-8 justify-center items-center">
            <div id="container" className="bg-(--container-bg) border-(--container-border) border rounded-3xl flex flex-col justify-start items-center gap-5 py-5 px-12 md:px-25">
                <h1 className="text-3xl capitalize">Sign-up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 h-full w-full">
                    <input type="text"
                        placeholder="username"
                        required
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="outline-none text-center text-(--input-text) bg-(--input-bg) border-(--input-border) border py-1 rounded-3xl text-lg" />
                    <input type="email"
                        placeholder="email"
                        required
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="outline-none text-(--input-text) bg-(--input-bg) border-(--input-border) border text-center py-1 rounded-3xl text-lg" />
                    <input type="password"
                        placeholder="password"
                        required
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="outline-none text-(--input-text) bg-(--input-bg) border-(--input-border) border text-center py-1 rounded-3xl text-lg" />
                    <input type="password"
                        placeholder="conform password"
                        required
                        value={conform_password}
                        onChange={(e) => setConform_password(e.target.value)}
                        className="outline-none text-(--input-text) bg-(--input-bg) border-(--input-border) border text-center py-1 rounded-3xl text-lg" />
                    <button type="submit"
                        className="bg-(--button-bg) border border-(--button-border) rounded-3xl px-5 py-2 text-base font-medium cursor-pointer">Submit</button>
                </form>
            </div>

            <footer className="flex flex-col items-center justify-center gap-3">
                <div className="flex gap-2 text-base md:text-lg">
                    <h1>Already have account?</h1>
                    <button
                        onClick={() => prop.set(true)}
                        className="border-b-2 leading-0.5 border-(--button-bg) hover:text-(--button-bg) hover:cursor-pointer">Sign In</button>
                </div>
                <h1 className="text-xs md:text-base text-(--foreground-secondary)">Your personal messages are end-to-end encrypted</h1>
                <Link href={"/"} className="hover:underline">
                    <h3 className="text-xs md:text-sm text-(--foreground-secondary)">Terms & Privacy Policy</h3>
                </Link>
            </footer>

        </div>
    )
}



export function Signin(prop: { set: Function }) {

    const router = useRouter();
    const [user, setUser] = useState<User>({
        username: "",
        email: "",
        password: ""
    });
    const dispatch = useDispatch();

    function handleSubmit(e: any) {
        e.preventDefault();
        socket.emit('join', name)
        dispatch(logIn(user.username))
        router.push('/')
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
        <div id="main" className="h-screen w-full flex flex-col gap-8 justify-center items-center">
            <div id="container" className="bg-(--container-bg) border-(--container-border) border rounded-3xl flex flex-col justify-start items-center gap-5 py-5 px-12 md:px-25">
                <h1 className="text-3xl capitalize">Sign-in</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3 h-full w-full">
                    <input type="text"
                        placeholder="username"
                        required
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="outline-none text-center text-(--input-text) bg-(--input-bg) border-(--input-border) border py-1 rounded-3xl text-lg" />
                    <input type="email"
                        placeholder="email"
                        required
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="outline-none text-(--input-text) bg-(--input-bg) border-(--input-border) border text-center py-1 rounded-3xl text-lg" />
                    <input type="password"
                        placeholder="password"
                        required
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="outline-none text-(--input-text) bg-(--input-bg) border-(--input-border) border text-center py-1 rounded-3xl text-lg" />
                    <button type="submit"
                        className="bg-(--button-bg) border border-(--button-border) rounded-3xl px-5 py-2 text-base font-medium cursor-pointer">Submit</button>
                </form>
            </div>

            <footer className="flex flex-col items-center justify-center gap-3">
                <div className="flex gap-2 text-base md:text-lg">
                    <h1>Don't have account?</h1>
                    <button
                        onClick={() => prop.set(false)}
                        className="border-b-2 leading-0.5 border-(--button-bg) hover:text-(--button-bg) hover:cursor-pointer">Sign Up</button>
                </div>
                <h1 className="text-xs md:text-base text-(--foreground-secondary)">Your personal messages are end-to-end encrypted</h1>
                <Link href={"/"} className="hover:underline">
                    <h3 className="text-xs md:text-sm text-(--foreground-secondary)">Terms & Privacy Policy</h3>
                </Link>
            </footer>

        </div>
    )
}



export function SignOut() {
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