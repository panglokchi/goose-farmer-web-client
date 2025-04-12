import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client
  },
  {
    path: 'guest-verify/:key',
    renderMode: RenderMode.Client,
  },
];