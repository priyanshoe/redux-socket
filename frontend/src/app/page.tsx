'use client'

import { closeChat, openChat } from "@/redux/features/chatBox"
import { pushMessage, setNewMessage } from "@/redux/features/message"
import { RootState } from "@/redux/store"
import { socket } from "@/socket/io"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SignOut } from "./auth/page"
import SideBar from "@/components/side-bar"



export default function Home() {
  const router = useRouter();
  const logged = useSelector((state: RootState) => state.log.loggedIn)
  const userName = useSelector((state: RootState) => state.log.name)
  const chatBox = useSelector((state: RootState) => state.chatBox.isOpen)
  const receiver = useSelector((state: RootState) => state.chatBox.receiver)
  const messageStack = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch();

  const [newMsg, setNewMsg] = useState("")
  const names = [
    "asas",
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

  useEffect(() => {
    if (!logged) return router.push('/auth')
    socket.on('message-received', ({ newMsg, sender, receiver }) => {
      console.log(`message received :${newMsg}`);
      dispatch(pushMessage({ sender: sender, receiver: receiver, message: newMsg }))
    })
  }, [])

  function handleOpenChat(receiver: string) {
    dispatch(openChat({ receiver }))
  }

  function sendMsg(e: any) {
    e.preventDefault();
    dispatch(setNewMessage({ sender: userName, receiver: receiver, message: newMsg }))
    dispatch(pushMessage({ sender: userName, receiver: receiver, message: newMsg }))

    console.log("message sent," + newMsg);
    socket.emit('new-message', { newMsg, receiver, userName })

    setNewMsg("")

  }

  return (
    logged &&
    <div className="h-screen w-full flex">
      <SideBar />

      <div id="left" className="h-full w-1/3 px-2 border-x border-(--chatBox-border) overflow-y-scroll no-scrollbar bg-(--chatBox-bg)">

        <header className="w-full py-1 flex flex-col gap-3 ">
          <nav className="h-full w-full py-2 px-2 flex items-center justify-between">
            <div id="logo" className="h-10">
              <img src={'/whatsapp-logo.png'} className="h-full w-full" />
            </div>
            <div id="icons" className="flex gap-4">
              <img src={'/plus-icon.svg'} height={25} width={25} />
              <img src={'/3dots-icon.svg'} height={20} width={20} />
            </div>
          </nav>

          <div id="search-bar" className="w-full flex gap-2 bg-gray-200 py-1 px-2 rounded-2xl">
            <img src={'/search-icon.svg'} height={20} width={20} />
            <input type="text" placeholder="search" className="w-full h-full py-1 text-lg outline-none" />
          </div>
        </header>

        <div id="contacts" className="w-full h-full">
          {
            names.map((item, id) => (
              <div key={id} onClick={() => handleOpenChat(item)} id="contact-card" className="w-full h-1/12 cursor-pointer hover:bg-(--foreground-secondary) rounded-full flex items-center gap-3 px-3 ">
                <Image src='/profile.svg' alt="profile" width={52} height={52} className="bg-white rounded-full border-3 border-green-500 h-15 w-15" />
                <h3 className="text-xl capitalize py-0.5 ">{item}</h3>
              </div>
            ))
          }
        </div>

      </div>
      {



        chatBox &&
        <div id="right" className="h-full w-2/3">
          <nav className="w-full h-2/30 flex justify-between items-center px-6 py-3 bg-(--sidebar-bg) shadow-sm ">
            <div className="flex gap-2 items-center">
              <Image src='/profile.svg' alt="profile" width={42} height={42} className="bg-white rounded-full border-3 border-green-500" />
              <h3 className="text-lg ">{receiver}</h3>
            </div>
            <button
              onClick={() => dispatch(closeChat())}
              className="cursor-pointer">
              <Image src='/close.svg' alt="X" width={28} height={28} className="" />
            </button>
          </nav>

          <div id="chat-space" className="h-26/30 w-full p-1">
            {
              messageStack.map((item, id) => (
                <div key={id} className={`${item.sender === userName ? 'bg-green-700 justify-self-end' : 'bg-blue-700 justify-self-start'} flex gap-3 w-fit px-3 py-0.5 mt-1 rounded-2xl`}>
                  {/* <h1>{item.sender}</h1> */}
                  <h3>{item.message}</h3>
                  {/* <h3>{item.receiver}</h3> */}
                </div>
              ))
            }

          </div>

          <nav className="w-full  h-1.5/30 border-t pr-2">
            <form onSubmit={sendMsg} className="w-full h-full flex gap-2">
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
    </div>
  )
}