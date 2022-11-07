import "./App.css";
import { ChatMessage } from "./components/ChatMessage";

function App() {
    return (
        <div className="App">
            <h3>ISB's Awesome and Totally Not Broken Chat App</h3>
            <ChatMessage time={new Date()} author="HALLOMAN" pfp="" content={"Message Content"} />
        </div>
    );
}

export default App;
