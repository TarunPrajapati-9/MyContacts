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
    onSuccess: () => {
      toast.success("Account Created Successfully!");
      navigate("/");
    },
    onError: (error) => {
      toast.error("Invalid Credentials!");
      console.log(error);
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
          className="w-44 h-44 mb-8 mx-auto pointer-events-none"
        />
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {errors.uname && (
            <div className="text-red-500 mx-1 my-1">
              {errors.uname?.message?.toString()}
            </div>
          )}
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered mb-4"
            disabled={isPending}
            {...register("uname", {
              required: "Username is required!",
            })}
          />
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
            className="input input-bordered mb-4"
            disabled={isPending}
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
