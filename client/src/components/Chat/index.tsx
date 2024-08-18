'use client'
import { useRef, useState, useEffect, KeyboardEvent } from 'react'
import { FiSend } from 'react-icons/fi'

type messageType = {
    text: string
    author: string
    authorId: string
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
            <div className="h-[600px] w-[400px] bg-white shadow-lg">
                <div className="h-[550px] overflow-y-auto text-black flex flex-col px-[10px]">
                    {
                        messageList.map((message: messageType, index: number) => (
                            <div key={index} className={`max-w-[250px] w-fit mt-[10px] px-[5px] py-[10px] rounded-[7px] ${message.authorId === socket.id ? "bg-sky-300 self-end" : "bg-gray-300 self-start"}`}>
                                <div className="message-author"><strong>{message.author}</strong></div>
                                <div className="message-text">{message.text}</div>
                            </div>
                        ))
                    }
                    <div ref={bottomRef} />
                </div>
                <div className="w-full bg-red-500 px-4 gap-2 py-[10px] box-border flex items-center">
                    <input ref={messageRef} placeholder='Mensagem' onKeyDown={(e) => getEnterKey(e)} className='w-full border-b border-b-gray-600 outline-none focus:border-b-2' />
                    <FiSend onClick={() => handleSubmit()} className='text-blue-300 text-2xl m-1 cursor-pointer'/>
                </div>
            </div>
        </div>
    )
}