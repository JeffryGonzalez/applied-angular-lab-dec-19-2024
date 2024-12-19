import { Routes } from '@angular/router';
import { DetailsComponent } from './components/details.component';
import { EntryComponent } from './components/entry.component';
import { ListComponent } from './components/list.component';
import { LrcComponent } from './lrc.component';
import { PostApi } from './services/post-api';
import { PostsStore } from './services/post-store';
export const LRC_ROUTES: Routes = [
  {
    path: '',
    providers: [PostApi, PostsStore],
    component: LrcComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'posts',
        component: ListComponent,
      },
      {
        path: 'create',
        component: EntryComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
    ],
  },
];
