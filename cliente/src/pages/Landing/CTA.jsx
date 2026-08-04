import { Link } from "react-router-dom";
import { FaArrowRight, FaUserTie } from "react-icons/fa";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700">

      <div className="max-w-6xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-12 lg:p-16">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}

            <div>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

                🚀 Get Started Today

              </span>

              <h2 className="text-5xl font-bold mt-8 leading-tight">

                Ready to Build Your

                <span className="text-blue-600">

                  {" "}Next Project?

                </span>

              </h2>

              <p className="mt-6 text-gray-600 text-lg leading-8">

                Join SkillSphere to hire talented freelancers or showcase your
                expertise. AI-powered matching, secure escrow payments,
                analytics, and project tracking—all in one platform.

              </p>

            </div>

            {/* Right */}

            <div className="flex flex-col gap-6">

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-5 flex items-center justify-center gap-3 text-lg font-semibold transition-all"
              >

                Hire a Freelancer

                <FaArrowRight />

              </Link>

              <Link
                to="/register"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl px-8 py-5 flex items-center justify-center gap-3 text-lg font-semibold transition-all"
              >

                Become a Freelancer

                <FaUserTie />

              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;