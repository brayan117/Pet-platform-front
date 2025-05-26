import { FaYoutube } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

const Footer = () =>{
    
    return (
        <footer className='fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600'>
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <div className=" flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 flex flex-row ">
                <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
                    <li>JOSE Narvaez  </li>
                    <li>    DEVOPS</li>
                </ul>
                </div>
                <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
                    <li><NavLink className='hover:underline me-4 md:me-6'><FaYoutube/></NavLink></li>
                    <li><NavLink className="hover:underline me-4 md:me-6"><FaFacebook/></NavLink></li>
                    <li><NavLink className="hover:underline me-4 md:me-6"><FaTwitter/></NavLink></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;