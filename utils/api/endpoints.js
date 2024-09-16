import { api } from "./networkClient";

export const postApi = {
  login: async ({ body }) => await api({ endpoint: "/login", method: "POST", body }),
  signUp: async ({ body }) => await api({ endpoint: "/signup", method: "POST", body }),
  ride: async ({ body }) => await api({ endpoint: "/ride", method: "POST", body }),
};

export const getApi = {
  searchRide: async ({ from, to, date }) => await api({ endpoint: `/ride?from=${from}&to=${to}&date=${date}`, method: "GET" }),
};
