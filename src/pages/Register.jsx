import { motion } from "framer-motion";

import { useState } from "react";

import {
  User,
  Lock,
  ArrowRight,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AuthLayout from "../components/auth/AuthLayout";

import AuthInput from "../components/auth/AuthInput";

function Register() {
  const navigate =
    useNavigate();

  const { register } =
    useAuth();

  /*
    FORM STATE
  */

  const [name, setName] =
    useState("");

  const [
    username,
    setUsername,
  ] = useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

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

      setError("");

      /*
        PASSWORD MATCH
      */

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "Passwords do not match"
        );

        return;
      }

      setLoading(true);

      /*
        REGISTER USER
      */

      const result =
        await register({
          name,
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
      title="Create Account"
      subtitle="
        Join VulnProbe and secure
        your digital infrastructure
      "
    >
      {/* FORM */}

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

        {/* FULL NAME */}

        <AuthInput
          label="FULL NAME"
          type="text"
          placeholder="Enter your full name"
          icon={
            <User size={18} />
          }
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        {/* USERNAME */}

        <AuthInput
          label="ACCOUNT ID (no need to mention @vulnprobe.io)"
          type="text"
          placeholder="Choose unique username"
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

        {/* VULNPROBE ID */}

        <div
          className="
            rounded-2xl

            border
            border-cyan-400/10

            bg-cyan-400/[0.03]

            px-4
            py-4

            text-sm

            text-cyan-300
          "
        >
          Your ID:
          {" "}
          <span className="text-white">
            {username
              ? `${username}@vulnprobe.io`
              : "AccountID"}
          </span>
        </div>

        {/* PASSWORD */}

        <AuthInput
          label="PASSWORD"
          type="password"
          placeholder="Create a password"
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

        {/* CONFIRM PASSWORD */}

        <AuthInput
          label="CONFIRM PASSWORD"
          type="password"
          placeholder="Confirm your password"
          icon={
            <Lock size={18} />
          }
          value={
            confirmPassword
          }
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        {/* TERMS */}

        <label
          className="
            flex
            items-start
            gap-3

            text-sm

            leading-relaxed

            text-slate-400
          "
        >
          <input
            type="checkbox"
            className="
              mt-1

              h-4
              w-4

              rounded

              border-cyan-400/20

              bg-transparent
            "
          />

          I agree to the platform
          terms, privacy policy,
          and security guidelines.
        </label>

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
              ? "Creating Account..."
              : "Create Account"}
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
          Already have an
          account?{" "}

          <Link
            to="/login"
            className="
              text-cyan-300
              hover:text-cyan-200
            "
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;