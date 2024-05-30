import axios from "axios";
import supabase from "./supabase";
import toast from "react-hot-toast";

export async function deleteContact(id: string) {
  console.log(id);
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No token found");
  }

  const { data } = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/contacts/${id}`,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_HEADER_SECRET,
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(data);
  return data;
}

export async function handleDelete(url: string) {
  const prevFileName = url.split("/")[url.split("/").length - 1];
  // console.log("Image URL : " + imageUrl);
  // console.log("FILE: " + prevFileName);
  await supabase.storage
    .from("contact-images")
    .remove([prevFileName])
    .then(() => {
      toast.success("Image Deleted Successfully");
    })
    .catch((error) => {
      toast.error("Image Deletion Failed!" + error);
    });
}
