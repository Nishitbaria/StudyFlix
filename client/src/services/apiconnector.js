/** @format */

import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, data, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodydata ? bodydata : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
