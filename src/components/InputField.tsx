import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase"
import "./styles.css";

//all the props we bring in need types
//so create an interface that sets the types of the props
interface Props {
  usernameInput: string | number;
  setUsernameInput: React.Dispatch<React.SetStateAction<string | number>>; //this is copied from setTodo where it was defined; hover and get all 
  setUpdatePage: React.Dispatch<React.SetStateAction<boolean>>
}

const InputField = ({ usernameInput, setUsernameInput, setUpdatePage }: Props) => {
  // console.log("username: ", usernameInput)
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
    // console.log("do you want me to call your mother? usernameInput: ", usernameInput)
  
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

  useEffect(() => {
    if(data.updated === true){
      console.log("ready to send")
      sendUser()
      setUpdatePage(true)
    }
    
  }, [data.name])


  //use effect to handle submit on enter key
  useEffect(() => {
    // console.log("Where's my username? outside keydown: ", usernameInput)

    const keyDownHandler = (event: any) => {
      // console.log("User pressed: ", event.key);
      // console.log("Where's my username? outside if: ", usernameInput)


      if (event.key === "Enter") {
        event.preventDefault();
        // console.log("Where's my username?: ", usernameInput)

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
      <h6 className="successMessage">{displayMessage()}</h6>
    </form>
  );
};

export default InputField;
