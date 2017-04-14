﻿//var Map = require("immutable").Map;
import { Map } from "immutable"

var reducer = (state = Map(), action) => {
    switch (action.type) {
        case "SET_STATE":
            return state.merge(action.state);
        case "ADD_PHONE":
            return state.update("phones", (phones) => phones.push(action.phone));
        case "DELETE_PHONE":
            return state.update("phones",
                (phones) => phones.filterNot(
                    (item) => item === action.phone
                )
            );
    }
    return state;
}
module.exports = reducer;