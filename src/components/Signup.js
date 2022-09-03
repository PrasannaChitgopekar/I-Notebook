import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
    //rsave the auth token and redirect
    localStorage.setItem("token", json.authtoken);
    history.push("/");
    props.showAlert("Account Created Successfully","success")

    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note
  };

  return (
    <div className="my-3" style={{fontSize:"20px"}}>
      <h2 style={{textDecoration: "underline"}}>Create an Account </h2><br/><br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nae">User Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            placeholder="Enter user name"
            onChange={onChange}
            name="name"
          />
        </div><br/>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
            name="email"
          />
        </div><br/>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={onChange}
            name="password"
            required
            minLength={5}
          />
        </div><br/>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="confirm password"
            onChange={onChange}
            name="cpassword"
            required
            minLength={5}
          />
        </div><br/>

        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
