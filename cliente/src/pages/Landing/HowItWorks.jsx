import {
    FaUserPlus,
    FaBriefcase,
    FaRobot,
    FaWallet,
    FaTasks,
    FaStar,
  } from "react-icons/fa";
  
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create an Account",
      description:
        "Register as a Client or Freelancer and complete your profile."
    },
    {
      icon: <FaBriefcase />,
      title: "Post or Find Projects",
      description:
        "Clients post projects while freelancers browse opportunities."
    },
    {
      icon: <FaRobot />,
      title: "AI Smart Matching",
      description:
        "Our AI recommends the best freelancers based on skills and experience."
    },
    {
      icon: <FaWallet />,
      title: "Secure Escrow Payment",
      description:
        "Payments are safely held until approved milestones are completed."
    },
    {
      icon: <FaTasks />,
      title: "Track Progress",
      description:
        "Monitor project milestones, uploads, evidence, and completion status."
    },
    {
      icon: <FaStar />,
      title: "Review & Build Reputation",
      description:
        "Clients leave verified reviews that contribute to freelancer reputation."
    },
  ];
  
  const HowItWorks = () => {
    return (
      <section className="bg-slate-50 py-24">
  
        <div className="max-w-7xl mx-auto px-6">
  
          <div className="text-center">
  
            <h2 className="text-5xl font-bold">
  
              How
  
              <span className="text-blue-600">
                {" "}SkillSphere{" "}
              </span>
  
              Works
  
            </h2>
  
            <p className="mt-5 text-gray-600 text-lg max-w-3xl mx-auto">
  
              From finding talent to receiving secure payments,
              SkillSphere simplifies every step of freelancing.
  
            </p>
  
          </div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
  
            {steps.map((step, index) => (
  
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 relative"
              >
  
                <div className="absolute -top-5 left-8 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
  
                  {index + 1}
  
                </div>
  
                <div className="mt-8 text-5xl text-blue-600">
  
                  {step.icon}
  
                </div>
  
                <h3 className="mt-6 text-2xl font-bold">
  
                  {step.title}
  
                </h3>
  
                <p className="mt-4 text-gray-600 leading-7">
  
                  {step.description}
  
                </p>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
  
      </section>
    );
  };
  
  export default HowItWorks;