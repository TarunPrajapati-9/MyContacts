import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../utils/dataGetter";
import toast from "react-hot-toast";
import Skeleton from "../Loaders/Skeleton";

interface ProfileModelProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProfileModel({ isOpen, onClose }: ProfileModelProps) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isError) {
    toast.error(`Error in Fetching User Data, Login First! ${error.message}`);
    navigate("/login");
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    onClose();
  };

  const toSignUp = () => {
    navigate("/register");
  };

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-modelTitle text-2xl mb-4">Your Profile</h3>
        {auth ? (
          isLoading ? (
            <Skeleton />
          ) : (
            <>
              <p className="mb-2 text-lg">Username: {data?.username}</p>
              <p className="mb-4 text-lg">Email: {data?.email}</p>
              <div className="flex gap-4 justify-center">
                <button className="btn" onClick={handleLogout}>
                  <img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    className="w-6 h-6"
                  />
                  Logout
                </button>
              </div>
            </>
          )
        ) : (
          <div className="flex justify-between items-center">
            <p className="mb-2 text-lg">Kindly Login First!</p>
            <button
              className="btn btn-outline btn-info mx-4 w-36"
              onClick={toSignUp}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export default ProfileModel;
