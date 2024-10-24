/* eslint-disable no-useless-catch */
import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";



export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
      // console.log("inside createAccount")
      // console.log(email,password,name)
      try {
        // console.log(conf.appwriteUrl, conf.appwriteProjectId)
          const userAccount = await this.account.create(ID.unique(), email, password, name);
          // console.log(userAccount)
          if (userAccount) {
              // Call the login method after account creation
              return this.login({email, password});
          }
          // You can still return the `userAccount` here, but it's better to throw an error if something unexpected happens
          throw new Error('Account creation failed without error.');
      } catch (error) {
          throw error; // Propagate error for the calling function to handle
      }
  }
  
  async login({email, password}) {
      try {
          return await this.account.createEmailSession(email, password); // Perform login
      } catch (error) {
          throw error; // Propagate error for the calling function to handle
      }
  }
  

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


