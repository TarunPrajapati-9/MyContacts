import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../utils/dataGetter";
import toast from "react-hot-toast";
import Skeleton from "../Loaders/Skeleton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { handleImageUpload } from "../../utils/dataPoster";
import { updateUser } from "../../utils/dataPutter";
import { handleDelete } from "../../utils/dataDelete";

interface ProfileModelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UpdateProfile {
  imageUrl: FileList;
}

function ProfileModel({ isOpen, onClose }: ProfileModelProps) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfile>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [Load, setLoad] = useState(false);
  if (isError) {
    toast.error(`Error in Fetching User Data, Login First! ${error.message}`);
    navigate("/login");
  }
  // console.log("User data: " + data?.imageUrl);
  if (data?.imageUrl) {
    localStorage.setItem("photo", data?.imageUrl);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: string; photo: { imageUrl: string } }) =>
      updateUser(data.id, data.photo),
    onSuccess: () => {
      setLoad(!Load);
      setEdit(!edit);
      toast.success("Profile Image Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      setLoad(!Load);
      console.log(err);
      toast.error(err.message);
    },
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    onClose();
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const toSignUp = () => {
    navigate("/register");
  };

  const onSubmit = async (formData: UpdateProfile) => {
    setLoad(!Load);
    // console.log(data);
    if (data?.imageUrl) {
      await handleDelete(data?.imageUrl, "profile");
    }
    if (formData.imageUrl[0]) {
      const imageUrl = await handleImageUpload(formData.imageUrl[0], "profile");
      // console.log(imageUrl);
      const id = data.id.toString();
      mutate({ id, photo: { imageUrl } });
    }
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
              <div className="flex">
                <div>
                  {data?.imageUrl ? (
                    <img
                      alt="Profile"
                      src={data?.imageUrl}
                      className="w-20 h-20 rounded-full object-cover pointer-events-none"
                    />
                  ) : (
                    <img
                      alt="Profile"
                      src="/assets/icons/profile.svg"
                      className="w-20 h-20"
                    />
                  )}
                </div>
                <div className="p-2 mx-4">
                  <p className="mb-2 text-lg">Username: {data?.username}</p>
                  <p className="mb-4 text-lg">Email: {data?.email}</p>
                </div>
              </div>
              {edit && (
                <form onSubmit={handleSubmit(onSubmit)} className="p-2 my-4">
                  <p className="my-3 font-title">Profile Photo:</p>
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
                        required: "profile image is required!",
                      })}
                    />
                  </label>
                  <div className="flex justify-center">
                    <button
                      className="btn btn-outline btn-info"
                      disabled={isPending || Load}
                    >
                      {isPending || Load ? (
                        <span className="loading loading-dots" />
                      ) : (
                        "Update Image"
                      )}
                    </button>
                  </div>
                </form>
              )}
              <div className="flex gap-4 justify-center mt-2">
                <button
                  className="btn btn-outline btn-error"
                  onClick={handleLogout}
                  disabled={isPending || Load}
                >
                  <img
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    className="w-6 h-6"
                  />
                  Logout
                </button>
                <button
                  className="btn btn-outline btn-success"
                  onClick={handleEdit}
                  disabled={isPending || Load}
                >
                  Edit
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
        <button onClick={onClose} disabled={isPending}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default ProfileModel;
