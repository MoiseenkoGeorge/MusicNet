import * as React from "react";
import * as ReactDom from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import { App } from "./App";
import { NotFound } from "./components/NotFound"

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
), document.getElementById('container'))