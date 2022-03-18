import { api } from "./api";

export const login = async (address: string) => {
  console.log(address);
  return await api.post(`/api/user/login/${address}`).then((res) => {
    console.log(res);
  });
};
