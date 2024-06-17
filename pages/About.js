import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import Image from "next/image";
import logo from "../public/logo.png";
import Link from "next/link"
export default function About() {
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

  return (
    <div>
      <nav className="w-full py-4 bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-lg z-20 fixed top-0 left-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white ml-2 text-xl font-bold">Cloud-Connect</span>
          </div>
          <div>
            <Link href="/" className="text-white px-4 py-2 rounded-xl hover:underline hover:bg-slate-500 hover:text-green-500">
              Home
            </Link>
            <a href="/about" className="text-white px-4 py-2 rounded-xl hover:underline hover:bg-slate-500  hover:text-yellow-500">
              About
            </a>
            <Link href="#" className="text-white px-4 py-2 rounded-xl hover:underline hover:bg-slate-500  hover:text-black">
              Contact
            </Link>
          </div>
        </div>
      </nav>
      <div ref={vantaRef} className="flex items-center justify-end h-screen relative overflow-hidden">
        <div className="absolute left-[300px] z-10">
          <Image src={logo} alt="Logo" />
        </div>
        <div className="flex flex-col items-center justify-center h-full md:h-4/5 w-full md:w-1/3 mr-8 bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg z-10 border border-opacity-30 border-white">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">About Cloud-Connect</h1>
          <p className="text-lg text-gray-700 mb-4 text-center">
            Cloud-Connect is a state-of-the-art video conferencing platform that enables seamless communication and collaboration. Whether you're hosting a virtual meeting, conducting an online class, or catching up with friends and family, Cloud-Connect provides a reliable and user-friendly experience.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-center">
            Our mission is to bridge the gap between physical and virtual interactions, ensuring that distance is never a barrier to meaningful connections. With cutting-edge technology and a commitment to quality, Cloud-Connect is your go-to solution for all your video conferencing needs.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-center">
            Join us today and experience the future of communication!
          </p>
        </div>
      </div>
    </div>
  );
}
