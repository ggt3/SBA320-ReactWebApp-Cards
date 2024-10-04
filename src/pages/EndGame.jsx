import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function EndGame(props) {
  const handleClick = () => {
    props.setIsGameOver(false);
  };

  return (
    <div>
      <h1> Someone won! it only took {props.numBattles} number of battles to win. </h1>
      <Link to="/newgame">
        <Button onClick={handleClick}> Click to Play Again</Button>
      </Link>
      <br />
      <Link to="/">
        <Button> back to home</Button>
      </Link>
    </div>
  );
}
