# Spades-with-AI

Bare bones Game of Spades implemented in Javascript. This project allows a single human player to play spades against 3 AI. At its current state there is no bidding and the goal of each player is to win as many tricks as possible.

The AI are implemented using a monte carlo search tree which goes through multiple simulations of a game to determine what the best plays is. At its current state AI play is weak as simulations are done by assuming a random card is played as there is no way for a player of knowing if an opponent contains a card of the required suit or not. This however requres many simulations to accurately determine the best play which is quite expensive and increases the runtime to where it is not worth doing the extra simulations. 

To run the code first download the repository then open the index.html file