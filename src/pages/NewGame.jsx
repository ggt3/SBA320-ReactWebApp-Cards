import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const translation = [
  null,
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
];

export default function NewGame() {
  const [computerDeck, setComputerDeck] = useState([]);
  const [myDeck, setMyDeck] = useState([]);
  const [myCurr, setMyCurr] = useState(null);
  const [myImgURL, setMyImgURL] = useState(
    "https://www.deckofcardsapi.com/static/img/back.png"
  );
  const [compImgURL, setCompImgURL] = useState(
    "https://www.deckofcardsapi.com/static/img/back.png"
  );
  const [compCurr, setCompCurr] = useState(null);
  const [DECK_ID, setDeckID] = useState("");

  async function dealCards(player) {
    try {
      console.log("deck id is ", DECK_ID);
      const response = await fetch(
        `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=26`
      );
      const data = await response.json();
      const cards = data.cards;
      const tempDeck = [];
      cards.map((item) => {
        tempDeck.push(item.code);
      });
      if (player == "computer") {
        setComputerDeck(tempDeck);
      }
      if (player == "player") {
        setMyDeck(tempDeck);
      }
      let compCardString = tempDeck.join(",");

      const seedDeck = await fetch(
        `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/pile/${player}/add/?cards=${compCardString}`
      );

      return;
    } catch (error) {
      console.error(error);
    }
  }
  async function handleClick() {
    try {
      const responsePlayer = await fetch(
        `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/pile/player/draw?count=1`
      );
      const responseComputer = await fetch(
        `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/pile/computer/draw?count=1`
      );

      let [res1, res2] = await Promise.all([responsePlayer, responseComputer]);
      const playerDraw = await res1.json();
      const playerCard = playerDraw.cards[0]; //card obj
      setMyImgURL(playerCard.image);
      const computerDraw = await res2.json();
      const computerCard = computerDraw.cards[0];
      setCompImgURL(computerCard.image);
      console.log("computer", computerCard);
      console.log("player", playerCard);
    } catch (e) {
      console.error("handleclick is erroring at ");
    }
  }

  function calculateWin() {
    if (
      translation.indexOf(playerCard.value) >
      translation.indexOf(computerCard.value)
    ) {
      console.log(
        `You win! their card was ${translation.indexOf(
          computerCard.value
        )} and yours was ${translation.indexOf(playerCard.value)}`
      );
    }
    if (
      translation.indexOf(playerCard.value) <
      translation.indexOf(computerCard.value)
    ) {
      console.log(
        `You lost. their card was ${translation.indexOf(
          computerCard.value
        )} and yours was ${translation.indexOf(playerCard.value)}`
      );
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
      );
      const data = await response.json();
      setDeckID(data.deck_id);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (DECK_ID) {
        await Promise.all([dealCards("computer"), dealCards("player")]);
      }
    };
    fetchData();
  }, [DECK_ID]);

  return (
    <div>
      <Image src={compImgURL} />
      <br />
      Their number of cards: {computerDeck.length} <br />
      <Button onClick={handleClick}>Battle! (Draw Card) </Button>
      <br />
      Your number of cards: {myDeck.length}
      <br />
      <Image src={myImgURL} />
    </div>
  );
}
