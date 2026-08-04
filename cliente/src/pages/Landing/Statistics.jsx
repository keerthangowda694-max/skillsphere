import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Briefcase,
  UserCheck,
  Star,
  CheckCircle,
  Wallet,
} from "lucide-react";

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/admin/platform-statistics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data.statistics);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatistics();
  }, []);

  if (!stats)
    return (
      <section className="py-20 bg-gray-50">
        <h2 className="text-center text-2xl font-semibold">
          Loading Statistics...
        </h2>
      </section>
    );

    const cards = [
      {
        title: "Total Users",
        value: stats.totalUsers,
        icon: Users,
      },
      {
        title: "Projects",
        value: stats.totalProjects,
        icon: Briefcase,
      },
      {
        title: "Verified Freelancers",
        value: stats.verifiedFreelancers,
        icon: UserCheck,
      },
      {
        title: "Average Rating",
        value: `${stats.averageRating} ★`,
        icon: Star,
      },
      {
        title: "Success Rate",
        value: `${stats.projectSuccessRate}%`,
        icon: CheckCircle,
      },
    ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          SkillSphere in Numbers
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Trusted by freelancers and clients to collaborate on successful projects.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
  {cards.map((card) => {
    const Icon = card.icon;

    return (
      <div
        key={card.title}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
      >
        <div className="flex justify-center mb-4">
          <Icon className="text-blue-600" size={34} />
        </div>

        <h3 className="text-3xl font-bold text-gray-800">
          {card.value}
        </h3>

        <p className="text-gray-600 mt-2">
          {card.title}
        </p>
      </div>
    );
  })}
</div>
      </div>
    </section>
  );
};

export default Statistics;