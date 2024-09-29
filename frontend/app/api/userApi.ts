import { setCookie } from "cookies-next";
import axiosInstance from "./axiosClient";
import {
  userSigninSchema,
  userSignupSchema,
} from "@/lib/validations/user-validation";

export async function SignInUser(user: typeof userSigninSchema) {
  const response = await axiosInstance.post(`/user/signin`, user);
  setCookie("token", response.data.token as unknown as string);
  return response;
}

export async function SignUpUser(user: typeof userSignupSchema) {
  const response = await axiosInstance.post(`/user/signup`, user);
  setCookie("token", response.data.token as unknown as string);
  return response;
}

export async function GetUser(token: string) {
  try {
    const response = await axiosInstance.get(`/user/profile`, {
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
