import { useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import style from "../styles/authentication.module.css"

const Login = () => {
    const [email,set_email] = useState("");
    const [password, set_password] = useState("");
    const [password_type, set_password_type] = useState('password');
    const router = useRouter();
    
    async function verify_user(){
        const res = await Axios.post('http://localhost:3001/login', {
            email : email,
            password : password
        })

        const data = res.data;
        if(data.user){
            localStorage.setItem('token', data.user);
            console.log("Logged in !!")
            router.push('/list')
        }else{
            console.log("Your credientials are invalid")
        }
    }

    return(
        <div className={style.container}>
            <h1 className={style.heading}>LOGIN</h1>
            <div className={style.form}>
                <input className={style.password_input} onChange={(e)=>{
                    set_email(e.target.value)
                }} type="email" placeholder="email"></input>

                <div className={style.password_div}>
                    <input onChange={(e)=>{
                        set_password(e.target.value)
                    }} type={password_type} placeholder="password"></input>
                    
                    <span className={style.password_span} onClick={()=>{
                        if(password_type==='password'){
                            set_password_type('text')
                        }else{
                            set_password_type('password')
                        }
                    }}>Show</span>
                </div>
                <button onClick={()=>{
                    verify_user();
                }} type="submit">Submit</button>
            </div>

            <p>Not registered?  <a href="./register">Register</a></p>
        </div>
    )
}

export default Login;