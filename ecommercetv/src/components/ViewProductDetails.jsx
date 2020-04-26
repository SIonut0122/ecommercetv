import   React, { Component  } from 'react';
import { FacebookShareButton, 
         TwitterShareButton  } from 'react-share';
import { Link                } from 'react-router-dom'
import { connect             } from "react-redux";
import { openTvCont,
         favListProducts,
         viewProductDetails,
         selectedProduct,
         tvCartProductsFunc,
         addedToCart,
         openCart,
         mayBeInterested,
         mayBeInterestedTwo,
         openUserMenuFunct   } from '../actions/index';
import   GoogleMapReact        from 'google-map-react';
import   userReviewComments    from '../jsonData/userReviewComments.js';
import   Header                from './Header';
import   Footer                from './Footer';
import   '../css/ViewProductDetails.css';
import   '../js/script.js';



 const mapStateToProps = state => {
  return {  product                     : state.product,
            tvCartProducts              : state.tvCartProducts,
            favoriteList                : state.favoriteList,
            cartItems                   : state.cartItems,
            mayBeInterestedProducts     : state.mayBeInterestedProducts,
            mayBeInterestedProducts_two : state.mayBeInterestedProducts_two
        };
   
};

 function mapDispatchToProps(dispatch) {
  return {
      favListProducts    : prod    => dispatch(favListProducts(prod)),
      openCart           : bol     => dispatch(openCart(bol)),
      openTvCont         : bol     => dispatch(openTvCont(bol)),
      viewProductDetails : bol     => dispatch(viewProductDetails(bol)),
      selectedProduct    : product => dispatch(selectedProduct(product)),
      openUserMenuFunct  : bol     => dispatch(openUserMenuFunct(bol)),
      tvCartProductsFunc : prod    => dispatch(tvCartProductsFunc(prod)),
      addedToCart        : bol     => dispatch(addedToCart(bol)),
      mayBeInterested    : prod    => dispatch(mayBeInterested(prod)),
      mayBeInterestedTwo : prod    => dispatch(mayBeInterestedTwo(prod))
  };
}



class connectViewProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
                      product                     : this.props.product,
                      tvCartProducts              : this.props.tvCartProducts,
                      cartItems                   : this.props.cartItems,
                      mayBeInterestedProducts     : this.props.mayBeInterestedProducts,
                      mayBeInterestedProducts_two : this.props.mayBeInterestedProducts_two,
                      center                      : { lat: 44.79, lng: 10.32 },
                      zoom                        : 9,
                      viewProductDescr            : true,
                      viewProductReview           : false,
                      rateProductReview           : false,
                      revRecommendChecked         : false,
                      reviewName                  : '',
                      reviewNameValid             : false,
                      reviewTitle                 : '',
                      reviewTitleValid            : false,
                      reviewComment               : '',
                      reviewCommentValid          : false,
                      reviewEmail                 : '',
                      reviewEmailValid            : false,
                      reviewSubmitted             : false,
                      reviewComments              : userReviewComments,
                      checkProductValability      : false,
                      displayFullImageContainer   : false
               }
    }



addtoWishList(prod) {
  let favList                   = [...this.props.favoriteList],
      addtowishHeartUpAnimation = document.querySelector('.addtowish_s_heart'),
      addToWishButton           = document.querySelector('.wid_addtowish_button'),
      wishlistHearIcon          = document.querySelector('.fa_heart_wishlist'),
      today                     = new Date(),
      date                      = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
      alreadyInsideWishlist     = false;

        // Animate heart from 'Add to wishlisht' button
      addtowishHeartUpAnimation.classList.add('addedwish_heart_cls');
      addToWishButton.classList.add('addtowish_button_active');
        // Check if wishlisted product is already inside wishlist
      for(let i=0; i<favList.length; i++) {
        if(favList[i].id === prod.id) {
          alreadyInsideWishlist = true;
        }
      }
        // If wishlisted product is not already inside the favoritelist, proceed
      if(!alreadyInsideWishlist) {
          // Animate wishlist icon
        wishlistHearIcon.classList.add('fa_heart_wishlist_anim');
          // Remove class to disable wishlist icon animation
        setTimeout(function() { wishlistHearIcon.classList.remove('fa_heart_wishlist_anim'); },300);
          // Set date to the wishlisted product
        prod.addedDate = date;
          // Push product to the wishlist array
        favList.push(prod);
          // Set localStorage wishlist
        this.props.favListProducts({ favoriteList: favList })
        localStorage.setItem('favoriteList', JSON.stringify(favList));
      }
          // Animate off heart from 'Add to wishlish' button
        setTimeout(function() {
           addtowishHeartUpAnimation.classList.remove('addedwish_heart_cls');
           addToWishButton.classList.remove('addtowish_button_active');
       },1300);
}

componentDidMount() {
  let tvCartProducts     = this.props.tvCartProducts,
      url                = window.location.pathname,
      str                = url.split('/'), // Split url pathname
      urlProdId          = str.pop() || str.pop(), // Get last id pathname
      searchedProduct    = [],
      mayBeInterested    = this.props.mayBeInterestedProducts,
      mayBeInterestedTwo = this.props.mayBeInterestedProducts_two;


        // On page load, get id pathname, search inside tvCartProducts for searched id and replace product state
      if(!this.state.product.length > 0) {
       for(let i=0; i<tvCartProducts.length;i++) {
        if(tvCartProducts[i].id === urlProdId) {
        
            // If product contains oldPrice prop, calculate discount percentage
          if(tvCartProducts[i].oldPrice) {
            let joinOldPrice      = parseFloat(tvCartProducts[i].oldPrice.toString().split('.').join(''));
            let joinOriginalPrice = parseFloat(tvCartProducts[i].originalPrice.toString().split('.').join(''));
             // Calculate discount percent to display it
            let getSum            = joinOldPrice - joinOriginalPrice;
            let getPercent        =   (getSum / joinOldPrice) * 100;
            tvCartProducts[i].discountPerc = getPercent.toFixed(0);
          }
          searchedProduct.push(tvCartProducts[i]);
           this.setState({ product: searchedProduct })
           document.title = tvCartProducts[i].title;
        } 
       }

        // Search through maybeinterested array for url product id to be displayed
            for(let i=0; i < mayBeInterested.length; i++) {
              if(mayBeInterested[i].id === urlProdId) {
                searchedProduct.push(mayBeInterested[i]);
                this.setState({ product: searchedProduct })
                document.title = mayBeInterested[i].title;
              }
            }

            for(let i=0; i < mayBeInterestedTwo.length; i++) {
              if(mayBeInterestedTwo[i].id === urlProdId) {
                searchedProduct.push(mayBeInterestedTwo[i]);
                this.setState({ product: searchedProduct })
                 document.title = mayBeInterestedTwo[i].title;
              }
            }
      }

      if(this.state.product.length > 0) {
         let widMoreImg = document.querySelectorAll('.wid_vmore_img');
                // Hightlight (border) first image inside the gallery images list 
             widMoreImg[0].classList.add('wid_vm_active');
                // Set document title
             this.state.product.map((prod) => document.title = prod.title);
      }
 
        // Remove highlighted nav menu
      document.querySelector('.nav_sp_home').classList.remove('nav_active');
      document.querySelector('.nav_sp_contact').classList.remove('nav_active');
}

componentDidUpdate() {
      // Focus on 'Check product valability' div to handle keydown
     if(this.state.checkProductValability) {
        document.querySelector('.check_valab_div').focus();
      }  
     if(this.state.displayFullImageContainer) {
        document.querySelector('.product_zoomimg_div').focus();
      }   
}

getItemRating() {
      // Display the rating value as a string separated (76 => 7.6)   
   let rez = this.state.product.map((item,ind) => {
      return item.rating.toString().split('');
    })
      // Get rating number and stick it
    let ratingSplit = rez[0][0]+'.'+rez[0][1];
    return ratingSplit;
}

viewMoreImg(e,item) {
  let viewMoreImg  = document.querySelectorAll('.wid_vmore_img'),
      stateProduct = [...this.state.product];  

        // Remove highlighted images
      viewMoreImg.forEach(elem => elem.classList.remove('wid_vm_active'));
        // Add hightlight class.
      e.target.classList.add('wid_vm_active');
        // Set clicked image as a profile image to be viewed
      for(let i=0;i<stateProduct.length;i++) {
        stateProduct[i].image = item;
      }

      this.setState({ stateProduct: stateProduct })
}


handleWriteReview() {
    let writeReviewDiv = document.querySelector('.wid_wrap_moreinfo');
      // Setstate true to viewProductReview div 
    this.setState({ viewProductDescr: false, viewProductReview: true })
      // Scroll into reviews view
    writeReviewDiv.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}
handleProductDescr() {
    let writeReviewDiv = document.querySelector('.wid_wrap_moreinfo');
      // Setstate true to viewProductDescr div 
    this.setState({ viewProductDescr: true, viewProductReview: false })
      // Scroll into view product descr view
    writeReviewDiv.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}); 
}

handleInterestedBox(item) {
    let product = [];
        product.push(item); // Push new selected product inside product to display info

    this.props.selectedProduct({ product: product })
    this.setState({ product: product })
}

openProductDescription() {this.setState({ viewProductDescr: true, viewProductReview: false })}
    
openProductReviews() {this.setState({ viewProductDescr: false, viewProductReview: true })}
    
hoverTitleRate(e) {
  let rateStarsTxt = document.querySelector('.r_review_hovertxt');
    // Display rate text on hover
      // If rate in not set, display rate text
    if(!this.state.rateProductReview) {
      rateStarsTxt.innerHTML = e.target.title;}
}

hoverOutTitleRate(e) {
  let rateStarsTxt = document.querySelector('.r_review_hovertxt');
    // Display rate text on hover
      // If rate in not set, display rate text
    if(!this.state.rateProductReview) {
      rateStarsTxt.innerHTML = '';}
}

clickTitleRate(e) {
  let rateStarsTxt = document.querySelector('.r_review_hovertxt'),
      revRateErr   = document.querySelector('.r_rate_err');

    // Display and set rate text on click
  rateStarsTxt.innerHTML = e.target.title;
    // If rate in set, disable hover text changing 
  this.setState({ rateProductReview: true })
    // Hide review rate error message
  revRateErr.style.display = 'none';

}

reviewRecCheck(e) {
  let reviewCheckBox = document.querySelectorAll('.review_checkrec');
        // Uncheck all input checkbox
      reviewCheckBox.forEach(elem => elem.checked = false);
        // Check clicked checkbox
      e.target.checked = true;
        // Set state checked to true
      this.setState({ revRecommendChecked: true })
}


reviewHandleName(e) {
  let fullNameValue       = e.target.value,
        // Check if name characters matches
      checkFullName       =  fullNameValue.split('').every(x => x.match(/[a-zA-Z ]+/g)),
        // Check name length to higher than 0
      checkFullNameLength = fullNameValue.length >= 1,
        // Check for blank spaces
      checkWhiteSpaces    = fullNameValue.trim().length === fullNameValue.length;
  
      // If title value match, setstate value 
    if(checkFullName && checkFullNameLength && checkWhiteSpaces) {
        this.setState({reviewName: fullNameValue, reviewNameValid: true})
    } else if(fullNameValue.length === 0) {
      // If input is empty, reset value input
        this.setState({reviewName: '', reviewNameValid: false})
    } else {
        this.setState({reviewName: fullNameValue, reviewNameValid: false})
    }
}

reviewHandleTitle(e) {
  let titleValue       = e.target.value,
         // Check if title characters matches
      checkTitle       =  titleValue.split('').every(x => x.match(/[a-zA-Z ]+/g)),
        // Check title length to higher than 0
      checkTitleLength = titleValue.length >= 1,
        // Check for blank spaces
      checkWhiteSpaces = titleValue.trim().length === titleValue.length;
  
 
      // If title value match, setstate value 
    if(checkTitle && checkTitleLength && checkWhiteSpaces) {
        this.setState({reviewTitle: titleValue, reviewTitleValid: true})
    } else if(titleValue.length === 0) {
      // If input is empty, reset value input
        this.setState({reviewTitle: '', reviewTitleValid: false})
    } else {
        this.setState({reviewTitle: titleValue, reviewTitleValid: false})
    }
}

reviewHandleComment(e) {
  let commentValue     = e.target.value,
        // Check comment length to higher than 0
      checkTitleLength = commentValue.length >= 1;
    
      // If comment value match, setstate value 
    if(checkTitleLength) {
        this.setState({reviewComment: commentValue, reviewCommentValid: true})
    } else if(commentValue.length === 0) {
      // If input is empty, reset value input
        this.setState({reviewComment: '', reviewCommentValid: false})
    } else {
        this.setState({reviewComment: commentValue, reviewCommentValid: false})
    }
}

reviewHandleEmail(e) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        emailValue = e.target.value;

      // If input mail match, setstate value
    if(emailValue.match(mailformat)) {
        this.setState({reviewEmail: emailValue, reviewEmailValid: true})
    } else if(emailValue.length === 0) {
      // If input is empty, reset value input
        this.setState({reviewEmail: '', reviewEmailValid: false})
    } else {
        this.setState({reviewEmail: '', reviewEmailValid: false})
    }
}

revKeyHandleButton(e) {
  // If Enter key is pressed, execute signin function
  if(e.keyCode === 13) {
    this.sendReviewButton();
  }
}


sendReviewButton() {
  let revNameErr       = document.querySelector('.r_name_err'),
      revTitleErr      = document.querySelector('.r_title_err'),
      revRateErr       = document.querySelector('.r_rate_err'),
      revCommErr       = document.querySelector('.r_comm_err'),
      revConclusionErr = document.querySelector('.r_conclusion_err'),
      revEmailErr      = document.querySelector('.r_email_err');

      // Check validation
  if(this.state.reviewNameValid) { // If review name is valid
    revNameErr.style.display = 'none';
      if(this.state.reviewTitleValid) { // If review tittle is valid
        revTitleErr.style.display = 'none';
          if(this.state.rateProductReview) {  // If rateProduct is checked
            revRateErr.style.display = 'none';
              if(this.state.reviewCommentValid) { // If review comments is not empty
                revCommErr.style.display = 'none';
                  if(this.state.revRecommendChecked) {  // If conclusion is checked
                    revConclusionErr.style.display = 'none';
                      if(this.state.reviewEmailValid) { // If email is valid
                        revEmailErr.style.display = 'none';
                          // Call function to reset review inputs after submit
                          this.reviewRestoreDefault();
                      
                      } else {revEmailErr.style.display = 'block';}
                  } else {revConclusionErr.style.display = 'block';}   
              } else {revCommErr.style.display = 'block';}  
          } else {revRateErr.style.display = 'block';}
      } else {revTitleErr.style.display = 'block';}
  } else {revNameErr.style.display = 'block';}
    
}

reviewRestoreDefault() {
  let review_input   = document.querySelectorAll('.review_input'),
      rateStarsInput = document.querySelectorAll('.inp_radio_check'),
      reviewCheckBox = document.querySelectorAll('.review_checkrec'),
      rateStarsTxt   = document.querySelector('.r_review_hovertxt'),
      reviewLoadDiv  = document.querySelector('.review_load_div');

        // Display loading effect
      reviewLoadDiv.style.display = 'block'
        // Hide loading effect after 1 second
      setTimeout(() => {
        reviewLoadDiv.style.display = 'none';
      },1000);
        // Clear all inputs value
      review_input.forEach(e => e.value = '');
        // Restore states to default values
      this.setState({
                          rateProductReview: false,
                          revRecommendChecked: false,
                          reviewName: '',
                          reviewNameValid: false,
                          reviewTitle: '',
                          reviewTitleValid: false,
                          reviewComment: '',
                          reviewCommentValid: false,
                          reviewEmail: '',
                          reviewEmailValid: false,
                          reviewSubmitted: true
                    })
        // Clear rate stars
      rateStarsInput.forEach(e => e.checked = false);
        // Clear rate starts text
      rateStarsTxt.innerHTML = '';
        // Uncheck all input checkbox
      reviewCheckBox.forEach(elem => elem.checked = false);

}

handleHelpfulReview(e,index) {
  let reviewComments = [...this.state.reviewComments];

    // Map through the reviews, find clicked review and increase helpful number by one
      reviewComments.map(item => {
          if(item.id === e.id) {
            item.foundHelpful += 1;
              // Set to true to hide the helpful button after increase
            item.foundHelpfulClicked = true;
          }
          return false;
      })
    // Set the new values to reviewComments state 
      this.setState({ reviewComments: reviewComments }) 
}

handleReportReview(e) {
  let reviewComments = [...this.state.reviewComments];
        // Map through the reviews, find clicked review and increase helpful number by one
      reviewComments.map(item => {
          if(item.id === e.id) {
            item.reportAbuseClicked = true;
          }
          return false;
      })
        // Set the new values to reviewComments state 
      this.setState({ reviewComments: reviewComments }) 
}

handleReportAnswer(review,val) {
  let answer         = val.target.innerHTML,
      reviewComments = [...this.state.reviewComments];

  if(answer === 'Yes') {
      // Display 'This review has been reported' message and hide 'Helpful' button
    reviewComments.map(item => {
        if(item.id === review.id) {
            // Trigger if 'Report' button is clicked
          item.reportAbuseClicked = false;
            // Trigger if 'Helpful' button is clicked
          item.foundHelpfulClicked = true;
            // Hide 'Report' button 
          item.displayReportAbuseButton = false;
         } 
         return false;
      })
  } else if(answer === 'No') {
      // Hide 'Are you sure that you want to raport this review' message.
     reviewComments.map(item => {
        if(item.id === review.id) {
          item.reportAbuseClicked = false;
        } 
        return false;
      })
    }
      // Set the new values to reviewComments state 
    this.setState({ reviewComments: reviewComments }) 
}

checkProductValability() {
  // Display 'Check product valability' box
    this.setState({ checkProductValability: true })
  // Leave time to render element and scrollintoview
setTimeout(function() {
    document.querySelector('.check_valab_div').focus();
    document.querySelector('.check_valab_div').scrollIntoView({behavior: "auto", block: "start", inline: "nearest"});
  },400);
}


closeCheckProductValability() {
  // Hide 'Check product valability' box
    this.setState({ checkProductValability: false }) 
}
checkValKey(e) {
      // Handle 'ESC' key
    if(e.keyCode === 27) {
      // Hide 'Check product valability' box
    this.setState({ checkProductValability: false, displayFullImageContainer: false })     
    }
}

displayFullImageContainer() {
  this.setState({ displayFullImageContainer: true })
}
closeFullImageContainer() {
  this.setState({ displayFullImageContainer: false }) 
}

handleProductGalleryImg(e,img) {
     let viewMoreImg  = document.querySelectorAll('.prod_gall_zoomimg'),
         stateProduct = [...this.state.product];


    // Remove highlighted images
      viewMoreImg.forEach(elem => elem.classList.remove('prod_zoomgal_high'));
    // Add hightlight class.
      e.target.classList.add('prod_zoomgal_high');

    // Display full size image product
      stateProduct.map((item,index) => {
        item.fullImage = img;
      })

    // Setstate product 
      this.setState({ product: stateProduct })
}

backToStoreButton() {

     this.props.viewProductDetails({viewProductDetails: false})
     this.props.openTvCont({ openTvCont: true })  
}

addToCart(item) {
  var cartItems     = [...this.props.cartItems],
      duplCartItems = cartItems,
      product       = [...this.state.product];
 
    // Set 'addedToCart' to true to set button 'Added to cart'
  item.addedToCart = true
   // Preventive disable 'Removing loading effect' for this product
  item.removedFromCart = false;
    // Push product inside cartItems array
      // Don't remember why I used duplCartItems
  duplCartItems.unshift(item);
    // If product that was added to cart is the same with the product state, change 'Add to cart button' to 'Remove button'
        // ( to avoid changing product's button if a 'maybeinterested' product was added to cart ) //
  product.map((p) => {
    if(p.id === item.id) {
       p.addedToCart = true;
     } 
     return false;
  })
 
    // Set new props to cartItems 
  this.props.addedToCart({ cartItems: duplCartItems })
  this.setState({ product: product })
}

removeCartProduct(prod) {

    let tvCartProducts              = [this.props.tvCartProducts],
        product                     = [...this.state.product],
        mayBeInterestedProducts     = [...this.state.mayBeInterestedProducts],
        mayBeInterestedProducts_two = [...this.state.mayBeInterestedProducts_two];

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
            }
              return false;
          })

   
          // If product id matches removed product, change 'Remove from cart' to 'Add to cart' button
      product.map((i) => { 
          if(i.id === prod.id) {
            i.addedToCart = false;
          }
          return false;
       })
          // Set default 'Add to cart' button
      this.setState({ product: product })
          // Remove product and set props product to default
      this.props.addedToCart({ cartItems: this.props.cartItems.filter((x) => x.id !== prod.id) })

          // Set state tvcartproducts to restore 'Add to cart' default button
      this.props.tvCartProductsFunc     ({ tvCartProducts:              tvCartProducts })
      this.props.mayBeInterested    ({ mayBeInterestedProducts:     mayBeInterestedProducts })
      this.props.mayBeInterestedTwo ({ mayBeInterestedProducts_two: mayBeInterestedProducts_two })
      this.setState                 ({ mayBeInterestedProducts:     mayBeInterestedProducts, mayBeInterestedProducts_two: mayBeInterestedProducts_two })
                                      
}

addMayBeInterestedToCart(prod) {
  let mayBeInterestedProducts     = [...this.props.mayBeInterestedProducts],
      mayBeInterestedProducts_two = [...this.props.mayBeInterestedProducts_two];

      // Map through maybeinterested (Cable) and set 'addedtocart' to true
    mayBeInterestedProducts.map((p) => {
      if(p.id === prod.id) {
        prod.addedToCart = true;
      }
      return false;
    })
      // Map through maybeinterested_two (Tv) and set 'addedtocart' to true
    mayBeInterestedProducts_two.map((p) => {
      if(p.id === prod.id) {
        prod.addedToCart = true;
      }
      return false;
    })
    
    this.setState                 ({ mayBeInterestedProducts: mayBeInterestedProducts, mayBeInterestedProducts_two: mayBeInterestedProducts_two })
    this.props.mayBeInterested    ({ mayBeInterestedProducts: mayBeInterestedProducts })
    this.props.mayBeInterestedTwo ({ mayBeInterestedProducts_two: mayBeInterestedProducts_two })
    this.addToCart(prod);
}

handleViewProdDetailsClick() {
    // Close user menu if opened
  this.props.openUserMenuFunct({ openUserMenu: false })    
}

handleScrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}


  render() {
 
    
    return (
        <div>
          <div className='col-12'>
            <Header />
              <div className='row justify-content-center wrap_item_det' onClick={() => this.handleViewProdDetailsClick()}>
                 <div className='item_details_div col-12 col-sm-11 col-md-11 col-lg-11'>
                    
                    <div className='scrolltotop_button' onClick={() => this.handleScrollToTop()}>
                      <i className='fas fa-chevron-up'></i>
                      </div>
                      {/* --- View full size image container --- */}

                      {this.state.displayFullImageContainer ? (
                        <div className='row justify-content-center'>
                          <div className='product_zoomimg_div col-12'
                               tabIndex="0" onKeyDown={(e) => this.checkValKey(e)}>
                            <div className='row justify-content-center'>
                               <div className='product_zoomimg_wrap col-12 col-sm-10 col-md-8 col-lg-9'>
                                  <i className="fas fa-times prod_zoom_closediv" 
                                     onClick={() => this.closeFullImageContainer()}></i>
                                    <div className='row justify-content-center'>
                                      <span className='prod_fullimg_span'>
                                        <span className='row justify-content-center'>
                                          {this.state.product.map((item,index) =>
                                            <img key={index} src={item.fullImage} alt=''/>
                                          )}
                                        </span>
                                      </span>
                                     </div>
                                    <div className='row justify-content-center'>
                                      <div className='product_zoomimg_gallery'>
                                        <div className='row justify-content-center'>
                                          {this.state.product.map((item,index) => 
                                             item.imageGallery.map((img,ind) =>
                                                 <img key={ind} 
                                                      alt=''
                                                      src={img} 
                                                      className='prod_gall_zoomimg'
                                                      onClick={(e) => this.handleProductGalleryImg(e,img)}/>))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>  
                          </div>
                        </div>
                      ):('')}

                      {/* --- Check product map valability container --- */}

                      {this.state.checkProductValability ? (
                         <div className='row justify-content-center'>
                            <div className='check_valab_div col-12' tabIndex="0" onKeyDown={(e) => this.checkValKey(e)}>
                              <div className='row justify-content-center'>
                                
                                <div className='check_valab_wrap col-12 col-md-10 col-lg-6'>
                                   <span className='close_checkval_div'>
                                      <i className="fas fa-times" onClick={() => this.closeCheckProductValability()}></i>
                                   </span>
                                    <div className='row justify-content-center'>
                                      <span className='checkval_title'>Collect in store?</span>
                                    </div>
                                    <div className='row justify-content-center'>
                                      <div className='checkval_input_div'>
                                        <div className='row'>
                                          <span>Check availability in your area</span>
                                        </div>
                                        <div className='row'>
                                          <span className='checkval_input_wrap'>
                                              <input type='text' placeholder='Enter town or postecode'></input>
                                              <span className='chinput_search_icon'>
                                                <i className="fas fa-search"></i>
                                              </span>
                                          </span>
                                        </div>
                                      </div>
                                  </div>
                                  <div className='row justify-content-center'>
                                    <div className='wrap_valability_map col-12 col-md-11 col-lg-11'>
                                      <div className='row'>
                                        <div className='check_val_cont'>
                                          <span className='cval_dot_instock'>
                                            <span></span>
                                              In Stock
                                          </span>
                                          <span className='cval_dot_notinstock'>
                                            <span></span>
                                               Not in stock
                                          </span>
                                        </div>    
                                      </div>
                                        <div className='row'>
                                           <div id='map' className='col-12'>
                                             <GoogleMapReact
                                                bootstrapURLKeys={{ key: 'AIzaSyAyThGTUr4MaS1l1Dk0aFOjzgUlb2nIoZw' }}
                                                defaultCenter={this.state.center}
                                                defaultZoom={this.state.zoom}>
                                            </GoogleMapReact>
                                          </div>
                                        </div>
                                    </div>
                                  </div> 
                                </div>
                             
                              </div>  
                            </div>
                         </div>
                      ):('')}


                      {/* --- Item detaiils nav and share --- */}

                      {this.state.product.length > 0 ? (
                        <div>
                          <div className='row wrap_idd_nav'>
                              <div className='idd_nav mr-auto'>
                               <Link to={process.env.PUBLIC_URL + '/'}>
                                <span onClick={() => this.backToStoreButton()}>
                                  <i className="fas fa-home"></i>
                                </span>
                                </Link>
                                {this.state.product.map((prod,index) =>
                                  <span key={index}> › {prod.title}</span>
                                )}
                              </div>
                          </div>
                          <div className='row'>
                             <Link to={process.env.PUBLIC_URL + '/'}>
                              <div className='idd_nav_goback mr-auto'>
                                <span tabIndex='0' onClick={() => this.backToStoreButton()}>
                                  <i className="fas fa-long-arrow-alt-left"></i>
                                    Back to store
                                </span>
                              </div>    
                             </Link>
                              <div className='idd_share ml-auto'>
                                <div className='row justify-content-center'>
                                    <span>Share this:</span>
                                </div>
                                <div className='row justify-content-center'>
                                  <FacebookShareButton url= {window.location.href}
                                                       quote={'Check out this awesome product! :)'} 
                                                       className='idd_fb'>
                                       <i className='fab fa-facebook-f' alt='Share this on Facebook' title='Share this on Facebook'></i>
                                  </FacebookShareButton>
                                  <TwitterShareButton url={window.location.href} 
                                                      quote={'Check out this awesome product! :)'} 
                                                      className='idd_twitt'>
                                       <i className='fab fa-twitter' alt='Share this on Twitter' title='Share this on Twitter'></i>
                                  </TwitterShareButton>
                                   
                                </div>
                              </div>
                          </div>
                         

                        {/* --- Item row details --- */}
                        
                          <div className='row justify-content-center'>
                              <div className='wrap_item_details col-12'>
                                <div className='row justify-content-center'>
                              
                              {/* --- First item col details --- */}
                                  <div className='wid_first col-12 col-md-7 col-lg-8 col-xl-8'>
                                    <div className='row justify-content-center'>
                                      {/* --- Start of half columns --- */}
                                      <div className='wid_first_col col-12 col-md-12 col-lg-12 col-xl-6'>
                                          <div className='row justify-content-center'>
                                             {this.state.product.map((item,index) => 
                                                <img src={item.image} 
                                                     key={index}
                                                     onClick={() => this.displayFullImageContainer()}
                                                     className='wid_first_img' 
                                                     alt=''/>)}
                                          </div>
                                          <div className='row justify-content-center'>
                                            <div className='wid_viewmore_div '>
                                              <div className='row justify-content-center'>
                                                  {this.state.product.map((item,index) => 
                                                      item.imageGallery.map((img,ind) =>
                                                          <img key={ind} 
                                                               src={img} 
                                                               alt=''
                                                               tabIndex='0'
                                                               className='wid_vmore_img' 
                                                               onClick={(e) => this.viewMoreImg(e,img)}
                                                               onMouseOver={(e) => this.viewMoreImg(e,img)}/>))}  
                                              </div>
                                            </div>
                                          </div>
                                      </div>
                                      <div className='wid_sec_col col-12 col-md-12 col-lg-12 col-xl-6'>
                                         {/* --- Item title --- */}
                                        <div className='row'>
                                          {this.state.product.map((prod,index) =>
                                            <span key={index} className='wid_sec_title'>{prod.title}</span>
                                          )}
                                        </div>
                                         {/* --- Item product code --- */}
                                        <div className='row'>
                                          {this.state.product.map((prod,index) =>
                                            <span key={index} className='wid_sec_subtitle'>{prod.type} - Product code: {prod.productCode}</span>
                                          )}
                                        </div>
                                        <div className='row'>
                                           {this.state.product.map((prod,index) =>
                                            <span key={index} className='wid_sec_brand'>{prod.brand}</span>
                                          )}
                                        </div>
                                         {/* --- Item rating --- */}
                                        <div className='row'>
                                          {this.state.product.map((prod,index) =>
                                            <div key={index} className='wid_sec_rating'>
                                                 <div className='fill_ratings_wid' style={{width:prod.rating}}>
                                                     <span>★★★★★</span>
                                                 </div>
                                                 <div className="empty_ratings_wid">
                                                     <span>★★★★★</span>
                                                 </div>
                                            </div>
                                          )}
                                            <span className='wid_sec_rat_no'>{this.getItemRating()}</span>  
                                        </div>
                                        {/* --- Item write a review --- */}
                                        <div className='row'>
                                          <div className='wid_write_a_review'>
                                            <span className='wid_writerev_txt'>
                                              <i className="fas fa-comment-alt"></i>
                                              <span tabIndex='0' onClick={() => this.handleWriteReview()}>Write a review</span>
                                            </span>
                                          </div>
                                        </div> 
                                        {/* --- Item description info --- */}
                                        <div className='row'>
                                          {this.state.product.map((prod,index) =>
                                          <div key={index} className='wid_sec_descr col-12'>
                                              {prod.description}
                                          </div>
                                          )}
                                        </div>
                                        {/* --- Item view more --- */}
                                        <div className='row'>
                                          <div className='wid_viewmoreinfo'
                                               tabIndex='0'
                                               onClick={() => this.handleProductDescr()}>
                                            <i className="far fa-eye"></i>
                                              View more info
                                          </div>
                                        </div>
                                        {/* --- You might be interested --- */}
                                        <div className='row'>
                                          <div className='wid_mightbeinterested col-12'>
                                            <div className='row'>
                                                <span className='wid_mightbeinttxt'>
                                                  You might be interested
                                                </span>
                                            </div>
                                          {/* --- You might be interested box--- */}
                                            <div className='row'>
                                              {this.state.product.map((prod,prodInd) => 
                                              <div key={prodInd}>

                                                  {prod.type !== 'Cable' ? (
                                                      <div>
                                                        {this.state.mayBeInterestedProducts.map((item,index) =>
                                                          <div key={index} className='wid_mbi_box col-12 col-sm-8 col-md-12'>
                                                              <div className='row'>
                                                               
                                                                <div className='wid_mbibox_img col-3'>  
                                                                  <div className='row justify-content-center'>
                                                                    <Link to={process.env.PUBLIC_URL + '/viewprod/'+item.id}>
                                                                      <img src={item.image} 
                                                                           alt=''
                                                                           tabIndex='0'
                                                                           onClick={(e) => this.handleInterestedBox(item)}/>
                                                                      </Link>
                                                                  </div>
                                                                </div>
                                                               
                                                                <div className='wid_mbibox_descr col-6'>
                                                                  <div className='row'>
                                                                    {item.description}
                                                                  </div>
                                                                </div>
                                                                <div className='wid_mbibox_button col-3'>
                                                                  <div className='row justify-content-center'>
                                                                    {!item.addedToCart ? (
                                                                      <span className='wid_mbiboxbutton' 
                                                                            title='Add to cart' 
                                                                            alt='Add to cart'
                                                                            tabIndex='0'
                                                                            onClick={(e) => this.addMayBeInterestedToCart(item)}>
                                                                         <i className="fas fa-shopping-cart"></i>
                                                                      </span>
                                                                      ):
                                                                      (
                                                                      <span className='wid_mbiboxbutton wid_mbi_remove_button' 
                                                                            title='Remove from cart' 
                                                                            alt='Remove from cart'
                                                                            tabIndex='0'
                                                                            onClick={(e) => this.removeCartProduct(item)}>
                                                                         <i className="fas fa-times"></i>
                                                                      </span> 
                                                                      )}
                                                                  </div>    
                                                                </div>
                                                              </div>
                                                          </div>
                                                        )}
                                                      </div>
                                                    ):(
                                                      <div>
                                                          {this.state.mayBeInterestedProducts_two.map((item,index) =>
                                                            <div key={index} className='wid_mbi_box col-12 col-sm-8 col-md-12'>
                                                                <div className='row'>
                                                                  <div className='wid_mbibox_img col-3'>  
                                                                    <div className='row justify-content-center'>
                                                                      <Link to={process.env.PUBLIC_URL + '/viewprod/'+item.id}>
                                                                        <img src={item.image} 
                                                                             alt=''
                                                                             onClick={(e) => this.handleInterestedBox(item)}/>
                                                                      </Link>
                                                                    </div>
                                                                  </div>
                                                                  <div className='wid_mbibox_descr col-6'>
                                                                    <div className='row'>
                                                                      {item.description}
                                                                    </div>
                                                                  </div>
                                                                  <div className='wid_mbibox_button col-3'>
                                                                    <div className='row justify-content-center'>
                                                                      {!item.addedToCart ? (
                                                                        <span className='wid_mbiboxbutton' 
                                                                              title='Add to cart' 
                                                                              alt='Add to cart'
                                                                              tabIndex='0'
                                                                              onClick={(e) => this.addMayBeInterestedToCart(item)}>
                                                                          <i className="fas fa-shopping-cart"></i>
                                                                        </span>
                                                                        ):
                                                                        (
                                                                        <span className='wid_mbiboxbutton wid_mbi_remove_button' 
                                                                            title='Remove from cart' 
                                                                            alt='Remove from cart'
                                                                            tabIndex='0'
                                                                            onClick={(e) => this.removeCartProduct(item)}>
                                                                         <i className="fas fa-times"></i>
                                                                      </span>  
                                                                        )}
                                                                    </div>    
                                                                  </div>
                                                                </div>
                                                            </div>
                                                          )}
                                                      </div>
                                                    )}
                                                  </div>
                                              )}
                                            </div>
                                            {/* --- End of 'You might be interested box' --- */}
                                          </div>
                                        </div>
                                            {/* --- End of 'You might be interested' --- */}
                                      </div>
                                            {/* --- End of 'Wid sec col' --- */}

                                    </div>
                                  </div>



                              {/* --- Price details section --- */}

                                  <div className='wid_sec col-12 col-md-5 col-lg-4 col-xl-4'>
                                    <div className='row justify-content-center'>
                                      {this.state.product.map((prod,ind) => (
                                      <div key={ind} className='wrap_wid_sec col-12 col-sm-9 col-md-12 col-lg-12 col-xl-10'>
                                          <div className='row'>
                                           {prod.oldPrice && (
                                            <span className='wid_sec_oldprice ml-auto'>${prod.oldPrice}</span> 
                                            )}
                                           {prod.oldPrice && (
                                                <span className='wid_tagleft mr-auto'>OFFER</span>
                                            )}
                                            {prod.rating > 74 && (
                                            <span className='wid_tagleft wid_offer mt-4 mr-auto'>TOP</span>
                                            )}
                                          </div>
                                          {prod.discountPerc && (
                                          <div className='row'>
                                            <span className='wid_disc_perc ml-auto'>Save up to {prod.discountPerc}%</span>
                                          </div>
                                          )}
                                          <div className='row'>
                                            <span className='wid_sec_price ml-auto'>${prod.price}</span>
                                          </div>
                                          <div className='row'>
                                            <span className='wid_sec_instock ml-auto'>In stock</span>
                                          </div>
                                          <div className='row'>
                                            <span className='wid_sec_deliverytime mt-3 ml-auto'>
                                              <i className="fas fa-truck"></i>
                                              Estimated delivery time - 3-5 days
                                            </span>
                                          </div>
                                           <div className='row'>
                                            <span className='wid_sec_deliverytime mt-2 ml-auto'>
                                              <i className="fas fa-shipping-fast"></i>
                                              Free delivery
                                            </span>
                                          </div>
                                           <div className='row'>
                                            <span className='wid_sec_deliverytime mt-2 ml-auto'>
                                              <i className="fas fa-car"></i>
                                              Pickup in store
                                            </span>
                                          </div>
                                          <div className='row justify-content-center addtocart_row'>
                                            {!prod.addedToCart ? (
                                              <span className='wid_addtocart_button col-11 col-sm-10 col-md-8 col-xl-10 col-lg-10'
                                                    tabIndex='0'
                                                    onClick={(e) => this.addToCart(prod)}>
                                                <i className="fas fa-shopping-cart"></i>
                                                Add to cart
                                              </span>
                                            ):(
                                              <span className='wid_removefromcart_button col-11 col-sm-10 col-md-8 col-xl-10 col-lg-10'
                                                    onClick={(e) => this.removeCartProduct(prod)}
                                                    tabIndex='0'>
                                                Remove product
                                              </span>  
                                            )}
                                          </div>

                                          <div className='row justify-content-center'>
                                            <span className='wid_addtowish_button col-11 col-sm-10 col-md-8 col-xl-10 col-lg-10'
                                                  onClick={() => this.addtoWishList(prod)}
                                                  tabIndex='0'>
                                                  <i className='fas fa-heart addtowish_f_heart'></i>
                                                  <i className='fas fa-heart addtowish_s_heart'></i>
                                                    Add to wishlist
                                            </span>
                                          </div>

                                           <div className='row justify-content-center'>
                                            <span className='wid_checkval_button col-11 col-sm-10 col-md-8 col-xl-10 col-lg-10'
                                                  onClick={() => this.checkProductValability()}
                                                  tabIndex='0'>
                                              Check valability
                                            </span>
                                          </div>
                                      </div>
                                    ))}
                                    </div>  
                                  </div>
                              {/* --- End of sec item col details --- */}


                                </div>
                              </div>
                          </div>
                        
                        
                          <div className='row'>
                            <div className='wid_wrap_moreinfo col-12'>
                                
                                <div className='row'>
                                  <div className='widwrap_descr_rating_div col-12'>
                                  {/* --- More info - Description / Reviews buttons --- */}
                                    <div className='row'>
                                      <span className='wid_descr_button'
                                            tabIndex='0'
                                            onClick={() => this.openProductDescription()}>
                                              Description
                                      </span>
                                      <span className='wid_reviews_button'
                                            tabIndex='0'
                                            onClick={() => this.openProductReviews()}>
                                              Reviews
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                  {/* --- More info container --- */}
                                <div className='row'>
                                  <div className='wid_moreinfo_fwrap col-12'>
                                     
                                      <div className='row'>
                                        {/* --- Description container --- */}

                                        {this.state.viewProductDescr ? (
                                          <div className='row_product_info col-12'>
                                            {/* -- Display full description product if there is one */}
                                            
                                            {this.state.product.map((prod,ind) => (
                                              <div key={ind}>
                                                {prod.type === 'TV' ? (
                                                 <div>
                                                    {prod.specs.map((spec,index) => 
                                                      <div key={index}>
                                                        <div className='row'>
                                                            <span className='mi_prod_title mi_h_title'>PICTURE QUALITY</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Processing rate</span>
                                                            <span className='mi_prod_descr'>{spec.ProcessRate}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Dynamic contrast ratio</span>
                                                            <span className='mi_prod_descr'>{spec.DynConRatio}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Picture enhancement</span>
                                                            <span className='mi_prod_descr'>{spec.PicEnh}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>4K Ultra HD compatibility</span>
                                                            <span className='mi_prod_descr'>{spec.Compatibility4K}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>HDR game mode</span>
                                                            <span className='mi_prod_descr'>{spec.HDRGameMode}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Noise reduction</span>
                                                            <span className='mi_prod_descr'>{spec.NoiseReduction}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title mi_h_title'>SMART</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Smart platform</span>
                                                            <span className='mi_prod_descr'>{spec.SmartPlatform}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Screen mirroring</span>
                                                            <span className='mi_prod_descr'>{spec.ScreenMirroring}</span>
                                                        </div>
                                                         <div className='row'>
                                                            <span className='mi_prod_title'>Smartphone app</span>
                                                            <span className='mi_prod_descr'>{spec.SmartphoneApp}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Other smart features</span>
                                                            <span className='mi_prod_descr'>{spec.OtherSmartFeatures}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title mi_h_title'>CONNECTIVITY</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>WiFi</span>
                                                            <span className='mi_prod_descr'>{spec.Wifi}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Ethernet</span>
                                                            <span className='mi_prod_descr'>{spec.Ethernet}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Bluetooth</span>
                                                            <span className='mi_prod_descr'>{spec.Bluetooth}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Connections</span>
                                                            <span className='mi_prod_descr'>{spec.Connections}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Audio output</span>
                                                            <span className='mi_prod_descr'>{spec.AudioOutput}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title mi_h_title'>AUDIO</span>                                                    
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Speakers</span>
                                                            <span className='mi_prod_descr'>{spec.Speakers}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Audio power</span>
                                                            <span className='mi_prod_descr'>20 W</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Sound enhancement</span>
                                                            <span className='mi_prod_descr'>{spec.SoundEnhancement}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Supports High-Resolution Audio</span>
                                                            <span className='mi_prod_descr'>{spec.SupportsHigherResAudio}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title mi_h_title'>ENERGY CONSUMPTION</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Energy efficiency class</span>
                                                            <span className='mi_prod_descr'>{spec.EnergyEffClass}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>On-mode power consumption</span>
                                                            <span className='mi_prod_descr'>{spec.OnModePowerConsum}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Annual power consumption</span>
                                                            <span className='mi_prod_descr'>{spec.AnnualPowerConsum}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title mi_h_title'>GENERAL</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Colour</span>
                                                            <span className='mi_prod_descr'>{spec.Colour}</span>
                                                        </div>
                                                         <div className='row'>
                                                            <span className='mi_prod_title'>Material</span>
                                                            <span className='mi_prod_descr'>{spec.Material}</span>
                                                        </div>
                                                         <div className='row'>
                                                            <span className='mi_prod_title'>Product height</span>
                                                            <span className='mi_prod_descr'>{spec.Height}</span>
                                                        </div>
                                                         <div className='row'>
                                                            <span className='mi_prod_title'>Width</span>
                                                            <span className='mi_prod_descr'>{spec.Width}</span>
                                                        </div>
                                                         <div className='row'>
                                                            <span className='mi_prod_title'>Diagonal size</span>
                                                            <span className='mi_prod_descr'>{spec.DiagonalSize}</span>
                                                        </div>
                                                        <div className='row'>
                                                            <span className='mi_prod_title'>Product weight</span>
                                                            <span className='mi_prod_descr'>{spec.ProductWeight}</span>
                                                        </div>
                                                         <div className='row'>
                                                            <span className='mi_prod_title'>Guarantee</span>
                                                            <span className='mi_prod_descr'>{spec.Guarantee}</span>
                                                         </div>
                                                      </div>
                                                     )}
                                                  </div>
                                                  ):(
                                                  <div>
                                                    <div>
                                                      <div className='row'>
                                                        <span className='mi_prod_title'>Title</span>
                                                        <span className='mi_prod_descr'>{prod.title}</span>
                                                      </div>
                                                       <div className='row'>
                                                        <span className='mi_prod_title'>Length</span>
                                                        <span className='mi_prod_descr'>{prod.length} cm</span>
                                                       </div>
                                                     </div>
                                                    </div>
                                                  )}
                                                </div> 
                                            ))}
                                          </div>   
                                        ):('')}

                                      {/* --- Review container --- */}

                                        {this.state.viewProductReview ? ( 
                                          <div className='row_review_info col-12'>
                                              <div className='review_load_div'>
                                                <div className='row justify-content-center'>
                                                  <div className="rev_loader">
                                                      <div></div><div></div><div></div><div></div>
                                                      <div></div><div></div><div></div><div></div>
                                                  </div>
                                                </div>
                                              </div>

                                            
                                              <div className='row'>
                                                  <span className='r_review_title'>Write a review</span>
                                              </div>
                                              <div className='row'>
                                                  <span className='r_review_name'>
                                                    Your name
                                                    <span> *</span>
                                                  </span>
                                              </div>
                                              <div className='row'>
                                                  <span className='r_review_name_subtitle'>
                                                    This name will be displayed on the review
                                                  </span>
                                              </div>
                                              <div className='row'>
                                                  <span className='r_review_inputspan'>
                                                    <input className='review_input' 
                                                           type='text'
                                                           onChange={(e) => this.reviewHandleName(e)}
                                                           onKeyDown={(e) => this.revKeyHandleButton(e)}>
                                                    </input>
                                                  </span>
                                              </div>
                                              <div className='row'>
                                                  <span className='review_input_msgErr r_name_err mt-1'>Invalid review name</span>
                                              </div>
                                               <div className='row'>
                                                  <span className='r_review_titlereview'>
                                                    Review title
                                                    <span> *</span>
                                                  </span>
                                              </div>
                                              <div className='row'>
                                                  <span className='r_review_inputspan'>
                                                    <input className='review_input' 
                                                           type='text'
                                                           onChange={(e) => this.reviewHandleTitle(e)}
                                                           onKeyDown={(e) => this.revKeyHandleButton(e)}>
                                                    </input>
                                                  </span>
                                              </div>
                                              <div className='row'>
                                                  <span className='review_input_msgErr r_title_err mt-1'>Invalid review title</span>
                                              </div>
                                               <div className='row'>
                                                  <span className='r_review_ratereview'>
                                                    Rate review
                                                    <span> *</span>
                                                  </span>
                                              </div>
                                              <div className='row'>
                                                <fieldset tabIndex='0' className="rating_fieldset">
                                                  <input tabIndex='0' type="radio" id="star5" className='inp_radio_check' name="rating" value="5"></input>
                                                  <label tabIndex='0' className = "full star_input" htmlFor="star5" title="5 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                  <input tabIndex='0' type="radio" id="star4half" className='inp_radio_check' name="rating" value="4 and a half"></input>
                                                  <label tabIndex='0' className="half star_input" htmlFor="star4half" title="4.5 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                  <input tabIndex='0' type="radio" id="star4" className='inp_radio_check' name="rating" value="4"></input>
                                                  <label tabIndex='0' className = "full star_input" htmlFor="star4" title="4 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                  <input tabIndex='0' type="radio" id="star3half" className='inp_radio_check' name="rating" value="3 and a half"></input>
                                                  <label tabIndex='0' className="half star_input" htmlFor="star3half" title="3.5 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                  <input tabIndex='0' type="radio" id="star3" className='inp_radio_check' name="rating" value="3"></input>
                                                  <label tabIndex='0' className = "full star_input" htmlFor="star3" title="3 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                  <input tabIndex='0' type="radio" id="star2half" className='inp_radio_check' name="rating" value="2 and a half"></input>
                                                  <label tabIndex='0' className="half star_input" htmlFor="star2half" title="2.5 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                  <input tabIndex='0' type="radio" id="star2" className='inp_radio_check' name="rating" value="2"></input>
                                                  <label tabIndex='0' className = "full star_input" htmlFor="star2" title="2 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                  <input tabIndex='0' type="radio" id="star1half" className='inp_radio_check' name="rating" value="1 and a half"></input>
                                                  <label tabIndex='0' className="half star_input" htmlFor="star1half" title="1.5 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                  <input tabIndex='0' type="radio" id="star1" className='inp_radio_check' name="rating" value="1"></input>
                                                  <label tabIndex='0' className = "full star_input" htmlFor="star1" title="1 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                  <input tabIndex='0' type="radio" id="starhalf" className='inp_radio_check' name="rating" value="half"></input>
                                                  <label tabIndex='0' className="half star_input" htmlFor="starhalf" title="0.5 out of 5" 
                                                         onMouseOver={(e) => this.hoverTitleRate(e)}
                                                         onMouseOut={(e) => this.hoverOutTitleRate(e)}
                                                         onClick={(e) => this.clickTitleRate(e)}></label>
                                                </fieldset>
                                                <span className='r_review_hovertxt'></span>
                                              </div>
                                              <div className='row'>
                                                  <span className='review_input_msgErr r_rate_err mt-1'>Please rate the product</span>
                                              </div>
                                           
                                             {/* --- Review comment --- */}

                                             <div className='row'>
                                              <span className='r_review_titlereviewcomm'>
                                                Review comment
                                                <span> *</span>
                                              </span>
                                             </div>
                                             <div className='row'>
                                                <span className='r_review_inputspan r_rev_in_txtarea'>
                                                  <textarea className='review_input' 
                                                            type='text'
                                                            onChange={(e) => this.reviewHandleComment(e)}
                                                            onKeyDown={(e) => this.revKeyHandleButton(e)}>
                                                  </textarea>
                                                </span>
                                              </div>
                                              <div className='row'>
                                                    <span className='review_input_msgErr r_comm_err mt-1'>Invalid review comment</span>
                                              </div>

                                              {/* --- Review conclusion --- */}

                                              <div className='row'>
                                              <span className='r_review_titleconclusion'>
                                                Conclusion
                                                <span> *</span>
                                              </span>
                                             </div>
                                            <div className='row'>
                                              <div className='r_review_conc_div'>
                                                  <ul>
                                                    <li>
                                                      <input id='irecprod' 
                                                             className='review_checkrec' 
                                                             type='radio'
                                                             onClick={(e) => this.reviewRecCheck(e)}>
                                                      </input>
                                                      <label htmlFor='irecprod'>I recommend this product.</label>
                                                    </li>
                                                    <li>
                                                      <input id='idonotrecprod' 
                                                             className='review_checkrec' 
                                                             type='radio'
                                                             onClick={(e) => this.reviewRecCheck(e)}>
                                                      </input>
                                                      <label htmlFor='idonotrecprod'>I do not recommend this product</label>
                                                    </li>
                                                  </ul>   
                                              </div>
                                             </div>
                                              <div className='row'>
                                                    <span className='review_input_msgErr r_conclusion_err mt-3'>Invalid review comment</span>
                                              </div>

                                             {/* --- Review email address --- */}

                                              <div className='row'>
                                                <span className='r_review_titleleaveemail'>
                                                   Leave your email to validate the review
                                                  <span> *</span>
                                                </span>
                                              </div>

                                             <div className='row'>
                                                <span className='r_review_inputspan'>
                                                    <input className='review_input' 
                                                           type='text' 
                                                           placeholder='Email Address'
                                                           onChange={(e) => this.reviewHandleEmail(e)}
                                                           onKeyDown={(e) => this.revKeyHandleButton(e)}>
                                                    </input>
                                                </span>
                                             </div>
                                             <div className='row'>
                                                    <span className='review_input_msgErr r_email_err mt-3'>
                                                      Invalid review email
                                                    </span>
                                             </div>
                                             <div className='row'>
                                                  <span className='review_submit_button mt-4'
                                                        tabIndex='0'
                                                        onClick={() => this.sendReviewButton()}>
                                                          Send review
                                                  </span>
                                             </div>

                                             <div className='row'>
                                              {this.state.reviewSubmitted ? (
                                                    <span className='r_submit_confirmmsg mt-3'>
                                                        Your review has been submitted. 
                                                        You will receive a confirm email when your review has been approved.
                                                    </span>
                                                  ):('')}
                                             </div>
                                              

                                              {/* --- Review comments --- */}

                                              <div className='row'>
                                                <div className='review_comments_div col-12'>
                                                  <div className='row'>
                                                      <span className='r_rev_customerrev_title'>Customer reviews</span>
                                                  </div>
                                                  <div className='row'>
                                                    {this.state.product.map((product,index) =>
                                                    <div key={index} className='wrap_rev_ratitle'>
                                                      <div className='rev_user_rating rev_rating_title'>
                                                        <div className='fill_ratings_revuser' style={{width:product.rating}}>
                                                          <span>★★★★★</span>
                                                        </div>
                                                        <div className="empty_ratings_revuser">
                                                          <span>★★★★★</span>
                                                        </div>
                                                      </div>
                                                      <span className='rev_ratitle_revnumber'>
                                                        {product.reviewsNumber}
                                                        <span> ratings</span>
                                                      </span>
                                                    </div>
                                                    )}
                                                  </div>
                                                    <hr />
                                                  {this.state.reviewComments.map((review,index) =>
                                                    <div key={index} className='row'>
                                                      <div key={index} className='user_review_box col-12 col-sm-12 col-md-8 col-lg-7 col-xl-6'>
                                                          
                                                        {/* --- Avatar / Name review --- */}
                                                        <div className='row'>
                                                          <div className='user_rev_imgName col-12'>
                                                            <i className="fas fa-user-circle"></i>
                                                            <span className='user_rev_name'>{review.name}</span>
                                                          </div>
                                                        </div>

                                                        {/* --- Rate / Title review --- */}
                                                        <div className='row'>
                                                          <div className='user_rev_rateTitle col-12'>
                                                              <div className='rev_user_rating'>
                                                                 <div className='fill_ratings_revuser' style={{width:review.rate}}>
                                                                     <span>★★★★★</span>
                                                                 </div>
                                                                 <div className="empty_ratings_revuser">
                                                                     <span>★★★★★</span>
                                                                 </div>
                                                              </div>
                                                              <span className='user_rev_title'>{review.title}</span>
                                                          </div>
                                                        </div>
                                                        
                                                        {/* --- Date review --- */}
                                                        <div className='row'>
                                                          <span className='user_rev_date col-12'>
                                                            <span>{review.date}</span>
                                                            <span>Verified purchase</span>
                                                          </span>
                                                        </div>

                                                        {/* --- Comment review --- */}
                                                        <div className='row'>
                                                          <span className='user_comm_txt col-12 col-sm-11 col-md-12 col-lg-12'>
                                                             {review.comment}
                                                          </span>
                                                        </div>

                                                         <div className='row'>
                                                          <span className='user_npeople_foundhelpful'>
                                                              {review.foundHelpful} people found this helpful.
                                                          </span>
                                                         </div>

                                                          {/* --- Helpful button review --- */}
                                                         <div className='row'>
                                                          <div className='rev_user_helpful_butt_div'>

                                                            {/* --- Helpful review button --- */}
                                                            {!review.foundHelpfulClicked ? (
                                                              <span className='rev_user_helpful_butt' 
                                                                    tabIndex='0'
                                                                    onClick={(e) => this.handleHelpfulReview(review)}>
                                                                      Helpful
                                                                      <i className="far fa-thumbs-up"></i>
                                                              </span>
                                                            ):(
                                                              <span className='rev_helpful_msg'>
                                                               <i className="far fa-thumbs-up"></i>
                                                                Your feedback has been sent.
                                                              </span>
                                                              )}
                                                            {/* --- Report review button --- */}
                                                            {review.displayReportAbuseButton ? (
                                                            <span className='rev_user_report_butt'
                                                                  onClick={(e) => this.handleReportReview(review)}>
                                                                    Report abuse
                                                            </span>
                                                             ):('')}
                                                          </div>
                                                         </div>
                                                       {/* --- Confirm report review --- */}
                                                         <div className='row'>
                                                            {review.reportAbuseClicked ? (
                                                           <span className='rev_report_confirm'>
                                                                <span className='rev_rep_confirm_sec'>
                                                                  Are you sure you want to report this review?
                                                                </span>
                                                                <span tabIndex='0' className='rev_rep_conf_yes' onClick={(e) => this.handleReportAnswer(review,e)}>Yes</span>
                                                                <span tabIndex='0' className='rev_rep_conf_no' onClick={(e) => this.handleReportAnswer(review,e)}>No</span>
                                                            </span>
                                                            ):('')}
                                                         </div>
                                                         

                                                      </div>
                                                    </div>
                                                  )}
                                                {/* --- End of 'Review box' --- */}
                                              </div>
                                            </div>
                                          </div>
                                         ):('')}

                                      {/* --- End of product review container --- */}

                                       </div>
                               
                                  </div>
                                </div>
                                 {/* --- End of Description container --- */}
                            </div>
                          </div>
                        </div>
                      ):('')}
                      
                      {!this.state.product.length > 0 ? (
                        <div>
                          <div className='row justify-content-center'>
                            <div className='wid_noproduct_err_div col-12 col-md-12'>
                              <div className='row justify-content-center'>
                                <div className='wid_noprod_err_half col-12 col-md-5'>
                                  <div className='row justify-content-center'>
                                      <img src={require('../images/viewProductDetails/tv_404.jpg')} alt=''></img>
                                  </div>
                                </div>

                                <div className='wid_noprod_err_half col-12 col-md-7'>
                                  <div className='row justify-content-center'>
                                    <div className='wid_404_txt_div col-11 col-sm-9 col-md-10'>
                                      <i className='fas fa-info-circle'></i>
                                      <span className='wid_44_txtone'>404 ERROR</span>
                                      <span className='wid_44_pnf'> - Page not found</span>
                                    </div>
                                  </div>
                                
                                  <div className='row justify-content-center'>
                                      <span className='wid_404_pnfbigtxt col-11'>
                                        Ops, <span>we can't find the page</span> you're looking for.
                                      </span>
                                  </div>
                                  <div className='row justify-content-center'>
                                      <span className='wid_404_pnfbigtxt_two col-11'>
                                        You may have visited a page that's being updated, changed, or moved. 
                                        Or there's the possibility that it doesn't even exist anymore. 
                                        Try searching through our header or footer to find it.
                                      </span>
                                  </div>
                                  
                                  <div className='row justify-content-center'>
                                    <Link to={process.env.PUBLIC_URL + '/'}
                                          className='backtohome_404err_butt'>
                                          Back to homepage
                                    </Link>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ):('')}
                      
                 

                 </div>
              </div>
            <Footer />
          </div>
        </div>
      )
  }
}

 const ViewProductDetails = connect(mapStateToProps,mapDispatchToProps)(connectViewProductDetails);
export default ViewProductDetails;
