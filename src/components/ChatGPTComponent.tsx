import React, { useState } from "react";
import { getChatGPTResponse } from "../authentication/auth-service";

const ChatGPTComponent: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string[]>([]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleGetResponse = async () => {
    try {
      const responseFromChatGPT = await getChatGPTResponse(prompt);
      setResponse(responseFromChatGPT.response);
    } catch (error) {
      console.error("Error getting response from ChatGPT:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Chat with GPT</h2>
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleGetResponse}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Get Response
        </button>
        <div>
          <h3 className="text-2xl font-bold mb-4 text-left top-5">Response:</h3>
          <table>
            <tbody>
              {response.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTComponent;
