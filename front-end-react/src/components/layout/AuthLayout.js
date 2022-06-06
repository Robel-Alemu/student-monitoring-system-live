import { Container } from "react-bootstrap"
function AuthLayout(props){

    return(

        <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
      {props.children}
      </div>
    </Container>
    );
}

export default AuthLayout;