import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  console.log(111, token)
  function updateToken(val) {
    token.value = val
    localStorage.setItem('token', val)
    console.log(222, token)
  }

  return { token, updateToken }
})
