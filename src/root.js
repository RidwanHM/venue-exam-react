import { Router, Route, RootRoute } from "@tanstack/react-router";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import VenuePage from "./pages/Venue";
import ListingPage from "./pages/Listing";
import ProfilePage from "./pages/profile";
import Root from "./App";

const rootRoute = new RootRoute({
  component: Root,
});

// NOTE: @see https://tanstack.com/router/v1/docs/guide/routes

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const ListingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/listing",
  component: ListingPage,
});

const VenueRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/venue",
  component: VenuePage,
});

const ProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});


const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  ListingRoute,
  VenueRoute,
  ProfileRoute,
]);

export const router = new Router({ routeTree });

export default router;