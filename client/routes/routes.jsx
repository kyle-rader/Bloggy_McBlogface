import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

export const renderRoutes = () => (
  <Router history={browserHistory}>

    <Route path="/" component={App}>

      {/* Public Routes */}
      <IndexRoute component={Home}/>
      <Route path='tags' component={Tags}/>
      <Route path='archive' component={Archive}/>
      <Route path='puzzles' component={Puzzles}/>
      <Route path='resume' component={Resume}/>
      <Route path='coolstuff' component={CoolStuff}/>
      <Route path='timetools' component={TimeTools}/>

      {/* Authentication Routes */}
      <Route path="login" component={Login}/>
      { /* <Route path="register" component={Register}/> */}
      <Route path="requestpasswordreset" component={RequestPasswordReset}/>
      <Route path="passwordreset/:token" component={PasswordReset}/>

      {/* Admin Routes */}
      <Route path="settings" component={Settings} />

      <Route path="editor(/:postId)" component={BlogEditor}/>

      <Route path="*" component={Home}/>
    </Route>
  </Router>
);
