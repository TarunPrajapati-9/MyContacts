import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../utils/dataPoster";
import { useNavigate } from "react-router-dom";

interface User {
  uname: string;
  email: string;
  pwd: string;
}

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      if (res.accesstoken) {
        localStorage.setItem("access_token", res.accesstoken);
        toast.success("Account Created Successfully!");
        navigate("/");
      }
    },
    onError: () => {
      toast.error("Invalid Credentials!");
      // console.log(error);
    },
  });

  const onSubmit: SubmitHandler<User> = (formData) => {
    mutate({
      username: formData.uname,
      email: formData.email,
      password: formData.pwd,
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg select-none">
        <img
          src="/logo.svg"
          alt="logo"
          className="w-44 h-44 mb-2 mx-auto pointer-events-none"
        />
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {errors.uname && (
            <div className="text-red-500 mx-1 my-1">
              {errors.uname?.message?.toString()}
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              disabled={isPending}
              {...register("uname", {
                required: "Username is required!",
              })}
            />
          </label>
          {errors.email && (
            <div className="text-red-500 mx-1 my-1">
              {errors.email?.message?.toString()}
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              disabled={isPending}
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a Valid Email!",
                },
              })}
            />
          </label>
          {errors.pwd && (
            <div className="text-red-500 mx-1 my-1">
              {errors.pwd?.message?.toString()}
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              disabled={isPending}
              {...register("pwd", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters!",
                },
              })}
            />
          </label>
          <button
            className="btn btn-info w-1/2 mx-auto mt-4"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-dots" />
            ) : (
              "Create Account"
            )}
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account?
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
