import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authApi";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = await loginUser(formData);

            login(data);

            alert("Login Successful");

            if (data.role === "admin") {

                navigate("/admin/dashboard");

            }

            else if (data.role === "client") {

                navigate("/client/dashboard");

            }

            else {

                navigate("/freelancer/dashboard");

            }

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Login Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-blue-1">

            <div className="bg-green shadow-xl rounded-2xl p-10 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-8">

                    Login

                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>

                        <label>Email</label>

                        <input

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            className="w-full mt-2 border rounded-lg p-3"

                            required

                        />

                    </div>

                    <div>

                        <label>Password</label>

                        <input

                            type="password"

                            name="password"

                            value={formData.password}

                            onChange={handleChange}

                            className="w-full mt-2 border rounded-lg p-3"

                            required

                        />

                    </div>

                    <button

                        className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"

                        disabled={loading}

                    >

                        {loading ? "Logging In..." : "Login"}

                    </button>

                </form>

                <div className="mt-6 flex justify-between text-sm">

                    <Link

                        to="/forgot-password"

                        className="text-blue-600"

                    >

                        Forgot Password?

                    </Link>

                    <Link

                        to="/register"

                        className="text-blue-600"

                    >

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default Login;