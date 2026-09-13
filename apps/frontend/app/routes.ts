import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  layout('layouts/anonymous-layout.tsx', [route('login', 'routes/login.tsx'), route('signup', 'routes/signup.tsx')]),
  layout('layouts/private-layout.tsx', [
    route('workspace', 'routes/workspace.tsx'),
    layout('layouts/body-layout.tsx', [
      route('editor/:projectId', 'routes/editor.tsx'),
      layout('layouts/body-sidebar-layout.tsx', [
        route('dashboard', 'routes/dashboard.tsx'),
        route('presets', 'routes/presets.tsx'),
        route('settings', 'routes/settings.tsx'),
        route('trash', 'routes/trash.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
