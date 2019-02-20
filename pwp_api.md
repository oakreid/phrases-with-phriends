# Phrases with Phriends API

### ---Join request via "games:name"---
#### Server Expects:
{} <empty payload>

#### Server Replies (to the player that just joined):
{  
	player:  
	{  
		number: <int, number of player>  
		hand: <list of string, tiles in hand>  
	}  
	join: <string, the name of the game that client just joined>,  
	board: <list of string(?), the board state upon entering the game>,  
	scores: <list of int, player scores in sequential order (i.e. player 1 score in index 0, player 2 score in index 1, etc.)>,  
	turn: <int, the number of the player whose turn it is now>  
}  

### ---Submit request via "submit"---
#### Server Expects:
{  
	word\_value: <int, value of word that was successfully added to the board by the client>,  
	new\_board: <list of string(?), new board state with the word that the client added>,  
	hand: <list of string, tiles that currently remain in the hand of the player who just submitted the word>  
}  

#### Server Replies (to the player that submitted):
{  
	scores: <list of int, player scores in sequential order (i.e. player 1 score in index 0, player 2 score in index 1, etc.)>,  
	player:  
		{  
			number: <int, number of player>  
			hand: <list of string, tiles in hand>  
		}  
	turn: <int, the number of the player whose turn it is now>  
}  

#### Server Broadcasts (to the rest of the players):
{  
	board: <list of string(?), new board state with the word that the submitter added>,  
	scores: <list of int, player scores in sequential order (i.e. player 1 score in index 0, player 2 score in index 1, etc.)>,  
	whose\_turn: <int, the number of the player whose turn it is now>  
}  

### ---Disconnect request via "disconnect"---
#### Server Expects:
{} <empty payload>  

#### Server Replies:
{} <empty payload>  

#### Server Broadcasts (to all players except the one that disconnected):
{  
	scores: <list of int, player scores in sequential order (i.e. player 1 score in index 0, player 2 score in index 1, etc.)>,    
	turn: whose\_turn: <int, the number of the player whose turn it is now, just in case it was the turn of the player who disconnected>  
}  
