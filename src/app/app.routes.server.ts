import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'fleet',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'destinations',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'reviews',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
