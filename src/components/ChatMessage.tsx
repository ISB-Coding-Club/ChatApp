import "./ChatMessage.scss";
import moment from "moment";
import { useState } from "react";

export interface ChatMessageProps {
    time: Date;
    author: string;
    pfp: string;
    content: string;
    id?: string;
};

export const ChatMessage = (props: ChatMessageProps) => {
    const [time, setTime] = useState(moment(props.time).fromNow());

    setInterval(() => setTime(moment(props.time).fromNow()), 1000);

    return (
        <>
            <div className="chat-message">
                <img src={props.pfp} />

                <div className="content">
                    <div className="info">
                        <p className="author">{props.author}</p>
                        <p className="date">{time}</p>
                    </div>

                    <p className="message">{props.content}</p>
                </div>
            </div>
        </>
    );
};