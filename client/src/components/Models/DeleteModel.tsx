import { useMutation } from "@tanstack/react-query";
import { deleteContact } from "../../utils/dataDelete";
import toast from "react-hot-toast";
interface DeleteModelProps {
  isOpen: boolean;
  onClose: () => void;
  contactID: string;
}

function DeleteModel({ isOpen, onClose, contactID }: DeleteModelProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteContact,
    onSuccess: (res) => {
      toast.success(res.message);
      onClose();
    },
    onError: () => {
      toast.error("Something went wrong!");
      onClose();
      // console.log(err);
    },
  });
  const onDelete = () => {
    console.log(contactID);
    mutate(contactID);
  };
  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-modelTitle text-2xl">Delete Contact</h3>
        <p className="py-4 text-center text-lg">
          Are you sure you want to delete this contact?
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="btn btn-outline btn-error"
            onClick={onClose}
            disabled={isPending}
          >
            No
          </button>
          <button
            className="btn btn-outline btn-success"
            onClick={onDelete}
            disabled={isPending}
          >
            Yes
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export default DeleteModel;
