'use client'

import Login, { LogOut } from "@/components/Login"
import { closeChat, openChat } from "@/redux/features/chatBox"
import { pushMessage, setNewMessage } from "@/redux/features/message"
import { RootState } from "@/redux/store"
import { socket } from "@/socket/io"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"



export default function Home() {
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
    !logged
      ? <Login />
      :

      <div className="h-screen w-full">
        <nav className="fixed w-full h-15 flex justify-between items-center px-6 py-3 bg-gray-900 rounded-b-xl ">
          <h1>Chat App</h1>
          <h3>{userName}</h3>
          <LogOut />
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
        </main>
      </div>
  )
}