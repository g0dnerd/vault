import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Match } from '@vault/shared';
import * as MatchActions from '../actions/match.actions';

export interface MatchState extends EntityState<Match> {
  selectedMatchId: number | null;
}

export function selectMatchId(a: Match): number {
  return a.id;
}

export const matchAdapter: EntityAdapter<Match> = createEntityAdapter<Match>({
  selectId: selectMatchId,
  sortComparer: false,
});

export const initialState: MatchState = matchAdapter.getInitialState({
  selectedMatchId: null,
});

export const matchReducer = createReducer(
  initialState,
  on(MatchActions.setCurrentMatchSelected, (state, { query }) => {
    const game = Object.values(state.entities).find(
      (game): game is Match => !!game && query(game)
    );
    return {
      ...state,
      selectedMatchId: game ? game.id : null,
    };
  }),
  on(MatchActions.addMatch, (state, { game }) => {
    return matchAdapter.addOne(game, state);
  }),
  on(MatchActions.setMatch, (state, { game }) => {
    return matchAdapter.setOne(game, state);
  }),
  on(MatchActions.upsertMatch, (state, { game }) => {
    return matchAdapter.upsertOne(game, state);
  }),
  on(MatchActions.addMatches, (state, { matches }) => {
    return matchAdapter.addMany(matches, state);
  }),
  on(MatchActions.upsertMatches, (state, { matches }) => {
    return matchAdapter.upsertMany(matches, state);
  }),
  on(MatchActions.updateMatch, (state, { update }) => {
    return matchAdapter.updateOne(update, state);
  }),
  on(MatchActions.updateMatches, (state, { updates }) => {
    return matchAdapter.updateMany(updates, state);
  }),
  on(MatchActions.mapMatch, (state, { entityMap }) => {
    return matchAdapter.mapOne(entityMap, state);
  }),
  on(MatchActions.mapMatches, (state, { entityMap }) => {
    return matchAdapter.map(entityMap, state);
  }),
  on(MatchActions.deleteMatch, (state, { id }) => {
    return matchAdapter.removeOne(id, state);
  }),
  on(MatchActions.deleteMatches, (state, { ids }) => {
    return matchAdapter.removeMany(ids, state);
  }),
  on(MatchActions.deleteMatchesByPredicate, (state, { predicate }) => {
    return matchAdapter.removeMany(predicate, state);
  }),
  on(MatchActions.loadMatches, (state, { matches }) => {
    return matchAdapter.setAll(matches, state);
  }),
  on(MatchActions.setMatches, (state, { matches }) => {
    return matchAdapter.setMany(matches, state);
  }),
  on(MatchActions.clearMatches, (state) => {
    return matchAdapter.removeAll({ ...state, selectedMatchId: null });
  })
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  matchAdapter.getSelectors();

export const selectMatchIds = selectIds;
export const selectMatchEntities = selectEntities;
export const selectAllMatches = selectAll;
export const selectMatchTotal = selectTotal;
