import React, { Component }   from 'react';
import { connect }            from "react-redux";
import { openCheckout }       from '../actions/index';
import { openTvCont }         from '../actions/index';
import { openCart }           from '../actions/index';
import Header                 from './Header';
import Footer                 from './Footer';
import {Link,Redirect }       from 'react-router-dom'
import '../css/Checkout.css';

const uuidv1 = require('uuid/v1');


 const mapStateToProps = state => {
  return {  
            userSignedIn:    state.userSignedIn,
            userInfo:        state.userInfo,
            cartItems:       state.cartItems,
            cartTotalSum:    state.cartTotalSum,
            shipToCountry:   state.checkoutSelectedCountry
        };
};

 function mapDispatchToProps(dispatch) {
  return {
            openCheckout: bol => dispatch(openCheckout(bol)),
            openTvCont:   bol => dispatch(openTvCont(bol)),
            openCart:     bol => dispatch(openCart(bol))
        };
}

class ConnectedCheckout extends Component {
  constructor(props) {
    super(props)

    this.state = { 
                    checkoutName: 'Gigel',
                    checkoutNameValid: false,
                    checkoutLastName: 'PoaleinBrau',
                    checkoutLastNameValid: false,
                    checkoutAddress: '',
                    checkoutAddressValid: false,
                    checkoutAddressTwo: '',
                    checkoutCity: '',
                    checkoutCityValid: false,
                    checkoutPhoneNumber: '',
                    checkoutPhoneNumberValid: false,
                    selectedCountry: this.props.shipToCountry,

                    cardNumber: '',
                    cardNumberValid: false,
                    cardExpiryMonth: '',
                    cardExpiryMonthValid: false,
                    cardExpiryYear: '',
                    cardExpiryYearValid: false,
                    cardName: '',
                    cardNameValid: '',
                    cardSecurityCode: '',
                    cardSecurityCodeValid: false,

                    paymentCard: false,
                    paymentCardReference: '',
                    loadingPaymentCard: false,
                    acceptedPayment: false,
                    addressInfoValid: false,
                    finishedPayment: false,

                 }
    }



componentDidMount() {
    // Set document title
  document.title = 'Tv Innovation - Checkout';

  
}

hideAddrInfo() {
  let addrInfoTitleNo = document.querySelector('.co_st_no_txt'),
      addrInfoWrap    = document.querySelector('.checkout_wrap_addressinfo'),
      state           = this.state;

    document.querySelector('.addr_fa_down').classList.toggle('fa_chevron_down');
      // If all address inputs are valid
    if(state.checkoutNameValid && state.checkoutLastNameValid && state.checkoutAddressValid && state.checkoutCityValid && state.checkoutPhoneNumberValid) {
          // If address info step title number contains '2', change it to checked
        if(addrInfoTitleNo.innerHTML === '2') {
          addrInfoTitleNo.innerHTML = '&#10003;';
          } else {
          // If address info step title number contains checked sign, change it to '2'
          addrInfoTitleNo.innerHTML = '2';
        }
          // Display / hide address info wrap with delay
        setTimeout(() => {
          addrInfoWrap.classList.toggle('cowrap_addressInfo_hide');
          this.setState({ addressInfoValid: true })
        },500);
        
      // Display / hide address info wrap with no delay
    } else { addrInfoWrap.classList.toggle('cowrap_addressInfo_hide'); }
}

toggleProductsList() {
    // Hide / display checkout cart products
  document.querySelector('.checkout_cartitems_list').classList.toggle('chko_ci_list_close');
    // Toggle up/down icon
  document.querySelector('.prod_fa_down').classList.toggle('fa_chevron_down');
}
/* ---- Name input ---- */

 handleNameInput(e) {
  let nameValue        = e.target.value,
        // Check name characters
      checkName        =  nameValue.split('').every(x => x.match(/[a-zA-Z ]+/g)),
        // Check name length to be at least 2
      checkNameLength  = nameValue.length >= 2,
       // Check for blank spaces
      checkWhiteSpaces = nameValue.trim().length === nameValue.length;


    if(checkName && checkNameLength && checkWhiteSpaces) {
        this.setState({checkoutName: nameValue, checkoutNameValid: true})
    } else if(nameValue.length === 0) {
      // If input is empty, reset value input / Set addressinfovalid to false to hide Payment section
        this.setState({checkoutName: '', checkoutNameValid: false, addressInfoValid: false})
    } else {
        this.setState({checkoutName: nameValue, checkoutNameValid: false, addressInfoValid: false})
    }
 }

/* ---- Last name input ---- */


handleLastNameInput(e) {
  let lastNameValue       = e.target.value,
        // Check lastname characters
      checkLastName       =  lastNameValue.split('').every(x => x.match(/[a-zA-Z ]+/g)),
        // Check for input not to be only blank spaces
      onlyBlankSpaces     =  lastNameValue.split('').every(x => x.match(/[ ]+/g)),
        // Check username length to be at least 2
      checkLastNameLength = lastNameValue.length >= 2;



    if(checkLastName && checkLastNameLength && !onlyBlankSpaces) {
        this.setState({checkoutLastName: lastNameValue, checkoutLastNameValid: true})
    } else if(lastNameValue.length === 0) {
      // If input is empty, reset value input / Set addressinfovalid to false to hide Payment section
        this.setState({checkoutLastName: '', checkoutLastNameValid: false, addressInfoValid: false})
    } else {
        this.setState({checkoutLastName: lastNameValue, checkoutLastNameValid: false, addressInfoValid: false})
    }
}

/* ---- Address input ---- */

handleAddressInput(e) {
  let addressValue            = e.target.value,
        // Check addressValue characters
      checkAddress            =  addressValue.split('').every(x => x.match(/^[ a-zA-Z0-9-.]*$/)),
        // Check for input not to be only blank spaces
      onlyBlankSpaces         =  addressValue.split('').every(x => x.match(/[ ]+/g)),
        // Check addressValue length to be at least 3
      checkAddressValueLength = addressValue.length >= 3;


    if(checkAddress && checkAddressValueLength && !onlyBlankSpaces) {
        this.setState({checkoutAddress: addressValue, checkoutAddressValid: true})
      } else if(addressValue.length === 0) {
      // If input is empty, reset value input / Set addressinfovalid to false to hide Payment section
        this.setState({checkoutAddress: '', checkoutAddressValid: false, addressInfoValid: false})
      } else {
        this.setState({checkoutAddress: addressValue, checkoutAddressValid: false, addressInfoValid: false})
    }
}

/* ---- Address Two input ---- */

handleAddressTwoInput(e) {
    this.setState({ checkoutAddressTwo: e.target.value })
}

/* ---- City input ---- */

handleCityInput(e) {
  let cityValue            = e.target.value,
        // Check cityvalue characters
      checkCity            =  cityValue.split('').every(x => x.match(/[a-zA-Z ]+/g)),
        // Check cityValue length be at least 2
      checkCityValueLength = cityValue.length >= 2,
       // Check for blank spaces
      checkWhiteSpaces     = cityValue.trim().length === cityValue.length;


    if(checkCity && checkCityValueLength && checkWhiteSpaces) {
        this.setState({checkoutCity: cityValue, checkoutCityValid: true})
      } else if(cityValue.length === 0) {
      // If input is empty, reset value input / Set addressinfovalid to false to hide Payment section
        this.setState({checkoutCity: '', checkoutCityValid: false, addressInfoValid: false})
      } else {
        this.setState({checkoutCity: cityValue, checkoutCityValid: false, addressInfoValid: false})
    }
}

/* ---- Phone input ---- */

handlePhoneInput(e) {
  let phoneValue         = e.target.value,
        // Check phone characters
      checkPhone         =  phoneValue.split('').every(x => x.match(/[0-9 ]+/g)),
        // Check phoneValue length to be at least 10
      checkPhoneLength   = phoneValue.length >= 10,
       // Check for blank spaces
      checkWhiteSpaces   = phoneValue.trim().length === phoneValue.length;


    if(checkPhone && checkPhoneLength && checkWhiteSpaces) {
        this.setState({checkoutPhoneNumber: phoneValue, checkoutPhoneNumberValid: true})
      } else if(phoneValue.length === 0) {
      // If input is empty, reset value input / Set addressinfovalid to false to hide Payment section
        this.setState({checkoutPhoneNumber: '', checkoutPhoneNumberValid: false, addressInfoValid: false})
      } else {
        this.setState({checkoutPhoneNumber: phoneValue, checkoutPhoneNumberValid: false, addressInfoValid: false})
    }
}

handleFocusInput(e) {
  let label = e.target.parentNode.getElementsByTagName('label')[0];

      // Set outline border to clicked span wrapper
  e.target.parentNode.setAttribute('style','border:1px solid #FFF881 !important');
      // If input has no value animiate input text to top
  if(e.target.value === "") {label.setAttribute('style', 'top:-15px !important');}     
}

handleFocusInputOut(e) {
  let label = e.target.parentNode.getElementsByTagName('label')[0];

      // Remove outline border from span wrapper
  e.target.parentNode.removeAttribute('style');
      // If input has no value animate input text to bottom
  if(e.target.value === "") {label.removeAttribute('style');}
}


confirmCheckoutInfo() {
  let coSpanName      = document.querySelector('.co_sp_name'),
      coSpanLastName  = document.querySelector('.co_sp_lastname'),
      coSpanAddress   = document.querySelector('.co_sp_address'),
      coSpanCity      = document.querySelector('.co_sp_city'),
      coSpanPhone     = document.querySelector('.co_sp_phone'),
      nameErr         = document.querySelector('.error_check_name'),
      lastNameErr     = document.querySelector('.error_check_lastName'),
      addressErr      = document.querySelector('.error_check_address'),
      cityErr         = document.querySelector('.error_check_city'),
      phoneErr        = document.querySelector('.error_check_phone');



      // Check if all input values are valid, if not, display error message
  if(this.state.checkoutNameValid) { 
      nameErr.style.display = 'none';
        
    if(this.state.checkoutLastNameValid) { 
        lastNameErr.style.display = 'none';
        
      if(this.state.checkoutAddressValid) { 
          addressErr.style.display = 'none';
        
        if(this.state.checkoutCityValid) { 
            cityErr.style.display = 'none';
          
          if(this.state.checkoutPhoneNumberValid) { 
              phoneErr.style.display = 'none';

              // Call function to hide address info section
                this.hideAddrInfo();
              // If any input of checkout container is not valid, display error message and hightlight input
          } else { 
              phoneErr.style.display = 'block';
              coSpanPhone.setAttribute('style', 'border:1px solid #FF4C4C;');
              setTimeout(() => { coSpanPhone.removeAttribute('style'); phoneErr.style.display = 'none'; this.setState({ addressInfoValid: false })},1500)}
        } else { cityErr.style.display = 'block';
                 coSpanCity.setAttribute('style', 'border:1px solid #FF4C4C;');
                 setTimeout(() => { coSpanCity.removeAttribute('style'); cityErr.style.display = 'none'; this.setState({ addressInfoValid: false })},1500)}
      } else { addressErr.style.display = 'block';
               coSpanAddress.setAttribute('style', 'border:1px solid #FF4C4C;');
               setTimeout(() => { coSpanAddress.removeAttribute('style'); addressErr.style.display = 'none'; this.setState({ addressInfoValid: false })},1500)}
    } else { lastNameErr.style.display = 'block';
             coSpanLastName.setAttribute('style', 'border:1px solid #FF4C4C;');
             setTimeout(() => { coSpanLastName.removeAttribute('style'); lastNameErr.style.display = 'none'; this.setState({ addressInfoValid: false })},1500)}
  } else { nameErr.style.display = 'block'; 
           coSpanName.setAttribute('style', 'border:1px solid #FF4C4C;');
           setTimeout(() => { coSpanName.removeAttribute('style'); nameErr.style.display = 'none'; this.setState({ addressInfoValid: false })},1500)}
}

payCardMethod() {
    // Set a random payment reference number
  let payRef = uuidv1().substr(0,8).toUpperCase(),
      cardLoading = document.querySelector('.card_pmth_butt');

    // Highlight payCard method button and restore default payPal method button
  document.querySelector('.paycard_method_butt').classList.add('high_sel_paybutton');
  document.querySelector('.paypal_method_butt').classList.remove('high_sel_paybutton');
    // Display loading effect
  cardLoading.style.display = 'inline-block';
    
  setTimeout(() => {
      // Display paymentcard box, close paypal box and set the random paymentRef code
    this.setState({ paymentCard: true, paymentCardReference: payRef })
      // Hide loading effect
    cardLoading.style.display = 'none';
  },1500);

  
}
payPayPalMethod() {
  let payPalLoading = document.querySelector('.paypal_pmth_butt'),
      url = 'https://www.paypal.com/us/signin';

    // Highlight paypal method button and restore default payCard method button
  document.querySelector('.paycard_method_butt').classList.remove('high_sel_paybutton');
  document.querySelector('.paypal_method_butt').classList.add('high_sel_paybutton');

  // Display loading effect
  payPalLoading.style.display = 'inline-block';
    
  setTimeout(() => {
      // Hide paymentcard box, display paypal box
    this.setState({ paymentCard: false })
      // Hide loading effect
    payPalLoading.style.display = 'none';
      // Open paypal page to proceed with payment
    window.location = url;
  },1500);
}

handleCardInputFocus(e) {
    // Highlight input on click
  e.target.parentNode.setAttribute('style', 'border:1px solid #FBF14F !important');
}
handleCardInputFocusOut(e) {
    // Restore default border
  e.target.parentNode.removeAttribute('style');
}

handleCardNumberChange(e) {
  let cardNumber            = e.target.value,
        // Check cardNumber characters
      checkCardNumber       =  cardNumber.split('').every(x => x.match(/[0-9]+/g)),
        // Check cardNumber length to be equal with 16 (normal card length numbers)
      checkCardNumberLength = cardNumber.length === 16,
       // Check for blank spaces
      checkWhiteSpaces      = cardNumber.trim().length === cardNumber.length;


    if(checkCardNumber && checkCardNumberLength && checkWhiteSpaces) {
        this.setState({cardNumber: cardNumber, cardNumberValid: true})
      } else if(cardNumber.length === 0) {
      // If input is empty, reset value input
        this.setState({cardNumber: '', cardNumberValid: false})
      } else {
        this.setState({cardNumber: cardNumber, cardNumberValid: false})
    }
}

handleCardMonthChange(e) {
  let cardMonth            = e.target.value,
        // Check cardMonth characters
      checkCardMonth       =  cardMonth.split('').every(x => x.match(/[0-9]+/g)),
       // Check cardMonth length to be equal with 2
      checkCardMonthLength = cardMonth.length === 2,
       // Check for blank spaces
      checkWhiteSpaces     = cardMonth.trim().length === cardMonth.length,
       // Available months
      months               = ['01','02','03','04','05','06','07','08','09','10','11','12'],
       // Check if is a valid month
      validMonth           = months.includes(cardMonth);


    if(checkCardMonth && checkCardMonthLength && checkWhiteSpaces && validMonth) {
        this.setState({cardExpiryMonth: cardMonth, cardExpiryMonthValid: true})
      } else if(cardMonth.length === 0) {
      // If input is empty, reset value input
        this.setState({cardExpiryMonth: '', cardExpiryMonthValid: false})
      } else {
        this.setState({cardExpiryMonth: cardMonth, cardExpiryMonthValid: false})
    }
    
}

handleCardYearChange(e) {
  let cardYear            = e.target.value,
        // Check cardYear characters
      checkCardYear       =  cardYear.split('').every(x => x.match(/[0-9]+/g)),
        // Check cardYear length to be equal with 2
      checkCardYearLength = cardYear.length === 2,
       // Check for blank spaces
      checkWhiteSpaces    = cardYear.trim().length === cardYear.length,
       // Check year to be grater or equal with 20 (2020)
      graterThan20        = parseFloat(cardYear) >= 20;


    if(checkCardYear && checkCardYearLength && checkWhiteSpaces && graterThan20) {
        this.setState({cardExpiryYear: cardYear, cardExpiryYearValid: true})
      } else if (cardYear.length === 0) {
      // If input is empty, reset value input
        this.setState({cardExpiryYear: '', cardExpiryYearValid: false})
      } else {
        this.setState({cardExpiryYear: cardYear, cardExpiryYearValid: false})
    }
}

handleCardNameChange(e) {
  let cardName            = e.target.value,
        // Check cardName characters
      checkCardName       =  cardName.split('').every(x => x.match(/[a-zA-Z ]+/g)),
        // Check for input not to be only blank spaces
      onlyBlankSpaces     =  cardName.split('').every(x => x.match(/[ ]+/g)),
        // Check cardName length to higher than 5 characters
      checkCardNameLength = cardName.length >= 5;


    if(checkCardName && checkCardNameLength && !onlyBlankSpaces) {
        this.setState({cardName: cardName, cardNameValid: true})
      } else if(cardName.length === 0) {
      // If input is empty, reset value input
        this.setState({cardName: '', cardNameValid: false})
      } else {
        this.setState({cardName: cardName, cardNameValid: false})
    }
}

handleCardSecurityChange(e) {
  let cardSecurity            = e.target.value,
        // Check cardSecurity characters
      checkCardSecurity       =  cardSecurity.split('').every(x => x.match(/[0-9]+/g)),
        // Check cardSecurity length to be at least 3
      checkCardSecurityLength = cardSecurity.length >= 3,
       // Check for blank spaces
      checkWhiteSpaces        = cardSecurity.trim().length === cardSecurity.length;


    if(checkCardSecurity && checkCardSecurityLength && checkWhiteSpaces) {
        this.setState({cardSecurityCode: cardSecurity, cardSecurityCodeValid: true})
      } else if(cardSecurity.length === 0) {
      // If input is empty, reset value input
        this.setState({cardSecurityCode: '', cardSecurityCodeValid: false})
      } else {
        this.setState({cardSecurityCode: cardSecurity, cardSecurityCodeValid: false})
    }
}

payNow() {
  let inputCardNumberSpan  = document.querySelector('.wpicardinput_number'),
      inputCardMonthSpan   = document.querySelector('.co_wpicard_mm'),
      inputCardYearSpan    = document.querySelector('.co_wpicard_yy'),
      inputCardNameSpan    = document.querySelector('.wpicardinput_cardname'),
      inputCardSecCodeSpan = document.querySelector('.co_wpicard_secode'),
      state                = this.state;

        // If state is valid, proceed to next input validation
      if(state.cardNumber) {
        inputCardNumberSpan.removeAttribute('style');
        if(state.cardExpiryMonth) {
          inputCardMonthSpan.removeAttribute('style');
          if(state.cardExpiryYear) {
            inputCardYearSpan.removeAttribute('style');
            if(state.cardName) {
              inputCardNameSpan.removeAttribute('style');
              if(state.cardSecurityCode) {
                inputCardSecCodeSpan.removeAttribute('style');

                  this.finishPay();
        // If any input is not valid, hightlight input
              } else {inputCardSecCodeSpan.setAttribute('style','border:2px solid #FF4C4C');}
                 
            } else {inputCardNameSpan.setAttribute('style','border:2px solid #FF4C4C');}
              
          } else {inputCardYearSpan.setAttribute('style','border:2px solid #FF4C4C');}
            
        } else {inputCardMonthSpan.setAttribute('style','border:2px solid #FF4C4C');}
          
      } else {inputCardNumberSpan.setAttribute('style','border:2px solid #FF4C4C');} 
}

cancelPayment() {

        // Reset all card payment info
  this.setState({
                    cardNumber: '',
                    cardNumberValid: false,
                    cardExpiryMonth: '',
                    cardExpiryMonthValid: false,
                    cardExpiryYear: '',
                    cardExpiryYearValid: false,
                    cardName: '',
                    cardNameValid: '',
                    cardSecurityCode: '',
                    cardSecurityCodeValid: false,
                    paymentCard: false,
                })
    // Restore payment method buttons style
    document.querySelector('.paycard_method_butt').classList.remove('high_sel_paybutton');
    document.querySelector('.paypal_method_butt').classList.remove('high_sel_paybutton');
    // Reset all card inputs values
    document.querySelector('.card_input_number').value  = '';
    document.querySelector('.card_input_month').value   = '';
    document.querySelector('.card_input_year').value    = '';
    document.querySelector('.card_input_name').value    = '';
    document.querySelector('.card_input_seccode').value = '';

}

finishPay() {
      // Display payment card loading effect
    this.setState({ loadingPaymentCard: true })
      // Display receipt box / Hide checkout container / Hide payment card loading effect
    setTimeout(() => {
      this.setState({ acceptedPayment: true, finishedPayment: true, loadingPaymentCard: false })
      // Highlight Receipt step on checkout navbar
      document.querySelector('.step_receipt').classList.add('step_receipt_done');
    },2000);
}
receiptmailto() {
  window.location = 'mailto: tvinnovation@tvinnovation.com';
}

continueShoppingNav() {
  this.props.openCheckout  ({ openCheckout: false })
  this.props.openTvCont    ({ openTvCont: true })
}

receiptBackToHome() { window.location.reload();}

receiptEditCart() {
  this.props.openCheckout  ({ openCheckout: false })
  this.props.openCart      ({ openCart: true })
}
  render() {
    if(!this.props.cartItems.length > 0) { 
      return <Redirect to='/'/>;
    }
    

    return (
        <div>
          <div className='col-12'>
            <Header />
            
                <div className='row'>
                  <div className='checkout_container col-12'>
                    <div className='row justify-content-center'>
                      <div className='wrap_checkout_container col-11 col-sm-11 col-lg-11'>

                      {this.props.cartItems.length !== 0 && (
                        <div>
                          {/* ------ Checkout nav container ------ */}
                          <div className='row'> 
                            <div className='checkout_nav col-12'>
                              <div className='row justify-content-center'>
                                <span className='checkout_nav_back ml-auto'>
                                 <Link to={process.env.PUBLIC_URL + '/'}>
                                  <i className='fas fa-chevron-left' onClick={() => this.continueShoppingNav()}></i>
                                  <span tabIndex='0' onClick={() => this.continueShoppingNav()}>Continue shopping</span>
                                 </Link>
                                </span>
                                <div className='checkout_nav_steps'>
                                  <div className='row justify-content-center'>
                                      <div className='check_cart_step'>
                                        <span>Cart</span>
                                        <span data-element='Step'></span>
                                      </div>
                                      <div className='check_cart_step'>
                                        <span>Checkout</span>
                                        <span data-element='Step'></span>
                                      </div>
                                      <div className='check_cart_step'>
                                        <span className='step_receipt_txt'>Receipt</span>
                                        <span data-element='Step' className='step_receipt'></span>
                                      </div>
                                  </div>  
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* ------ Checkout info wrapper ------ */}
                          {!this.state.finishedPayment && (
                          <div className='row justify-content-center'>
                            <div className='checkout_info_wrapper col-10 col-lg-9'>
                              {/* --- Checkbox products first row --- */}


                              <div className='row'>
                                <div className='cart_title_row col-12'>
                                  <div className='row'>
                                    <span className='checkout_step_number'>
                                      <span>&#10003;</span>
                                    </span>
                                    <span className='check_products_title mr-auto'>
                                      Products in your cart
                                      (
                                      <span className='check_products_no'>{this.props.cartItems.length}</span>
                                      )
                                      <i tabIndex='0' className='fas fa-chevron-up prod_fa_down' onClick={() => this.toggleProductsList()}></i>
                                    </span>
                                     <Link to={process.env.PUBLIC_URL + '/cart'}
                                           onClick={() => this.receiptEditCart()}
                                           tabIndex='0'
                                           className='check_products_edit ml-auto'>
                                            Edit your cart
                                   
                                    </Link>
                                    <span className='check_products_edit_icon ml-auto'
                                          onClick={() => this.receiptEditCart()}>
                                       <Link to={process.env.PUBLIC_URL + '/cart'}>
                                       <i className='fas fa-edit'></i>
                                       </Link>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* --- Checkbox cart products list --- */}

                                <div className='row justify-content-center'>
                                  <div className='checkout_cartitems_list col-11 col-lg-9'>
                                    <div className='row'>

                                    {this.props.cartItems.map((prod) => 
                                      <div key={prod.id} className='check_prod_box col-12'>
                                        <div className='row justify-content-center'>
                                          <div className='checko_ci_prod_info col-9'>
                                            <div className='row'>
                                              <span className='checko_ci_prod_img col-4'>
                                                <span className='row justify-content-center'>
                                                  <img src={prod.image} alt={prod.title}/>
                                                </span>
                                              </span>
                                              <span className='checko_ci_prod_descr col-8'>
                                                <span>{prod.title}</span>
                                                <span>Quantity: {prod.selectedQuantity}</span>
                                              </span>
                                            </div>
                                          </div>
                                          <div className='checko_ci_prod_price col-3'>
                                            <div className='row justify-content-center'>
                                                <span>${prod.price}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div> )}
                                    </div>
                                  </div>
                                </div>

                              {/* --- Checkbox address second row --- */}
                              <div className='row'>
                                <div className='cart_title_row col-12'>
                                  <div className='row'>
                                    <span className='checkout_step_number'>
                                      <span className='co_st_no_txt'>2</span>
                                    </span>
                                    <span className='check_address_title mr-auto'>
                                        Address info
                                      <span onClick={() => this.hideAddrInfo()}>
                                         <i tabIndex='0' className='fas fa-chevron-up addr_fa_down'></i>
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>  

                              <div className='row justify-content-center'>
                                <div className='checkout_wrap_addressinfo col-11 col-sm-11 col-md-10 '>
                                  <div className='row justify-content-center'>
                                    <div className='co_wrap_wrapp_inputs col-12 col-sm-9 col-lg-7 col-xl-6'>
                                      
                                      {/* ---- Name input ---- */}
                                      <div className='row'>
                                        <span className='co_span_input co_sp_name'>
                                          <label className='co_name_txt'>Name<span>*</span></label>
                                          <input className='co_name_input'
                                                 onFocus={(e)   => this.handleFocusInput(e)}
                                                 onBlur={(e)    => this.handleFocusInputOut(e)}
                                                 onChange={(e)  => this.handleNameInput(e)}>
                                          </input>
                                        </span>
                                      </div>
                                      <div className='row'>
                                        <span className='check_error_msg error_check_name'>Invalid name</span>
                                      </div>

                                      {/* ---- Last Name input ---- */}
                                      <div className='row'>
                                        <span className='co_span_input co_sp_lastname'>
                                          <label className='co_lastNameLab_txt'>Last name<span>*</span></label>
                                          <input className='co_lastName_input'
                                                 onFocus={(e)   => this.handleFocusInput(e)}
                                                 onBlur={(e)    => this.handleFocusInputOut(e)}
                                                 onChange={(e)  => this.handleLastNameInput(e)}>
                                          </input>
                                        </span>
                                      </div>
                                      <div className='row'>
                                        <span className='check_error_msg error_check_lastName'>Invalid last name</span>
                                      </div>

                                      {/* ---- Address input ---- */}
                                      <div className='row'>
                                        <span className='co_span_input co_sp_address'>
                                          <label className='co_address_txt'>Address<span>*</span></label>
                                          <input className='co_address_input'
                                                 onFocus={(e)   => this.handleFocusInput(e)}
                                                 onBlur={(e)    => this.handleFocusInputOut(e)}
                                                 onChange={(e)  => this.handleAddressInput(e)}>
                                          </input>
                                        </span>
                                      </div>
                                      <div className='row'>
                                        <span className='check_error_msg error_check_address'>Invalid address</span>
                                      </div>

                                      {/* ---- Address 2 input ---- */}
                                      <div className='row'>
                                        <span className='co_span_input co_sp_address_opt'>
                                          <label className='co_address_opt_txt'>Address 2 (optional)</label>
                                          <input className='co_address_input_opt'
                                                 onFocus={(e)   => this.handleFocusInput(e)}
                                                 onBlur={(e)    => this.handleFocusInputOut(e)}
                                                 onChange={(e)  => this.handleAddressTwoInput(e)}>
                                          </input>
                                        </span>
                                      </div>
                                      


                                      {/* ---- City input ---- */}
                                      <div className='row'>
                                        <span className='co_span_input co_sp_city'>
                                          <label className='co_city_txt'>City<span>*</span></label>
                                          <input className='co_city_input'
                                                 onFocus={(e)   => this.handleFocusInput(e)}
                                                 onBlur={(e)    => this.handleFocusInputOut(e)}
                                                 onChange={(e)  => this.handleCityInput(e)}>
                                          </input>
                                        </span>
                                      </div>
                                      <div className='row'>
                                        <span className='check_error_msg error_check_city'>Invalid city</span>
                                      </div>

                                    {/* ---- Country input ---- */}
                                      <div className='row'>
                                        <span className='co_span_input co_sp_country'>
                                          <input className='co_country_input'
                                                 defaultValue={this.state.selectedCountry}>
                                          </input>
                                        </span>
                                      </div>
                                  

                                       {/* ---- Phone input ---- */}
                                      <div className='row'>
                                        <span className='co_span_input co_sp_phone'>
                                          <label className='co_phone_txt'>Phone number<span>*</span></label>
                                          <input className='co_phone_input'
                                                 onFocus={(e)   => this.handleFocusInput(e)}
                                                 onBlur={(e)    => this.handleFocusInputOut(e)}
                                                 onChange={(e)  => this.handlePhoneInput(e)}>
                                          </input>
                                        </span>
                                      </div>
                                      <div className='row'>
                                        <span className='check_error_msg error_check_phone'>Invalid phone</span>
                                      </div>

                                      {/* --- How we should contact your row --- */}
                                      <div className='row justify-content-center'>
                                        <div className='co_howshouldcontact_div'>
                                            <span>How should we contact you?</span>

                                            <div className='checkbox-container'>
                                              <label className='checkbox-label'>
                                                  <input tabIndex='0' type='checkbox'></input>
                                                  <span tabIndex='0' className='checkbox-custom rectangular'></span>
                                              </label>
                                              <div className='co_checkbox_input_title'>Email</div>
                                            </div>
                                        </div>
                                      </div>

                                      {/* --- Confirm and continue --- */}
                                      <div className='row justify-content-center'>
                                        <span className='co_cofandcont_button'
                                              tabIndex='0'
                                              onClick={() => this.confirmCheckoutInfo()}>
                                              Confirm & continue
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>


                              {/* --- Checkbox address third row --- */}
                              <div className='row'>
                                <div className='cart_title_row col-12'>
                                  <div className='row'>
                                    <span className='checkout_step_number'>
                                      <span>3</span>
                                    </span>
                                    <span className='check_address_title mr-auto'>Payment</span>
                                  </div>
                                </div>
                              </div>  
                             
                                {/* --- Choose payment method --- */}
                              {this.state.addressInfoValid && (  
                              <div className='row justify-content-center'>
                                <div className='co_wrap_payment col-11'>
                                  <div className='row justify-content-center'>
                                    <span className='co_pay_title'>Choose a payment method</span>
                                  </div>
                                  <div className='row justify-content-center'>
                                    <div className='co_wrap_pay_method col-12'>
                                      <div className='row justify-content-center'>
                                        <div tabIndex='0' className='paycard_method_butt col-5 col-md-4 col-lg-3'
                                              onClick={() => this.payCardMethod()}>
                                              <i className='far fa-credit-card'></i>
                                              Card
                                              <div className='pay_method_load_button card_pmth_butt'>
                                                <div></div><div></div><div></div><div></div>
                                              </div>
                                        </div>
                                        <div tabIndex='0' className='paypal_method_butt paypal_butt col-5 col-md-4 col-lg-3'
                                              onClick={() => this.payPayPalMethod()}>
                                              <div className='pay_method_load_button paypal_pmth_butt'>
                                                <div></div><div></div><div></div><div></div>
                                              </div>
                                        </div>   
                                      </div>
                                    </div>
                                  </div>
                                    {/* --- Verified img --- */}
                                  <div className='row justify-content-center'>
                                    <div className='co_wrap_verified'>
                                      <div className='row justify-content-center'>
                                        <span></span>
                                        <span></span>
                                      </div>
                                    </div>
                                  </div>

                                  {this.state.paymentCard && (
                                  <div className='row'>
                                    <div className='co_wrap_card_payment col-12'>

                                    {this.state.loadingPaymentCard && (
                                      <div className='cw_cardpay_loading'>
                                        <div className='row justify-content-center'>
                                          <div className='cw_cp_load_eff'>
                                            <div></div><div></div><div></div>
                                          </div>
                                        </div>
                                      </div>
                                    )}


                                      <div className='row'>
                                        <span className='co_ord_summ_title'>
                                            Order summary
                                        </span>
                                      </div>
                                      <div className='row'>
                                        <div className='co_order_summary col-12'>
                                          <div className='row justify-content-center'>
                                            <div className='col-12 col-sm-6 col-lg-6'>
                                              <span>Payment reference:</span>
                                            </div>
                                            <div className='col-12 col-sm-6 col-lg-6'>
                                              <span className='co_sum_info'>{this.state.paymentCardReference}</span>
                                            </div>
                                          </div>
                                          <div className='row justify-content-center'>
                                            <div className='col-12 col-sm-6 col-lg-6'>
                                              <span>Amount (USD):</span>
                                            </div>
                                            <div className='col-12 col-sm-6 col-lg-6'>
                                              <span className='co_sum_info'>${this.props.cartTotalSum}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div> 
                                    
                                      <div className='row justify-content-center'>
                                        <div className='co_wrap_pay_info col-12'>
                                          <div className='row'>
                                                  <span className='col-12 co_wpayi_acc_img d-block d-sm-block d-md-block d-lg-none d-xl-none'>
                                                    <span className='row float-right'>
                                                      <img src={require('../images/checkout/maestro.png')}    alt=''/>
                                                      <img src={require('../images/checkout/visa.png')}       alt=''/>
                                                      <img src={require('../images/checkout/mastercard.png')} alt=''/>
                                                    </span>
                                                  </span>
                                            </div>
                                          <div className='row'>
                                            <div className='co_wpayinfo_div col-12 col-md-12 col-lg-6'>
                                              <div className='row'>
                                                <span className='co_wpinfo_title'>Payment details</span>
                                              </div>
                                              <div className='row'>
                                                <span className='co_wpinfo_subtitle'><span>*</span> indicates a required field</span>
                                              </div>
                                              <div className='row'>
                                                <span className='co_wpicard_infotitle'>Card number<span>*</span></span>
                                              </div>
                                              <div className='row justify-content-center'>
                                                <span className='wpicardinput_number col-11'>
                                                  <input type='text'
                                                         className='card_input_number'
                                                         maxLength='16'
                                                         onFocus={(e)  => this.handleCardInputFocus(e)}
                                                         onBlur={(e)   => this.handleCardInputFocusOut(e)}
                                                         onChange={(e) => this.handleCardNumberChange(e)}>
                                                  </input>
                                                </span>
                                              </div>
                                              <div className='row'>
                                                <span className='co_wpicard_infotitle'>Expiry date<span>*</span></span>
                                              </div>
                                              <div className='row'>
                                                <div className='co_wpicard_expirydatediv col-11'>
                                                  <span className='co_wpicard_mm'>
                                                    <input placeholder='MM' 
                                                           type='text'
                                                           className='card_input_month'
                                                           maxLength='2'
                                                           onFocus={(e)  => this.handleCardInputFocus(e)}
                                                           onBlur={(e)   => this.handleCardInputFocusOut(e)}
                                                           onChange={(e) => this.handleCardMonthChange(e)}>
                                                    </input>
                                                  </span>
                                                  <span>/</span>
                                                  <span className='co_wpicard_yy'>
                                                    <input placeholder='YY' 
                                                           className='card_input_year'
                                                           type='text'
                                                           maxLength='2'
                                                           onFocus={(e)  => this.handleCardInputFocus(e)}
                                                           onBlur={(e)   => this.handleCardInputFocusOut(e)}
                                                           onChange={(e) => this.handleCardYearChange(e)}>
                                                    </input>
                                                  </span>
                                                </div>
                                              </div> 
                                           </div>


                                            {/* ---- Checkout second card info div ---- */}
                                            <div className='co_wpayinfo_div col-12 col-md-12 col-lg-6'>

                                              {/* ---- Accepted card images ---- */}
                                              <div className='row'>
                                                <span className='col-12 co_wpayi_acc_img d-none d-sm-none d-md-none d-lg-block'>
                                                  <span className='row float-right'>
                                                    <img src={require('../images/checkout/maestro.png')} alt=''/>
                                                    <img src={require('../images/checkout/visa.png')} alt=''/>
                                                    <img src={require('../images/checkout/mastercard.png')} alt=''/>
                                                  </span>
                                                </span>
                                              </div>

                                               {/* ---- Cardholder's name ---- */}
                                              <div className='row'>
                                                <span className='co_wpicard_infotitle'>Cardholder's name<span>*</span></span>
                                              </div>
                                              <div className='row justify-content-center'>
                                                <span className='wpicardinput_cardname col-11'>
                                                  <input type='text'
                                                         className='card_input_name'
                                                         onFocus={(e)  => this.handleCardInputFocus(e)}
                                                         onBlur={(e)   => this.handleCardInputFocusOut(e)}
                                                         onChange={(e) => this.handleCardNameChange(e)}>
                                                  </input>
                                                </span>
                                              </div>
                                                {/* ---- Security code ---- */}
                                              <div className='row'>
                                                <span className='co_wpicard_infotitle'>Security code<span>*</span></span>
                                              </div>
                                              <div className='row justify-content-center'>
                                                <div className='co_wpicard_secode_wrap col-11'>
                                                  <div className='row'>
                                                    <span className='co_wpicard_secode'>
                                                      <input type='text'
                                                             className='card_input_seccode'
                                                             maxLength='4'
                                                             onFocus={(e)  => this.handleCardInputFocus(e)}
                                                             onBlur={(e)   => this.handleCardInputFocusOut(e)}
                                                             onChange={(e) => this.handleCardSecurityChange(e)}>
                                                      </input>
                                                    </span>

                                                    <span className='co_wpicard_secode_img'></span>
                                                    <span className='col-5 col-lg-6 ml-auto'>3 digits on the back of the card or 4 digits on the front of card</span>
                                                  </div>
                                                </div>
                                              </div>

                                               
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* --- Cancel / Pay buttons --- */}
                                      <div className='row justify-content-center'>
                                        <div className='co_wpicard_wrap_buttons col-12'>
                                          <div className='row justify-content-center'>
                                            <span className='co_wpicard_button col-11 col-sm-9 col-md-4 col-lg-3'
                                                  onClick={() => this.cancelPayment()}
                                                  tabIndex='0'>
                                                  Cancel payment
                                            </span>
                                            <span className='co_wpicard_button col-11 col-sm-9 col-md-4 col-lg-3'
                                                  onClick={() => this.payNow()}
                                                  tabIndex='0'>
                                                  Pay now
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  )}
                                  
                                </div>
                              </div>
                              )}

                            </div>
                          </div>
                          )}

                          {/* ------ Receipt box ------ */}
                         {this.state.acceptedPayment && (
                          <div className='row justify-content-center'>
                            
                            <div className='receipt_info_wrapper col-10 col-lg-9'>
                              <div className='row justify-content-center'>
                                <div className='receipt_trans_succ col-12'>
                                    Transaction successful
                                    <span className='row justify-content-center'>
                                        You will receive soon an email with the details of your order.
                                    </span>
                                </div>
                              </div>

                              {/* --- Receipt transaction details --- */}
                              
                              <div className='row'>
                                <div className='wrap_rec_transdettag col-11 col-md-8 col-lg-8'>
                                  <div className='row'>
                                    <span className='rec_transdet_tag'>Transaction details</span>
                                  </div>
                                </div>
                              </div>

                              <div className='row justify-content-center'>
                                <div className='receipt_order_details col-11 col-md-8 col-lg-6'>
                                  <div className='row'>
                                    <span className='rec_info_title col-12 col-sm-7 col-md-7 col-lg-7'>Name</span>
                                    <span className='rec_info_val col-12 col-sm-5 col-md-5 col-lg-5'>{this.state.checkoutName}</span>
                                  </div>
                                  <div className='row'>
                                    <span className='rec_info_title col-12 col-sm-7 col-md-7 col-lg-7'>Last name</span>
                                    <span className='rec_info_val col-12 col-sm-5 col-md-5 col-lg-5'>{this.state.checkoutLastName}</span>
                                  </div>
                                  <div className='row'>
                                    <span className='rec_info_title col-12 col-sm-7 col-md-7 col-lg-7'> Payment ref.no</span>
                                    <span className='rec_info_val col-12 col-sm-5 col-md-5 col-lg-5'>{this.state.paymentCardReference}</span>
                                  </div>
                                  <div className='row'>
                                    <span className='rec_info_title col-12 col-sm-7 col-md-7 col-lg-7'>Order number</span>
                                    <span className='rec_info_val col-12 col-sm-5 col-md-5 col-lg-5'>11404557</span>
                                  </div>
                                  <div className='row'>
                                    <span className='rec_info_title col-12 col-sm-7 col-md-7 col-lg-7'>Total paid</span>
                                    <span className='rec_info_val col-12 col-sm-5 col-md-5 col-lg-5'>${this.props.cartTotalSum}</span>
                                  </div>
                                </div>
                              </div>

                              {/* --- Support receipt box --- */}

                              <div className='row justify-content-center'>
                                <div className='receipt_box_support col-11 col-md-8 col-lg-6'>
                                 <div className='row justify-content-center'>
                                    <span>TV INNOVATION SUPPORT</span>
                                 </div>
                                 <div className='row justify-content-center'>
                                    <span>00 1111-2222</span>
                                  </div>
                                 <div className='row justify-content-center'>
                                    <span tabIndex='0' className='receipt_mail' onClick={() => this.receiptmailto()}>tvinnovation@tvinnovation.com</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* --- Back to home receipt box --- */}
                              <div className='row justify-content-center'>
                                <span className='receipt_backtohome_button col-10 col-sm-8 col-md-5 col-lg-4'
                                      onClick={() => this.receiptBackToHome()}
                                      tabIndex='0'>
                                      Back to home
                                </span>
                              </div>
                            </div>
                          </div>
                          )}
                        </div>
                      )}

                      </div>
                    </div>
                  </div>
                </div>
            
            <Footer /> 
        </div>
       </div>
      )
  }
}

const Checkout = connect(mapStateToProps,mapDispatchToProps)(ConnectedCheckout);
export default Checkout;
