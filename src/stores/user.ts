import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')

  const isFromLogin = ref(false)

  function updateToken(val: string) {
    token.value = val
    localStorage.setItem('token', val)
  }

  function updateIsFromLogin(val: boolean) {
    isFromLogin.value = val
  }

  return { token, updateToken, isFromLogin, updateIsFromLogin }
})
