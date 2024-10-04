//get one deck

const DECK_ID = "9gmi5iiu17eh";
export async function getNewDeck() {
    try {
        const response = await fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count=26 ")
        const data = await response.json();
        const DECK_ID = data.deck_id
        //add the 26 cards to player one pile
        const cards = data.cards
        cards.map((item) => {
            item.code
        })
        return 
    } catch(error) {
        console.error(error)
    }
}


//shuffle cards
//