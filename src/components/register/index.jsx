import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import logo from "../../assets/logo.png";

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const navigateToHome = () => {
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 2000);
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^(?:[a-zA-Z0-9._%+-]+@stud\.noroff\.no|[^@\s]+@noroff\.no)$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password, name, avatar, venueManager } =
      event.target.elements;

    let fieldErrors = {};

    if (!name.value.match(/^[a-zA-Z0-9_]+$/)) {
      fieldErrors.name =
        "Name must not contain punctuation symbols apart from underscore (_).";
    }

    if (!validateEmail(email.value)) {
      fieldErrors.email =
        "Invalid email address. Please use a valid stud.noroff.no or noroff.no email.";
    }

    if (!validatePassword(password.value)) {
      fieldErrors.password = "Password must be at least 8 characters.";
    }

    if (!avatar.value) {
      fieldErrors.avatar = "Avatar is required.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setError(fieldErrors);
      return;
    }

    const requestData = {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
      venueManager: venueManager.checked, // Retrieve the checkbox value
    };

    console.log("Request Data: ", requestData); // Log the request data to debug

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/holidaze/auth/register", // Ensure this URL is correct
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        localStorage.setItem("email", email.value); // Store the venueManager value in localStorage
        navigateToHome();
      } else {
        setError({ general: data.message });
      }
    } catch (error) {
      console.warn("An error occurred", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 md:py-6 lg:px-8 bg-custom card w-full max-w-[100%] h-[300px] md:h-auto glass">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="w-auto h-20 mx-auto" src={logo} alt="Your Company" />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-black">
          Make a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {isSuccess ? (
          <section>
            <p className="text-center text-green-600">
              👋 Hi {localStorage.getItem("email")}. You will now redirect to
              the login page!
            </p>
          </section>
        ) : (
          <form
            className="space-y-6 shadow-lg px-4 py-6"
            onSubmit={handleOnSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-black"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="px-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm sm:leading-6"
                />
              </div>
              {error.name && (
                <p className="text-red-500 text-xs mt-2">{error.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium leading-6 text-black"
              >
                Avatar URL
              </label>
              <div className="mt-2">
                <input
                  id="avatar"
                  name="avatar"
                  type="url"
                  required
                  className="px-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm sm:leading-6"
                />
              </div>
              {error.avatar && (
                <p className="text-red-500 text-xs mt-2">{error.avatar}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="px-1 block w-full rounded-md border border-gray-300 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm sm:leading-6"
                />
              </div>
              {error.email && (
                <p className="text-red-500 text-xs mt-2">{error.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-black"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border border-gray-300 px-1 py-1.5 bg-white text-black shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm sm:leading-6"
                />
              </div>
              {error.password && (
                <p className="text-red-500 text-xs mt-2">{error.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="venueManager"
                className="block text-sm font-medium leading-6 text-black"
              >
                Are you a Venue Manager?
              </label>
              <div className="mt-2 flex items-center">
                <input
                  id="venueManager"
                  name="venueManager"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="venueManager"
                  className="ml-2 block text-sm text-black"
                >
                  Yes
                </label>
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Registering" : "Sign up"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-10 text-sm text-center text-gray-500">
          Already a member?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-custom-aqua hover:text-indigo-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
