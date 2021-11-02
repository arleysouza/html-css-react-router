import React from "react";
import { Router, Switch } from "react-router-dom";

import { AuthProvider } from "./AuthContext";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Gasto from "./pages/Gasto";
import Cadastro from "./pages/Cadastro";
import CustomRoute from "./CustomRoute";
import history from "./history";

export default function App() {
	return (
		<AuthProvider>
			<Router history={history}>
				<div className="app">
					<div className="app-box">
						<Menu />
						<Switch>
							<CustomRoute exact path="/login" component={Login} />
							<CustomRoute exact path="/cadastro" component={Cadastro} />
							<CustomRoute isPrivate exact path="/gasto" component={Gasto} />
						</Switch>
					</div>
				</div>
			</Router>
		</AuthProvider>
	);
}
