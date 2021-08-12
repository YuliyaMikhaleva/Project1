import React from "react";
import { Route, Switch } from "react-router-dom";

export function Profile() {
  return (
    <Switch>
      <Route path="/profile">
        <h1>Профиль</h1>
      </Route>
    </Switch>
  );
}
