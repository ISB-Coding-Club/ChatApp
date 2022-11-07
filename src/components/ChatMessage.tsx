import "./ChatMessage.scss";

export interface ChatMessageProps {
    time: Date;
    author: string;
    pfp: string;
    content: string;
};

export const ChatMessage = (props: ChatMessageProps) => {
    return (
        <>
            <div className="chat-message">{props.content}</div>
        </>
    );
};