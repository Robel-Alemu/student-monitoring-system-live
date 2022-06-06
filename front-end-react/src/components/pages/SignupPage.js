
import { useHistory } from "react-router-dom";
import Signup from "../authentication/SignUp";
function SignupPage() {
  const history = useHistory();
  function signupHandler(userData) {
    fetch(
      "https://student-monitoring-system-live.herokuapp.com/api/Users",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }
     
     ).then(() => {
      history.push("/");
     });
     
    }
  return (
   
      <Signup onSignup={signupHandler}  />
  
  );
}


export default SignupPage;
