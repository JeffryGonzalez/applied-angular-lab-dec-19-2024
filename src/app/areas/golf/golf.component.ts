import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-golf',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex gap-4">
      <a routerLink="ui" class="link">UI</a>
      <a routerLink="history" class="link">History</a>
    </div>

    <router-outlet />
  `,
  styles: ``,
})
export class GolfComponent {}
