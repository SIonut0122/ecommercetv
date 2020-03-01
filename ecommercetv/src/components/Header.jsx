import React, { Component }   from 'react';
import firebase               from '@firebase/app';
import {Link }                from 'react-router-dom'
import { connect }            from "react-redux";
import { openFavoriteList }   from '../actions/index';
import { favListProducts }    from '../actions/index';
import { openCart }           from '../actions/index';
import { openTvCont }         from '../actions/index';
import { openSigninSignUp }   from '../actions/index';
import { openUserMenuFunct }  from '../actions/index';
import { openContact }        from '../actions/index';
import { viewProductDetails } from '../actions/index';
import { openCheckout }       from '../actions/index';
import { openFindStore }      from '../actions/index';
import { userSignedInFunc }   from '../actions/index';
import { userInfoFunc }       from '../actions/index';
import '../css/Header.css';
import '../js/script.js';
import 'firebase/auth';
import '../firebase';




 function mapDispatchToProps(dispatch) {
  return {
    userSignedInFunc:   bol => dispatch(userSignedInFunc(bol)),
    userInfoFunc:       info => dispatch(userInfoFunc(info)),
    openFavoriteList:   bol => dispatch(openFavoriteList(bol)),
    favListProducts:    prod => dispatch(favListProducts(prod)),
    openCart:           bol => dispatch(openCart(bol)),
    openTvCont:         bol => dispatch(openTvCont(bol)),
    openSigninSignUp:   bol => dispatch(openSigninSignUp(bol)),
    openUserMenuFunct:  bol => dispatch(openUserMenuFunct(bol)),
    openContact:        bol => dispatch(openContact(bol)),
    viewProductDetails: prod => dispatch(viewProductDetails(prod)),
    openCheckout:       bol => dispatch(openCheckout(bol)),
    openFindStore:      bol => dispatch(openFindStore(bol)),
  };
}


 const mapStateToProps = state => {
  return {  cartItems:          state.cartItems,
            userSignedIn:       state.userSignedIn,
            userInfo:           state.userInfo,
            openSigninOrSignUp: state.openSigninOrSignUp,
            openUserMenu:       state.openUserMenu,
            openFavList:        state.openFavList,
            favoriteList:       state.favoriteList
        };
};
 


class ConnectedHeader extends Component {
  constructor(props) {
    super(props)
        this.state = {}
    }


componentDidMount() {
  let nav_hamb = document.getElementById('nav_hamb');

    // FIREBASE AUTH //

      // Check if user is logged in when page is opened
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
          // If user is signed in, set the state user
        this.props.userSignedInFunc ({ userSignedIn: true })
        this.props.userInfoFunc     ({ userInfo: user })
      } else {
        this.props.userSignedInFunc ({ userSignedIn: false })
        this.props.userInfoFunc     ({ userInfo: user })
    }});

    // LOCAL STORAGE //

        // Check in localStorage for favoriteList and set it as props
    if (window.localStorage.getItem('favoriteList') !== null) {
          let favList = JSON.parse(localStorage.getItem('favoriteList'));
          this.props.favListProducts({ favoriteList: favList })
    } 


    // EVENT LISTENERS //

        // Handle window resize
    window.addEventListener('resize', this.handleResize);
        // Add listener for click on the hamburger menu.
    nav_hamb.addEventListener('click', this.handleOpenHamb);
        // Set delay for header wishlist icon to leave time to load (font,length)
    setTimeout(function() {
      document.querySelector('.nav_c_side').setAttribute('style', 'opacity:1 !important');
    },1000);
        // Handle focus outline on mouse / keyboard
    document.body.addEventListener('mousedown', function() {
      document.body.classList.add('using-mouse');
    });
    document.body.addEventListener('keydown', function() {
      document.body.classList.remove('using-mouse');
    });
    
        // Scroll to top on every render
    window.scrollTo(0,0);
 }

handleOpenHamb() {
  let nav_hamb        = document.getElementById('nav_hamb'),
      nav_mobile_menu = document.querySelector('.nav_mobile_menu');
        // Open / close hamb menu on mobile size
      nav_hamb.classList.toggle('open');
      nav_mobile_menu.classList.toggle('nav_mobile_menu_open');
}
handleResize() {
  let mobileNavMenu = document.querySelector('.nav_mobile_menu'),
      hambButton    = document.getElementById('nav_hamb');
         // Hide hamb menu if opened on resize.
      mobileNavMenu.classList.remove('nav_mobile_menu_open');
      hambButton.classList.remove('open');
}
 
handleOpenUserMenu() {
    // Toggle account menu display
  this.props.openUserMenuFunct({ openUserMenu: !this.props.openUserMenu })
}

hightlightNav(nav) {
  let navB = document.querySelectorAll('.nav_sp_menu');

    // Remove all nav menu highlights
  for(let i=0; i<navB.length; i++) {
    navB[i].classList.remove('nav_active');
  }
    // If nav.target contains classlist 'nav_sp_menu' (not mobile nav), highlight it
  if(nav.target.classList.contains('nav_sp_menu')) {
     nav.target.classList.add('nav_active');
  }
}

openSigninSignUp() {
    // Close hamb menu if is opened.
  this.handleResize();

  this.props.openSigninSignUp  ({ openSigninOrSignUp:  true  });
  this.props.openFavoriteList  ({ openFavList:         false });
  this.props.openUserMenuFunct ({ openUserMenu:        false });
  this.props.openCart          ({ openCart:            false });
  this.props.openTvCont        ({ openTvCont:          false });
  this.props.openContact       ({ openContact:         false });
  this.props.openCheckout      ({ openCheckout:        false });
  this.props.openFindStore     ({ openFindStore:       false });
}

openCart() {    
    // Close hamb menu if is opened.
  this.handleResize();

  this.props.openUserMenuFunct  ({ openUserMenu:       false });
  this.props.openFavoriteList   ({ openFavList:        false });
  this.props.openCart           ({ openCart:           true  });
  this.props.openTvCont         ({ openTvCont:         false });
  this.props.openSigninSignUp   ({ openSigninOrSignUp: false });
  this.props.openContact        ({ openContact:        false });
  this.props.viewProductDetails ({ viewProductDetails: false });
  this.props.openCheckout       ({ openCheckout:       false });
  this.props.openFindStore      ({ openFindStore:      false });


}
openTvContainer(nav) {
   let hambButton = document.getElementById('nav_hamb');
    // Close hamb menu if is opened.
  hambButton.classList.remove('open');
    // Highlight nav button
  this.hightlightNav(nav);
    // Listen to resize to close hamb menu if was opened 
  this.handleResize();

  this.props.openUserMenuFunct  ({ openUserMenu:       false });
  this.props.openTvCont         ({ openTvCont:         true  });
  this.props.openFavoriteList   ({ openFavList:        false });
  this.props.openCart           ({ openCart:           false });
  this.props.openSigninSignUp   ({ openSigninOrSignUp: false });
  this.props.openContact        ({ openContact:        false });
  this.props.openCheckout       ({ openCheckout:       false });
  this.props.viewProductDetails ({ viewProductDetails: false });
  this.props.openFindStore      ({ openFindStore:      false });


}

openContactContainer(nav) {
    // Highlight nav button
  this.hightlightNav(nav);
    // Close hamb menu if is opened.
  this.handleResize();

  this.props.openUserMenuFunct  ({ openUserMenu:       false });
  this.props.openContact        ({ openContact:        true  });
  this.props.openFavoriteList   ({ openFavList:        false });
  this.props.openCart           ({ openCart:           false });
  this.props.openTvCont         ({ openTvCont:         false });
  this.props.openSigninSignUp   ({ openSigninOrSignUp: false });
  this.props.openCheckout       ({ openCheckout:       false });
  this.props.viewProductDetails ({ viewProductDetails: false });
  this.props.openFindStore      ({ openFindStore:      false });
}

openFavList() {
    // Close hamb menu if is opened.
  this.handleResize();

  this.props.openFavoriteList   ({ openFavList:        true });
  this.props.openUserMenuFunct  ({ openUserMenu:       false });
  this.props.openCart           ({ openCart:           false  });
  this.props.openTvCont         ({ openTvCont:         false });
  this.props.openSigninSignUp   ({ openSigninOrSignUp: false });
  this.props.openContact        ({ openContact:        false });
  this.props.viewProductDetails ({ viewProductDetails: false });
  this.props.openCheckout       ({ openCheckout:       false });
  this.props.openFindStore      ({ openFindStore:      false });
}

logout() {
  // Close hamb menu if is opened.
  this.handleResize();
  // Close userslide menu
  this.setState({ openUserMenu: false }) 
  // Logout and refresh page
  firebase.auth().signOut()
    .then(() => {
      console.log('Signed out.')
    setTimeout(function() {
      window.location.reload();
    },700)
  })
  .catch(error => console.log('Error: ' + error));
}

openNavMobileUserSlide() {
  let mobileNavUsernameSlide      = document.querySelector('.nb_mobile_slide'),
      mobileNavUsernameSlideArrow = document.querySelector('.nb_un_arrow');
        // Open navbar user account slide menu
      mobileNavUsernameSlide.classList.toggle('nb_m_s_open');
        // Toggle up/down icon when sliding
      mobileNavUsernameSlideArrow.classList.toggle('nb_u_name_arr');
}

 


  render() {
    return (
        <div>
            <div className='row justify-content-center'>
              <div className='header_container col-12'>
                
                {/* -------- Nav menu -------- */}
                
                <div className='row justify-content-center'>
                  <div className='nav_menu col-12'>
                    <div className='row'>
                        
                          <div className='mr-auto nav_left_side' onClick={(e) => {window.location.reload()}}></div>
                        
                        <div className='nav_center_menu m-center'>
                        <Link to={process.env.PUBLIC_URL + '/'}>
                          <span className='nav_sp_menu nav_sp_home' onClick={(e) => this.openTvContainer(e)}>Home</span>
                        </Link>
                        <Link to={process.env.PUBLIC_URL + '/contact'}>
                          <span className='nav_sp_menu nav_sp_contact' onClick={(e) => this.openContactContainer(e)}>Contact</span>
                        </Link>
                        </div>

                        {/* -------- Right nav menu -------- */}

                        <div className='ml-auto nav_right_side'>
                            <div className='row'>

                              {!this.props.userSignedIn ? (
                                <Link to={process.env.PUBLIC_URL + '/signinsignup'}
                                      className='nav_l_side'
                                      onClick={() => this.openSigninSignUp()}>
                                    Sign In / Sign Up
                                </Link>
                              ) : (
                                <div className='nav_user_display'>
                                    <div className='row'>
                                      <div className='nav_username'>
                                        <div className='row justify-content-center'>
                                          <span onClick={() => this.handleOpenUserMenu()}>
                                              <i className="fas fa-user-circle"></i>
                                              <i className="fas fa-sort-down"></i>
                                          </span>
                                        </div>
                                      </div> 
                                    </div> 
                                </div>
                              )}
                                <div className='nav_c_side'>
                                  {this.props.favoriteList.length > 0 && (
                                    <span className='nav_wishlist_icon_no' 
                                          style={this.props.favoriteList.length > 9 ? ({left: 5.3+'px',top:6+'px'}):({left: 9+'px',top:7+'px'})}
                                          onClick={() => this.openFavList()}>
                                            {this.props.favoriteList.length}
                                    </span>
                                  )}
                                  <Link to={process.env.PUBLIC_URL + '/wishlist'}>
                                  <i className='fas fa-heart fa_heart_wishlist'
                                     onClick={() => this.openFavList()}
                                     style={this.props.favoriteList.length > 0 ? ({color: '#FF3A3A'}):({color: '#fff'})}>
                                  </i>
                                  </Link>
                                </div>
                        {/* --- Right cart icon --- */}        
                                <div className='nav_r_side' title='View cart'>
                                     {this.props.cartItems.length > 0 && (<Link to={process.env.PUBLIC_URL + '/cart'} className='nav_cart_no'>{this.props.cartItems.length}</Link>)}
                                     {this.props.cartItems.length > 0 ? (
                                        <Link to={process.env.PUBLIC_URL + '/cart'}>
                                        <img className='head_cart_img' alt='' src={require('../images/header/cart.svg')} onClick={() => this.openCart()}/>
                                        </Link>
                                        ) : 
                                        (
                                        <Link to={process.env.PUBLIC_URL + '/cart'}>
                                        <img className='head_cart_img' alt='' src={require('../images/header/cart.png')} onClick={() => this.openCart()}/>  
                                        </Link>
                                        )}
                                </div>
                                 <div id="nav_hamb">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                 </div>
                            </div>
                        </div>
                    
                    </div>
                  </div>
                </div>
              
                {/* -------- Mobile Nav menu -------- */}

                <div className='row justify-content-center'>
                  <div className='nav_mobile_menu col-12'>
                      <div className='row justify-content-center'>
                        <Link to={process.env.PUBLIC_URL + '/'}
                              className='mob_nav_link' 
                              onClick={(e) => this.openTvContainer(e)}>
                                TV
                        </Link>
                      </div>
                      <div className='row justify-content-center'>
                        <Link to={process.env.PUBLIC_URL + '/contact'}
                              className='mob_nav_link' 
                              onClick={(e) => this.openContactContainer(e)}>
                                Contact
                        </Link>
                      </div>

                       <div className='row justify-content-center'>
                       {!this.props.userSignedIn ? (
                        <Link to={process.env.PUBLIC_URL + '/signinsignup'}      
                              className='mob_nav_logsign'
                              onClick={() => this.openSigninSignUp()}>
                                Sign In / Sign up
                        </Link>
                        ) : (
                          <div className='nav_mobile_menu_user'>
                            
                            <div className='row'>
                              <div className='nb_user_name_div col-11' onClick={() => this.openNavMobileUserSlide()}>
                                    <i className="fas fa-sort-down nb_un_arrow"></i>
                                    <i className="fas fa-user-circle"></i>
                                    {this.props.userInfo && (
                                    <span className='nb_user_name_txt'>{this.props.userInfo.displayName}</span>
                                    )}
                              </div>
                            </div>

                            <div className='row'>
                                <div className='nb_mobile_slide'>
                                
                                 <div className='row justify-content-center'>
                                    {this.props.userInfo && (
                                    <span className='nb_mobile_s_email'>{this.props.userInfo.email}</span>
                                    )}
                                  </div>

                                  <div className='row justify-content-center'>
                                    <Link to={process.env.PUBLIC_URL + '/'}
                                          className='nb_mobile_s_mycart'
                                          onClick={() => this.openCart()}>
                                       <i className="fas fa-shopping-cart"></i>
                                        My cart
                                    </Link>
                                  </div>

                                  <div className='row justify-content-center'>
                                    <span className='nb_mobile_s_logout'
                                          onClick={() => this.logout()}>
                                      <i className="fas fa-door-open"></i>
                                        Logout
                                    </span>
                                  </div>
                               
                                </div>
                              </div>

                          </div>
                        )}
                      </div>
                  </div>
                </div>

                {/* -------- User menu -------- */}
              {this.props.openUserMenu ? (
                <div className='row'>
                  <div className='user_slide_menu'>
                    <div className='row justify-content-center'>
                       <div className='nav_user_menu'>
                          <div className='row justify-content-center'>
                              {this.props.userInfo && (
                                <span className='nav_user_menu_username'>
                                  <i className="fas fa-user-circle user_i_icon"></i>
                                  {this.props.userInfo.displayName}
                                </span>
                              )}
                          </div>
                          <div className='row justify-content-center'>
                              {this.props.userInfo && (
                                  <span className='nav_user_menu_email'>
                                    {this.props.userInfo.email}
                                  </span>
                                )}
                          </div>
                          <div className='row justify-content-center'>
                           <Link to={process.env.PUBLIC_URL + '/cart'}
                                 className='user_menu_mycart'
                                 onClick={() => this.openCart()}>
                              <i className="fas fa-shopping-cart"></i>
                                My cart
                            </Link>
                          </div>
                          <div className='row justify-content-center'>
                            <span className='user_menu_logout'
                            onClick={() => this.logout()}>
                              <i className="fas fa-door-open"></i>
                               Logout
                            </span>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              ) : ('')
            }


                <div className='row'>
                  <div className='head_lap_txt col-12 col-sm-12 col-md-6 col-lg-6'>
                    <div className='row justify-content-center'>
                      <span className='head_txt_innovation'>Innovation</span>
                    </div>
                    <div className='row justify-content-center'>
                      <span className='head_txt_technology'>technology</span>
                    </div>
                  </div>
                </div>


              </div>
            </div>
        </div>
      )
  }
}

 const Header = connect(mapStateToProps,mapDispatchToProps)(ConnectedHeader);
export default Header;
