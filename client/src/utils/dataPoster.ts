import axios from "axios";
import { CreateContact } from "../components/Models/CreateContact";
import supabase from "./supabase";
import toast from "react-hot-toast";

interface RegisterUser {
  email: string;
  username: string;
  password: string;
}

export async function registerUser(params: RegisterUser) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
    params,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_HEADER_SECRET,
      },
    }
  );
  // console.log(data);
  return data;
}

interface LoginUser {
  email: string;
  password: string;
}
export async function loginUser(params: LoginUser) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
    params,
    {
      headers: {
        "x-api-key": import.meta.env.VITE_HEADER_SECRET,
      },
    }
  );
  // console.log(data);
  return data;
}

export async function createContact(params: CreateContact) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No token found");
  }

  const { data } = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/contacts`,
    params,
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

export async function handleImageUpload(
  file: File,
  type: "profile" | "contact"
) {
  const fileName = file.name
    .replace(/\s+/g, "-")
    .toLowerCase()
    .concat(`-${Date.now()}`);

  const bucketName = type === "profile" ? "profile-images" : "contact-images";

  await supabase.storage
    .from(bucketName)
    .upload(fileName, file)
    .then(() => {
      toast.success("Image uploaded successfully");
    })
    .catch((error) => {
      toast.error("Image upload failed" + error);
    });

  return supabase.storage.from(bucketName).getPublicUrl(fileName).data
    .publicUrl;
}
