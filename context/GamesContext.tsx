import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {Game} from "../models/Game";

const API_URL = 'https://mock-game-api-9a408f047f23.herokuapp.com/api/games';
const API_KEY = '01964fa8-f0e5-40fc-a13b-9f5c3a5415f3'; // Replace with your actual API key

const GamesContext = createContext();

const GamesProvider = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [favourites, setFavouritesGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game>();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          'X-API-Key': API_KEY,
        },
      });
      const gamesWithFavouriteField: Game[] = [...response.data.map((game) => {
        return {
          iconURL: game.iconURL,
          title: game.title,
          id: game.id,
          rating: game.rating,
          isFavourite: false
        }
      })];
      setGames(gamesWithFavouriteField);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavourite = async (favouriteGame: Game, isFavourite) => {
    let favGames = [...favourites];
    if(isFavourite) {
      favouriteGame.isFavourite = true;
      favGames.push(favouriteGame);
    } else {
      favGames = [...favGames.filter((game) => game.id !== favouriteGame.id)];
    }

    const currentGames = games;
    games.map((game) => {
      if (game.id === favouriteGame.id) {
        game.isFavourite = isFavourite;
      }
      return game;
    });

    if (currentGame?.id ===favouriteGame.id) {
      const cGame = {...currentGame};
      cGame.isFavourite =  isFavourite;
      setCurrentGame(cGame);
    }

    setFavouritesGames(favGames)
    setGames(currentGames);
  };

  const loadCurrentGame = async (gameId:string) => {
    try {
      const response = await axios.get(`${API_URL}/${gameId}`, {
        headers: {
          'X-API-Key': API_KEY,
        },
      });
      const currentGame = response.data;
      const indexOfFavourite = favourites.findIndex((game) => game.id === currentGame.id);
      if (indexOfFavourite > -1) {
        currentGame.isFavourite = true;
      } else  {
        currentGame.isFavourite = false;
      }
      setCurrentGame(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <GamesContext.Provider value={{ games, favourites,currentGame,handleFavourite,loadCurrentGame }}>
      {children}
    </GamesContext.Provider>
  );
};

export { GamesContext, GamesProvider };