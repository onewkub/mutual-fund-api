import { Switch, Route } from 'react-router-dom'
import Home from 'pages/home'
import Input from 'pages/input'
import Result from 'pages/result'

function Router() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/input">
        <Input />
      </Route>
      <Route path="/result">
        <Result />
      </Route>
    </Switch>
  )
}

export default Router
