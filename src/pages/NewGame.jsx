import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const translation = [
  null,
  null,
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
  "ACE"
];

export default function NewGame() {
  const [computerDeckNum, setComputerDeckNum] = useState(26);
  const [myDeckNum, setMyDeckNum] = useState(26);
  const [numBattles, setNumBattles] = useState(0);
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
      console.log("deck id is ", DECK_ID, "for the ", player);
      const response = await fetch(
        `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=26`
      );
      const data = await response.json();
      console.log(`${player} cards:`, data.cards);
      const cards = data.cards;
      const tempDeck = [];
      cards.map((item) => {
        tempDeck.push(item.code);
      });
      let compCardString = tempDeck.join(",");

      return await fetch(
        `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/pile/${player}/add/?cards=${compCardString}`
      );
    } catch (error) {
      console.error(error.message);
    }
  }
  async function handleClick() {
    try {
      const responsePlayer = await fetch(
        `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/pile/player/draw/bottom/?count=1`
      );
      const responseComputer = await fetch(
        `https://www.deckofcardsapi.com/api/deck/${DECK_ID}/pile/computer/draw/bottom/?count=1`
      );

      let [res1, res2] = await Promise.all([responsePlayer, responseComputer]);
      const playerDraw = await res1.json();
      const playerCard = playerDraw.cards[0]; //card obj
      setMyImgURL(playerCard.image);
      const computerDraw = await res2.json();
      const computerCard = computerDraw.cards[0];
      setCompImgURL(computerCard.image);
      setNumBattles(numBattles + 1);
      calculateWin(playerCard, computerCard);
      //   console.log("computer", computerCard);
      //   console.log("player", playerCard);
    } catch (e) {
      console.log("handleclick is erroring at ", e.message);
    }
  }

  function calculateWin(playerCard, computerCard) {
    if (myDeckNum||computerDeckNum ===27) {
        return(<h1>YOU WIN THE WAR</h1>)
    }
    if (
      translation.indexOf(playerCard.value) >
      translation.indexOf(computerCard.value)
    ) {
      console.log(
        `You win! their card was ${translation.indexOf(
          computerCard.value
        )} and yours was ${translation.indexOf(playerCard.value)}`
      );
      
      giveCards("player",[playerCard.code,computerCard.code])
      setMyDeckNum(myDeckNum+1)
      setComputerDeckNum(computerDeckNum-1)
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
      giveCards("computer",[playerCard.code,computerCard.code])
      setMyDeckNum(myDeckNum-1)
      setComputerDeckNum(computerDeckNum+1)
    }

  }
  async function giveCards(player, cards) {
    let compCardString = cards.join(",");
    console.log("giving cards ",compCardString)
    return await fetch(`https://www.deckofcardsapi.com/api/deck/${DECK_ID}/pile/${player}/add/?cards=${compCardString}`)
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
      Their number of cards: {computerDeckNum} <br />
      <Button onClick={handleClick}>Battle! (Draw Card) </Button>
      <br />
      Total times battled: {numBattles}
      <br />
      Your number of cards: {myDeckNum}
      <br />
      <Image src={myImgURL} />
    </div>
  );
}
