import { useState } from "react";
import { Form, Link, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { hashPassword } from "~/utils/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const errors = {
        name: name ? null : "Name is required",
        email: email ? null : "Email is required",
        password: password && password.length >= 8 ? null : "Password must be at least 8 characters",
        form: null,
    };

    const hasErrors = Object.values(errors).some(errorMessage => errorMessage);
    if (hasErrors) {
        return json({ errors, success: false,message:"Form Validation error" },{status:400});
    }

    const lowerCaseEmail = email.toLowerCase();

    try {
        const existingUser = await db.adminUser.findUnique({
            where: {
                email:lowerCaseEmail
            }
        });

        if (existingUser) {
            return json({
                errors: {
                    email: "A user with this email already exists",
                    name: null,
                    password: null,
                    form: null
                },
                success: false
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await db.adminUser.create({
            data: {
                name,
                email:lowerCaseEmail,
                password: hashedPassword,
            },
        })

        if (!user) {
            return json({
                errors: {
                    form: "An error occurred during signup. Please try again.",
                    name: null,
                    email: null,
                    password: null
                },
                success: false
            })
        }

        return redirect("/dashboard")
    } catch (error) {
        console.error("Error creating user:", error);
        return json({
            errors: {
                form: "An error occurred during signup. Please try again.",
                name: null,
                email: null,
                password: null
            },
            success: false
        });
    }

}

const Signup = () => {
    const actionData = useActionData<typeof action>();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join us today and get started
                    </p>
                </div>

                {actionData?.errors && 'form' in actionData.errors && actionData.errors.form && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="text-sm text-red-700">
                                {actionData.errors.form}
                            </div>
                        </div>
                    </div>
                )}

                <Form method="post" className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            {actionData?.errors?.name && (
                                <p className="mt-1 text-sm text-red-600">{actionData.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {actionData?.errors?.email && (
                                <p className="mt-1 text-sm text-red-600">{actionData.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password (min 8 characters)"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {actionData?.errors?.password && (
                                <p className="mt-1 text-sm text-red-600">{actionData.errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </button>
                    </div>

                    <div className="text-center text-sm">
                        <p className="mt-2 text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;