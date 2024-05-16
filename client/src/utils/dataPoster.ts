import axios from "axios";
import { CreateContact } from "../components/Models/CreateContact";

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
