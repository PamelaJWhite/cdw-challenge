//external imports
import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
//internal imports
import { db } from "../firebase"
import "./styles.css";

//props need types
//interface that sets the types of the props
interface Props {
  usernameInput: string | number;
  setUsernameInput: React.Dispatch<React.SetStateAction<string | number>>; //this is copied from setTodo where it was defined; hover and get all 
  setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
}

const InputField = ({ usernameInput, setUsernameInput, setUpdatePage }: Props) => {
  //state for data coming in
  const [data, setData] = useState({
    updated: false,
    name: "",
    repos: 0,
    gists: 0,
    followers: 0,
    following: 0,
    created: ""
  })
  //state for managing success/ error messages
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(false)
  
  //----------DISPLAY SUCCESS OR ERROR MESSAGE
  const displayMessage = () =>{
    if(message){
      return `Success: user ${usernameInput} added to the db.`
    }
    else if(error){
      return `Error: error adding ${usernameInput} to the db.`
    }
  }
  //----------SEND INFO TO DB
  const usersCollectionRef = collection(db, "users")
  const sendUser = async () => {
    await addDoc(usersCollectionRef, {username: usernameInput, name: data.name, repos: data.repos, gists: data.gists, followers: data.followers, following: data.following, created: data.created })
  }

  //---------GET A USER FROM GITHUB API-------

  //function to reach github API
  const makeAPIcall = () => {

    fetch("https://api.github.com/users/" + usernameInput)
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        //convert date
        let date = res.created_at.slice(0,10)
        let day = date.slice(8)
        let month = date.substr(5, 2)
        let year = date.substr(0,4)
        date = `${month}/${day}/${year}`
        let copy = {...data}
        copy.updated = true;
        copy.name = res.name;
        copy.repos = res.public_repos;
        copy.gists = res.public_gists;
        copy.followers = res.followers;
        copy.following = res.following;
        copy.created = date;
        setData(copy)
        setMessage(true)
      })
      .catch(err => setError(err))
  };

  //When data have been updated, send them to the DB and set state to update page
  useEffect(() => {
    if(data.updated === true){
      console.log("ready to send")
      sendUser()
      setUpdatePage(true)
    }
  }, [data.name])

  //---------HANDLE SUBMIT ON ENTER KEY
  
  useEffect(() => {
  
    const keyDownHandler = (event: any) => {

      if (event.key === "Enter") {
        event.preventDefault();
        makeAPIcall();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [usernameInput]);

  return (
    <form className="inputForm">
      <input
        className="inputForm_input"
        type="text"
        placeholder="Enter Gituhub Username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      ></input>
      <h5 className="successMessage">{displayMessage()}</h5>
    </form>
  );
};

export default InputField;
