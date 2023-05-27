import request from "../utils/request";

export const userLogin = (phone) => {
  return request('GET', '/auth/login', { phone })
}

export const updateResidentType = (resident_type) => {
  return request('POST', '/user/updateResidentType', { resident_type })
}

export const me = () => {
  return request('GET', '/auth/me')
}
