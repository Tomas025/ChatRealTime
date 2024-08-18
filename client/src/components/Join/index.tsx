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
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)
    }

    return (
        <div className="bg-white text-black w-[400px] h-[200px] flex flex-col justify-center items-center shadow-lg">
            <h2 className='text-2xl font-bold mb-7'>Chat em tempo real</h2>
            <input ref={usernameRef} type='text' placeholder='Nome de usuário' className='border-b border-b-gray-600 outline-none focus:border-b-2' />
            <button onClick={() => handleSubmit()} className='mt-3 bg-blue-400 text-white px-8 py-4 rounded-md'>Entrar</button>
        </div>
    )
}