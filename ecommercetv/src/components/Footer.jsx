import React, { Component }   from 'react';
import { openUserMenuFunct }  from '../actions/index';
import { openFindStore }      from '../actions/index';
import { openFavoriteList }   from '../actions/index';
import { openTvCont }         from '../actions/index';
import { openCart }           from '../actions/index';
import { openSigninSignUp }   from '../actions/index';
import { openContact }        from '../actions/index';
import { viewProductDetails } from '../actions/index';
import { openCheckout }       from '../actions/index';
import { connect }            from "react-redux";
import {Link }                from 'react-router-dom'
import '../css/Footer.css';






function mapDispatchToProps(dispatch) {
  return {
        openUserMenuFunct:  bol => dispatch(openUserMenuFunct(bol)),  
        openFindStore:      bol => dispatch(openFindStore(bol)), 
        openFavoriteList:   bol => dispatch(openFavoriteList(bol)),
        openTvCont:         bol => dispatch(openTvCont(bol)), 
        openCart:           bol => dispatch(openCart(bol)), 
        openSigninSignUp: bol => dispatch(openSigninSignUp(bol)), 
        openContact:        bol => dispatch(openContact(bol)), 
        viewProductDetails: bol => dispatch(viewProductDetails(bol)), 
        openCheckout:       bol => dispatch(openCheckout(bol))    
  };
}


class ConnectedFooter extends Component {
  constructor(props) {
    super(props)
        
        this.state = {
                  newsletterEmail: '',
                  newsletterEmailValid: false,
                  newsletterErrorMsg: false,
                  newsletterSubscribed: false,
        }
    }


footerOpenFindStore() {
  this.props.openFindStore      ({ openFindStore: true })
  this.props.openFavoriteList   ({ openFavList: false })
  this.props.openTvCont         ({ openTvCont: false })
  this.props.openCart           ({ openCart: false })
  this.props.openSigninSignUp   ({ openSigninOrSignUp: false })
  this.props.openContact        ({ openContact: false })
  this.props.viewProductDetails ({ viewProductDetails: false })
  this.props.openCheckout       ({ openCheckout: false })
}

handleFooterContClick() {
    // Close user menu if is opened
  this.props.openUserMenuFunct({ openUserMenu: false })
}
newsletterInput(e) {
   let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
       emailValue = e.target.value;

       // Clear recent subscribed/error message if any
    this.setState({ newsletterSubscribed: false, newsletterErrorMsg: false})
      // If input mail match, setstate value
    if(emailValue.match(mailformat)) {
        this.setState({newsletterEmail: emailValue, newsletterEmailValid: true})
    } else if(emailValue.length === 0) {
      // If input is empty, reset value input
        this.setState({newsletterEmail: '', newsletterEmailValid: false})
    } else {
        this.setState({newsletterEmail: '', newsletterEmailValid: false})
    }

}
subscribeToNewsletter() {
      // If newsletter email is valid, proceed
  if(this.state.newsletterEmailValid) {
    this.setState({ newsletterEmail: '', newsletterSubscribed: true, newsletterErrorMsg: false})
  } else {
      // Display 'Please enter a valid email' message
    this.setState({ newsletterErrorMsg: true })
      // Hide message after 1.5sec
    setTimeout(() => {
      this.setState({ newsletterErrorMsg: false })
    },1500);
  }
}

  render() {
    return (
        <div>
            <div className='row justify-content-center footer_container_row'>
              <div className='footer_container col-12' onClick={() => this.handleFooterContClick()}>
                
                {/* --- First footer row --- */}
                <div className='row justify-content-center'> 
                  <div className='footer_first_row col-11 col-md-12'>
                     <div className='row justify-content-center'>
                        <div className='footer_f_col col-12 col-sm-4'>
                          <i className="fas fa-truck"></i>
                          Delivery in 3-5 days
                        </div>
                        <div className='footer_f_col col-6 col-sm-4'>
                          <i className="fas fa-shipping-fast"></i>
                          Free delivery
                        </div>
                        <div className='footer_f_col col-6 col-sm-4'>
                          <i className="fas fa-car"></i>
                          Pickup in store
                        </div>
                     </div>  
                  </div>
                </div>
                
                {/* --- Second footer row --- */}
                <div className='row justify-content-center'>
                  <div className='footer_sec_row col-12 col-md-12'>
                    <div className='row justify-content-center'>
                      <div className='footer_s_col footer_s_col_newsletter col-12 col-sm-4 col-md-4'>
                        <div className='row justify-content-center'>
                          <span>Newsletter</span>
                        </div>
                        <div className='row justify-content-center'>
                          <span className='col-7 col-sm-10 col-md-10 col-lg-8 col-xl-6'>
                            <input type='text' 
                                   tabIndex='0'
                                   placeholder='Enter your email' 
                                   onChange={(e) => this.newsletterInput(e)}
                                   className='footer_newsletter_sp'>
                            </input>
                          </span>
                        </div>
                        {this.state.newsletterErrorMsg ? (
                        <div className='row justify-content-center'>
                          <span className='footer_subscr_error'>Please enter a valid email</span>
                        </div>
                        ):('')}
                        {this.state.newsletterSubscribed ? (
                        <div className='row justify-content-center'>
                          <span className='footer_subscr_succeed'>You have been subscribed. Thank you!</span>
                        </div>
                        ):('')}
                        <div className='row justify-content-center'>
                          <span tabIndex='0' className='footer_subscr_button col-7 col-sm-10 col-md-10 col-lg-8 col-xl-6' onClick={() => this.subscribeToNewsletter()}>Subscribe</span>
                        </div>
                      </div>
                      <div className='footer_s_col col-6 col-sm-4 col-md-4'>
                        <div className='row justify-content-center'>
                          <img src={require('../images/footer/find_store_img.png')} className='footer_findstore_img' alt=''></img>
                        </div>
                        <div className='row justify-content-center'>
                          <Link to={process.env.PUBLIC_URL + '/findstore'}
                                className='footer_findstore_button' 
                                onClick={() => this.footerOpenFindStore()}
                                tabIndex='0'>
                              <i className='fas fa-map-marker-alt'></i>
                              Find store
                          </Link>
                        </div>
                      </div>
                      <div className='footer_s_col col-6 col-sm-4 col-md-4'>
                        <div className='row justify-content-center'>
                          <span className='footer_followus_title'>Follow us</span>
                        </div>
                        <div className='row justify-content-center'>
                          <div className='footer_followus_img col-11'>
                            <div className='row justify-content-center'>
                              <a href='https://facebook.com'>
                                <img tabIndex='0' src={require('../images/footer/facebook.png')} alt=''></img>
                              </a>
                              <a href='https://youtube.com'>
                              <img tabIndex='0' src={require('../images/footer/youtube.png')} alt=''></img>
                              </a>
                              <a href='https://twitter.com'>
                              <img tabIndex='0' src={require('../images/footer/twitter.png')} alt=''></img>
                              </a>
                              <a href='https://instagram.com'>
                              <img tabIndex='0' src={require('../images/footer/instagram.png')} alt=''></img>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* --- Third footer row --- */}

                <div className='row'>
                  <div className='footer_third_row col-12'>
                    <div className='row justify-content-center'>
                      <div className='footer_third_col footer_tcol_ourserv col-6 col-md-4 col-lg-4'>
                        <div className='row justify-content-center row_our_serv'>
                        <span>Our services</span>
                        </div>
                        <div className='row justify-content-center'>
                          <ul className='foooter_t_f_ul'>
                            <li>Delivery</li>
                            <li>Order online & collect in store</li>
                            <li>Customer Support Plans</li>
                            <li>Recycling</li>
                            <li>Returns & cancellations</li>
                          </ul>
                        </div>
                      </div>
                      <div className='footer_third_col footer_tcol_paymeth col-12 col-md-4 col-lg-4'>
                        <div className='row justify-content-center'>
                          <span>Payment methods</span>
                        </div>
                        <div className='row justify-content-center'>
                          <div className='footer_tcol_paymeth_img col-10'>
                            <div className='row justify-content-center'>
                              <img src={require('../images/checkout/maestro.png')} alt='Maestro'></img>
                              <img src={require('../images/checkout/mastercard.png')} alt='Mastercard'></img>
                              <img src={require('../images/checkout/paypal.png')} alt='Paypal'></img>
                              <img src={require('../images/checkout/visa.png')} alt='Visa'></img>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='footer_third_col footer_tcol_helpsupport col-6 col-md-4 col-lg-4'>
                        <div className='row justify-content-center row_our_serv'>
                        <span>Our services</span>
                        </div>
                        <div className='row justify-content-center'>
                          <ul className='foooter_t_f_ul'>
                            <li>Customer services</li>
                            <li>Product safety information</li>
                            <li>Privacy on Currys</li>
                            <li>Buying guides</li>
                            <li>Contact us</li>
                          </ul>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>


              </div>
            </div>
        </div>
      )
  }
}

const Footer = connect(null,mapDispatchToProps)(ConnectedFooter);
export default Footer;
