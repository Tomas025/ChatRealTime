'use client'

import { useState } from 'react'
// import './App.css'
import { Join } from '@/components/Join'
import { Chat } from '@/components/Chat'
import { Socket } from 'socket.io-client'

export default function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState()

  return (
    <div className="bg-gradient-to-bl from-cyan-200 to-blue-800 h-screen flex justify-center items-center">
      {
        chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      }
    </div>
  )
}