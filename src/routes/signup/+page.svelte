<script lang="ts">
    import type { ActionData } from "./$types"; 
    import { enhance } from "$app/forms";

    // Function
    const revealPassword = () => {
    const revealPasswordButton = document.getElementById("reveal-password-icon");
    const passwordInput = document.getElementById("password-input") as HTMLInputElement;    

    revealPasswordButton?.addEventListener("click", () => {
        if (passwordInput?.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });


    };

    export let form: ActionData;


</script>
<style lang="scss">
    .login-section-page {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(90deg, #FEDCC5 0%, #FEDDC6 100%);
        display: flex;
        align-items: center;
        

        .background-image {
            width: 100vw;
            height: 100vh;
            z-index: 1;
            position: absolute;
            object-fit: cover;
        }
        .login-container {
            z-index: 2;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 40px;
            backdrop-filter: blur(15px);
            margin-left: 5.5rem;
            padding-left: 4.5rem;
            padding-right: 4.5rem;
            padding-top: 2.5rem;
            padding-top: 2.5rem;
            
            width: 30%;
            height: 80%;
            
            
            

            .logo {
                align-self: flex-start;
                color: #F25019;
                font-size: 24px;
                font-weight: 700;
                
            }
            .header {
                align-self: flex-start;
                font-size: 38px;
                font-weight: 700;
                color: #2A1E17;
                margin-top:1.5rem;
            }
            .form {
                display: flex;
                flex-flow: column nowrap;
                
                margin-top: 1.5rem;
                width: 80%;

                label {
                    font-size: 14px;
                    font-weight: 400;
                    color: #2A1E17;
                }
                

                
            }
            .email-input-container{
                margin-top: 1rem;
                margin-bottom: 1rem;
                height: 50px;
                background-color: rgba(255, 255, 255, 1);
                border-radius: 5px;
                border: none;
                
                display: flex;
                align-items: center;

                input {
                    border: none;
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    padding: 0px 1rem 0px 1rem;
                }

                ::placeholder {
                    font-size: 14px;
                    font-weight: 400;
                    color: #BCBEC0;
                }
            }
            .password-input-container {
                @extend .email-input-container;
                .reveal-password-icon {
                    margin-right: 1rem;
                    cursor: pointer;
                }
            }
            .username-input-container {
                @extend .email-input-container;
            }
            .forgot-password {
                margin-top: 0.5rem;
                font-size: 15px;
                font-weight: 400;
                color: #2A1E17;
                text-decoration: none;
                transition: 0.3s ease-in;
                
            }
            .signin-button {
                background-color: #F25019;
                height: 50px;
                border: none;
                border-radius: 5px;
                font-size: 20px;
                font-weight: 700;
                color: white;
                margin-top: 3.5rem;
                cursor: pointer;
                transition: 0.3s ease-in;
                
                
            }
            .signin-button:hover {
                border: 2px solid #F25019;
                background-color: white;
                color: #F25019;
            }
            .errortext {
                font-size: 14px;
                font-weight: 600;
                color: red;
            }
            .alreadyhasaccount {
                font-size: 16px;
                font-weight: 600;
                color: black;
            }
            .no-account {
                margin-top: 3.5rem;
                font-size: 14px;
                font-weight: 400;
                color: #2A1E17;

                a {
                    font-size: 14px;
                    font-weight: 600;
                    color: #2A1E17;
                    text-decoration: none;
                }
            }
        }
    }

</style>


<section class="login-section-page">
    <img src="background.svg" alt="" class="background-image">
    <div class="login-container">
        <h3 class="logo">Your Logo</h3>
        <h2 class="header">Signup</h2>

        <form action="?/signup" class="form" method="POST" use:enhance>
            <label for="">Username</label>
            <div class="username-input-container">
                <input type="text" class="username-input" placeholder="username" name="username">
            </div>

            <label for="">Email</label>
            <div class="email-input-container">
                <input type="email" class="email-input" placeholder="username@gmail.com" name="email">
            </div>
        
            <label for="">Password</label>
            <div class="password-input-container">
                <input type="password" class="password-input" placeholder="Password" name="password" id="password-input">
                <img src="show-password-icon.svg" class="reveal-password-icon" id="reveal-password-icon" on:click={revealPassword} alt="">
            </div>

            {#if form?.error}
                {#if form?.alreadyHasAnAccount}
                    <p class="alreadyhasaccount">You already have an account. <a href="/login">Please sign in here</a></p>
                    
                {/if}
                <p class="errortext">{form?.errorText}</p>
            {/if}
            
            
            
            <a href="#" class="forgot-password">Forgot password?</a>
            <button class="signin-button">Sign in</button>

            <p class="no-account">Already have an account? <a href="/login">Signin for Free</a></p>
        </form>

    </div>

</section>

