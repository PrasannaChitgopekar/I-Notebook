import React,{useState} from "react";
import  {useHistory} from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({email:"",password:""});
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //rsave the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Loggedin Succeffuly","success")
      history.push("/")

    }
    else{
      props.showAlert("Invalid Details","danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note
  };

  return (
    <div className="mt-3" style={{fontSize:"20px"}}>
      <h2 style={{textDecoration: "underline"}}>Login to I-Notebook</h2><br/><br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter-email"
            value={credentials.email}
            onChange={onChange}
          />
        </div><br/>
        <div className="form-group ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter-Password"
            value={credentials.password}
            onChange={onChange}

          />
        </div><br/>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
