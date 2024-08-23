import { Dispatch, SetStateAction, useRef } from 'react'
import io from 'socket.io-client'

type JoinProps = {
    setChatVisibility: Dispatch<SetStateAction<boolean>>
    setSocket: (value: any) => void
}

export function Join({ setChatVisibility, setSocket }: JoinProps) {

    const usernameRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async () => {
        const username = usernameRef.current?.value
        if (!username?.trim()) return
        const socket = io('http://localhost:3001')
        const color = '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
        socket.emit('set_username', { username, color })
        setSocket(socket)
        setChatVisibility(true)
    }

    return (
        <div className="bg-white text-black flex flex-col justify-between items-center gap-y-7 shadow-lg rounded-2xl py-10 px-24">
            <h2 className='text-3xl font-bold'>Chat</h2>
            <input ref={usernameRef} type='text' placeholder='Nome de usuário' className='bg-slate-200 p-2 rounded-md' autoFocus />
            <button onClick={() => handleSubmit()} className='bg-blue-400 text-white px-8 py-4 rounded-md shadow-lg hover:bg-blue-500'>Entrar</button>
        </div>
    )
}