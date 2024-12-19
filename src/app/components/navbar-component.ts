import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureDirective } from '@shared';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FeatureDirective],
  template: `
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" routerLink="">Applied Angular</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a routerLink="news">News</a></li>
          <li><a routerLink="golf">Golf</a></li>
          <li><a routerLink="counter">Counter</a></li>

          <li *feature="'lrc'"><a routerLink="lrc">Learning Resources</a></li>
          <li *feature="'books'"><a routerLink="books">Books</a></li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavbarComponent {}
