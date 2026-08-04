import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-950 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">


          {/* Brand */}

          <div className="lg:col-span-2">

            <h2 className="text-3xl font-bold text-white">
              SkillSphere
            </h2>

            <p className="mt-6 leading-8">
              SkillSphere is an AI-powered freelancing platform connecting
              clients and freelancers through smart matching, secure payments,
              analytics, and real-time collaboration.
            </p>


            {/* Social Links */}

            <div className="flex gap-5 mt-8 text-2xl">


              <a
                href="https://github.com/keerthangowda694-max"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>


              <a
                href="https://www.linkedin.com/in/keerthan-gowda-41761833b/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FaLinkedin />
              </a>


              <a
                href="http://www.instagram.com/keerthan.gowda18"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>


            </div>

          </div>



          {/* Platform */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-6">
              Platform
            </h3>

            <ul className="space-y-4">

              <li>
                <Link to="/freelancers">
                  Find Freelancers
                </Link>
              </li>

              <li>
                <Link to="/projects">
                  Browse Projects
                </Link>
              </li>

              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register">
                  Register
                </Link>
              </li>

            </ul>

          </div>



          {/* Resources */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-6">
              Resources
            </h3>


            <ul className="space-y-4">

              <li>
                <Link to="/privacy">
                  Privacy Policy
                </Link>
              </li>


              <li>
                <Link to="/terms">
                  Terms & Conditions
                </Link>
              </li>


              <li>
                <Link to="/faq">
                  FAQ
                </Link>
              </li>


              <li>
                <Link to="/help">
                  Help Center
                </Link>
              </li>

            </ul>

          </div>




          {/* Contact */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-6">
              Contact
            </h3>


            <div className="space-y-4">


              <a
                href="mailto:keerthangowda694@gmail.com"
                className="block hover:text-white"
              >
                📧 keerthangowda694@gmail.com
              </a>


              <a
                href="tel:+919353491708"
                className="block hover:text-white"
              >
                📱 +91 9353491708
              </a>


              <p>
                📍 Bengaluru, Karnataka, India
              </p>


            </div>


          </div>


        </div>

      </div>




      {/* Bottom Footer */}

      <div className="border-t border-slate-800">


        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">


          <p className="text-sm text-gray-400">

            © {new Date().getFullYear()} SkillSphere.
            All rights reserved.

          </p>



          <div className="flex items-center gap-5 mt-4 md:mt-0">


            <p className="text-sm text-gray-400">

              Designed & Developed by

              <span className="text-white font-semibold">
                {" "}Keerthan M N
              </span>

            </p>



            <button
              onClick={scrollToTop}
              className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center"
            >

              <FaArrowUp className="text-white"/>

            </button>


          </div>


        </div>


      </div>


    </footer>
  );
};


export default Footer;