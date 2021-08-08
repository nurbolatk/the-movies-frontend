import { Switch, Route } from 'react-router-dom'
import { Home } from '../pages/Home'

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="*">
        <div>404 Not found</div>
      </Route>
    </Switch>
  )
}
