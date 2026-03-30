import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/bookmarks', 'routes/bookmarks.tsx'),
  route('/login', 'routes/login.tsx'),

  // Protected routes
  route('/admin', 'routes/admin/admin.tsx', [
    index('routes/admin-bookmarks/admin-bookmarks.tsx'),
    route('bookmarks/:id', 'routes/admin-bookmarks/bookmark-detail.tsx'),
  ]),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
