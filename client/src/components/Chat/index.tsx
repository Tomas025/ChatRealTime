'use client'
import { useRef, useState, useEffect, KeyboardEvent } from 'react'
import { FiSend } from 'react-icons/fi'

type messageType = {
    text: string
    author: string
    authorId: string,
    color: string
}

export function Chat({ socket }: { socket: any }) {
    const bottomRef = useRef<HTMLDivElement>(null)
    const messageRef = useRef<HTMLInputElement>(null)
    const [messageList, setMessageList] = useState<any>([])

    useEffect(() => {
        socket.on('receive_message', (data: any) => {
            setMessageList((current: any) => [...current, data])
        })

        return () => socket.off('receive_message')
    }, [socket])

    useEffect(() => {
        scrollDown()
    }, [messageList])

    const handleSubmit = () => {
        const message = messageRef.current?.value
        if (!message?.trim()) return

        socket.emit('message', message)
        clearInput()
        focusInput()
    }

    const clearInput = () => {
        messageRef.current!.value = ''
    }

    const focusInput = () => {
        messageRef.current?.focus()
    }

    const getEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            handleSubmit()
    }

    const scrollDown = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className="h-[600px] w-[400px] bg-white shadow-lg rounded-lg">
                <div className="h-[535px] overflow-y-auto text-black flex flex-col px-[10px]">
                    {
                        messageList.map((message: messageType, index: number) => (
                            <div key={index} style={{ backgroundColor: `${message.authorId !== socket.id && message.color}` }} className={`max-w-[250px] w-fit mt-[10px] px-[5px] py-[10px] rounded-[7px] ${message.authorId === socket.id && "bg-sky-300 self-end"}`}>
                                <div className="message-author"><strong>{message.author}</strong></div>
                                <div className="message-text">{message.text}</div>
                            </div>
                        ))
                    }
                    <div ref={bottomRef} />
                </div>
                <div className='px-4 mt-[10px]'>
                    <div className="w-full bg-slate-300 rounded-full px-4 gap-2 py-[10px] box-border flex items-center">
                        <input ref={messageRef} placeholder='Digite uma mensagem' onKeyDown={(e) => getEnterKey(e)} className='w-full bg-slate-300 rounded-sm outline-none pl-2' />
                        <FiSend onClick={() => handleSubmit()} className='text-green-600 text-2xl cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}