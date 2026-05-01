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
    path: 'vourvourou-boat-rental',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'rent-a-boat-vourvourou',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'boat-rent-diaporos',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blue-lagoon-boat-rental',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
