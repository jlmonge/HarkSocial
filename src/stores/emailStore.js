import { defineStore } from 'pinia'

export const useEmailStore = defineStore({
  id: 'email',
  state: () => ({
    email: ''
  }),
})
