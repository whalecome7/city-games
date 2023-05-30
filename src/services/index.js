import request from "../utils/request";

export const userLogin = (phone) => {
  return request('GET', '/auth/login', { phone })
}

export const updateResidentType = (resident_type) => {
  return request('GET', '/user/updateResidentType', { resident_type })
}

export const me = () => {
  return request('GET', '/auth/me')
}

export const getTodayScenicData = () => {
  return request('GET', '/scenicSpots/today-list')
}

export const userPunchIn = (sid) => {
  return request('GET', '/scenicSpots/punchIn', { sid })
}

export const getUserLotteryInfo = () => {
  return request('GET', '/lottery/info')
}

export const openUserLottery = () => {
  return request('GET', '/lottery/open')
}

export const getPrizeInfo = () => {
  return request('GET', '/lottery/getPrizeLogs')
}

export const getUserPunchInLogs = () => {
  return request('GET', '/scenicSpots/getUserPunchInLogs')
}
