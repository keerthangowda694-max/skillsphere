import { Link } from "react-router-dom";
import {
  FaSearch,
  FaArrowRight,
  FaUsers,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-100 min-h-screen flex items-center">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}

          <div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
              AI Powered Freelancing Platform
            </span>

            <h1 className="text-6xl font-extrabold mt-6 leading-tight">

              Hire the

              <span className="text-blue-600">

                {" "}Best Freelancers

              </span>

              <br />

              Build Amazing Projects

            </h1>

            <p className="text-gray-600 mt-6 text-lg leading-8">

              SkillSphere helps clients connect with verified freelancers
              using AI-powered matching, secure escrow payments,
              real-time collaboration, and smart project tracking.

            </p>

            {/* Search */}

            <div className="bg-white mt-10 rounded-xl shadow-lg flex overflow-hidden">

              <input
                type="text"
                placeholder="Search skills like React, AI, UI/UX..."
                className="flex-1 px-6 py-4 outline-none"
              />

              <button className="bg-blue-600 text-white px-8 hover:bg-blue-700">

                <FaSearch />

              </button>

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-10">

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-2"
              >
                Hire Freelancer

                <FaArrowRight />

              </Link>

              <Link
                to="/register"
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl"
              >
                Become Freelancer
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
              alt="Hero"
              className="rounded-3xl shadow-2xl"
            />

            {/* Floating Cards */}

            <div className="absolute -left-8 top-12 bg-white shadow-xl rounded-xl p-5">

              <div className="flex items-center gap-4">

                <FaUsers className="text-blue-600 text-2xl" />

                <div>

                  <h2 className="font-bold text-xl">

                    10K+

                  </h2>

                  <p className="text-gray-500">

                    Freelancers

                  </p>

                </div>

              </div>

            </div>

            <div className="absolute -right-6 bottom-20 bg-white shadow-xl rounded-xl p-5">

              <div className="flex items-center gap-4">

                <FaBriefcase className="text-green-600 text-2xl" />

                <div>

                  <h2 className="font-bold text-xl">

                    25K+

                  </h2>

                  <p className="text-gray-500">

                    Projects

                  </p>

                </div>

              </div>

            </div>

            <div className="absolute left-24 -bottom-8 bg-white shadow-xl rounded-xl p-5">

              <div className="flex items-center gap-4">

                <FaStar className="text-yellow-500 text-2xl" />

                <div>

                  <h2 className="font-bold text-xl">

                    4.9/5

                  </h2>

                  <p className="text-gray-500">

                    Client Rating

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;