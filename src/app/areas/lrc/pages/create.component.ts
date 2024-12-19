import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-create-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div>
      <a class="btn btn-primary" routerLink="link"
        >Create a Link to a Site or Page</a
      >
      <a class="btn btn-primary" routerLink="video">Create a Link to a Video</a>
      <a class="btn btn-primary" routerLink="video-series"
        >Create a Link to a Video Series</a
      >
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class CreateComponent {}
