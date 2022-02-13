import React, { useState } from "react";
import style from "../styles/todo_styles.module.css"; 
import Axios from "axios";
import jwt from 'jsonwebtoken';

const Todos = ({ user_info , set_user_info }) =>{
    const [current_todo, set_current_todo] = useState(""); 
    const [edit, set_edit] = useState(false);
    const [edit_index, set_edit_index] = useState(-1);
    const [edited_name, set_edited_name] = useState("");

    function add_todo(){
        let new_user_info = {};
        new_user_info["name"] = user_info["name"]
        new_user_info["age"] = user_info["age"]
        new_user_info["todos"] = user_info["todos"]
        new_user_info["email"] = user_info["email"]

        new_user_info["todos"].push({
            "name" : current_todo,
            "completed" : false
        })

        set_user_info(new_user_info);
        Axios.post('http://localhost:3001/updateUser',{
            email : new_user_info["email"],
            todos : new_user_info["todos"]
        }).then((res)=>{
            console.log("Database updated!")
        })

        const token = jwt.sign({
            email : user_info["email"],
            name : user_info["name"],
            age : user_info["age"],
            todos : user_info["todos"]
        }, 'secret')
        localStorage.setItem('token',token)
    }

    function handle_deletion(index){
        let new_user_info = {};
        new_user_info["name"] = user_info["name"]
        new_user_info["age"] = user_info["age"]
        new_user_info["todos"] = []
        new_user_info["email"] = user_info["email"]

        user_info["todos"].map((e,ind)=>{
            if(ind!==index){
                new_user_info["todos"].push(e)
            }
        })

        set_user_info(new_user_info);
        Axios.post('http://localhost:3001/updateUser',{
            email : new_user_info["email"],
            todos : new_user_info["todos"]
        }).then((res)=>{
            console.log("Delted!")
        })

        const token = jwt.sign({
            email : new_user_info["email"],
            name : new_user_info["name"],
            age : new_user_info["age"],
            todos : new_user_info["todos"]
        }, 'secret')
        localStorage.setItem('token',token)
    }

    function handle_completion(index){
        let new_user_info = {};
        new_user_info["name"] = user_info["name"]
        new_user_info["age"] = user_info["age"]
        new_user_info["todos"] = []
        new_user_info["email"] = user_info["email"]

        user_info["todos"].map((e,ind)=>{
            if(ind===index){
                e["completed"] = true
            }
            new_user_info["todos"].push(e)
        })

        set_user_info(new_user_info);
        Axios.post('http://localhost:3001/updateUser',{
            email : new_user_info["email"],
            todos : new_user_info["todos"]
        }).then((res)=>{
            console.log("Database updated!")
        })

        const token = jwt.sign({
            email : user_info["email"],
            name : user_info["name"],
            age : user_info["age"],
            todos : user_info["todos"]
        }, 'secret')
        localStorage.setItem('token',token)
    }

    function handle_edition(){
        let new_user_info = {};
        new_user_info["name"] = user_info["name"]
        new_user_info["age"] = user_info["age"]
        new_user_info["todos"] = []
        new_user_info["email"] = user_info["email"]

        user_info["todos"].map((e,index)=>{
            if(index===edit_index){
                e["name"] = edited_name
                e["completed"] = false
            }
            new_user_info["todos"].push(e)
        })

        set_user_info(new_user_info);
        Axios.post('http://localhost:3001/updateUser',{
            email : new_user_info["email"],
            todos : new_user_info["todos"]
        }).then((res)=>{
            console.log("Database updated!")
        })

        set_edited_name("");
        set_edit(false)

        const token = jwt.sign({
            email : user_info["email"],
            name : user_info["name"],
            age : user_info["age"],
            todos : user_info["todos"]
        }, 'secret')
        localStorage.setItem('token',token)
    }

    return(
        <div id={style.todo_list_div}>
            <div id={style.main_div}>

            <h1 id={edit?style.edit_heading:style.heading}>Todos</h1>
            <div id={edit?style.edit_create_div:style.create_div}>
                <input id={style.create_todo_input} onChange={(e)=>{
                    set_current_todo(e.target.value)     
                }} type="text"/>
                <button id={style.create_btn} onClick={()=>{
                    add_todo()
                }}>Create</button> 
            </div>

            <div id={edit?style.edit_todos_list:style.todos_list}>
                {user_info["todos"].map((e, index)=>{
                    return(
                        <>
                        <div className={style.todo}>
                            <button className={style.delete_btn} onClick={()=>{
                                handle_completion(index)
                            }}><img className={style.done_img} src="/completed.png" /></button>
                            <span className={e.completed?style.completed_todo_name:style.todo_name}> {e.name} </span>  
                            <button className={style.done_btn} onClick={()=>{
                                handle_deletion(index)
                            }}><img className={style.delete_img} src="/delete.png"/></button>
                            <button className={style.edit_btn} onClick={()=>{
                                set_edit_index(index)
                                set_edit(true)
                            }}>
                                Edit 
                            </button>
                        </div>

                        </>
                    )
                })}
            </div>

            </div>

            {edit &&
                <div className={style.edit_div}>
                    <div className={style.edit_sub_div}>
                        <input onChange={(e)=>{
                            set_edited_name(e.target.value)
                        }} placeholder="New Task"></input>
                        <button className={style.edit_submit_btn} onClick={()=>{
                            handle_edition();
                        }}>Submit</button>
                        <button className={style.edit_cancel_btn} onClick={()=>{
                            set_edit(false)
                        }}>Cancel</button>
                    </div>
                </div>
            }
        
        </div>
    )
}

export default Todos; 