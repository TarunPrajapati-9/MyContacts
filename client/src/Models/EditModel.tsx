import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";
import { Contact } from "../components/ContactCard";

interface EditModelProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

function EditModel({ isOpen, onClose, contact }: EditModelProps) {
  const { register, handleSubmit, setValue } = useForm<Contact>();

  useEffect(() => {
    if (contact) {
      setValue("name", contact.name);
      setValue("email", contact.email);
      setValue("mobile", contact.mobile);
    }
  }, [contact, setValue]);

  const onSubmit = (data: Contact) => {
    console.log(data);
    onClose();
  };

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-modelTitle text-2xl">Edit Contact</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 p-4">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" className="grow" {...register("name")} />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-4">
            Email
            <input type="text" className="grow" {...register("email")} />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-4">
            Phone No.
            <input type="text" className="grow" {...register("mobile")} />
          </label>
          <div className="flex justify-center gap-3 p-1 mt-4">
            <img
              src="/assets/icons/cancel.svg"
              alt="cancel"
              className="w-10 h-10 cursor-pointer hover:opacity-70"
              data-tooltip-id="cancel"
              data-tooltip-content="Cancel"
              onClick={onClose}
            />
            <Tooltip className="tooltip" id="cancel" />
            <button type="submit">
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
