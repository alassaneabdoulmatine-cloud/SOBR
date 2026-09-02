import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/login-signup/login.tsx'),
  route('signup', 'routes/login-signup/signup.tsx'),
  route('dashbord', 'routes/dashbord.tsx'),
  route('user-session', 'routes/user-session.tsx'),
  route('client-session', 'routes/client-session.tsx'),
] satisfies RouteConfig;
