import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactList from "../components/ContactList";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={ContactList} />
        </Switch>
    </Router>
);