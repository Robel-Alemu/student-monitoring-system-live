import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../AuthContext/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";


import Collapse from 'react-bootstrap/Collapse';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, getUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
const  [loggedIn,setLoggedIn]= useState(false);

const [open, setOpen] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      const user = await getUser(emailRef.current.value);
      if (user.message === 'Account does not exist!'){
        console.log(user.message);
      }
      else{

        // try {
       
        //   const u = await auth.signInWithEmailAndPassword('jwt@gmail.com', '123456')
        //   console.log(u.user.email)
          
        
        //     const user = {
        //         id: 1, 
        //         uid: u.user.uid,
        //         email: u.user.email
        //       }
              
        //         jwt.sign({user}, 'secretkey', { expiresIn: '30000s' }, (err, token) => {
        //           res.json({
        //             token
        //           });
        //         });
             
        //  } catch (error) {
        //      res.sendStatus(403);
             
        //  }
        

        await login(emailRef.current.value, passwordRef.current.value);
        
          // console.log(loggedIn,"outside success")
          localStorage.setItem('name', user.name)
          localStorage.setItem('role', user.role)
        
         localStorage.setItem('email',user.email)
            if (user.role === 'Admin') history.push("/admin");
            else  history.push("/data-encoder");
            
                  console.log(user);
  
          
        }
      
      

     
    } catch {
      setError("failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <AuthLayout>
        <Card >
          <Card.Body>
            <h2 className="text-center mb-4"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-file-lock2-fill" viewBox="0 0 16 16">
  <path d="M7 6a1 1 0 0 1 2 0v1H7V6z"/>
  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0z"/>
</svg> Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}


            <Form onSubmit={handleSubmit}>
              <Form.Group  id="email"> 
                <Form.Label><strong>Email</strong></Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label><strong>Password</strong></Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            {/* <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div> */}
            
          </Card.Body>
          
        </Card>
        <br/>

        <Button className="w-100" variant="outline-primary"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
       <strong>Please click here to get Login information</strong> 
      </Button>
     
      <Collapse in={open}>
      
        <div id="example-collapse-text">
        <br/>
        <Alert variant="info">
    
  <h5>Admin Login</h5>
  <hr />
  
  <p className="mb-0">
  <strong>Email:</strong>  abe@gmail.com<br/>
   <strong>Password:</strong> abebe2372
  </p>
  <hr />
  <h5>Data Encoder Login</h5>
  <hr />
  <p className="mb-0">
  <strong>Email:</strong>  newadataE@gmail.com<br/>
  <strong> Password:</strong> 111111
  </p>
</Alert>
        </div>
      </Collapse>

        
        {/* <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div> */}
      </AuthLayout>
    </>
  );
}
