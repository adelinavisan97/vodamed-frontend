import React, { useState, useRef } from "react";
import { getChatGPTResponse } from "../authentication/auth-service";
import Spinner from "./Spinner";

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<
        { text: string; sender: "user" | "bot" }[]
    >([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // Function to handle opening the chatbox
    const handleOpen = () => setIsOpen(true);

    // Function to handle closing the chatbox
    const handleClose = () => {
        const confirmClose = window.confirm(
            "Are you sure you want to close the chat? All information will be deleted."
        );
        if (confirmClose) {
            setMessages([]);
            setIsOpen(false);
        }
    };

    // Function to handle sending a message
    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user's message to the chat
        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput("");
        setLoading(true);

        try {
            // Get ChatGPT's response
            const responseObject = await getChatGPTResponse(input);
            const responseText = responseObject.response; // Extract the response string
            setMessages((prev) => [
                ...prev,
                { text: responseText, sender: "bot" },
            ]);
        } catch (error) {
            console.error("Error fetching ChatGPT response:", error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Sorry, an error occurred. Please try again.",
                    sender: "bot",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Clickable Animation Button */}
            <div
                className="fixed bottom-6 right-6 w-24 h-24 rounded-full cursor-pointer bg-blue-500 flex items-center justify-center"
                onClick={handleOpen}
            >
                <iframe
                    src="https://lottie.host/embed/66ee07a2-90ba-4c61-a2f3-29ff00fd30f6/xNcqnacP9A.json"
                    className="w-full h-full rounded-full pointer-events-none"
                ></iframe>
            </div>

            {/* Chatbox */}
            {isOpen && (
                <div className="fixed bottom-32 right-8 w-80 bg-white rounded-lg shadow-md border border-gray-300">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-t-lg">
                        <h2 className="font-semibold">Chat with ChatGPT</h2>
                        <button
                            onClick={handleClose}
                            className="text-lg font-bold"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="p-4 h-64 overflow-y-scroll">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-3 p-2 rounded-lg ${
                                    message.sender === "user"
                                        ? "bg-blue-500 text-white self-end"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                {message.text}
                            </div>
                        ))}
                        {loading && <Spinner />}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-300">
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Compose your message..."
                        />
                        <button
                            onClick={handleSend}
                            className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbox;
