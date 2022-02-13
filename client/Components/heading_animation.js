import React, {useState, useEffect} from 'react'; 
import heading_sub_words from './api/heading_sub_words_api';
import style from "../styles/heading_animation.module.css"; 

const HeadingAnimation =() =>{
    const [current_word, set_current_word] = useState(""); 
    const [current_index, set_current_index] = useState(0); 
    const [current_sub_index, set_current_sub_index] = useState(0);
    const [increment, set_increment] = useState(true); 

    const slice_string=(s,stop)=>{
        let result =""; 
        for(let i=0;i<=stop;i++){
            result += s[i]
        }
        return result; 
    }

    useEffect(()=>{

        setTimeout(()=>{
            if(increment){
                if(current_sub_index === heading_sub_words[current_index].length-1){
                    set_increment(false); 
                }else{
                    set_current_sub_index(current_sub_index+1); 
                }
            }else{
                if(current_sub_index === -1){
                    set_increment(true); 
                    if(current_index === heading_sub_words.length-1){
                        set_current_index(0); 
                    }else{
                        set_current_index(current_index+1);
                    }
                }else{
                    set_current_sub_index(current_sub_index-1); 
                }
            }

            set_current_word(slice_string(heading_sub_words[current_index], current_sub_index))
        }, 150)

    })
    
    return(
        <div id={style.heading}>
            <span id={style.heading_span}>
                {current_word}
            </span> 
        </div>
    )
}

export default HeadingAnimation; 