import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar />
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [NavbarComponent, RouterOutlet], // put this in the bundle of code you send to the browser.
})
export class AppComponent {

}
