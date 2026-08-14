import { useState } from "react";

const API_URL =
    "https://finance-expense-tracker-api-3yh8.onrender.com";

function Auth({ onAuth }) {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

        setError("");
        setMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");
        setLoading(true);

        try {
            const endpoint = isLogin
                ? "/api/auth/login"
                : "/api/auth/signup";

            const body = isLogin
                ? {
                      email: formData.email,
                      password: formData.password,
                  }
                : {
                      name: formData.name,
                      email: formData.email,
                      password: formData.password,
                  };

            const response = await fetch(
                `${API_URL}${endpoint}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                        "Something went wrong"
                );
            }

            if (isLogin) {
                localStorage.setItem(
                    "token",
                    result.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(result.data)
                );

                onAuth(result.data);
            } else {
                setMessage(
                    "Account created successfully! Please sign in."
                );

                setIsLogin(true);

                setFormData({
                    name: "",
                    email: formData.email,
                    password: "",
                });
            }
        } catch (error) {
            console.error("Authentication error:", error);

            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);

        setError("");
        setMessage("");

        setFormData({
            name: "",
            email: "",
            password: "",
        });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "linear-gradient(135deg, #111827, #1f2937)",
                padding: "20px",
                boxSizing: "border-box",
                fontFamily:
                    "Arial, Helvetica, sans-serif",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "430px",
                    background: "#ffffff",
                    borderRadius: "20px",
                    padding: "35px",
                    boxSizing: "border-box",
                    boxShadow:
                        "0 25px 60px rgba(0,0,0,0.35)",
                }}
            >
                {/* LOGO */}

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "28px",
                    }}
                >
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "16px",
                            background: "#111827",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "28px",
                            fontWeight: "bold",
                            margin: "0 auto 15px",
                        }}
                    >
                        ₹
                    </div>

                    <h1
                        style={{
                            margin: 0,
                            fontSize: "28px",
                            color: "#111827",
                        }}
                    >
                        Finance Tracker
                    </h1>

                    <p
                        style={{
                            marginTop: "8px",
                            color: "#6b7280",
                        }}
                    >
                        Manage your money smarter
                    </p>
                </div>

                {/* TABS */}

                <div
                    style={{
                        display: "flex",
                        background: "#f3f4f6",
                        borderRadius: "10px",
                        padding: "4px",
                        marginBottom: "25px",
                    }}
                >
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(true);
                            setError("");
                            setMessage("");
                        }}
                        style={{
                            flex: 1,
                            border: "none",
                            borderRadius: "8px",
                            padding: "11px",
                            cursor: "pointer",
                            fontWeight: "600",
                            background: isLogin
                                ? "#111827"
                                : "transparent",
                            color: isLogin
                                ? "#ffffff"
                                : "#6b7280",
                        }}
                    >
                        Sign In
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(false);
                            setError("");
                            setMessage("");
                        }}
                        style={{
                            flex: 1,
                            border: "none",
                            borderRadius: "8px",
                            padding: "11px",
                            cursor: "pointer",
                            fontWeight: "600",
                            background: !isLogin
                                ? "#111827"
                                : "transparent",
                            color: !isLogin
                                ? "#ffffff"
                                : "#6b7280",
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                <h2
                    style={{
                        marginBottom: "8px",
                        color: "#111827",
                    }}
                >
                    {isLogin
                        ? "Welcome back!"
                        : "Create your account"}
                </h2>

                <p
                    style={{
                        marginTop: 0,
                        marginBottom: "22px",
                        color: "#6b7280",
                    }}
                >
                    {isLogin
                        ? "Sign in to access your finances."
                        : "Start managing your personal finances."}
                </p>

                {/* ERROR */}

                {error && (
                    <div
                        style={{
                            background: "#fee2e2",
                            color: "#b91c1c",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "18px",
                            fontSize: "14px",
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* SUCCESS */}

                {message && (
                    <div
                        style={{
                            background: "#dcfce7",
                            color: "#15803d",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "18px",
                            fontSize: "14px",
                        }}
                    >
                        {message}
                    </div>
                )}

                {/* FORM */}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "7px",
                                    fontWeight: "600",
                                    color: "#374151",
                                }}
                            >
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                style={{
                                    width: "100%",
                                    padding: "13px",
                                    boxSizing: "border-box",
                                    border:
                                        "1px solid #d1d5db",
                                    borderRadius: "9px",
                                    marginBottom: "18px",
                                    fontSize: "15px",
                                    outline: "none",
                                }}
                            />
                        </>
                    )}

                    <label
                        style={{
                            display: "block",
                            marginBottom: "7px",
                            fontWeight: "600",
                            color: "#374151",
                        }}
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        style={{
                            width: "100%",
                            padding: "13px",
                            boxSizing: "border-box",
                            border:
                                "1px solid #d1d5db",
                            borderRadius: "9px",
                            marginBottom: "18px",
                            fontSize: "15px",
                            outline: "none",
                        }}
                    />

                    <label
                        style={{
                            display: "block",
                            marginBottom: "7px",
                            fontWeight: "600",
                            color: "#374151",
                        }}
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Minimum 6 characters"
                        minLength="6"
                        required
                        style={{
                            width: "100%",
                            padding: "13px",
                            boxSizing: "border-box",
                            border:
                                "1px solid #d1d5db",
                            borderRadius: "9px",
                            marginBottom: "22px",
                            fontSize: "15px",
                            outline: "none",
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            border: "none",
                            borderRadius: "9px",
                            background: loading
                                ? "#6b7280"
                                : "#111827",
                            color: "#ffffff",
                            fontSize: "16px",
                            fontWeight: "700",
                            cursor: loading
                                ? "not-allowed"
                                : "pointer",
                        }}
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                            ? "Sign In"
                            : "Create Account"}
                    </button>
                </form>

                {/* SWITCH */}

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "24px",
                        color: "#6b7280",
                        fontSize: "14px",
                    }}
                >
                    {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}

                    <button
                        type="button"
                        onClick={switchMode}
                        style={{
                            border: "none",
                            background: "none",
                            color: "#111827",
                            fontWeight: "700",
                            cursor: "pointer",
                            padding: 0,
                        }}
                    >
                        {isLogin
                            ? "Sign Up"
                            : "Sign In"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Auth;