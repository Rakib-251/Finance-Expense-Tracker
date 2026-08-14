import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Auth from "./Auth";

import "./index.css";


// ===============================
// API AUTHENTICATION
// ===============================

const originalFetch = window.fetch.bind(window);

window.fetch = (input, init = {}) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return originalFetch(input, init);
    }

    const headers = new Headers(
        init.headers ||
        (input instanceof Request
            ? input.headers
            : undefined)
    );

    if (!headers.has("Authorization")) {
        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }

    return originalFetch(input, {
        ...init,
        headers,
    });
};


// ===============================
// ROOT COMPONENT
// ===============================

function Root() {

    const [user, setUser] = useState(() => {
        try {
            const savedUser =
                localStorage.getItem("user");

            return savedUser
                ? JSON.parse(savedUser)
                : null;

        } catch (error) {
            console.error(
                "User data error:",
                error
            );

            return null;
        }
    });


    // ===============================
    // LOGIN SUCCESS
    // ===============================

    const handleAuth = (userData) => {
        setUser(userData);
    };


    // ===============================
    // LOGOUT
    // ===============================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };


    // ===============================
    // AUTH SCREEN
    // ===============================

    if (!user) {
        return (
            <Auth
                onAuth={handleAuth}
            />
        );
    }


    // ===============================
    // DASHBOARD
    // ===============================

    return (
        <>
            <App />

            <button
                onClick={handleLogout}
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    zIndex: 99999,

                    padding: "10px 16px",

                    border: "none",
                    borderRadius: "8px",

                    background: "#ef4444",
                    color: "#ffffff",

                    fontSize: "14px",
                    fontWeight: "700",

                    cursor: "pointer",

                    boxShadow:
                        "0 4px 12px rgba(0,0,0,0.3)",
                }}
            >
                Logout
            </button>
        </>
    );
}


// ===============================
// RENDER
// ===============================

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);