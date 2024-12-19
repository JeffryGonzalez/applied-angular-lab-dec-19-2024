import { Routes } from '@angular/router';
import { DetailsComponent } from './components/details.component';
import { LinkEntryComponent } from './components/link-entry.component';
import { ListComponent } from './components/list.component';
import { LrcComponent } from './lrc.component';
import { PostApi } from './services/post-api';
import { PostsStore } from './services/post-store';
import { CreateComponent } from './pages/create.component';
import { LinkVideoEntryComponent } from './components/link-video.component';
import { LinkVideoSeriesEntryComponent } from './components/link-video-series.component';
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
        component: CreateComponent,
        children: [
          { path: 'link', component: LinkEntryComponent },
          { path: 'video', component: LinkVideoEntryComponent },
          { path: 'video-series', component: LinkVideoSeriesEntryComponent },
        ],
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
    ],
  },
];
