import React, {useState, useEffect} from "react"
import style from "../styles/greetings.module.css";  

const Greeting=()=>{
    const [greet, set_greet] = useState("");
    const [image, set_image] = useState("");  
    useEffect(()=>{
        const date = new Date(); 
        const hours = date.getHours(); 
        
        if(12>hours && hours>4){
            set_greet("Good Morning");
            set_image("/morning.png"); 
        }
        else if(17>hours && hours>11){
            set_greet("Good Afternoon");
            set_image("/afternoon.png"); 
        }
        else if(20>hours && hours>16){
            set_greet("Good Evening");
            set_image("/evening.png");
        }
        else{
            set_greet("Good Night");
            set_image("/night.png"); 
        }
    }, []) 

    return(
        <>
            <div id={style.greet_div}>
                <span id={style.greet}>{greet}</span>
                <img id={style.image} src={image}></img>
            </div>

            <style jsx>{`  
                div{
                    background-color : ${image === "/morning.png" || image==="/afternoon.png" ? "orange" : "rgb(220,220,220)"}; 
                }
            `}</style>
        </>
    )
}

export default Greeting; 