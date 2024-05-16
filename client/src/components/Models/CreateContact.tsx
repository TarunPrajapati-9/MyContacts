import { useForm } from "react-hook-form";
import { Contact } from "../ContactCard";

interface CreateContactProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateContact({ isOpen, onClose }: CreateContactProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>();

  const onSubmit = (data: Contact) => {
    console.log(data);
    onClose();
  };

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-modelTitle text-2xl">Create Contact</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 p-4">
          {errors.name && (
            <div className="text-red-500 mx-1 my-1">
              {errors.name?.message?.toString()}
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <img src="/assets/icons/name.svg" alt="name" className="w-4 h-4" />
            <input
              type="text"
              className="grow"
              placeholder="Name"
              {...register("name", {
                required: "Name is required!",
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
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid email!",
                },
              })}
            />
          </label>
          {errors.mobile && (
            <div className="text-red-500 mx-1 my-1">
              {errors.mobile?.message?.toString()}
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <img
              src="/assets/icons/mobileno.svg"
              alt="name"
              className="w-4 h-4"
            />
            <input
              type="text"
              className="grow"
              placeholder="Mobile Number"
              {...register("mobile", {
                required: "Mobile no. is required!",
                pattern: {
                  value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                  message: "Enter valid mobile no.!",
                },
              })}
            />
          </label>
          <div className="flex gap-4 justify-center">
            <button className="btn btn-outline btn-error" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-outline btn-success">Create</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export default CreateContact;
