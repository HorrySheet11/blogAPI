import './LogIn.css'

function LogIn({closeModal}){
  return(
    <>
      <h2>LogIn</h2>
      <form action="/log-in" method="post">
        <label>Email: <br /><input type="email" name="email" id="email" required /></label>
        <label>Password: <br /><input type="password" name="password" id="password" /></label>
        <button type="submit">Log In</button>
        <button type="button" onClick={() => closeModal()}>Close</button>
      </form>
    </ >
  )
}

export default LogIn;