# SBA320-ReactWebApp-Cards
 war, the card game web app

[Netlify link](https://cardwars-sba320.netlify.app/)

A project created using the [Deck API](https://www.deckofcardsapi.com/). I thought it would be fun to make a card game to play on the web, though I fear I made something simple incredibly complicated, but I was in too deep.

##### Technologies used: React, React-Bootstrap


Explanations of the approach taken.

#### Learning Moments
* the await keyword was very crucial before my drawCards function because I needed to wait for an api call to finish before I called the next one. I was doing Promise.all, but that caused the request to be sent to the api at the same time and it caused some side effects where my deck was getting seeded incorrectly
* learned how to conditionally render a component based on state (isGameOver)
* how to pass and use a function from props

#### Unsolved problems:
* Currently have an issue with seeding the decks. Assuming I can create the two piles ("player" and "computer") appropriately in the API (by manually checking the console), then I can "play the game" appropriately and move cards around to each hand depending on the winner when clicking "battle!". 
* I have not implemented an important feature of war which is what happends when the cards ties in value
