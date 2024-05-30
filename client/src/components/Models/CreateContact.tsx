import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "../../utils/dataPoster";
import toast from "react-hot-toast";
import { handleImageUpload } from "../../utils/dataPoster";
import { useState } from "react";

interface CreateContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateContact {
  name: string;
  phone: string;
  email: string;
  imageUrl: string;
}

export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  imageUrl: FileList;
}

function CreateContact({ isOpen, onClose }: CreateContactProps) {
  const queryClient = useQueryClient();
  const [Load, setLoad] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: createContact,
    onSuccess: (res) => {
      setLoad(false);
      toast.success(res.name + " Contact Created");
      queryClient.invalidateQueries({ queryKey: ["Contacts"] });
      onClose();
    },
    onError: () => {
      toast.error("Something went wrong!");
      // console.log(err);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactPayload>();

  const onSubmit = async (formData: ContactPayload) => {
    setLoad(true);
    const url = await handleImageUpload(formData.imageUrl[0]);
    mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      imageUrl: url,
    });
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
              disabled={isPending || Load}
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
            <img src="/assets/icons/mail.svg" alt="email" className="w-4 h-4" />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              disabled={isPending || Load}
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid email!",
                },
              })}
            />
          </label>
          {errors.phone && (
            <div className="text-red-500 mx-1 my-1">
              {errors.phone?.message?.toString()}
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
              disabled={isPending || Load}
              {...register("phone", {
                required: "Mobile no. is required!",
                pattern: {
                  value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                  message: "Enter valid mobile no.!",
                },
              })}
            />
          </label>
          {errors.imageUrl && (
            <div className="text-red-500 mx-1 my-1">
              {errors.imageUrl?.message?.toString()}
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2 mb-4">
            <img
              src="/assets/icons/profile.svg"
              alt="image"
              className="w-5 h-5"
            />
            <input
              type="file"
              className="file-input w-full"
              accept="image/*"
              disabled={isPending || Load}
              {...register("imageUrl", {
                required: "Contact Image is required!",
              })}
            />
          </label>
          <div className="flex gap-4 justify-center">
            <button
              className="btn btn-outline btn-error"
              onClick={onClose}
              disabled={isPending || Load}
            >
              Cancel
            </button>
            <button
              className="btn btn-outline btn-success"
              disabled={isPending || Load}
            >
              {isPending || Load ? (
                <span className="loading loading-dots" />
              ) : (
                "Create Contact"
              )}
            </button>
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
