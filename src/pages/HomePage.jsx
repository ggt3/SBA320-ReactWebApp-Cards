import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to a game of War</h1>
      <Link to="/newgame">
        <Button> Click For New Game</Button>
      </Link>
    </div>
  );
}
