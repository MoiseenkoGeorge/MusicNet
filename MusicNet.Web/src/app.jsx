import React from "react";
import ReactDOM from "react-dom";
import { Redux } from "redux";
import { Provider } from "react-redux";
import { Reducer } from "./reducer";
import { AppView } from "./appview";

var store = Redux.createStore(Reducer);

store.dispatch({
    type: "SET_STATE",
    state: {
        phones: ["iPhone 7 Plus", "Samsung Galaxy A5"]
    }
});


ReactDOM.render(
    <Provider store={store}>
        <AppView />
    </Provider>,
    document.getElementById("container")
);