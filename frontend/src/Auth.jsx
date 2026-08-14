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

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // ===============================
    // HANDLE INPUT
    // ===============================

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

        setError("");
        setMessage("");
    };

    // ===============================
    // SUBMIT
    // ===============================

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

            const contentType =
                response.headers.get("content-type");

            if (!contentType?.includes("application/json")) {
                throw new Error(
                    "Server returned an invalid response. Please make sure the backend is deployed."
                );
            }

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                        "Something went wrong"
                );
            }

            // ===============================
            // LOGIN SUCCESS
            // ===============================

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
            }

            // ===============================
            // SIGNUP SUCCESS
            // ===============================

            else {
                setMessage(
                    "Account created successfully! Please sign in."
                );

                setIsLogin(true);

                setFormData({
                    name: "",
                    email: formData.email,
                    password: "",
                });

                setShowPassword(false);
            }

        } catch (error) {
            console.error(
                "Authentication error:",
                error
            );

            setError(error.message);

        } finally {
            setLoading(false);
        }
    };

    // ===============================
    // SWITCH LOGIN / SIGNUP
    // ===============================

    const switchMode = () => {
        setIsLogin(!isLogin);

        setError("");
        setMessage("");

        setShowPassword(false);

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
                    background: "#181a1b",
                    borderRadius: "20px",
                    padding: "35px",
                    boxSizing: "border-box",
                    boxShadow:
                        "0 25px 60px rgba(0,0,0,0.35)",
                    color: "#ffffff",
                }}
            >

                {/* ===============================
                    LOGO
                =============================== */}

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
                            background: "#0f1424",
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
                        }}
                    >
                        Finance Tracker
                    </h1>

                    <p
                        style={{
                            marginTop: "8px",
                            color: "#9ca3af",
                        }}
                    >
                        Manage your money smarter
                    </p>
                </div>

                {/* ===============================
                    LOGIN / SIGNUP TABS
                =============================== */}

                <div
                    style={{
                        display: "flex",
                        background: "#202122",
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
                            setShowPassword(false);
                        }}
                        style={{
                            flex: 1,
                            border: "none",
                            borderRadius: "8px",
                            padding: "11px",
                            cursor: "pointer",
                            fontWeight: "600",
                            background: isLogin
                                ? "#202122"
                                : "transparent",
                            color: "#ffffff",
                            fontSize: "16px",
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
                            setShowPassword(false);
                        }}
                        style={{
                            flex: 1,
                            border: "none",
                            borderRadius: "8px",
                            padding: "11px",
                            cursor: "pointer",
                            fontWeight: "600",
                            background: !isLogin
                                ? "#0f1424"
                                : "transparent",
                            color: "#ffffff",
                            fontSize: "16px",
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                {/* ===============================
                    TITLE
                =============================== */}

                <h2
                    style={{
                        marginBottom: "8px",
                        textAlign: "center",
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
                        color: "#9ca3af",
                        textAlign: "center",
                        fontSize: "16px",
                    }}
                >
                    {isLogin
                        ? "Sign in to access your finances."
                        : "Start managing your personal finances."}
                </p>

                {/* ===============================
                    ERROR
                =============================== */}

                {error && (
                    <div
                        style={{
                            background: "#650000",
                            color: "#ff5c5c",
                            padding: "12px",
                            borderRadius: "10px",
                            marginBottom: "18px",
                            fontSize: "14px",
                            textAlign: "center",
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* ===============================
                    SUCCESS
                =============================== */}

                {message && (
                    <div
                        style={{
                            background: "#064e3b",
                            color: "#6ee7b7",
                            padding: "12px",
                            borderRadius: "10px",
                            marginBottom: "18px",
                            fontSize: "14px",
                            textAlign: "center",
                        }}
                    >
                        {message}
                    </div>
                )}

                {/* ===============================
                    FORM
                =============================== */}

                <form onSubmit={handleSubmit}>

                    {/* NAME */}

                    {!isLogin && (
                        <>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "7px",
                                    fontWeight: "600",
                                    textAlign: "center",
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
                                    padding: "14px",
                                    boxSizing:
                                        "border-box",
                                    border:
                                        "1px solid #444",
                                    borderRadius: "10px",
                                    marginBottom: "18px",
                                    fontSize: "15px",
                                    background:
                                        "#3f3f3f",
                                    color: "#ffffff",
                                    outline: "none",
                                }}
                            />
                        </>
                    )}

                    {/* EMAIL */}

                    <label
                        style={{
                            display: "block",
                            marginBottom: "7px",
                            fontWeight: "600",
                            textAlign: "center",
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
                            padding: "14px",
                            boxSizing: "border-box",
                            border:
                                "1px solid #444",
                            borderRadius: "10px",
                            marginBottom: "18px",
                            fontSize: "15px",
                            background: "#3f3f3f",
                            color: "#ffffff",
                            outline: "none",
                        }}
                    />

                    {/* PASSWORD */}

                    <label
                        style={{
                            display: "block",
                            marginBottom: "7px",
                            fontWeight: "600",
                            textAlign: "center",
                        }}
                    >
                        Password
                    </label>

                    <div
                        style={{
                            position: "relative",
                            marginBottom: "22px",
                        }}
                    >
                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 6 characters"
                            minLength="6"
                            required
                            style={{
                                width: "100%",
                                padding: "14px 50px 14px 14px",
                                boxSizing:
                                    "border-box",
                                border:
                                    "1px solid #444",
                                borderRadius: "10px",
                                fontSize: "15px",
                                background:
                                    "#3f3f3f",
                                color: "#ffffff",
                                outline: "none",
                            }}
                        />

                        {/* EYE BUTTON */}

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            style={{
                                position: "absolute",
                                right: "12px",
                                top: "50%",
                                transform:
                                    "translateY(-50%)",
                                border: "none",
                                background:
                                    "transparent",
                                color: "#d1d5db",
                                cursor: "pointer",
                                fontSize: "20px",
                                padding: "5px",
                            }}
                        >
                            {showPassword
                                ? "🙈"
                                : "👁️"}
                        </button>
                    </div>

                    {/* SUBMIT BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            border: "none",
                            borderRadius: "9px",
                            background: loading
                                ? "#4b5563"
                                : "#0f1424",
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

                {/* ===============================
                    SWITCH
                =============================== */}

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "24px",
                        color: "#9ca3af",
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
                            color: "#ffffff",
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