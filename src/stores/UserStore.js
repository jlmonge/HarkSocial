import { defineStore } from 'pinia'


export const userStore = defineStore("main",{
  state: () => ({
    isLoggedIn: false,
    email: 'email',
    userID: -1,
  }),

  getters: {
    getEmail: (state)=> {
      console.log(email);
    }
  },

  actions: {
    logOut() {
      this.isLoggedIn = false;
      this.email = 'email';
      this.userID = '-1';
      console.log(this.isLoggedIn + ','+this.email+','+this.userID +'\nLog Out Pinia success');
    },

    storeUser(isLog,mail,ID){
      this.isLoggedIn = isLog;
      this.email = mail;
      this.userID = ID;
      console.log(this.isLoggedIn + ','+this.email+','+this.userID +'\nStore user Pinia success');
    },

  }

})