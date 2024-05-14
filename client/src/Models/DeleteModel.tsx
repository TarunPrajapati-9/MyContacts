interface DeleteModelProps {
  isOpen: boolean;
  onClose: () => void;
}

function DeleteModel({ isOpen, onClose }: DeleteModelProps) {
  const onDelete = () => {
    console.log("Deleted Successfully!");
    onClose();
  };
  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-modelTitle text-2xl">Delete Contact</h3>
        <p className="py-4 text-center text-lg">
          Are you sure you want to delete this contact?
        </p>
        <div className="flex gap-4 justify-center">
          <button className="btn btn-outline btn-error" onClick={onClose}>
            No
          </button>
          <button className="btn btn-outline btn-success" onClick={onDelete}>
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
