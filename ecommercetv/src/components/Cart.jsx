import React, { Component }   from 'react';
import tvProducts             from '../jsonData/tvProducts.js';
import Header                 from './Header';
import Footer                 from './Footer';
import {Link }                from 'react-router-dom'
import { connect }            from "react-redux";
import { openCart,
         openTvCont,
         selectedProduct,
         viewProductDetails,
         tvCartProductsFunc,
         addedToCart, 
         mayBeInterested,
         mayBeInterestedTwo,
         openUserMenuFunct,
         openCheckout,
         cartTotalSum,
         openSigninSignUp,
         checkoutSelCountry }  from '../actions/index';
import '../css/Cart.css';



const mapStateToProps = state => {
  return {  openCart                    : state.openCart,
            product                     : state.product,
            tvCartProducts              : state.tvCartProducts,
            cartItems                   : state.cartItems,
            mayBeInterestedProducts     : state.mayBeInterestedProducts,
            mayBeInterestedProducts_two : state.mayBeInterestedProducts_two,
            userSignedIn                : state.userSignedIn
        };
      };

 function mapDispatchToProps(dispatch) {
  return {
    openTvCont         : bol     => dispatch(openTvCont(bol)),
    openCart           : bol     => dispatch(openCart(bol)),
    viewProductDetails : bol     => dispatch(viewProductDetails(bol)),
    selectedProduct    : product => dispatch(selectedProduct(product)),
    addedToCart        : bol     => dispatch(addedToCart(bol)),
    tvCartProductsFunc : prod    => dispatch(tvCartProductsFunc(prod)),
    mayBeInterested    : prod    => dispatch(mayBeInterested(prod)),
    mayBeInterestedTwo : prod    => dispatch(mayBeInterestedTwo(prod)),
    openCheckout       : bol     => dispatch(openCheckout(bol)),
    cartTotalSum       : no      => dispatch(cartTotalSum(no)),
    openSigninSignUp   : bol     => dispatch(openSigninSignUp(bol)),
    openUserMenuFunct  : bol     => dispatch(openUserMenuFunct(bol)),
    checkoutSelCountry : bol     => dispatch(checkoutSelCountry(bol))
    
  };
}


class ConnectedCart extends Component {
  constructor(props) {
    super(props)

      this.state = {
                exploreItems : [],
                emptyCart    : false,
                countryList  : ["Italy","Australia","Austria","Belgium","Canada","Denmark","Finland","France","Germany","Iceland","Ireland","Japan","Netherlands","New Zealand","Norway","Poland","South Korea","Spain","Sweden","Switzerland","Taiwan","United Kingdom","United States"],
                quantity     : [1,2,3,4,5,6,7,8,9,10,15,20,25,30]
      }
   }



componentDidMount() {
  let cartItems = [...this.props.cartItems];

      // Remove highlighted nav menu
  document.querySelector('.nav_sp_home').classList.remove('nav_active');
  document.querySelector('.nav_sp_contact').classList.remove('nav_active');
      // Call function to get 4 random products to be displayed as explore items inside cart container
  this.getRandomExploreItems();
      // Set document title
  document.title = 'Tv Innovation - Cart';
  

  // EVENT LISTENERS //

      // If cartItems length > 0 add eventlistener to handle checkout position on scroll (style behavior)
  if(this.props.cartItems.length !== 0) {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleScroll);
  }

  // RESTORE DEFAULTS VALUE FOR PRODUCTS //

    // Restore default product image profile 
  if(cartItems.length > 0) {
    for(let i=0; i<cartItems.length;i++) {
      cartItems[i].image = cartItems[i].imageGallery[0];
    }
    this.props.addedToCart({ cartItems: cartItems})
  }


  // LOOP OVER PRODUCTS FOR QUANTITY CHANGES //

  // If cartItems is not empty, map through cartItems, search for products with quantity changed and set value to product option element
  if(this.props.cartItems.length > 0) {
  
    let cartItems   = this.props.cartItems,
        match       = [],
        wrapOptions = document.querySelector('.cart_show_items'),
        options     = wrapOptions.getElementsByTagName('option');

      // Check for any product quantity changes and push into a new array the quantity of products and the id. 
    for(let i=0;i<cartItems.length;i++) {
      if(cartItems[i].selectedQuantity > 1) {
        match.push({"id": cartItems[i].id , "selectedQuantity": cartItems[i].selectedQuantity});
    }}
      // Map through option elements and match array, were i pushed the products with quantity changed
    for(let i=0;i< options.length;i++) {
      for(let z=0;z< match.length;z++) {
        // If option contains class from match array, change select option with the selected quantity from product
    if(options[i].classList.contains(match[z].id)) {
        if(parseFloat(options[i].value) === match[z].selectedQuantity ) {
          options[i].setAttribute('selected','selected');
        }}
      }}
   }
}

getRandomExploreItems() {
    let randomExploreItems = [];
    
    // Loop 7 times to avoid duplicates of explore items
  for(let i=0;i<7;i++) {
    // Get a random number between 0 and 7 
    let randomNumber = Math.floor(Math.random() * 7);
      // Map through tvCarProducts to choose 4 products to be displayed as 'Explore items'.
      tvProducts.map((prod) => {
        // If index product is equal with the random number, continue
        if(tvProducts.indexOf(prod) === randomNumber) {
          // If randomExploreItems length !== 4, push the product with the index === randomNumber
          if(randomExploreItems.length !== 4) {  
            // If product is not inside the randomExploreItems array, push it.
              if(!randomExploreItems.includes(prod)) {
                randomExploreItems.push(prod);
              } else {
                return false;
              }
          } else {
            return false;
          }
        }
          return false;
      })
  }
      this.setState({ exploreItems: randomExploreItems });
}


viewProductDetails(prod) {
  let product   = [],
      cartItems = this.props.cartItems;

    // If product is not inside cartItems, set 'addedToCart' to false to set default 'Add to cart' button inside 'Viewproductdetails' comp
      if(!cartItems.includes(prod)) {
        prod.addedToCart = false;
      }
    // Push selected product inside the array to be displayed
      product.push(prod);
    // Set new values to product / Open 'View product details' / Close cart.
      this.props.selectedProduct    ({ product: product })
      this.props.viewProductDetails ({ viewProductDetails: true })
      this.props.openCart           ({ openCart: false })
}



handleScroll() {
  let cart_checkout_box = document.querySelector('.cart_checkout_box');

  // Handle checkout box position to stay fixed when scrolling down
     // Check it cart_checkout_box exists 
  if(document.contains(cart_checkout_box)) {
    // Handle checkout box position on scroll
      if(window.innerWidth > 991.5 && window.innerWidth <= 1400) {
          // Set checkout box position according to the scroll position
        if(window.pageYOffset > 300) { cart_checkout_box.setAttribute('style', 'position:fixed;width:290px;top:60px;');}
        else { cart_checkout_box.removeAttribute('style');}
    
      } else if(window.innerWidth > 1400) {

        if(window.pageYOffset > 300) { cart_checkout_box.setAttribute('style', 'position:fixed;width:345px;top:60px;');}
        else { cart_checkout_box.removeAttribute('style');} 

      } else if(window.innerWidth < 991.5) { 
        if(window.pageYOffset > 300 || window.pageYOffset < 300 ) { cart_checkout_box.removeAttribute('style'); }} 
  }
}

handleQuantity(val,prod) {
  let cartItems = [...this.props.cartItems],
      quantity  = parseFloat(val.target.value),
      product   = prod;

    // Map over cartItems
  cartItems.map((item) => {
    // Search for id match
    if(item.id === product.id) {
      // If quantity selected is equal with one
      if(quantity === 1) {
        // Return to the original product price  
        item.price = item.originalPrice;
        item.selectedQuantity = 1;
      } else {
          // Multiply price by the quantity selected
        item.price = quantity * item.originalPrice;
        item.selectedQuantity = quantity;
      }
    } 
    return false;     
  })
  this.props.addedToCart({ cartItems: cartItems })
    // Call function to recalculate the sum of the products
  this.getTotalSum();
}


removeCartProduct(prod) {
  let cartItems                   = [...this.props.cartItems],
      tvCartProducts              = [this.props.tvCartProducts],
      mayBeInterestedProducts     = [...this.props.mayBeInterestedProducts],
      mayBeInterestedProducts_two = [...this.props.mayBeInterestedProducts_two];
   
      
      // Search through cartItems for the removed product and display loading effect before removing it
    cartItems.map((removed) => {
      if(removed.id === prod.id) {
        removed.removedFromCart = true;
      } 
        return false;
      })
        // Set props to take effect the changes
    this.props.addedToCart({ cartItems: cartItems })
        // Set delay for 1 second to display the loading effect and restore product defaults before removing the product
    setTimeout(() => {
        // Map through original product
      tvCartProducts.map((p) => { 
                // If selected product id is equal with selected product set addedToCart property
                  // to false,  to set default 'Add to cart' button
          if (p.id === prod.id) {
                // Set 'addedtocart' to false
              p.addedToCart = false;
                // Reset quantity if there were any changes
              p.selectedQuantity = 1;
                // Restore product to his original price (if quantity was changed)
              p.price = p.originalPrice;
                // Restore default 'removedFromCart', to hide the loading remove effect
              p.removedFromCart = false;
          }
          return false;
      })

        // Map through maybeinterested cables and set 'addedtocart' to false
      mayBeInterestedProducts.map((p) => {
        if(p.id === prod.id) {
          p.addedToCart = false;
        }
        return false;
      })
        // Map through maybeinterested tv and set 'addedtocart' to false
      mayBeInterestedProducts_two.map((p) => {
        if(p.id === prod.id) {
          p.addedToCart = false;
        }
        return false;
      })

        // Remove product and set props product to default
      this.props.addedToCart        ({ cartItems: this.props.cartItems.filter((x) => x.id !== prod.id)})
      this.props.tvCartProductsFunc ({ tvCartProducts: tvCartProducts })
      this.props.mayBeInterested    ({ mayBeInterestedProducts: mayBeInterestedProducts })
      this.props.mayBeInterestedTwo ({ mayBeInterestedProducts_two: mayBeInterestedProducts_two })
    }, 1000); 
}

getTotalSum() {
  let cartItems     = this.props.cartItems;
  let cartSumValues = [];
    // Push every new price inside array to get the total sum
  cartItems.map((product) => cartSumValues.push(product.price));
    // Set cartTotalSum props to be used on checkout comp
  this.props.cartTotalSum({ cartTotalSum: cartSumValues.reduce(function(a,b) { return a+b})})
  return cartSumValues.reduce(function(a,b) { return a+b });
}

checkoutSigninSignup() {
  this.props.openCart         ({ openCart: false })
  this.props.openSigninSignUp ({ openSigninOrSignUp: true })
}

checkOutNoSignIn() {
  this.props.checkoutSelCountry ({ checkoutSelectedCountry: document.querySelector('.checkout_country_sel').value})
  this.props.openCart           ({ openCart: false })
  this.props.openCheckout       ({ openCheckout: true })
}

checkOutSignedIn() { this.checkOutNoSignIn(); }

handleCartContainerClick() {
    // Handle every click inside CartContainer
  this.props.openUserMenuFunct  ({ openUserMenu: false })
}



  render() {
    return (
        <div>
          <div className='col-12'>
            <Header />
             <div className='row justify-content-center'>
                <div className='cart_container col-12' onClick={() => this.handleCartContainerClick()}>
                    
               {/* --- Cart empty ? underline 100% : underline 62% --- */}
                {this.props.cartItems.length !== 0 ? ( 
                      <div className='row justify-content-center'>
                        <span className='cart_header_txt col-11'>Your Cart
                          {this.props.cartItems.length !== 0 && (
                          <span className='cart_no_items'>{this.props.cartItems.length}</span>
                          )}
                        </span>
                      </div>
                ):(

                    <div className='row justify-content-center'>
                        <span className='cart_header_txt_fullunderline col-11'>Your Cart
                          {this.props.cartItems.length !== 0 && (
                          <span className='cart_no_items'>{this.props.cartItems.length}</span>
                          )}
                        </span>
                      </div>
                )}

              {/* ----------- Empty cart ----------- */}
                {this.props.cartItems.length === 0 ? (

                      <div className='row justify-content-center'>
                         <div className='cart_wrap_emptycart col-12'>
                            <div className='row justify-content-center'>
                                <span className='cart_emptycart_txt'>Your cart is empty.</span>
                            </div>
                            <div className='row justify-content-center'>
                                <span className='cart_exploreprod_txt'>Explore our products:</span>
                            </div>
                            <div className='row justify-content-center'>
                              <div className='cart_wrap_explore col-12'>
                                
                                <div className='row justify-content-center'>
                                   
                                  {/* ------- Explore product box ------- */}
                                  {this.state.exploreItems.length > 0 && (
                                     <div className='row justify-content-center'>
                                        {this.state.exploreItems.map((prod,index) => 
                                          <Link key={index} to={process.env.PUBLIC_URL + '/viewprod/'+prod.id}>
                                            <div className='cart_explore_box' id={prod.id}>
                                              <div className='row justify-content-center'>
                                                <span className='cart_box_img'>
                                                  <span className='row justify-content-center'>
                                                    <img src={prod.image} 
                                                         title='' 
                                                         alt=''
                                                         onClick={(e) => this.viewProductDetails(prod)}
                                                        />
                                                    </span>               
                                                </span>
                                              </div>
                                              <div className='row justify-content-center'>
                                                <span className='cart_box_title'>
                                                   {prod.title}
                                                </span>
                                              </div>
                                              <div className='row justify-content-center'>
                                                <span className='cart_box_button'
                                                      tabIndex='0'
                                                      onClick={(e) => this.viewProductDetails(prod)}>
                                                    View details
                                                </span>
                                              </div>
                                            </div>
                                          </Link>
                                        )}
                                     </div>
                                  )}
                                  {/* ------- End of Explore product box ------- */}

                                </div>
                                <div className='row justify-content-center'><span className='cart_exp_line col-10'></span></div>
                              </div>
                            </div>
                         </div>
                      </div>
        

                      ) : (


                    <div className='row justify-content-center'>
                        <div className='cart_wrap_noemptycart col-11 col-lg-10 col-xl-10'>
                            <div className='row justify-content-center'>
                               
                                <div className='cart_show_items col-12 col-lg-8 col-xl-8'>
                                 
                                {/* ------ Item / Quantity / Price text section -------- */}
                                  <div className='row csi_row'>
                                      <div className='col-12 csi_r_f'>
                                          <div className='row'>
                                              <span className='csi_one  col-lg-8 col-xl-9'>Item</span>
                                              <div className='csi_right col-lg-4 col-xl-3'>
                                                  <span className='csi_two'>Quantity</span>
                                                  <span className='csi_three'>Price</span>
                                              </div>
                                          </div>   
                                      </div>
                                  </div>

                                {/* ------ Start of box list item -------- */}
                                  <div className='row'>
                                      {this.props.cartItems.map((prod,index) =>  
                                        
                                        <div className='box_list_item col-12' key={index}>
                                          {prod.removedFromCart && (
                                           <div className='remove_load_div'>
                                              <div className='row justify-content-center'>
                                                <div className='lds-dual-ring'></div> 
                                              </div>
                                            </div>
                                            )}
                                          <div className='row'>
                                            <div className='bli_info col-12 col-lg-8 col-xl-9'>
                                              <div className='row justify-content-center'>
                                                  <div className='bli_info_img col-12 col-md-4 col-lg-4 col-xl-4'>
                                                      <div className='row'>
                                                        <Link to={process.env.PUBLIC_URL + '/viewprod'}>
                                                          <img src={prod.image} 
                                                               alt='' 
                                                               title=''
                                                               onClick={(e) => this.viewProductDetails(prod)}/>
                                                        </Link>      
                                                      </div>
                                                  </div>

                                                  <div className='bli_info_descr col-12 col-md-8 col-lg-8 col-xl-8'>
                                                    <div className='row'>
                                                      <span className='bil_info_descr_title col-11'>
                                                        <span>{prod.title}</span>
                                                      </span>
                                                    </div>
                                                    <div className='row'>
                                                      <div className='bil_info_descr_txt col-11'>
                                                          <span>{prod.description}</span>
                                                        
                                                      </div>
                                                    </div>
                                                    <div className='row'>
                                                      <span className='bil_info_ships'>Usually ships in 3-5 business days</span>
                                                    </div>
                                                    <div className='row'>
                                                      <span className='bil_info_remove'
                                                            tabIndex='0'
                                                            onClick={(e) => this.removeCartProduct(prod)}>Remove</span>
                                                    </div>

                                                  </div>
                                              </div>
                                            </div>
                                           
                                            <div className='bli_info_price col-12 col-lg-4 col-xl-3'>
                                              <div className='row'>
                                                  <div className='bli_inf_quantity'>
                                                    <select tabIndex='0' className='cart_quantity_select' onChange={(e) => this.handleQuantity(e, prod)}>
                                                      {prod.quantity.map((quantity,ind) => 
                                                          <option key={ind}
                                                                  tabIndex='0'
                                                                  value={quantity}
                                                                  className={prod.id}
                                                                  id='pr_quan_opt'>
                                                                  {quantity}
                                                          </option>
                                                      )}
                                                                                                             
                                                    </select>
                                                  </div>
                                                  <div className='bli_inf_price'>&#8364;{prod.price.toFixed(2)}</div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                
                                {/* ------ End of box list item -------- */}

                                {/* ------ Start Free shipping / Product Warranty section -------- */}
                                  <div className='row justify-content-center'>
                                    <div className='fs_pw_sect col-12 col-md-12 col-lg-11 col-xl-12'>
                                      <div className='row justify-content-center'>
                                          <span className='col-6'><i className="fas fa-truck"></i> Free delivery</span>
                                          <span className='col-6'><i className="fas fa-medal"></i> Product warranty</span>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                               
                                {/* ------ Checkout div -------- */}
                                <div className='cart_checkout_items col-12 col-lg-4 col-xl-4'>
                                  <div className='row justify-content-center'>
                                    <div className='cart_checkout_box col-12 col-sm-12 col-md-9 col-lg-12 col-xl-10'>
                                    
                                      <div className='row'>
                                        <span className='cart_checkout_subtotal'>
                                            Subtotal {this.props.cartItems.length} {this.props.cartItems.length === 1 ? ('product') : ('products')}: $
                                            <span className='cart_checkout_no'>{this.getTotalSum().toFixed(2)}</span>
                                        </span>
                                      </div>
                                      <div className='row justify-content-center'>
                                        <span className='checkout_shipto_txt col-11'>
                                          Ship to
                                        </span>
                                      </div>
                                      <div className='row justify-content-center'>
                                        <div className='checkout_country'>
                                          <select className='checkout_country_sel'>
                                            {this.state.countryList.map((country,index) => 
                                                  <option key={index}>{country}</option>
                                               )}
                                          </select>
                                        </div>
                                      </div>
                                     
                                     {/* ----- Checkout button ----- */}
                                      <div className='row justify-content-center'>
                                        <div className='checkout_button_div col-12'>
                                    
                                          {!this.props.userSignedIn ? (
                                            <div>
                                              <div className='row justify-content-center'>
                                                <Link to={process.env.PUBLIC_URL + '/signinsignup'}>
                                                  <div className='checkout_button'
                                                       tabIndex='0'
                                                       onClick={() => this.checkoutSigninSignup()}>
                                                    Sign in / Sign up
                                                  </div>      
                                                </Link>
                                              </div>
                                              <div className='row justify-content-center'>

                                                <Link to={process.env.PUBLIC_URL + '/checkout'}>
                                                <div className='checkout_button checkout_nosignin'
                                                     tabIndex='0'
                                                     onClick={() => this.checkOutNoSignIn()}>
                                                  Checkout as a guest
                                                </div>      
                                                </Link>
                                              </div>
                                            </div>
                                          ):(
                                              <div className='row justify-content-center'>
                                                <Link to={process.env.PUBLIC_URL + '/checkout'}
                                                      tabIndex='0' 
                                                      className='checkout_button col-10' 
                                                      onClick={() => this.checkOutSignedIn()}>
                                                      Checkout
                                                </Link>      
                                              </div>
                                          )}

                                        </div>
                                      </div>                                  
                                    </div>
                                  </div>
                                </div>

                              {/* ------ End of checkout div -------- */}

                            </div>
                        </div>
                    </div>
                )}

                </div>
             </div>
            <Footer />
        </div>
        </div>
)}}
  
const Cart = connect(mapStateToProps,mapDispatchToProps)(ConnectedCart);
export default Cart;
