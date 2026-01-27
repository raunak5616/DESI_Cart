import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigatae = useNavigate();
    const signup = () => {
        navigatae('/signup');
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        
        {/* TITLE */}
        <h1 className="mb-2 text-center text-3xl font-semibold text-gray-900">
          देशीCart
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Welcome back! Please login to your account
        </p>

        {/* FORM */}
        <div className="flex flex-col gap-4">
          
          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="rounded-2xl border border-gray-300 px-4 py-3 text-sm
                         focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="rounded-2xl border border-gray-300 px-4 py-3 text-sm
                         focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <span className="cursor-pointer text-sm text-gray-600 hover:text-black hover:underline">
              Forgot password?
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <button
            className="mt-2 rounded-2xl bg-black py-3 text-white font-medium
                       transition-all duration-200
                       hover:scale-105 hover:bg-gray-900
                       active:scale-95"
          >
            Login
          </button>

          {/* SIGN UP */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <span className="cursor-pointer font-medium text-black hover:underline" onClick={signup}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
