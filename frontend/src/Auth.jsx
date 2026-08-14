import { useState } from "react";

const API_URL =
    "https://finance-expense-tracker-api-3yh8.onrender.com";

function Auth({ onAuth }) {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

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
    // SWITCH LOGIN / SIGNUP
    // ===============================

    const switchMode = (loginMode) => {
        setIsLogin(loginMode);

        setError("");
        setMessage("");

        setShowPassword(false);
        setShowConfirmPassword(false);

        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    // ===============================
    // SUBMIT
    // ===============================

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");

        // Check password confirmation
        if (!isLogin) {
            if (
                formData.password !==
                formData.confirmPassword
            ) {
                setError("Passwords do not match");
                return;
            }
        }

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

            if (
                !contentType ||
                !contentType.includes("application/json")
            ) {
                throw new Error(
                    "Server returned an invalid response."
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
                    "Account created successfully! Please login."
                );

                setIsLogin(true);

                setFormData({
                    name: "",
                    email: formData.email,
                    password: "",
                    confirmPassword: "",
                });

                setShowPassword(false);
                setShowConfirmPassword(false);
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
    // STYLES
    // ===============================

    const inputStyle = {
        width: "100%",
        padding: "14px",
        boxSizing: "border-box",
        border: "1px solid #444",
        borderRadius: "10px",
        fontSize: "15px",
        background: "#3f3f3f",
        color: "#ffffff",
        outline: "none",
    };

    const labelStyle = {
        display: "block",
        marginBottom: "8px",
        fontWeight: "600",
        color: "#ffffff",
    };

    const eyeButtonStyle = {
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        border: "none",
        background: "transparent",
        color: "#ffffff",
        cursor: "pointer",
        fontSize: "19px",
        padding: "5px",
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
                    padding: "40px",
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
                            margin: "0 0 8px",
                            fontSize: "28px",
                        }}
                    >
                        Finance Tracker
                    </h1>

                    <p
                        style={{
                            margin: 0,
                            color: "#9ca3af",
                            fontSize: "16px",
                        }}
                    >
                        {isLogin
                            ? "Login to manage your finances"
                            : "Start managing your finances"}
                    </p>
                </div>

                {/* ===============================
                    PAGE TITLE
                =============================== */}

                <h2
                    style={{
                        textAlign: "center",
                        margin: "0 0 25px",
                        fontSize: "24px",
                    }}
                >
                    {isLogin
                        ? "Welcome back!"
                        : "Create Account"}
                </h2>

                {/* ===============================
                    ERROR
                =============================== */}

                {error && (
                    <div
                        style={{
                            background: "#650000",
                            color: "#ff7777",
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
                        <div
                            style={{
                                marginBottom: "18px",
                            }}
                        >
                            <label style={labelStyle}>
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                style={inputStyle}
                            />
                        </div>
                    )}

                    {/* EMAIL */}

                    <div
                        style={{
                            marginBottom: "18px",
                        }}
                    >
                        <label style={labelStyle}>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            style={inputStyle}
                        />
                    </div>

                    {/* PASSWORD */}

                    <div
                        style={{
                            marginBottom: "18px",
                        }}
                    >
                        <label style={labelStyle}>
                            Password
                        </label>

                        <div
                            style={{
                                position: "relative",
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
                                placeholder="Enter your password"
                                minLength="6"
                                required
                                style={{
                                    ...inputStyle,
                                    paddingRight: "50px",
                                }}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                style={eyeButtonStyle}
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword
                                    ? "🙈"
                                    : "👁️"}
                            </button>
                        </div>
                    </div>

                    {/* CONFIRM PASSWORD */}

                    {!isLogin && (
                        <div
                            style={{
                                marginBottom: "22px",
                            }}
                        >
                            <label style={labelStyle}>
                                Confirm Password
                            </label>

                            <div
                                style={{
                                    position: "relative",
                                }}
                            >
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Confirm your password"
                                    minLength="6"
                                    required
                                    style={{
                                        ...inputStyle,
                                        paddingRight:
                                            "50px",
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    style={eyeButtonStyle}
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                >
                                    {showConfirmPassword
                                        ? "🙈"
                                        : "👁️"}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* BUTTON */}

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
                            ? "Login"
                            : "Sign Up"}
                    </button>
                </form>

                {/* ===============================
                    BOTTOM LINK
                =============================== */}

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "22px",
                        color: "#9ca3af",
                        fontSize: "14px",
                    }}
                >
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() =>
                                    switchMode(false)
                                }
                                style={{
                                    border: "none",
                                    background: "none",
                                    color: "#ffffff",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    padding: 0,
                                }}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() =>
                                    switchMode(true)
                                }
                                style={{
                                    border: "none",
                                    background: "none",
                                    color: "#ffffff",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    padding: 0,
                                }}
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auth;