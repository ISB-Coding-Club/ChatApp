import "./App.css";
import io from "socket.io-client";
import { ChatContainer } from "./components/ChatContainer";
import { SocketClient } from "./util";

let socket: SocketClient;

function App() {
    if (!(window as any).hasInitialized) {
        socket = io();
        (window as any).hasInitialized = true;
    }

    return (
        <div className="App">
            {/* <h3>ISB's Awesome and Totally Not Broken Chat App</h3> */}
            <ChatContainer socket={socket} />
        </div>
    );
}

export default App;
