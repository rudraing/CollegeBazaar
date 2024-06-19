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
            
        // console.log(conf.appwriteUrl === 'https://cloud.appwrite.io/v1');
        // console.log(conf.appwriteProjectId === '66711aa800050aac80a3');
        // console.log(conf.appwriteCollectionId === '667121bf000579badf8e');
        // console.log(conf.appwriteBucketId === '667122c900374413a943');
        // console.log(conf.appwriteDatabaseId === '6671219600366a290852');
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log(userAccount)
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    

    async getCurrentUser() {
        try {
            console.log('Fetching current user...');
            const user = await this.account.get();
            console.log('Current user:', user);
            return user;
        } catch (error) {
            console.error('Appwrite service :: getCurrentUser :: error', error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Appwrite service :: logout :: error', error);
        }
    }
}

const authService = new AuthService();

export default authService;
