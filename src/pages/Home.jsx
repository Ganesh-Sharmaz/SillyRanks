import React from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const startApp = () => {
    navigate('/tier-list');
  };

  return (
    <div id='Back' className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-6xl font-extrabold mb-8 italic drop-shadow-2xl">
        Welcome to SillyRanks
      </h1>
      
      <button
        onClick={startApp}
        className="px-6 py-3 font-extrabold bg-yellow-300 text-black text-2xl font-mono rounded-full shadow-2xl transform transition-transform duration-300 hover:scale-110 hover:bg-green-600"
      >
        Start App
      </button>
    </div>
  );
}

export default Home;
