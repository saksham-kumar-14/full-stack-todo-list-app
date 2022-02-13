import HeadingAnimation from "../Components/heading_animation";
import Greeting from "../Components/greetings";
import Head from "next/head";
import Todos from "../Components/todo_list"; 
import style from "../styles/Home.module.css"; 
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import { useRouter } from "next/router";
import Axios from "axios";

const List =() =>{
  const router = useRouter();
  const [user_info,set_user_info] = useState();
  const [loggedin, set_loggedin] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      const user = jwt.decode(token);
      console.log(user);
      if(!user){
        console.log('user not found!')
        localStorage.removeItem('token');
        router.push("/login");
      }else {
        set_loggedin(true);
        set_user_info(user);
        console.log(user_info);
        console.log('user found!')
      }
    }else{
      console.log('You are not registered')
      router.push("/login ")
    }
  },[])

  function logout(){
    localStorage.removeItem('token');
    router.push("./login")
  }

  function delete_user(){
    Axios.post("http://localhost:3001/deleteUser" , {
      email : user_info["email"]
    }).then(()=>{
      console.log("User deleted!")
      router.push("./register")
    })
  }

  return(
    <>
    {loggedin ? <div>
      <Head>
        <title>Todo List</title>
      </Head>
      <div id={style.home_div}>
        <div className={style.profile_div}>
          <div className={style.auth_div}>
            <button className={style.logout_btn} onClick={()=>{
              logout()
            }}>
              Logout
            </button>
            <button className={style.delete_user_btn} onClick={()=>{
              delete_user()
            }}>
              Delete User 
            </button>
          </div>
          <div className={style.profile_sub_div}>
            <span className={style.profile_name}>{user_info["name"]} , </span>
            <span className={style.profile_age}>{user_info["age"]}</span>
          </div>
        </div>
        <HeadingAnimation /> 
        <Greeting />  
        <Todos user_info={user_info} set_user_info={set_user_info}/> 
      </div>
    </div> : <div>login first you jerk!</div> }
    
    </>
  )

}

export default List; 