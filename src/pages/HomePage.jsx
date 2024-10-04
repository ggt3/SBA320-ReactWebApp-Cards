import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to a game of War</h1>
      <Link to="/newgame">
        <Button> Click For New Game</Button>
      </Link>
      <br/>
      <Link to="/howto">
        <Button>How To Play</Button>
      </Link>
    </div>
  );
}
