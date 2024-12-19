import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';
import { PostCreateModel } from '../types';

type SavedPostEntryState = {
  savedPost: Partial<PostCreateModel>;
};
export function withSavedPostEntry() {
  return signalStoreFeature(
    withState<SavedPostEntryState>({ savedPost: {} }),
    withMethods((store) => {
      return {
        setSavedEntry: (entry: Partial<PostCreateModel>) =>
          patchState(store, { savedPost: entry }),
      };
    }),
  );
}

export function clearSavedPost(): SavedPostEntryState {
  return { savedPost: {} };
}
