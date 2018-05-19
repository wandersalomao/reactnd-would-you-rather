export default (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
  
  
      <Route path="admin" component={RequireAuth(AdminDashboard)} />
  
      <Route path="dashboard">
        <IndexRoute component={RequireAuth(Dashboard)} />
      </Route>
  
      <Route path="*" component={NotFoundPage} />
    </Route>
  );