import React, { useState, useEffect } from "react";

import "./App.css";

import InputField from "./components/InputField";
import UserList from "./components/UserList";
import UserType  from "./types/userType"

//give App type React.FC, functional component
const App: React.FC = () => {
  //state for username being entered
  const [usernameInput, setUsernameInput] = useState<string |number>('')
  const [updatePage, setUpdatePage] = useState<boolean>(false)



  return (
      <div className="App">
        <InputField
          usernameInput={usernameInput}
          setUsernameInput={setUsernameInput}
          setUpdatePage={setUpdatePage}
        />
        <UserList
          usernameInput={usernameInput}
          updatePage = {updatePage}
      
        />
      </div>
  );
};

export default App;
