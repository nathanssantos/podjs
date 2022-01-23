import { HomeScreen, CollectionDetailScreen, NotFoundScreen } from "../screens";

const Routes = [
  {
    path: "/",
    name: "Home",
    component: HomeScreen,
  },
  {
    path: "/collections/:id",
    name: "Collection Detail",
    component: CollectionDetailScreen,
  },
  {
    path: "*",
    name: "404",
    component: NotFoundScreen,
  },
];

export default Routes;
