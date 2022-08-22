import { defineStore } from 'pinia'


export const userStore = defineStore("main",{
  state: () => ({
    isLoggedIn: false,
    email: undefined,
    uuid: undefined,
    isAdmin: false,
  }),

  getters: {
    getEmail: (state)=> {
      console.log(email);
    }
  },

  actions: {
    logOut() {
      this.isLoggedIn = false;
      this.email = undefined;
      this.userID = undefined;
      console.log(this.isLoggedIn + ','+this.email+','+this.userID +'\nLog Out Pinia success');
    },
    printMessage(){
      // console.log("Pinia test")
      console.log('Login:'+ this.isLoggedIn + '  |  email: ' + this.email+ '  |  uid: ' + this.userID + ' |  isAdmin:'  + this.isAdmin  + '\n');
    },

    storeUser(isLog,mail,ID){
      this.isLoggedIn = isLog;
      this.email = mail;
      this.userID = ID;
      console.log(this.isLoggedIn + ','+this.email+','+this.uuid +'\nStore user Pinia success');
    },

  }

})