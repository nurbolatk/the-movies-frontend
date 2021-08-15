import { Switch, Route } from 'react-router-dom'
import { Home } from 'pages/Home'
import { MovieDetails } from 'pages/MovieDetails'
import { SearchResults } from 'components/organisms/SearchResults'
import { Discover } from 'pages/Discover'
import { FilterByGenres } from 'pages/FilterByGenres'

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movie/:id">
        <MovieDetails />
      </Route>
      <Route path="/movies">
        <SearchResults />
      </Route>
      <Route path="/discover/:query">
        <Discover />
      </Route>
      <Route path="/genres/:genreId">
        <FilterByGenres />
      </Route>
      <Route path="*">
        <div>404 Not found</div>
      </Route>
    </Switch>
  )
}
