import { Switch, Route } from 'react-router-dom'
import { Home } from 'pages/Home'
import { MovieDetails } from 'pages/MovieDetails'
import { Discover } from 'pages/Discover'
import { FilterByGenres } from 'pages/FilterByGenres'
import { List } from 'pages/List'

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movie/:id">
        <MovieDetails />
      </Route>
      <Route path="/discover/:query">
        <Discover />
      </Route>
      <Route path="/genres/:genreId">
        <FilterByGenres />
      </Route>
      <Route path="/list/:listName">
        <List />
      </Route>
      <Route path="*">
        <div>404 Not found</div>
      </Route>
    </Switch>
  )
}
