import {
    FaRobot,
    FaWallet,
    FaUserCheck,
    FaChartLine,
    FaBell,
    FaShieldAlt,
  } from "react-icons/fa";
  
  const features = [
    {
      icon: <FaRobot className="text-4xl text-blue-600" />,
      title: "AI Matching",
      description:
        "Find the best freelancers instantly using AI-powered skill matching.",
    },
    {
      icon: <FaWallet className="text-4xl text-green-600" />,
      title: "Secure Escrow",
      description:
        "Payments remain protected until project milestones are completed.",
    },
    {
      icon: <FaUserCheck className="text-4xl text-purple-600" />,
      title: "Verified Freelancers",
      description:
        "Work confidently with verified professionals and trusted profiles.",
    },
    {
      icon: <FaChartLine className="text-4xl text-orange-500" />,
      title: "Analytics Dashboard",
      description:
        "Track earnings, projects, reviews, and performance with powerful analytics.",
    },
    {
      icon: <FaBell className="text-4xl text-pink-500" />,
      title: "Real-Time Notifications",
      description:
        "Stay updated instantly with project, payment, and review notifications.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-500" />,
      title: "Dispute Resolution",
      description:
        "Resolve payment and project disputes through an admin-managed process.",
    },
  ];
  
  const PlatformHighlights = () => {
    return (
      <section className="bg-white py-24">
  
        <div className="max-w-7xl mx-auto px-6">
  
          <div className="text-center mb-16">
  
            <h2 className="text-5xl font-bold">
  
              Why Choose
  
              <span className="text-blue-600"> SkillSphere?</span>
  
            </h2>
  
            <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto">
  
              SkillSphere combines Artificial Intelligence, secure payments,
              smart reputation systems, and real-time collaboration to create
              a modern freelancing experience.
  
            </p>
  
          </div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  
            {features.map((feature, index) => (
  
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-2"
              >
  
                <div className="mb-6">
  
                  {feature.icon}
  
                </div>
  
                <h3 className="text-2xl font-semibold mb-4">
  
                  {feature.title}
  
                </h3>
  
                <p className="text-gray-600 leading-7">
  
                  {feature.description}
  
                </p>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
  
      </section>
    );
  };
  
  export default PlatformHighlights;