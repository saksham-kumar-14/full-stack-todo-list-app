import { useRouter } from 'next/router'
import { useState } from 'react';
import style from "../styles/landing_page.module.css";

const Home=()=>{
  const router = useRouter();

  return(
    <div className={style.container}>
      This is the home . 
      <button className={style.btn} onClick={()=>{
        router.push("./register")
      }}>Register</button>
      <button className={style.btn} onClick={()=>{
        router.push("./login")
      }}>Login</button>
      <button className={style.btn} onClick={()=>{
        router.push("/list")
      }}>See your Lists!</button>

    </div>
  )
}

export default Home;