import { createRef, FC, useState } from "react";
import { SocketClient } from "../util";
import "./ChatContainer.scss";
import { ChatMessage, ChatMessageProps } from "./ChatMessage";

export interface ContainerProps {
    socket: SocketClient;
}

export const ChatContainer: FC<ContainerProps> = (props) => {
    const [messages, setMessages] = useState<ChatMessageProps[]>([]);
    const [message, setMessage] = useState("");
    const messagesRef = createRef<HTMLDivElement>();
    const { socket } = props;

    if (!(window as any).hasSetup) {
        socket.on("message", (data: ChatMessageProps) => {
            console.log(data);
    
            messages.push(data);
            setMessages(messages);
        });

        (window as any).hasSetup = true;
    }

    const update = (e: Event) => setMessage((e.target as HTMLInputElement)?.value);

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key == "Enter") {
            const regex = /\s/gm;

            if (message.replace(regex, "") == "") return;

            // messages.push({
            //     author: "HiMan",
            //     content: message,
            //     pfp: "https://ui-avatars.com/api/?rounded=true&name=HelloBro",
            //     time: new Date(),
            // });

            socket.emit("send_message", {
                author: "HiMan",
                content: message,
                pfp: "https://ui-avatars.com/api/?rounded=true&name=HelloBro",
                time: new Date(),
            });

            setMessage("");
            // setMessages(messages);

            if (messagesRef.current)
                messagesRef.current.scrollTo({
                    top: messagesRef.current.scrollHeight,
                });
        } else {
            update(e);
        }
    };

    return (
        <div className="container">
            <div className="messages" ref={messagesRef}>
                {messages.map((message) => (
                    <ChatMessage {...message} key={message.id} />
                ))}
            </div>

            <div className="input">
                <input
                    type="text"
                    value={message}
                    placeholder="Type a message..."

                    onKeyDown={onKeyDown as any}
                    onKeyUp={update as any}
                    onChange={update as any}
                />
            </div>
        </div>
    );
};
