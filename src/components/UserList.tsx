import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import "./styles.css";
interface Props {
  usernameInput: string | number;
  updatePage: boolean
}

const UserList = ({usernameInput, updatePage}: Props) => {
  //----------LOGIC FOR GETTING USERS FROM DB-------------
  //state for data to be read from db
  const [users, setUsers] = useState<any[]>([]);
  //variable to get and store collection
  const usersCollectionRef = collection(db, "users");
  //useEffect to read data
  useEffect(() => {
    const getUsers = async () => {
      //get the docs
      const data = await getDocs(usersCollectionRef);
      // console.log(data)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [updatePage]);
  //---------END LOGIG FOR GETTING USERS FROM DB------------
  
  return (
    <table className="table">
      <thead>
        <tr className="headingRow">
          <th className="tableHeading">
            <h4 className="insideTH firstTH">Username</h4>
          </th>
          <th className="tableHeading">
            <h4 className="insideTH">Name</h4>
          </th>
          <th className="tableHeading">
            <h4 className="insideTH">Repos</h4>
          </th>
          <th className="tableHeading">
            <h4 className="insideTH">Gists</h4>
          </th>
          <th className="tableHeading">
            <h4 className="insideTH">Followers</h4>
          </th>
          <th className="tableHeading">
            <h4 className="insideTH">Following</h4>
          </th>
          <th className="tableHeading">
            <h4 className="insideTH">Created At</h4>
          </th>
        </tr>
      </thead>
      <div className="rowSpacing"></div>
      <tbody>
        {/*  map over users, create tr for each one*/}
        {users.map((user) => {
          return (
            <tr className="tableRow">
              <td>
                {/* need to change this href to the user's github */}
                <a className="insideTD" target="_blank" href={`https://www.github.com/${user.username}`}>
                  { user.username }
                </a>
              </td>
              <td>
                <h4 className="insideTD">{ user.name }</h4>
              </td>
              <td>
                <h4 className="insideTD"> { user.repos }</h4>
              </td>
              <td>
                <h4 className="insideTD">{ user.gists }</h4>
              </td>
              <td>
                <h4 className="insideTD">{ user.followers}</h4>
              </td>
              <td>
                <h4 className="insideTD">{ user.following }</h4>
              </td>
              <td>
                <h4 className="insideTD">{ user.created }</h4>
              </td>
            </tr>
          );
        })}
      </tbody>

      <div className="rowSpacing"></div>
    </table>
  );
};

export default UserList;
