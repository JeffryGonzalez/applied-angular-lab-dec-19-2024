import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-4">
      <a routerLink="ui">UI</a>
      <a routerLink="prefs">Prefs</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class CounterComponent {}
