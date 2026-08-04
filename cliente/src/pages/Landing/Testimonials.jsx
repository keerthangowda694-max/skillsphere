import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Startup Founder",
    rating: 5,
    review:
      "SkillSphere's AI matching helped us quickly identify freelancers whose skills aligned with our project requirements. The overall hiring experience was smooth and efficient.",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Rahul Sharma",
    role: "Full Stack Developer",
    rating: 5,
    review:
      "The secure payment system, project tracking, and verified reviews make the platform trustworthy and easy to use for freelancers.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
    rating: 5,
    review:
      "The analytics dashboard and AI-powered proposal generation simplify project management and improve collaboration.",
    image: "https://i.pravatar.cc/150?img=47",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Demo Section
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Sample User Testimonials
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto text-lg">
            These testimonials are illustrative and demonstrate how reviews
            would appear on the platform.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
            >

              <FaQuoteLeft className="text-blue-600 text-4xl" />

              <p className="text-gray-600 mt-6 leading-7">
                {item.review}
              </p>

              <div className="flex mt-6">

                {[...Array(item.rating)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-yellow-400"
                  />
                ))}

              </div>

              <div className="flex items-center mt-8">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full"
                />

                <div className="ml-4">

                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {item.role}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;