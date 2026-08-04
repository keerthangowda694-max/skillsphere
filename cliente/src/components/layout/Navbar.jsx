import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center h-20">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="text-3xl font-bold text-blue-600"
                    >
                        SkillSphere
                    </Link>

                    {/* Desktop Menu */}

                    <div className="hidden md:flex gap-8">

                        <Link to="/">Home</Link>

                        <Link to="/freelancers">
                            Find Freelancers
                        </Link>

                        <Link to="/projects">
                            Find Projects
                        </Link>

                        <Link to="/about">
                            About
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                    </div>

                    {/* Buttons */}

                    <div className="hidden md:flex gap-4">

                        <Link
                            to="/login"
                            className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Register
                        </Link>

                    </div>

                    {/* Mobile Button */}

                    <button
                        className="md:hidden text-2xl"
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                </div>

            </div>

            {/* Mobile Menu */}

            {menuOpen && (

                <div className="md:hidden bg-white shadow-lg">

                    <div className="flex flex-col px-6 py-4 gap-4">

                        <Link to="/">Home</Link>

                        <Link to="/freelancers">
                            Find Freelancers
                        </Link>

                        <Link to="/projects">
                            Find Projects
                        </Link>

                        <Link to="/about">
                            About
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                        <Link
                            to="/login"
                            className="text-blue-600"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-blue-600 text-white text-center rounded-lg py-2"
                        >
                            Register
                        </Link>

                    </div>

                </div>

            )}

        </nav>

    );

};

export default Navbar;