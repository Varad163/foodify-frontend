import api from "@/lib/axios";

import {
  LoginRequest,
  SignupRequest,
} from "@/types/auth.types";

export const loginUser = async (
  data: LoginRequest
) => {
  const response = await api.post(
    "/api/auth/login",
    data
  );

  return response.data;
};

export const signupUser = async (
  data: SignupRequest
) => {
  const response = await api.post(
    "/api/auth/signup",
    data
  );

  return response.data;
};