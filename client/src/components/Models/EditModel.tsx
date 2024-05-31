import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";
import { Contact } from "../ContactCard";
import { EditContact } from "../../utils/dataPutter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateContact } from "../../utils/dataPutter";
import { handleImageUpload } from "../../utils/dataPoster";
import { ContactPayload } from "./CreateContact";
import { handleDelete } from "../../utils/dataDelete";

interface EditModelProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  contactID: string;
  imageUrl: string;
}
export interface EditContactPayload {
  name: string;
  phone: string;
  email: string;
  imageUrl: FileList | string;
}

function EditModel({
  isOpen,
  onClose,
  contact,
  contactID,
  imageUrl,
}: EditModelProps) {
  const queryClient = useQueryClient();
  const [Load, setLoad] = useState(false);
  const [initialValues, setInitialValues] = useState<EditContactPayload | null>(
    null
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactPayload>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: string; contact: EditContact }) =>
      updateContact(data.id, data.contact),
    onSuccess: (res) => {
      setLoad(false);
      toast.success(res.name + " Contact Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["Contacts"] });
      onClose();
    },
    onError: () => {
      setLoad(false);
      toast.error("Something went wrong!");
      onClose();
    },
  });

  useEffect(() => {
    if (contact) {
      setValue("name", contact.name);
      setValue("email", contact.email);
      setValue("phone", contact.phone);
      setInitialValues({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        imageUrl: imageUrl,
      });
    }
  }, [contact, setValue, imageUrl]);

  const onSubmit = async (data: ContactPayload) => {
    setLoad(true);

    if (
      data.name === initialValues?.name &&
      data.email === initialValues?.email &&
      data.phone === initialValues?.phone &&
      !data.imageUrl[0]
    ) {
      toast.error("No changes made.");
      setLoad(false);
      return;
    }

    let newUrl = imageUrl;
    if (data.imageUrl[0]) {
      await handleDelete(imageUrl, "contact");
      newUrl = await handleImageUpload(data.imageUrl[0], "contact");
    }

    mutate({
      id: contactID,
      contact: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        imageUrl: newUrl,
      },
    });
  };

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-modelTitle text-2xl">Edit Contact</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 p-4">
          <label className="input input-bordered flex items-center gap-2">
            Name :
            <input
              type="text"
              className="grow"
              disabled={isPending || Load}
              {...register("name", { required: "name is required!" })}
            />
          </label>
          {errors.name && (
            <div className="text-red-500 mx-1 my-1">
              {errors.name?.message?.toString()}
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2 mt-4">
            Email :
            <input
              type="text"
              className="grow"
              disabled={isPending || Load}
              {...register("email", {
                required: "email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid email!",
                },
              })}
            />
          </label>
          {errors.email && (
            <div className="text-red-500 mx-1 my-1">
              {errors.email?.message?.toString()}
            </div>
          )}
          <label className="input input-bordered flex items-center gap-2 mt-4">
            Phone :
            <input
              type="text"
              className="grow"
              disabled={isPending || Load}
              {...register("phone", {
                required: "mobile no. is required!",
                pattern: {
                  value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                  message: "Enter valid mobile no.!",
                },
              })}
            />
          </label>
          {errors.phone && (
            <div className="text-red-500 mx-1 my-1">
              {errors.phone?.message?.toString()}
            </div>
          )}
          <label className="flex flex-col gap-2 mt-4">
            <div className="flex items-center gap-8">
              <span className="text-lg font-medium">Old Photo:</span>
              <span className="text-lg font-medium">New Photo:</span>
            </div>
            <div className="flex justify-between items-center gap-4 mt-2">
              {contact?.imageUrl ? (
                <img
                  src={contact.imageUrl}
                  alt="Current Photo"
                  className="w-16 h-16 rounded-full border border-gray-300 pointer-events-none"
                />
              ) : (
                <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
                  No Photo
                </div>
              )}
              <input
                type="file"
                className="border border-gray-300 rounded-md file-input"
                disabled={isPending}
                accept="image/*"
                {...register("imageUrl")}
              />
            </div>
            {errors.imageUrl && (
              <span className="text-red-500 text-sm mt-1">
                {errors.imageUrl.message}
              </span>
            )}
          </label>

          {errors.imageUrl && (
            <div className="text-red-500 mx-1 my-1">
              {errors.imageUrl?.message?.toString()}
            </div>
          )}
          <div className="flex justify-center gap-3 p-1 mt-4">
            <button disabled={isPending || Load}>
              <button
                disabled={isPending || Load}
                onClick={onClose}
                className="btn btn-outline btn-error"
                data-tooltip-id="cancel"
                data-tooltip-content="Cancel"
              >
                Cancel
              </button>
            </button>
            <Tooltip className="tooltip" id="cancel" />
            <button
              type="submit"
              disabled={isPending || Load}
              className="btn btn-outline btn-success"
              data-tooltip-id="done"
              data-tooltip-content="Done"
            >
              {isPending || Load ? (
                <span className="loading loading-dots" />
              ) : (
                "Update"
              )}
            </button>
            <Tooltip className="tooltip" id="done" />
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export default EditModel;
