import { motion } from "framer-motion";

import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  User,
  Lock,
  ArrowRight,
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";

import AuthInput from "../components/auth/AuthInput";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  /*
    STATES
  */

  const [
    username,
    setUsername,
  ] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
    SUBMIT
  */

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      setError("");

      const result =
        await login({
          username,
          password,
        });

      if (result.success) {
        navigate(
          "/dashboard"
        );
      } else {
        setError(
          result.message
        );
      }

      setLoading(false);
    };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="
        Access your vulnerability
        intelligence workspace
      "
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-6"
      >
        {/* ERROR */}

        {error && (
          <div
            className="
              rounded-xl

              border
              border-red-500/20

              bg-red-500/10

              px-4
              py-3

              text-sm

              text-red-300
            "
          >
            {error}
          </div>
        )}

        {/* USERNAME */}

        <AuthInput
          label="USERNAME ID"
          type="text"
          placeholder="Enter your username ID"
          icon={
            <User size={18} />
          }
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        {/* PASSWORD */}

        <AuthInput
          label="PASSWORD"
          type="password"
          placeholder="Enter your password"
          icon={
            <Lock size={18} />
          }
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        {/* BUTTON */}

        <motion.button
          type="submit"
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          disabled={loading}
          className="
            group
            relative

            flex
            items-center
            justify-center
            gap-3

            w-full

            overflow-hidden

            rounded-2xl

            bg-cyan-400

            px-5
            py-4

            font-medium

            text-black

            transition-all
            duration-300

            hover:shadow-[0_0_35px_rgba(0,229,255,0.35)]

            disabled:opacity-70
          "
        >
          <span className="relative z-10">
            {loading
              ? "Authenticating..."
              : "Access Dashboard"}
          </span>

          {!loading && (
            <ArrowRight
              size={18}
              className="relative z-10"
            />
          )}
        </motion.button>
      </form>

      {/* BOTTOM */}

      <div className="mt-8 text-center">
        <p className="text-slate-500">
          Don&apos;t have an
          account?{" "}

          <Link
            to="/register"
            className="
              text-cyan-300
              hover:text-cyan-200
            "
          >
            Create Account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;