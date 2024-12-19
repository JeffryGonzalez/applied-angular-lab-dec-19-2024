import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsStore } from './services/post-store';
import { PostApi } from './services/post-api';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lrc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, AsyncPipe],
  template: `
    <p>Count of Posts {{ count$ | async }}</p>
    <p>
      There are {{ store.numberOfPosts().total }} posts with
      {{ store.numberOfPosts().pending }} pending
    </p>

    <router-outlet />
  `,
  styles: ``,
})
export class LrcComponent {
  store = inject(PostsStore);

  api = inject(PostApi);

  count$ = this.api.getPosts().pipe(map((allPosts) => allPosts.length));

  constructor() {
    this.api
      .getPosts()
      .pipe(
        takeUntilDestroyed(),
        map((allPosts) => {
          return allPosts.map((post) => {
            return {
              id: post.id,
              info: post.name + ' by ' + post.postedBy,
            };
          });
        }),
      )
      .subscribe(console.log);
  }
}
