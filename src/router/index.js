import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
import PostIdPage from "../pages/PostIdPage/PostIdPage";
import About from "../pages/About/About";
import Posts from "../pages/Posts/Posts";

export const privatRoutes = [
  {path: '/', component: Home, exact: true},
  {path: '/about', component: About, exact: true},
  {path: '/posts', component: Posts, exact: true},
  {path: '/error', component: Error, exact: true},
  {path: '/login', component: Login, exact: true},
  {path: '/posts/:id', component: PostIdPage, exact: true},
]
export const publicRoutes = [
  {path: '/login', component: Login, exact: true},
]