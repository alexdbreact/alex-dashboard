import Image from 'next/image';
import alexz from '../public/alexz.png';
import "../app/globals.css"
import { FaFileSignature } from "react-icons/fa6";


const Navbar = () => {
  return (
<nav className="bg-white-100 py-2 px-2 flex items-center justify-around shadow-lg border-blue-200">
  
<FaFileSignature 
className="text-blue-600"
fontSize="3.5em"/>

<div>
    <h1 className="text-xl font-bold py-0 px-2 bg-transparent text-blue-500 text-center text-shadow-xl ">Admin Dashboard</h1>
<p className='text-sm text-center pb' >Version 1.1.01</p>
</div>


    <Image
     src={alexz}
width={60}
height= "auto"
alt='alex logo'
priority="true"
  />
  
  
</nav>
  )
}

export default Navbar