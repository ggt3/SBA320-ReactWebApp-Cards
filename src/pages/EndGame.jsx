import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'

export default function EndGame() {

  return (
    <div>
      <h1> You Won! </h1>
      <Link to="/newgame">
        <Button> Click to Play Again</Button>
      </Link>
      <br />
      <Link to="/">
        <Button> back to home</Button>
      </Link>
    </div>
  );
}
