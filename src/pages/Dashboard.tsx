import React from "react";
import ChatGPTComponent from "../components/ChatGPTComponent";

const Home = () => {
  return (
    <div className="p-10">
      <div className="flex justify-center items-center gap-x-4"></div>
      <div>
        <ChatGPTComponent />
      </div>
    </div>
  );
};

export default Home;
