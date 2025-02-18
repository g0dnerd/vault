import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Player } from '@vault/shared';
import * as PlayerActions from '../actions/player.actions';

export interface PlayerState extends EntityState<Player> {
  selectedPlayerId: number | null;
}

export function selectPlayerId(a: Player): number {
  return a.id;
}

export const playerAdapter: EntityAdapter<Player> = createEntityAdapter<Player>(
  {
    selectId: selectPlayerId,
    sortComparer: false,
  }
);

export const initialState: PlayerState = playerAdapter.getInitialState({
  selectedPlayerId: null,
});

export const playerReducer = createReducer(
  initialState,
  on(PlayerActions.setCurrentPlayerSelected, (state, { query }) => {
    const player = Object.values(state.entities).find(
      (player): player is Player => !!player && query(player)
    );
    return {
      ...state,
      selectedPlayerId: player ? player.id : null,
    };
  }),
  on(PlayerActions.addPlayer, (state, { player }) => {
    return playerAdapter.addOne(player, state);
  }),
  on(PlayerActions.setPlayer, (state, { player }) => {
    return playerAdapter.setOne(player, state);
  }),
  on(PlayerActions.upsertPlayer, (state, { player }) => {
    return playerAdapter.upsertOne(player, state);
  }),
  on(PlayerActions.addPlayers, (state, { players }) => {
    return playerAdapter.addMany(players, state);
  }),
  on(PlayerActions.upsertPlayers, (state, { players }) => {
    return playerAdapter.upsertMany(players, state);
  }),
  on(PlayerActions.updatePlayer, (state, { update }) => {
    return playerAdapter.updateOne(update, state);
  }),
  on(PlayerActions.updatePlayers, (state, { updates }) => {
    return playerAdapter.updateMany(updates, state);
  }),
  on(PlayerActions.mapPlayer, (state, { entityMap }) => {
    return playerAdapter.mapOne(entityMap, state);
  }),
  on(PlayerActions.mapPlayers, (state, { entityMap }) => {
    return playerAdapter.map(entityMap, state);
  }),
  on(PlayerActions.deletePlayer, (state, { id }) => {
    return playerAdapter.removeOne(id, state);
  }),
  on(PlayerActions.deletePlayers, (state, { ids }) => {
    return playerAdapter.removeMany(ids, state);
  }),
  on(PlayerActions.deletePlayersByPredicate, (state, { predicate }) => {
    return playerAdapter.removeMany(predicate, state);
  }),
  on(PlayerActions.loadPlayers, (state, { players }) => {
    return playerAdapter.setAll(players, state);
  }),
  on(PlayerActions.setPlayers, (state, { players }) => {
    return playerAdapter.setMany(players, state);
  }),
  on(PlayerActions.clearPlayers, (state) => {
    return playerAdapter.removeAll({ ...state, selectedPlayerId: null });
  })
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  playerAdapter.getSelectors();

export const selectPlayerIds = selectIds;
export const selectPlayerEntities = selectEntities;
export const selectAllPlayers = selectAll;
export const selectPlayerTotal = selectTotal;
