import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContact, handleDelete } from "../../utils/dataDelete";
import toast from "react-hot-toast";
import { useState } from "react";

interface DeleteModelProps {
  isOpen: boolean;
  onClose: () => void;
  contactID: string;
  imageUrl: string;
}

function DeleteModel({
  isOpen,
  onClose,
  contactID,
  imageUrl,
}: DeleteModelProps) {
  const queryClient = useQueryClient();
  const [Load, setLoad] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: deleteContact,
    onSuccess: (res) => {
      setLoad(!Load);
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["Contacts"] });
      onClose();
    },
    onError: () => {
      toast.error("Something went wrong!");
      onClose();
      // console.log(err);
    },
  });

  const onDelete = async () => {
    // console.log(contactID);
    setLoad(!Load);
    await handleDelete(imageUrl);
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
            disabled={isPending || Load}
          >
            No
          </button>
          <button
            className="btn btn-outline btn-success"
            onClick={onDelete}
            disabled={isPending || Load}
          >
            {isPending || Load ? (
              <span className="loading loading-dots" />
            ) : (
              "Yes"
            )}
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
