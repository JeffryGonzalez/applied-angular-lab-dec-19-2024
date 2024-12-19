import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsStore } from './services/post-store';

@Component({
  selector: 'app-lrc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `
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
}
