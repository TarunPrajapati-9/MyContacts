import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { loginUser } from "../../utils/dataPoster";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
interface User {
  email: string;
  pwd: string;
}

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      if (res) {
        cookies.set("access_token", res.accesstoken, {
          path: "/",
          httpOnly: true,
          secure: true,
        });
        console.log(cookies.get("access_token"));
        toast.success(cookies.get("access_token"));
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error("Invalid Credentials!");
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<User> = (formData) => {
    mutate({
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
          className="w-44 h-44 mb-8 mx-auto pointer-events-none"
        />
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {errors.email && (
            <div className="text-red-500 mx-1 my-1">
              {errors.email?.message?.toString()}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered mb-4"
            disabled={isPending}
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a Valid Email!",
              },
            })}
          />
          {errors.pwd && (
            <div className="text-red-500 mx-1 my-1">
              {errors.pwd?.message?.toString()}
            </div>
          )}
          <input
            type="password"
            placeholder="Password"
            disabled={isPending}
            className="input input-bordered mb-4"
            {...register("pwd", {
              required: "Password is required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters!",
              },
            })}
          />
          <button
            className="btn btn-info w-1/2 mx-auto mt-4"
            disabled={isPending}
          >
            {isPending ? <span className="loading loading-dots" /> : "Login"}
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't have an account?
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
