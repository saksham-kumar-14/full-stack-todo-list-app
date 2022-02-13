import { useState } from "react";
import Axios from "axios";
import style from "../styles/authentication.module.css"
import { useRouter } from "next/router";

const Register = ({ all_users }) => {
    const [name,set_name] = useState("");
    const [age, set_age] = useState(0);
    const [email,set_email] = useState("");
    const [password, set_password] = useState("");
    const [password_type, set_password_type] = useState('password');
    const router = useRouter();

    function create_user(){
        Axios.post('http://localhost:3001/createUser', {
            name: name,
            age: age,
            email: email,
            password: password,
            todos : []
        }).then((res)=>{
            alert("User created!")
            router.push('/login')
        })
    }

    function email_exists(){
        let result = false;
        all_users.map((e)=>{
            if(e['email']===email){ result = true; }
        })
        return result;
    }

    return(
        <div className={style.container}>
            <h1 className={style.heading}>REGISTER</h1>
            <div className={style.form}>
                <input placeholder="Name" type="text" onChange={(e)=>{
                    set_name(e.target.value)
                }} type="text" />
                <input placeholder="Age" type="number" onChange={(e)=>{
                    set_age(e.target.value)
                }}/>
                <input placeholder="email" type="email" onChange={(e)=>{
                    set_email(e.target.value)
                }}/>
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
                    if(!email_exists()){
                        create_user()
                    }else{
                        alert("email already exists! Try to login")
                    }
                }} >Submit</button>
            </div>

            <p>Already registered? <a href="./login">Login</a></p>

        </div>
    )
}

export const getServerSideProps = async () => {
    const res = await fetch('http://localhost:3001/getUsers');
    const data = await res.json();
    
    return{
        props: {
            all_users:data
        }
    }
}

export default Register;