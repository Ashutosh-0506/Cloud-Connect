import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import Image from "next/image";
import logo from "../public/logo.png";
import { random } from "lodash";
import Link from "next/link"
export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          speed: 0.6,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const createAndJoin = () => {
    // const roomId = uuidv4();
    const roomId = Math.floor(Math.random() * 1000) + 1;

    router.push(`/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`);
    else {
      alert("Please provide a valid room id");
    }
  };

  return (
    <div>
      <nav className="w-full py-4 bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-lg z-20 fixed top-0 left-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            
            <span className="text-white ml-2 text-xl font-bold">
              Cloud-Connect
            </span>
          </div>
          <div>
            <Link href="/" className="text-white px-4 py-2 rounded-xl hover:underline hover:bg-slate-500 hover:text-green-500">
              Home
            </Link>
            <Link href="https://ashutosh-0506.github.io/AshutoshPortfolio/" target="_blank" className="text-white px-4 py-2 rounded-xl hover:underline hover:bg-slate-500  hover:text-yellow-500">
              Creator
            </Link>
          
          </div>
        </div>
      </nav>
      <div
        ref={vantaRef}
        className="flex items-center justify-end h-screen relative overflow-hidden"
      >
        <div className="absolute left-[300px] z-10">
          <Image src={logo} alt="Logo" />
        </div>
        <div className="flex flex-col items-center justify-center h-full md:h-4/5 w-full md:w-1/3 mr-8 bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg z-10 border border-opacity-30 border-white">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
            Cloud-Connect
          </h1>
          <div className="flex flex-col md:flex-row items-center mb-4 w-full">
            <input
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="px-4 py-2 mb-2 md:mb-0 md:mr-4 border-2 text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition duration-300 w-full"
            />
            <button
              onClick={joinRoom}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Join Room
            </button>
          </div>
          <span className="text-gray-700 mb-4 text-center md:text-left">
            --------------- OR ---------------
          </span>
          <button
            onClick={createAndJoin}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 self-center md:self-auto"
          >
            Create a new room
          </button>
        </div>
      </div>
    </div>
  );
}
