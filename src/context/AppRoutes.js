import { Switch, Route } from 'react-router-dom'
import { Home } from '../pages/Home'

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}
