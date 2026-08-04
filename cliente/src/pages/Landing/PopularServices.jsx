import {
    FaCode,
    FaMobileAlt,
    FaRobot,
    FaPalette,
    FaCloud,
    FaChartLine,
    FaShieldAlt,
    FaPenNib,
  } from "react-icons/fa";
  
  const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      jobs: "250+ Freelancers",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FaMobileAlt />,
      title: "App Development",
      jobs: "180+ Freelancers",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaRobot />,
      title: "AI & Machine Learning",
      jobs: "120+ Freelancers",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <FaPalette />,
      title: "UI / UX Design",
      jobs: "90+ Freelancers",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: <FaCloud />,
      title: "Cloud & DevOps",
      jobs: "110+ Freelancers",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      icon: <FaChartLine />,
      title: "Data Science",
      jobs: "140+ Freelancers",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <FaShieldAlt />,
      title: "Cyber Security",
      jobs: "70+ Freelancers",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <FaPenNib />,
      title: "Content Writing",
      jobs: "160+ Freelancers",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];
  
  const PopularServices = () => {
    return (
      <section className="py-24 bg-white">
  
        <div className="max-w-7xl mx-auto px-6">
  
          <div className="text-center mb-16">
  
            <h2 className="text-5xl font-bold">
              Popular Services
            </h2>
  
            <p className="mt-5 text-gray-600 text-lg max-w-2xl mx-auto">
              Explore the most in-demand freelance services available on SkillSphere.
            </p>
  
          </div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  
            {services.map((service, index) => (
  
              <div
                key={index}
                className="rounded-2xl border p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
  
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${service.color}`}
                >
                  {service.icon}
                </div>
  
                <h3 className="text-2xl font-semibold mt-6">
                  {service.title}
                </h3>
  
                <p className="mt-3 text-gray-500">
                  {service.jobs}
                </p>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
  
      </section>
    );
  };
  
  export default PopularServices;