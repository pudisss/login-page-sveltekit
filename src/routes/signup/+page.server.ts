import type { PageServerLoad, Actions} from "./$types";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, push, update, get} from "firebase/database";
import * as dotenv from "dotenv";
import { redirect } from "@sveltejs/kit";

dotenv.config();
// Initialize credentials
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);


const checkLogin = async (username: string, email: string, password: string) => {
    const dbRef = ref(getDatabase(app));

    let isLogin = false;

    await get(child(dbRef, `users/`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);
          
          for (const key of keys) {
            if (data[key].email === email) {
                console.log("Already has an account");
                isLogin = true;
            }
          }

          
        

          


        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      
      if (isLogin) {
        return true;
      } else {
        return false;
      }

      
    

      
      
}

const updateUser = async(username: string, email: string, password: string) => {

    const db = getDatabase(app);

    const id = Math.floor(Math.random() * 100000)
    const postData = {
        username: username,
        email: email,
        password: password,
        uid: `uid-${id}`,

    }

    const updates: any = {};
    updates[`/users/user-${username}`] = postData;

    return update(ref(db), updates);


}

export const actions: Actions = {
    signup: async({ request, cookies}) => {
        const formData = await request.formData();

        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Form Validation

        if (username == "") {
            return {
                status: 404,
                error: true,
                errorText: "Please enter your username",
                alreadyHasAnAccount: false,
            }
        }
        if (email == "") {
            return {
                status: 404,
                error: true,
                errorText: "Please enter your email",
                alreadyHasAnAccount: false,
            }
        }
        if (password == "") {
            return {
                status: 404,
                error: true,
                errorText: "Please enter your password",
                alreadyHasAnAccount: false,
            }
        }
        
        if (username.length < 6) {
            return {
                status: 404,
                error: true,
                errorText: "Username needs to be more than 6 characters long",
                alreadyHasAnAccount: false,
            }
        }
        if (password.length < 6) {
            return {
                status: 404,
                error: true,
                errorText: "Password needs to be more than 6 characters long",
                alreadyHasAnAccount: false,
            }

        }
        

        // Check if the email that was input was already in the database or in other words is to check if this user is already our user
        const alreadyLogin = await checkLogin(username, email, password);

        if (alreadyLogin) {
            return {
                status: 404,
                error: true,
                errorText: "",
                
                alreadyHasAnAccount: true,
                
            }
        } 


        // It's time to update some value to the database
        await updateUser(username, email, password);
        const date = new Date();

        date.setHours(date.getHours() + 1);

           
            
        cookies.set("userLogin", crypto.randomUUID(), {
            path: "/",
            expires: date,
        })

        throw redirect(303, "/")




    },
}