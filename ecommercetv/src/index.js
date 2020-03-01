import React 									  from 'react';
import ReactDOM 								  from 'react-dom';
import { Provider } 							  from 'react-redux';
import store  									  from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Contact 									  from './components/Contact';
import TvCont               					  from './components/Tv_container';
import ViewProductDetails   					  from './components/ViewProductDetails';
import FavList              				      from './components/FavList';
import SigninSignup         					  from './components/LoginSignup';
import Cart                 					  from './components/Cart';
import FindStore            					  from './components/FindStore';
import Checkout             					  from './components/Checkout';
import PageNotFound         					  from './components/PageNotFound';
import './js/script.js';


const routing = (
	<Provider store={store}>
		<Router>
			<Switch>
				 <Route exact path={process.env.PUBLIC_URL + '/'} 		      component={TvCont}/>
				 <Route exact path={process.env.PUBLIC_URL + '/contact'} 	  component={Contact}/>
				 <Route 	  path={process.env.PUBLIC_URL + '/viewprod'} 	  component={ViewProductDetails}/>
				 <Route 	  path={process.env.PUBLIC_URL + '/wishlist'} 	  component={FavList}/>
				 <Route 	  path={process.env.PUBLIC_URL + '/signinsignup'} component={SigninSignup}/>
				 <Route 	  path={process.env.PUBLIC_URL + '/cart'} 		  component={Cart}/>
				 <Route 	  path={process.env.PUBLIC_URL + '/findstore'} 	  component={FindStore}/>
				 <Route 	  path={process.env.PUBLIC_URL + '/checkout'} 	  component={Checkout}/>
				 <Route 	  path={process.env.PUBLIC_URL + '/viewprod/*'}   component={ViewProductDetails}/>
				 <Route 	  path=""										  component={PageNotFound}/>
			</Switch>
		</Router>
	</Provider>
 )

ReactDOM.render(<Router basename={process.env.PUBLIC_URL}>{routing}</Router>, document.getElementById('root'));
 


