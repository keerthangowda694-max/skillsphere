import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import API from "../../services/api";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import UpcomingDeadlines from "../../components/dashboard/UpcomingDeadlines";
import RecommendedProjects from "../../components/dashboard/RecommendedProjects";
import LatestProjects from "../../components/dashboard/LatestProjects";
import InvitationSummary from "../../components/dashboard/InvitationSummary";
import RecentReviews from "../../components/dashboard/RecentReviews";
import RecentActivity from "../../components/dashboard/RecentActivity";
import SkillProgress from "../../components/dashboard/SkillProgress";
import ProfileCompletion from "../../components/dashboard/ProfileCompletion";
import CareerSuggestions from "../../components/dashboard/CareerSuggestions";


import {
    FaWallet,
    FaProjectDiagram,
    FaStar,
    FaChartLine,
    FaEye,
    FaSearch,
    FaBriefcase,
    FaCalendarAlt,
} from "react-icons/fa";

const Dashboard = () => {
    const [analytics, setAnalytics] = useState({
        totalEarnings: 0,
        completedProjects: 0,
        activeProjects: 0,
        averageRating: 0,
        profileViews: 0,
        searchAppearances: 0,
        gigViews: 0,
        totalReviews: 0,
        memberSince: null,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [recommendedProjects, setRecommendedProjects] = useState([]);
    const [latestProjects, setLatestProjects] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [activities, setActivities] = useState([]);
    const [invitations, setInvitations] = useState({});
    const [skillProgress, setSkillProgress] = useState([]);
    const [careerSuggestions, setCareerSuggestions] = useState([]);
    const [profileCompletion, setProfileCompletion] = useState(0);
    

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const [
                analyticsRes,
                recommendedRes,
                latestRes,
                deadlineRes,
                reviewRes,
                invitationRes,
                aiRes,
            ] = await Promise.all([
                API.get("/analytics/freelancer/profile"),
                API.get("/projects/recommended"),
                API.get("/projects/latest"),
                API.get("/projects/upcoming-deadlines"),
                API.get("/analytics/freelancer/reviews"),
                API.get("/invitations/summary"),
                API.get("/ai/freelancer-insights"),
            ]);

            setAnalytics(analyticsRes.data.analytics);

            setRecommendedProjects(
                recommendedRes.data.projects || []
            );

            setLatestProjects(
                latestRes.data.projects || []
            );

            setDeadlines(
                deadlineRes.data.projects || []
            );

            setReviews(
                reviewRes.data.reviews || []
            );

            setInvitations(
                invitationRes.data.summary || {}
            );

            setCareerSuggestions(
                aiRes.data.analytics.suggestions || []
            );

            setProfileCompletion(
                aiRes.data.analytics.profileScore || 80
            );

            setSkillProgress([
                {
                    name: "React",
                    level: 92,
                },
                {
                    name: "Node.js",
                    level: 86,
                },
                {
                    name: "MongoDB",
                    level: 80,
                },
                {
                    name: "Express",
                    level: 78,
                },
            ]);

            setActivities([
                "Project completed",
                "Payment received",
                "Invitation accepted",
                "Client viewed profile",
            ]);
        } catch (err) {
            console.log(err);
            setError("Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center h-[70vh]">
                    <h2 className="text-2xl font-semibold">
                        Loading Dashboard...
                    </h2>
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="bg-red-100 border border-red-300 rounded-xl p-6 text-red-700">
                    {error}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Freelancer Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome back! Here's your latest performance.
                </p>
            </div>

            <WelcomeBanner />

            {/* Stat Cards */}

            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-10">
                <StatCard
                    title="Total Earnings"
                    value={`₹${analytics.totalEarnings?.toLocaleString() || 0}`}
                    icon={<FaWallet />}
                    color="bg-green-500"
                />

                <StatCard
                    title="Completed Projects"
                    value={analytics.completedProjects || 0}
                    icon={<FaProjectDiagram />}
                    color="bg-blue-500"
                />

                <StatCard
                    title="Active Projects"
                    value={analytics.activeProjects || 0}
                    icon={<FaBriefcase />}
                    color="bg-purple-500"
                />

                <StatCard
                    title="Average Rating"
                    value={analytics.averageRating || 0}
                    icon={<FaStar />}
                    color="bg-yellow-500"
                />

                <StatCard
                    title="Profile Views"
                    value={analytics.profileViews || 0}
                    icon={<FaEye />}
                    color="bg-cyan-500"
                />

                <StatCard
                    title="Search Appearances"
                    value={analytics.searchAppearances || 0}
                    icon={<FaSearch />}
                    color="bg-indigo-500"
                />

                <StatCard
                    title="Gig Views"
                    value={analytics.gigViews || 0}
                    icon={<FaChartLine />}
                    color="bg-pink-500"
                />

                <StatCard
                    title="Total Reviews"
                    value={analytics.totalReviews || 0}
                    icon={<FaCalendarAlt />}
                    color="bg-orange-500"
                />
            </div>

           

            {/* Top Widgets */}

            <div className="grid lg:grid-cols-3 gap-8 mt-10">
                <UpcomingDeadlines
                    projects={deadlines}
                />

                <InvitationSummary
                    invitations={invitations}
                />

                <ProfileCompletion
                    completion={profileCompletion}
                />
            </div>

            {/* Recommended Projects */}

            <div className="mt-10">
                <RecommendedProjects
                    projects={recommendedProjects}
                />
            </div>

            {/* Latest Projects */}

            <div className="mt-10">
                <LatestProjects
                    projects={latestProjects}
                />
            </div>

            {/* Reviews & Activity */}

            <div className="grid lg:grid-cols-2 gap-8 mt-10">
                <RecentReviews
                    reviews={reviews}
                />

                <RecentActivity
                    activities={activities}
                />
            </div>

            {/* Skills & AI Suggestions */}

            <div className="grid lg:grid-cols-2 gap-8 mt-10">
                <SkillProgress
                    skills={skillProgress}
                />

                <CareerSuggestions
                    suggestions={careerSuggestions}
                />
            </div>

            {/* Profile Summary */}

            <div className="mt-10 bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">
                    Profile Summary
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-gray-500">
                            Member Since
                        </p>

                        <h3 className="text-lg font-semibold mt-2">
                            {analytics.memberSince
                                ? new Date(
                                      analytics.memberSince
                                  ).toLocaleDateString()
                                : "N/A"}
                        </h3>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Success Rate
                        </p>

                        <h3 className="text-lg font-semibold mt-2">
                            {analytics.completedProjects > 0
                                ? "100%"
                                : "0%"}
                        </h3>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;