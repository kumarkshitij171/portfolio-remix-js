import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, useActionData, useNavigation } from "@remix-run/react";
import { redirect, ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { verifyPassword } from "~/utils/auth.server";
import { useState, useEffect } from "react";
import { AdminSession } from "~/server/cookies.server";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import Spinner from "~/components/Spinner";
import { requireAuth } from "~/middleware/auth";
import toast, { Toaster } from "react-hot-toast";

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
    form?: string;
  };
  fields?: {
    email: string;
    password: string;
  };
  success?: boolean;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Login - Admin Dashboard" },
    { name: "description", content: "Login to the admin dashboard" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return json(
      {
        errors: {
          email: email ? undefined : "Email is required",
          password: password ? undefined : "Password is required",
          form: "Email and password are required",
        },
        fields: { email, password },
        success: false
      },
      { status: 400 }
    );
  }

  try {
    const user = await db.adminUser.findUnique({ where: { email: email.toLowerCase() } });

    if (!user) {
      return json(
        { errors: { form: "Invalid email or password" }, success: false },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return json(
        { errors: { form: "Invalid email or password" }, success: false },
        { status: 401 }
      );
    }

    const session = await AdminSession.serialize({
      id: user.id,
      email: user.email,
      name: user.name
    });

    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": session,
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return json({
      errors: { form: "An error occurred during login. Please try again." },
      success: false
    }, { status: 500 });
  }
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await requireAuth(request);

    if (session) {
      return redirect("/dashboard",{
        headers: {
          "Set-Cookie": session,
        }
      });
    }

    return json({ isAuthenticated: false });
  } catch (error) {
    console.error("Auth check error:", error);
    return json({ isAuthenticated: false });
  }
}

const Login = () => {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (actionData?.errors?.form) {
      toast.error(actionData.errors.form)
    }
  }, [actionData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-blue-50">
      <Toaster />
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>

        <Form method="post" className="mt-8 space-y-6">
          <div className="rounded-md space-y-5">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
              {actionData?.errors?.email && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {actionData?.errors?.password && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <Spinner size="sm" color="white" className="mr-2" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;