import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";
import { Contact } from "../ContactCard";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateContact } from "../../utils/dataPutter";

interface EditModelProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  contactID: string;
}

function EditModel({ isOpen, onClose, contact, contactID }: EditModelProps) {
  const { register, handleSubmit, setValue } = useForm<Contact>();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: string; contact: Contact }) =>
      updateContact(data.id, data.contact),
    onSuccess: (res) => {
      toast.success(res.name + " Updated Successfully");
      onClose();
    },
    onError: () => {
      toast.error("Something went wrong!");
      onClose();
      // console.log(err);
    },
  });

  useEffect(() => {
    if (contact) {
      setValue("name", contact.name);
      setValue("email", contact.email);
      setValue("phone", contact.phone);
    }
  }, [contact, setValue]);

  const onSubmit = (data: Contact) => {
    mutate({ id: contactID, contact: data });
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
              disabled={isPending}
              {...register("name")}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-4">
            Email :
            <input
              type="text"
              className="grow"
              disabled={isPending}
              {...register("email")}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-4">
            Phone :
            <input
              type="text"
              className="grow"
              disabled={isPending}
              {...register("phone")}
            />
          </label>
          <div className="flex justify-center gap-3 p-1 mt-4">
            <button disabled={isPending}>
              <img
                src="/assets/icons/cancel.svg"
                alt="cancel"
                className="w-10 h-10 cursor-pointer hover:opacity-70"
                data-tooltip-id="cancel"
                data-tooltip-content="Cancel"
                onClick={onClose}
              />
            </button>
            <Tooltip className="tooltip" id="cancel" />
            <button type="submit" disabled={isPending}>
              <img
                src="/assets/icons/done.svg"
                alt="done"
                className="w-10 h-10 cursor-pointer hover:opacity-70"
                data-tooltip-id="done"
                data-tooltip-content="Done"
              />
              <Tooltip className="tooltip" id="done" />
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

export default EditModel;
