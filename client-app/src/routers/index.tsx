import { Switch, Route } from 'react-router-dom'
import Home from 'pages/home'
import Search from 'pages/search'

function Router() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
    </Switch>
  )
}

export default Router
