import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NewsHeaderComponent } from './components/news-header.component';

@Component({
  selector: 'app-news',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NewsHeaderComponent, RouterLink, RouterOutlet],

  template: `
    <app-news-header />
    <div class="flex gap-4 ">
      <a routerLink="list" class="link">List</a>
      <a routerLink="history" class="link">History</a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class NewsComponent {}
