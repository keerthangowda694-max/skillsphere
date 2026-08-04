import {
    FaRobot,
    FaMagic,
    FaSearch,
    FaChartLine,
    FaBrain,
    FaUserCheck,
  } from "react-icons/fa";
  
  const features = [
    {
      icon: <FaRobot />,
      title: "AI Smart Matching",
      description:
        "Automatically matches clients with the most suitable freelancers based on skills, experience, ratings, and project requirements.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <FaMagic />,
      title: "AI Proposal Generator",
      description:
        "Generate professional project proposals instantly with AI assistance.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <FaBrain />,
      title: "AI Job Description",
      description:
        "Create detailed project descriptions in seconds using artificial intelligence.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <FaSearch />,
      title: "Advanced Search",
      description:
        "Search freelancers using skills, budget, experience, ratings, and availability.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FaChartLine />,
      title: "Trending Skills",
      description:
        "Discover emerging technologies and in-demand freelance skills through analytics.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <FaUserCheck />,
      title: "Skill Similarity Engine",
      description:
        "Compare freelancer skills with project requirements to calculate the best match score.",
      color: "from-pink-500 to-purple-600",
    },
  ];
  
  const AIFeatures = () => {
    return (
      <section className="py-24 bg-slate-900 text-white">
  
        <div className="max-w-7xl mx-auto px-6">
  
          <div className="text-center">
  
            <span className="text-blue-400 font-semibold uppercase tracking-widest">
              Artificial Intelligence
            </span>
  
            <h2 className="text-5xl font-bold mt-4">
  
              AI Powered
  
              <span className="text-blue-400">
                {" "}Freelancing
              </span>
  
            </h2>
  
            <p className="text-gray-300 mt-6 text-lg max-w-3xl mx-auto">
  
              SkillSphere leverages Artificial Intelligence to simplify hiring,
              recommend the best freelancers, generate proposals, and improve
              project success.
  
            </p>
  
          </div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
  
            {features.map((feature, index) => (
  
              <div
                key={index}
                className="bg-slate-800 rounded-2xl p-8 hover:scale-105 transition duration-300 border border-slate-700"
              >
  
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color}
                  flex items-center justify-center text-3xl`}
                >
  
                  {feature.icon}
  
                </div>
  
                <h3 className="text-2xl font-bold mt-6">
  
                  {feature.title}
  
                </h3>
  
                <p className="text-gray-300 mt-4 leading-7">
  
                  {feature.description}
  
                </p>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
  
      </section>
    );
  };
  
  export default AIFeatures;