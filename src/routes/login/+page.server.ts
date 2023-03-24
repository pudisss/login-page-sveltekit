import type { PageServerLoad, Actions } from "./$types";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, push, update, get} from "firebase/database";
import { redirect } from "@sveltejs/kit"; 

import * as dotenv from "dotenv";

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



export const actions: Actions = {
    login: async({ request, cookies, locals}) => {
        const formData = await request.formData();

        // Data
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;


        // Form validation
        if (email === "") {
            return {
                status: 404,
                error: true,
                errorText: "Please enter your email."
            }
        } // If user didn't type any info in the email input
        if (password === "") {
            return {
                status: 404,
                error: true,
                errorText: "Please enter your password",
                email,
            }
        } // If user didn't type any info in the password input

        if (password.length < 6) {
            return {
                status: 404,
                error: true,
                errorText: "Your password needs to be more than 6 characters in length",
                email,
            }
        }// Check the length of the password

    
        // Read data from the database
        const dbRef = ref(getDatabase(app));
        let login = false;
        let reasonFailedLogin = "";

        await get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const keys = Object.keys(data);

                for (const key of keys) {
                    if (data[key].email === email) {
                        if (data[key].password === password) {
                            login = true;
                        } else if (data[key].password !== password) {
                            login = false;
                            reasonFailedLogin = "password";
                            
                        }
                    }
                }

            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

          if (!login) {
            if (reasonFailedLogin === "password") {
                return {
                    status: 404,
                    error: true,
                    errorText: "Please enter your password again",
                    email,
                }
            }
          } else if (login) {
            const date = new Date();

            date.setHours(date.getHours() + 1);

           
            
            
            
            cookies.set("userLogin", crypto.randomUUID(), {
                path: "/",
                expires: date,
    
                
                
            })
            throw redirect(303, "/");
          }
          

          
          
        

        
    },
}
    

