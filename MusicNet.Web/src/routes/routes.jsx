import React from "react";
import { Route, IndexRoute } from "react-router";
import { App } from "../containers";
import { HomeView, LoginView, ProtectedView } from "../views"
import {requireAuthentication} from ".."