import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';

type GolfHole = {
  id: number;
  score: number;
};
type GolfState = {
  currentScore: number;
  hole: number;
};
export const GolfStore = signalStore(
  withDevtools('golf'),
  withEntities<GolfHole>(),
  withState<GolfState>({ currentScore: 0, hole: 1 }),
  withMethods((store) => {
    return {
      takeAStroke: () =>
        patchState(store, { currentScore: store.currentScore() + 1 }),
      sunk: () =>
        patchState(
          store,
          addEntity({ id: store.hole(), score: store.currentScore() }),
          { currentScore: 0, hole: store.hole() + 1 },
        ),
    };
  }),
  withComputed((store) => {
    return {
      sunkDisabled: computed(() => store.currentScore() === 0),
      totalForGame: computed(() =>
        store.entities().reduce((a: number, b: GolfHole) => a + b.score, 0),
      ),
    };
  }),
);
