import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntities,
  addEntity,
  removeEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { PostApiResponseItem, PostCreateModel } from '../types';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { PostApi } from './post-api';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withSavedPostEntry } from './saved-entry.feature';

type PostsStoreState = {
  filter: string | null;
};
export const PostsStore = signalStore(
  withDevtools('posts'),
  withState<PostsStoreState>({
    filter: null,
  }),
  withSavedPostEntry(),
  withEntities({ collection: '_server', entity: type<PostApiResponseItem>() }),
  withEntities({
    collection: '_outbox',
    entity: type<PostApiResponseItem>(),
  }),
  withMethods((store) => {
    const api = inject(PostApi);
    return {
      setFilter: (filter: string | null) => patchState(store, { filter }),
      addPost: rxMethod<PostCreateModel>(
        pipe(
          map((outgoing) => {
            const tempId = crypto.randomUUID();
            const outBoxEntity = {
              id: tempId,
              ...outgoing,
            } as unknown as PostApiResponseItem;
            patchState(
              store,
              addEntity(outBoxEntity, { collection: '_outbox' }),
            );
            return {
              tempId,
              outgoing,
            };
          }),
          mergeMap((post) =>
            api
              .addPost(post.outgoing, post.tempId)
              .pipe(
                tap((p) =>
                  patchState(
                    store,
                    addEntity(p.post, { collection: '_server' }),
                    removeEntity(p.tempId, { collection: '_outbox' }),
                  ),
                ),
              ),
          ),
        ),
      ),
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            api
              .getPosts()
              .pipe(
                tap((posts) =>
                  patchState(
                    store,
                    addEntities(posts, { collection: '_server' }),
                  ),
                ),
              ),
          ),
        ),
      ),
    };
  }),
  withComputed((store) => {
    return {
      numberOfPosts: computed(() => ({
        total: store._serverIds().length + store._outboxIds().length,
        pending: store._outboxIds().length,
      })),
      posts: computed(() => {
        const outbox = store._outboxEntities().map(
          (p) =>
            ({ ...p, pending: true }) as PostApiResponseItem & {
              pending: boolean;
            },
        );
        const server = store._serverEntities().map(
          (p) =>
            ({ ...p, pending: false }) as PostApiResponseItem & {
              pending: boolean;
            },
        );
        const posts = [...outbox, ...server];
        if (store.filter() !== null) {
          return posts.filter((p) => p.postedBy === store.filter());
        } else {
          return posts;
        }
      }),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
