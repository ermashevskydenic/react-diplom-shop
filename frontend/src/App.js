import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import CatalogPage from './components/CatalogPage';
import About from './components/About';
import Contacts from './components/Contacts';
import Page404 from './components/404';
import Product from './components/Product';
import './css/main.css'
import Cart from './components/Cart';


function App() {
	return (
		<Router >
			<Header />
			<main className="container">
				<div className="row">
					<div className="col">
						<Switch>
							<Route path='/' component={Main} exact />
							<Route path='/catalog' component={CatalogPage} exact />
							<Route path='/about' component={About} exact />
							<Route path='/contacts' component={Contacts} exact />
							<Route path='/catalog/:id' component={Product} exact/>
							<Route path='/cart' exact component={Cart} />
							<Route path='*' component={Page404} />
						</Switch >
					</div>
				</div >
			</main>
			<Footer />
		</Router>
	);
}

export default App;