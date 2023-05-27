import request from "../utils/request";

export const userLogin = (phone) => {
  return request('GET', '/auth/login', { phone })
}
