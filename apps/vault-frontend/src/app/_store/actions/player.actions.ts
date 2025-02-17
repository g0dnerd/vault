import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Player } from '@vault/shared';

const TYPE = '[Player/API]';

export enum PlayerActionTypes {
  PLAYER_STORE_FAILURE = `${TYPE} Error`,
  INITIALIZE_ALL_PLAYERS = `${TYPE} Initialize all players`,
  INITIALIZE_PLAYERS_FOR_TOURNAMENT = `${TYPE} Initialize players for tournament`,
  INITIALIZE_PLAYERS_FOR_USER = `${TYPE} Initialize players for user`,
  SET_AVAILABLE_PLAYERS = `${TYPE} Set available players`,
  SET_CURRENT_PLAYER_SELECTED = `${TYPE} Set current player selected`,
  SELECT_PLAYER = `${TYPE} Select player`,
  LOAD_PLAYERS = `${TYPE} Load players`,
  SET_PLAYERS = `${TYPE} Set players`,
  ADD_PLAYER = `${TYPE} Add player`,
  SET_PLAYER = `${TYPE} Set player`,
  UPSERT_PLAYER = `${TYPE} Upsert player`,
  ADD_PLAYERS = `${TYPE} Add players`,
  UPSERT_PLAYERS = `${TYPE} Upsert players`,
  UPDATE_PLAYER = `${TYPE} Update player`,
  UPDATE_PLAYERS = `${TYPE} Update players`,
  MAP_PLAYER = `${TYPE} Map player`,
  MAP_PLAYERS = `${TYPE} Map players`,
  DELETE_PLAYER = `${TYPE} Delete player`,
  DELETE_PLAYERS = `${TYPE} Delete players`,
  DELETE_PLAYERS_BY_PREDICATE = `${TYPE} Delete players By Predicate`,
  CLEAR_PLAYERS = `${TYPE} Clear players`,
  CHECK_IN = `${TYPE} Check in player`,
  CHECK_OUT = `${TYPE} Check out player`,
}

export const playerStoreFailure = createAction(
  PlayerActionTypes.PLAYER_STORE_FAILURE,
  props<{ errorMessage: string }>()
);
export const initializeAllPlayers = createAction(
  PlayerActionTypes.INITIALIZE_ALL_PLAYERS
);
export const initializePlayersForTournament = createAction(
  PlayerActionTypes.INITIALIZE_PLAYERS_FOR_TOURNAMENT,
  props<{ tournamentId: number }>()
);
export const initializePlayersForUser = createAction(
  PlayerActionTypes.INITIALIZE_PLAYERS_FOR_USER
);
export const setAvailablePlayers = createAction(
  PlayerActionTypes.SET_AVAILABLE_PLAYERS,
  props<{ ids: number[] }>()
);
export const setCurrentPlayerSelected = createAction(
  PlayerActionTypes.SET_CURRENT_PLAYER_SELECTED,
  props<{ query: (player: Player) => boolean }>()
);
export const selectPlayer = createAction(
  PlayerActionTypes.SELECT_PLAYER,
  props<{ playerId: number }>()
);
export const loadPlayers = createAction(
  PlayerActionTypes.LOAD_PLAYERS,
  props<{ players: Player[] }>()
);
export const setPlayers = createAction(
  PlayerActionTypes.SET_PLAYERS,
  props<{ players: Player[] }>()
);
export const addPlayer = createAction(
  PlayerActionTypes.ADD_PLAYER,
  props<{ player: Player }>()
);
export const setPlayer = createAction(
  PlayerActionTypes.SET_PLAYER,
  props<{ player: Player }>()
);
export const upsertPlayer = createAction(
  PlayerActionTypes.UPSERT_PLAYER,
  props<{ player: Player }>()
);
export const addPlayers = createAction(
  PlayerActionTypes.ADD_PLAYERS,
  props<{ players: Player[] }>()
);
export const upsertPlayers = createAction(
  PlayerActionTypes.UPSERT_PLAYERS,
  props<{ players: Player[] }>()
);
export const updatePlayer = createAction(
  PlayerActionTypes.UPDATE_PLAYER,
  props<{ update: Update<Player> }>()
);
export const updatePlayers = createAction(
  PlayerActionTypes.UPDATE_PLAYERS,
  props<{ updates: Update<Player>[] }>()
);
export const mapPlayer = createAction(
  PlayerActionTypes.MAP_PLAYER,
  props<{ entityMap: EntityMapOne<Player> }>()
);
export const mapPlayers = createAction(
  PlayerActionTypes.MAP_PLAYERS,
  props<{ entityMap: EntityMap<Player> }>()
);
export const deletePlayer = createAction(
  PlayerActionTypes.DELETE_PLAYER,
  props<{ id: number }>()
);
export const deletePlayers = createAction(
  PlayerActionTypes.DELETE_PLAYERS,
  props<{ ids: number[] }>()
);
export const deletePlayersByPredicate = createAction(
  PlayerActionTypes.DELETE_PLAYERS_BY_PREDICATE,
  props<{ predicate: Predicate<Player> }>()
);
export const clearPlayers = createAction(PlayerActionTypes.CLEAR_PLAYERS);
export const checkIn = createAction(
  PlayerActionTypes.CHECK_IN,
  props<{ id: number }>()
);
export const checkOut = createAction(
  PlayerActionTypes.CHECK_OUT,
  props<{ id: number }>()
);
