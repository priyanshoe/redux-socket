'use client'

import Login from "@/components/Login"
import { closeChat, openChat } from "@/redux/features/chatBox"
import { logOut } from "@/redux/features/isLoggedIn"
import { RootState } from "@/redux/store"
import Image from "next/image"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function Home() {
  const logged = useSelector((state: RootState) => state.log.loggedIn)
  const userName = useSelector((state: RootState) => state.log.name)
  const chatBox = useSelector((state: RootState) => state.chatBox.isOpen)
  const chatName = useSelector((state: RootState) => state.chatBox.name)
  const dispatch = useDispatch();

  const [newMsg, setNewMsg] = useState("")
  const names = [
    "Aarav adnsirna",
    "Vihaan adnsirna",
    "Kabir adnsirna",
    "Ishaan adnsirna",
    "Arjun adnsirna",
    "Reyansh adnsirna",
    "Advait adnsirna",
    "Dhruv adnsirna",
    "Aryan adnsirna",
    "Roha adnsirnan"
  ]


  function handleOpenChat(data: string) {
    dispatch(openChat(data))
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log("message sent," + newMsg);

  }

  return (
    !logged
      ? <Login />
      :

      <div className="h-screen w-full">
        <nav className="fixed w-full h-15 flex justify-between items-center px-6 py-3 bg-gray-900 rounded-b-xl ">
          <h1>Chat App</h1>
          <h3>{userName}</h3>
          <button
            className="bg-gray-600 rounded-lg px-2 py-0.5 text-sm font-bold cursor-pointer"
            onClick={() => dispatch(logOut())}>
            Logout
          </button>
        </nav>

        <main className="w-full h-full flex pt-15">
          <div id="left" className="h-full w-1/2 px-2 overflow-y-scroll no-scrollbar">
            {
              names.map((item, id) => (
                <div key={id} onClick={() => handleOpenChat(item)} id="contact-card" className="w-full h-1/9 cursor-pointer hover:bg-blue-900 border-b flex items-center gap-3 px-3 ">
                  <Image src='/profile.svg' alt="profile" width={52} height={52} className="bg-white rounded-full border-3 border-green-500 h-15 w-15" />
                  <h3 className="text-xl capitalize py-0.5 ">{item}</h3>
                </div>
              ))
            }

          </div>
          {
            chatBox &&
            <div id="right" className="h-full w-1/2">
              <nav className="w-full h-2/30 flex justify-between items-center px-6 py-3 bg-blue-800">
                <div className="flex gap-2 items-center">
                  <Image src='/profile.svg' alt="profile" width={42} height={42} className="bg-white rounded-full border-3 border-green-500" />
                  <h3 className="text-lg ">{chatName}</h3>
                </div>
                <button
                  onClick={() => dispatch(closeChat())}
                  className="cursor-pointer">
                  <Image src='/close.svg' alt="X" width={28} height={28} className="" />
                </button>
              </nav>

              <div id="chat-space" className="h-26/30 w-full">

              </div>

              <nav className="w-full  h-1.5/30 border-t pr-2">
                <form onSubmit={handleSubmit} className="w-full h-full flex gap-2">
                  <input type="text"
                    placeholder="type your message here"
                    className="w-full p-2 outline-none"
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)} />
                  <button type="submit" className="cursor-pointer">
                    <Image src='/send.svg' alt="X" width={28} height={28} className="rotate-y-180" />
                  </button>
                </form>
              </nav>

            </div>
          }
        </main>
      </div>
  )
}