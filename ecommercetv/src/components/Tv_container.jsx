import   React, { Component } from 'react';
import { connect            } from "react-redux";
import { openTvCont         } from '../actions/index';
import { userSignedInFunc   } from '../actions/index';
import { userInfoFunc       } from '../actions/index';
import { openUserMenuFunct  } from '../actions/index';
import { selectedProduct    } from '../actions/index';
import { viewProductDetails } from '../actions/index';
import { tvCartProductsFunc } from '../actions/index';
import { addedToCart        } from '../actions/index';
import { Link               } from 'react-router-dom'
import   Header               from './Header';
import   Footer               from './Footer';
import   tvProducts           from '../jsonData/tvProducts.js';
import   'firebase/auth';
import   '../firebase';
import   '../css/Tv_cont.css';
import   '../js/script.js';


 const mapStateToProps = state => {
  return {  userSignedIn   : state.userSignedIn,
            product        : state.product,
            userInfo       : state.userInfo,
            openTvCont     : state.openTvCont,
            tvCartProducts : state.tvCartProducts,
            cartItems      : state.cartItems
        };
};

 function mapDispatchToProps(dispatch) {
  return {
            userSignedInFunc   : bol     => dispatch(userSignedInFunc(bol)),
            userInfoFunc       : bol     => dispatch(userInfoFunc(bol)),
            openTvCont         : bol     => dispatch(openTvCont(bol)),
            viewProductDetails : bol     => dispatch(viewProductDetails(bol)),
            selectedProduct    : product => dispatch(selectedProduct(product)),
            tvCartProductsFunc : prod    => dispatch(tvCartProductsFunc(prod)),
            addedToCart        : bol     => dispatch(addedToCart(bol)),
            openUserMenuFunct  : bol     => dispatch(openUserMenuFunct(bol))
  };
}


class ConnectedTvCont extends Component {

  constructor(props) {
    super(props)

      this.state = {
                tvCartProducts         : tvProducts,
                duplicateTvProd        : tvProducts,
                product                : this.props.product,
                openRatingSelect       : false,
                ratingFilter           : [
                                          {rating: 'Rating'  ,value: 0             },
                                          {rating: '1 star'  ,value: 1 ,percent: 20},
                                          {rating: '2 stars' ,value: 2 ,percent: 40},
                                          {rating: '3 stars' ,value: 3 ,percent: 60},
                                          {rating: '4 stars' ,value: 4 ,percent: 75},
                                          {rating: '5 stars' ,value: 5 ,percent: 99}
                                         ],
                ratingFilterSelValue   : '',
                openPriceSelect        : false,
                priceFilter            : ['Price', 200, 300, 400, 500, 600, 700],
                priceFilterSelValue    : '',
                openDiagonalSelect     : false,
                diagonalSizeFilter     : ['Diagonal', 45, 55, 60, 65, 75],
                diagonalFilterSelValue : '',
                displayFilterMobile    : false,
                intervalValue          : null,
                indexValue             : 1,
                filterValues           : [{ rating: '', price: '', diagonal: '' }],
                query                  : '',
                openSortMenu           : false,
                sortByFilters          :  [{value: 0,title:"Relevance"},{value:1,title:"Deals & Offers"},{value:2,title:"Brand - A to Z"},{value:3,title:"Brand - Z to A"},{value:4,title:"Price - low to high"},{value:5,title:"Price - high to low"}],    
      }
    }


 

componentDidMount() {
  let tvCartProducts  = [...this.state.tvCartProducts],
      cartItems       = this.props.cartItems;

      // Check if product with true value, exists inside cart
        // Map through tvCartproducts and check products with 'Added to cart' true value
    tvCartProducts.map((prod) => {
       if(cartItems.includes(prod)) {
          // If exits, set 'Added to cart' button
        prod.addedToCart = true;
       } else {
          // If it doesn't exists remove 'Added to cart' button
        prod.addedToCart = false;
          // Reset removedFromCart value to avoid loading effect inside cart if product was added second time to the cart
        prod.removedFromCart = false;
       }
     });
        
      // Restore default profile image for all the products  
    if(this.props.openTvCont) {
        tvCartProducts.map((item) => {
          if(item.image !== item.imageGallery[0]) {
           item.image = item.imageGallery[0];
          }
           return false;
       })     
    }
    this.setState({ tvCartProducts: tvCartProducts })

      // Set document title
    document.title = 'Tv Innovation - Home';
      // Highlight 'Home' nav
    document.querySelector('.nav_sp_home').classList.add('nav_active');
    document.querySelector('.nav_sp_contact').classList.remove('nav_active');

      // Set resize event listener 
    window.addEventListener('resize', this.handleTvContResize);
}


handleTvContClick() {
   let searchDivInput = document.querySelector('.tv_wrap_search_div');
      // Close user menu
    this.props.openUserMenuFunct({ openUserMenu: false })
    this.setState({ openSortMenu: false, 
                    openRatingSelect: false,
                    openPriceSelect: false, 
                    openDiagonalSelect: false,
                 })

  // Open search input
    if(window.innerWidth > 500) { 
      searchDivInput.classList.remove('open_search_big');
      searchDivInput.classList.remove('open_search');
    } else {
      searchDivInput.classList.remove('open_search');
      searchDivInput.classList.remove('open_search_big');
    }
}



openSearchInput(e) {
  e.stopPropagation();
  let searchDivInput = document.querySelector('.tv_wrap_search_div'),
      searchInput    = document.querySelector('.tv_input_search');
      // Open search input
    if(window.innerWidth > 500) { 
      searchDivInput.classList.toggle('open_search_big');
      searchDivInput.classList.remove('open_search');
      searchInput.focus();
    } else {
      searchDivInput.classList.toggle('open_search');
      searchDivInput.classList.remove('open_search_big');
      searchInput.focus();
    }
}

handleSearch(e) {
  let tvCartProducts     = [...this.state.tvCartProducts],
      query              = e.target.value,
      queryState         = this.state.query,    
      checkWhiteSpaces   = query.trim().length === query.length,
      searchResults      = [];

        // If there is value and no blank spaces
      if(query.length > 0 && checkWhiteSpaces) {
        tvProducts.map((prod) => {
            // If product title contains inputed query, push it inside array to display results
          if(prod.title.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push(prod);
          } 

          this.setState({ tvCartProducts: searchResults })
        })
      } 
           // If last query state is not equal with actual query (backspace used),
      if(query.length < queryState.length) {
          // Clear searchResults array and search new query input  
        searchResults = [];
         tvProducts.map((prod) => {
          if(prod.title.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push(prod);
          } 
          this.setState({ tvCartProducts: searchResults })
        }) 
       }
         // If there is no query input, display all products
      if(query.length === 0) {
          this.setState({ tvCartProducts: tvProducts })
      } // Set new query state
          this.setState({ query: query })
}


handleTvContResize() {
  let mobileFilterDiv   = document.querySelector('.mobile_filter_div');


    // If window width is higher than 820.5px and contains mobileFilterDiv, hide it. 
    if(window.innerWidth > 820.5) {
      
      // If component contains mobile filter div
      if(document.contains(mobileFilterDiv)) {
        // If window width is higher than 820 and mobile filter div is open, close it.
         if(mobileFilterDiv.classList.contains('mob_fil_div_open')) {
        mobileFilterDiv.classList.remove('mob_fil_div_open');
      }
    }
  }
}

resetSortyByMenu() {
      // Reset sortby select
    document.querySelector('.sortby_select').innerHTML = this.state.sortByFilters[0].title;
} 

/* __________ Filters __________ */

openRatingSelect(e) {
  e.stopPropagation();
  this.setState({ openRatingSelect: !this.state.openRatingSelect, openPriceSelect: false, openDiagonalSelect: false, openSortMenu: false })
}
openPriceSelect(e) {
  e.stopPropagation();
  this.setState({ openPriceSelect: !this.state.openPriceSelect, openRatingSelect: false, openDiagonalSelect: false, openSortMenu: false })
}
openDiagonalSelect(e) {
  e.stopPropagation();
  this.setState({ openDiagonalSelect: !this.state.openDiagonalSelect, openRatingSelect: false, openPriceSelect: false, openSortMenu: false })
}

selectRating(e,val) {
  let filterValues       = [...this.state.filterValues],
      inputSearch        = document.querySelector('.tv_input_search'),
      inputSearchDiv     = document.querySelector('.tv_wrap_search_div'),
      mobFilSelRating    = document.querySelector('.mob_sel_rating'),
      selectRatingButton = document.querySelector('.filter_select_rating'),
      query              = this.state.query;
      
      e.stopPropagation();
        // Call function to close select rating menu
      this.openRatingSelect(e);
        // If search input has value, reset state query and input.
      if(query) {
          this.setState({ query: '' })
          inputSearch.value = '';
            // Hide search input on mobile / normal size
          inputSearchDiv.classList.remove('open_search');
          inputSearchDiv.classList.remove('open_search_big');
      }
           // If e rating is a number, set filterValue rating
      if(typeof val.percent === 'number') {
        filterValues.map((prod) => prod.rating = val.percent);
        selectRatingButton.innerHTML = val.rating;
          this.resetSortyByMenu();
      } else {
        filterValues.map((prod) => prod.rating = '');
        selectRatingButton.innerHTML = 'Rating';
      }

        // If 'Filter select rating' was changed, change the 'Mobile select rating' value filter too
      mobFilSelRating.innerHTML = val.rating;

      this.setState({ filterValues: filterValues });
        // Call filterResults function to display products
      this.filterResults();  
}

selectPrice(i,val) {
  let filterValues      = [...this.state.filterValues],
      inputSearch       = document.querySelector('.tv_input_search'),
      inputSearchDiv    = document.querySelector('.tv_wrap_search_div'),
      mobFilSelPrice    = document.querySelector('.mob_sel_price'),
      selectPriceButton = document.querySelector('.filter_select_price'),
      query             = this.state.query;

      i.stopPropagation();
        // Call function to close select price menu
      this.openPriceSelect(i);
        // If search input has value, reset state query and input.
      if(query) {
          this.setState({ query: '' })
          inputSearch.value = '';
            // Hide search input on mobile / normal size
          inputSearchDiv.classList.remove('open_search');
          inputSearchDiv.classList.remove('open_search_big');
      }
        // If val price is a number, set filterValue price
      if (typeof val === 'number') {
        filterValues.map((prod) => prod.price = val);
          // If val is a number, innerHtml = number;
        selectPriceButton.innerHTML = val;
          this.resetSortyByMenu();
      } else {
        filterValues.map((prod) => prod.price = '');
          // If val is not a number, innerHtml = 'Price';
        selectPriceButton.innerHTML = 'Price';
      }

         // If 'Filter select price' was changed, change the 'Mobile select price' value filter too
      mobFilSelPrice.innerHTML = val;

      this.setState({ filterValues: filterValues });
        // Call filterResults function to display products 
      this.filterResults();
}

selectDiagonal(i,diag) {
    let filterValues      = [...this.state.filterValues],
        inputSearch       = document.querySelector('.tv_input_search'),
        inputSearchDiv    = document.querySelector('.tv_wrap_search_div'),
        mobFilSelDiagonal = document.querySelector('.mob_sel_diagonal'),
        selectDiagButton  = document.querySelector('.filter_select_diagonal'),
        query             = this.state.query;

      i.stopPropagation();
          // Call function to close select diagonal menu
      this.openDiagonalSelect(i);
          // If search input has value, reset state query and input.
      if(query) {
          this.setState({ query: '' })
          inputSearch.value = '';
            // Hide search input on mobile / normal size
          inputSearchDiv.classList.remove('open_search');
          inputSearchDiv.classList.remove('open_search_big');
      }
        // If diag is a number, set filterValue diagonal
      if(typeof diag === 'number') {
        filterValues.map((prod) => prod.diagonal = diag);
        selectDiagButton.innerHTML = diag;
          this.resetSortyByMenu();
      } else {
        filterValues.map((prod) => prod.diagonal = '');
        selectDiagButton.innerHTML = 'Diagonal';
      }

        // If 'Filter select diagonal' was changed, change the 'Mobile select diagonal' value filter too
     mobFilSelDiagonal.innerHTML = diag;

     this.setState({ filterValues: filterValues });
        // Call filterResults function to display products
     this.filterResults();
}

clearTvFilters() {
       // Use the same function to clear filters for mobile size
     this.mobClearFilters();
}

filterResults() {
  let filter       = [...this.state.filterValues],
      dupliTvProd  = this.state.duplicateTvProd,
      filtered     = [];

      // Primitive filter ^_^ //

      // Loop throug filterValues state to handle filter values changes
  for(let i=0; i<filter.length;i++) {
      // If price has value //
    if(filter[i].price !== '') {
          // If price and rating
        if(filter[i].price !== '' && filter[i].rating !== '') {

           dupliTvProd.map((prod) => { 
            if(prod.originalPrice <= filter[i].price && prod.rating <= filter[i].rating) { 
                filtered.push(prod); 
            }
          })
            
          // If price and diagonal
      } else if(filter[i].price !== '' && filter[i].diagonal !== '') {
           dupliTvProd.map((prod) => { 
            if(prod.originalPrice <= filter[i].price && prod.diagonalSize <= filter[i].diagonal) { 
                filtered.push(prod); 
              }})
             
          // If price, no rating and no diagonal
      } else if(filter[i].price !== '' && filter[i].rating === '' && filter[i].diagonal === '') {
           dupliTvProd.map((prod) => { 
              if(prod.originalPrice <= filter[i].price) { 
                filtered.push(prod); 
              }})
 
          // If price, rating and diagonal
      } else if(filter[i].price !== '' && filter[i].rating !== '' && filter[i].diagonal !== '') {
           dupliTvProd.map((prod) => { 
            if(prod.originalPrice <= filter[i].price && prod.rating <= filter[i].rating && prod.diagonalSize <= filter[i].diagonal) { 
                filtered.push(prod); 
              }}); }        
 
   } else { // If price has no value //
          // If rating and diagonal
        if(filter[i].rating !== '' && filter[i].diagonal !== '') {
          dupliTvProd.map((prod) => { if(prod.rating <= filter[i].rating && prod.diagonalSize <= filter[i].diagonal ) { filtered.push(prod); }})}
            
          // if diagonal and no rating
        if(filter[i].rating === '' && filter[i].diagonal !== '') {
          dupliTvProd.map((prod) => { if(prod.diagonalSize <= filter[i].diagonal) { filtered.push(prod); }})}

          // If rating and no diagonal
        if(filter[i].rating !== '' && filter[i].diagonal === '') {
          dupliTvProd.map((prod) => { if(prod.rating <= filter[i].rating) { filtered.push(prod); }})}
            
          // If no rating and no diagonal
        if(filter[i].rating === '' && filter[i].diagonal === '') {
          dupliTvProd.map((prod) => { filtered.push(prod); })}
              
    }   // Setstate to take effect new filters
      this.setState({ tvCartProducts: filtered })
  }
}


/* __________ Mobile Filters __________ */


openMobileFilter() {
    // Toggle display mobile filter div
  document.querySelector('.mobile_filter_div').classList.toggle('mob_fil_div_open');
    // Close filter mobile div
  
}

openMobRatingDropdown() {
    // Display / hide option dropdown select mobile rating filter
  document.querySelector('.mob_frating').classList.toggle('mob_opt_filter_open');
}
hMobSelRat(i,e) {
     // Set 'Mobile select rating' value to the 'Normal (full size) size select rating' value
  document.querySelector('.filter_select_rating').selectedIndex = e.value;
    // Change innerHTML value to the select rating filter
  document.querySelector('.mob_sel_rating').innerHTML = e.value;
    // Call rating function
  this.selectRating(i,e);
    // Call function to close 'Mobile select option'
  this.openMobRatingDropdown();
}

openMobPriceDropdown() {
    // Display / hide option dropdown select mobile rating filter
  document.querySelector('.mob_fprice').classList.toggle('mob_opt_filter_open');
}

hMobSelPrice(i,e,index) {
    // Set 'Mobile select price' value to the 'Normal (full size) size select price' value
  document.querySelector('.filter_select_price').selectedIndex = index;
    // Change innerHTML value to the select price filter
  document.querySelector('.mob_sel_price').innerHTML = e;
  document.querySelector('.mob_sel_price').value = index;
    // Call price function
  this.selectPrice(i,e);
    // Call function to close 'Mobile select option'
  this.openMobPriceDropdown();
}

openMobDiagonalDropdown() {
    // Display / hide option dropdown select mobile rating filter
  document.querySelector('.mob_fdiag').classList.toggle('mob_opt_filter_open');
}

hMobSelDiagonal(i,e,index) {
    // Set 'Mobile select price' value to the 'Normal size select price' value
  document.querySelector('.filter_select_diagonal').selectedIndex = index;
    // Change innerHTML value to the select diagonal filter
  document.querySelector('.mob_sel_diagonal').innerHTML = e;
  document.querySelector('.mob_sel_diagonal').value = index;
    // Call diagonal function
  this.selectDiagonal(i,e);
    // Call function to close 'Diagonal select option'
  this.openMobDiagonalDropdown();
}

mobClearFilters() {
    // Clear all mobile filters
  document.querySelector('.mob_sel_rating').innerHTML   = 'Rating';
  document.querySelector('.mob_sel_price').innerHTML    = 'Price';
  document.querySelector('.mob_sel_diagonal').innerHTML = 'Diagonal';
    // Clear all normal size filters
  document.querySelector('.filter_select_rating').innerHTML   = 'Rating';
  document.querySelector('.filter_select_price').innerHTML    = 'Price';
  document.querySelector('.filter_select_diagonal').innerHTML = 'Diagonal';
    // Clear 'Sort by' filter
  document.querySelector('.sortby_select').innerHTML = 'Relevance';
    // Clear search input
  document.querySelector('.tv_input_search').value = '';
    // Reset tvCartproducts state
  this.setState({ tvCartProducts: tvProducts, query: '' })
}

/* __________ View product details handlers __________ */


viewProductDetails(item) {
  let product         = [],
      tvCartProducts  = [...this.state.tvCartProducts],
      intervalValue   = this.state.intervalValue;
      
      // Map through tvProducts to set default image
    tvCartProducts.map((tvProd) => {
      if(tvProd.image !== tvProd.imageGallery[0]) {
        tvProd.image = tvProd.imageGallery[0];
      } return false;
    })

      if(item.oldPrice) {
        let joinOldPrice      = parseFloat(item.oldPrice.toString().split('.').join(''));
        let joinOriginalPrice = parseFloat(item.originalPrice.toString().split('.').join(''));
         // Calculate discount percent to display it
        let getSum        = joinOldPrice - joinOriginalPrice;
        let getPercent    =   (getSum / joinOldPrice) * 100;
        item.discountPerc = getPercent.toFixed(0);
      }
      // Push product item to display the info
    product.push(item);
      // Clear the imgSwitchImages interval to avoid bugs
    clearInterval(intervalValue);


  this.setState                 ({ tvCartProducts: tvCartProducts, intervalValue: intervalValue })   
  this.props.selectedProduct    ({ product: product })
  this.props.openTvCont         ({ openTvCont: false })
  this.props.viewProductDetails ({ viewProductDetails: true})
}

handleProdImgHover(prod) {
  let intervalValue = this.state.intervalValue;
  // Set interval to start changing images to 
      intervalValue = setInterval(() => {this.switchImages(prod)},500);
  // Set state value to ge the changes
      this.setState({ intervalValue: intervalValue })

 }

switchImages(prod) {
  let tvCartProducts = [...this.state.tvCartProducts],
      imgGallery     = prod.imageGallery,
      indexValue     = this.state.indexValue;

      // Map through the products
     tvCartProducts.map((item,ind) => {
        // If product item id match to hovered product, trigger
      if(prod.id === item.id) {
            // Set item profile image
          item.image = imgGallery[indexValue];
            // If indexValue reached product imageGallery length, reset to 0
          if(indexValue === imgGallery.length - 1) {
            indexValue = 0;
          } else {
            // Else, continue increasing by 1
            indexValue++;
          }} return false; })
   this.setState({ tvCartProducts: tvCartProducts, indexValue: indexValue})
}
 
handleProdImgHoverOut(prod) {
   let intervalValue   = this.state.intervalValue,
       tvCartProducts  = [...this.state.tvCartProducts];
    
        // Clear interval to stop product profile image changing 
     clearInterval(intervalValue);
       // Search through products array, find hovered out product and set default image
     tvCartProducts.map((item,ind) => {
          // Set default product image
          item.image = item.imageGallery[0];
     })
    this.setState({ intervalValue: intervalValue, tvCartProducts: tvCartProducts }) 
}

addToCart(item) {
  let cartItems      = [...this.props.cartItems],
      tvCartProducts = [...this.state.tvCartProducts];

    // Set 'addedToCart' to true and display 'Added to cart' button
  item.addedToCart = true
    // Preventive disable 'Removing loading effect' for this product
  item.removedFromCart = false;
    // Push product inside cartItems array
  cartItems.unshift(item);
    // Set new props to cartItems 
  this.props.addedToCart({ cartItems: cartItems})
    // Set value to true to display loading effect after adding to cart
  tvCartProducts.map((prod) => { if(prod.id === item.id) { prod.addedToCartLoading = true }});
    // Set state to enable loading effect before adding product insie the cart
  this.setState({ tvCartProducts: tvCartProducts })
  
  // Set delay of 1 sec to display loading effect while product is added to the cart
  setTimeout(() => {
      // Map for the added id, and disable loading effect
   tvCartProducts.map((prod) => { if(prod.id === item.id) { prod.addedToCartLoading = false } return false; });
   this.props.addedToCart ({ cartItems: cartItems})
   this.setState          ({ tvCartProducts: tvCartProducts })
  }, 300);
}
 
selectSortOption(e) {
let sortBySelect   = document.querySelector('.sortby_select'),
    tvCartProducts = [...this.state.tvCartProducts],
    tvProd         = [...tvProducts];

    this.mobClearFilters();
      // Set 'Sort by select' innerHTML to selected option
    sortBySelect.innerHTML = e.title;
      
    
    switch (e.value) {
      case 0:
        // Random sort (default)
           for (let i = tvProd.length - 1; i > 0; i--) {
            let j     = Math.floor(Math.random() * (i + 1));
            let temp  = tvProd[i];
            tvProd[i] = tvProd[j];
            tvProd[j] = temp;
          }
          this.setState({ tvCartProducts: tvProd })
      break;
      case 1:
        // Sort by offer
      this.setState({ tvCartProducts: tvProducts.filter((prod) => prod.oldPrice !== undefined )});
       console.log(e.value);
      break;
      case 2:
        // Sort brand A to Z
      this.setState({ tvCartProducts: tvProducts.sort((a,b) => a.brand.toLowerCase() > b.brand.toLowerCase())});
      break;
      case 3:
        // Sort brand Z to A
      this.setState({ tvCartProducts: tvProducts.sort((a,b) => a.brand.toLowerCase() < b.brand.toLowerCase())});
      break;
      case 4:
        // Sort brand low to high
      this.setState({ tvCartProducts: tvProducts.sort((a,b) => a.originalPrice > b.originalPrice)});
      break;
      case 5:
        // Sort brand high to low
      this.setState({ tvCartProducts: tvProducts.sort((a,b) => a.originalPrice < b.originalPrice)});

    }
     
}
openSortByMenu(e) {
    e.stopPropagation();
      // Close sortby dropmenu
    setTimeout(() => {
      this.setState({ openSortMenu: !this.state.openSortMenu, openDiagonalSelect: false, openRatingSelect: false, openPriceSelect: false })
    },100);
}

handleScrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}



render() {
  return (

    <div>
      <div className='col-12'>
        <Header/>
           <div className='row justify-content-center'>
              <div className='tv_container col-12' onClick={() => this.handleTvContClick()}>
                
                {/* --------- Filter div ---------- */}
                <div className='row justify-content-center'>
                  <div className='tv_con_filter_div col-11'>
                      <div className='row'>
                          <div className='mr-auto tv_wrap_filters'>
                              <span className='tv_cont_filter_txt'>
                                  Filter by
                                </span>
                              
                              <div className='wrap_tv_filter_button'>
                                <div className='row justify-content-center'>
                                  <span tabIndex='0' className='tv_filter_rating_button filter_select_rating' onClick={(e) => this.openRatingSelect(e)}>Rating</span>
                                  {this.state.openRatingSelect && (
                                    <span className='row justify-content-center'>
                                        <ul className='fil_selrating_drop'>
                                          {this.state.ratingFilter.map((item,index) =>
                                            <li onClick={(e) => this.selectRating(e,item)}
                                                    key={index}
                                                    value={item.value}>
                                                    {item.rating}
                                            </li>
                                          )}
                                        </ul>
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div className='wrap_tv_filter_button'>
                                <div className='row justify-content-center'>
                                  <span tabIndex='0' className='tv_filter_price_button filter_select_price' onClick={(e) => this.openPriceSelect(e)}>Price</span>
                                  {this.state.openPriceSelect && (
                                    <span className='row justify-content-center'>
                                        <ul className='fil_selprice_drop'>
                                          {this.state.priceFilter.map((item,index) =>
                                            <li onClick={(e) => this.selectPrice(e,item)}
                                                key={index} 
                                                value={item}>
                                                {item}
                                            </li>
                                          )}
                                        </ul>
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className='wrap_tv_filter_button'>
                                <div className='row justify-content-center'>
                                  <span tabIndex='0' className='tv_filter_diagonal_button filter_select_diagonal' onClick={(e) => this.openDiagonalSelect(e)}>Diagonal</span>
                                  {this.state.openDiagonalSelect && (
                                    <span className='row justify-content-center'>
                                        <ul className='fil_seldiag_drop'>
                                          {this.state.diagonalSizeFilter.map((item,index) =>
                                            <li onClick={(e) => this.selectDiagonal(e,item)}
                                                key={item} 
                                                value={item}>
                                                {item}
                                            </li>
                                          )}
                                        </ul>
                                    </span>
                                  )}
                                </div>
                              </div>
                               

                              {this.state.tvCartProducts.length !== tvProducts.length ? (
                              <div tabIndex='0' className='tv_filter_clearfilters' onClick={() => this.clearTvFilters()}>
                                <i className='fas fa-times'></i>
                                <span>Clear filters</span>
                              </div>
                              ):('')}
                          </div>
                      </div>

                    {/* --------- Search input ---------- */}
                      <div className='row tv_search_row'>
                        <div className='tv_wrap_search ml-auto'>
                           <div tabIndex='-1' className='tv_wrap_search_div' onClick={(e) => e.stopPropagation()}>
                              <input type='text' 
                                     onChange={(e) => this.handleSearch(e)}
                                     className='tv_input_search' 
                                     placeholder='Search...'
                                     tabIndex='-1'>
                              </input>
                           </div>
                           <span><i className="fas fa-search tvinput_search_icon"
                                    onClick={(e) => this.openSearchInput(e)}
                                    tabIndex='0'>
                                 </i>
                           </span>
                        </div>
                      </div>

                  </div>
                </div>
          
              
                {/* --------- Mobile Filter div ---------- */}
                <div className='row justify-content-center'>
                  <div className='tv_items_container col-11'>

                    <div className='row justify-content-center'>
                      <div className='mobile_filter_div'>
                        <div className='row'>
                          <div className='mob_filter_wrap'>
                              
                            <div className='row'>
                              <span className='mob_close_butt'
                                    onClick={() => this.openMobileFilter()}>
                                    &times;
                              </span>
                            </div>

                            <div className='row justify-content-center'>
                              <span className='mob_filterby_txt'>
                                Filter by: <span>{this.state.tvCartProducts.length} results</span> 
                              </span>
                            </div>

                            {/* ----- Mobile rating filter ------ */}

                            <div className='row justify-content-center'>
                              <div className='mob_sel_wrap msw_first col-10'>
                                <div className='row'>
                                   <i className="fas fa-star"></i>
                                   <div className='mob_sel mob_sel_rating'
                                        onClick={() => this.openMobRatingDropdown()}>
                                       Rating
                                   </div>
                                </div>
                                <div className='row'>
                                  <div className='mob_opt_filter_dropdown mob_frating'>
                                     {this.state.ratingFilter.map((rat,ind) =>
                                        <span onClick={(e) => this.hMobSelRat(e,rat)}
                                              value={rat.percent}
                                              key={ind}>
                                              {rat.rating}
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>


                            {/* ----- Mobile price filter ------ */}

                            <div className='row justify-content-center'>
                              <div className='mob_sel_wrap msw_sec col-10'>
                                <div className='row'>
                                   <i className="fas fa-tag"></i>
                                   <div className='mob_sel mob_sel_price'
                                        onClick={() => this.openMobPriceDropdown()}>
                                       Price
                                   </div>
                                </div>
                                <div className='row'>
                                  <div className='mob_opt_filter_dropdown mob_fprice'>
                                     {this.state.priceFilter.map((price,ind) =>
                                        <span onClick={(e) => this.hMobSelPrice(e,price,ind)}
                                              value={ind}
                                              key={ind}>
                                              {price}
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ----- Mobile diagonal filter ------ */}

                            <div className='row justify-content-center'>
                              <div className='mob_sel_wrap msw_sec col-10'>
                                <div className='row'>
                                  <i className="fas fa-external-link-square-alt"></i>
                                   <div className='mob_sel mob_sel_diagonal'
                                        onClick={() => this.openMobDiagonalDropdown()}>
                                       Diagonal
                                   </div>
                                </div>
                                <div className='row'>
                                  <div className='mob_opt_filter_dropdown mob_fdiag'>
                                     {this.state.diagonalSizeFilter.map((diag,ind) =>
                                        <span onClick={(e) => this.hMobSelDiagonal(e,diag,ind)}
                                              value={ind}
                                              key={ind}>
                                              {diag}
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                        

                            <div className='row justify-content-center'>
                              <div className='wrap_mobfilter_buttons col-11'>
                                <div className='row justify-content-center'>
                                  <span className='mobfilt_clear_button'
                                        onClick={() => this.mobClearFilters()}>Clear</span>
                                  <span className='mobfilt_done_button'
                                        onClick={() => this.openMobileFilter()}>Done</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --------- TV Items wrap ---------- */}

                    <div className='row justify-content-center'>
                      <div className='tv_items_wrap col-12'>

                        <div className='scrolltotop_button' onClick={() => this.handleScrollToTop()}>
                          <i className='fas fa-chevron-up'></i>
                        </div>
                        {/* ----- Sort by select dropmenu ----- */}
                        <div className='row'>
                          <div className='showing_sortby_div'>
                            <div className='row'>

                              <span>Sort by</span>

                              <span className='sortby_select'
                                    tabIndex='0'
                                    onClick={(e) => this.openSortByMenu(e)}>
                                Relevance
                              </span>
                              {this.state.openSortMenu ? (
                                <div className='sortby_dropmenu'>
                                  <ul className='sortby_dropmenu_ul'>
                                    {this.state.sortByFilters.map((sort,index) => (
                                    <li key={index} onClick={(e) => this.selectSortOption(sort)} value={sort.value}>{sort.title}</li>
                                      ))}
                                  </ul>
                                </div>  
                            ):('')}
                              <div className='mob_filter_button'
                                   onClick={() => this.openMobileFilter()}>
                                   Filter
                              </div>

                            </div>
                            <div className='row'>
                            {this.state.tvCartProducts.length !== tvProducts.length ? (
                              <span className='showfiltered_no_txt'>
                               Showing {this.state.tvCartProducts.length} of {tvProducts.length} 
                              </span>
                            ):('')}
                            </div>
                          </div>
                        </div>
                        {/* -------- No products message -------- */}

                        <div className='row justify-content-center'>
                          {this.state.tvCartProducts.length < 1 ? (
                            <ul className='no_prod_div'>
                              <li>No products to show.</li>
                              <li>Try a different search.</li>
                            </ul>
                          ):('')}
                        </div>


                        <div className='row justify-content-center'>
                         
                          {/* -------- Tv Box product -------- */}
                          {this.state.tvCartProducts.map((item,index) => (
                         
                            <div key={index} className='tv_item_box'>
                              {item.addedToCartLoading && (
                              <div className='remove_load_div'>
                                <div className='row justify-content-center'>
                                  <div className="lds-dual-ring"></div> 
                                </div>
                              </div>
                                )}
                              <Link to={process.env.PUBLIC_URL + '/viewprod/'+item.id}>
                                <div className='row justify-content-center'>
                                    {item.oldPrice && (
                                    <span className='tv_ibox_offer'>Offer</span>
                                    )}
                                    
                                    <img className='tv_ibox_img' 
                                         src={item.image} 
                                         alt=''
                                         onClick={(e) => this.viewProductDetails(item)}
                                         onMouseOver={(e) => this.handleProdImgHover(item)}
                                         onMouseOut={(e) => this.handleProdImgHoverOut(item)}
                                    />
                                </div>
                              </Link>
                              {/* -------- Rate div -------- */}
                              <div className='row'>
                                  <div className='tv_ibox_rate'>
                                    <div className='fill_ratings' style={{width:item.rating}}>
                                      <span>★★★★★</span>
                                    </div>
                                    <div className="empty_ratings">
                                      <span>★★★★★</span>
                                    </div>
                                  </div>
                                  <div className='tv_ibox_rate_txt'>
                                    <Link to={process.env.PUBLIC_URL + '/viewprod/'+item.id}
                                          onClick={(e) => this.viewProductDetails(item)}>
                                             See reviews
                                    </Link>
                                  </div>
                              </div>   
                              {/* -------- Item name div -------- */}
                              <span className='tv_ibox_name'>
                              <Link tabIndex='-1' to={process.env.PUBLIC_URL + '/viewprod'}>
                                <span onClick={(e) => this.viewProductDetails(item)}>
                                    {item.title}
                                </span>
                              </Link>
                              </span>

                              <span className='tv_ibox_available'>In stock</span>

                              <span className='row justify-content-center'>
                                <span className='tv_ibox_oldprice'>
                                  {item.oldPrice && (
                                    <del>{item.oldPrice}$</del>
                                  )}
                                </span>
                              </span>
                                
                              <span className='row justify-content-center'>
                                  <span className='tv_ibox_price'>{item.originalPrice}$ </span>

                                  {/*{item.specs.map((item,index) => (
                                                                        <span key={index} className='idzsize'>
                                                                          {item.DiagonalSize}
                                                                        </span>   
                                                                        ))}*/}
                              </span>
                              <div className='row justify-content-center'>
                                {!item.addedToCart ? (
                                  <div className='ibox_addtocart_button' onClick={(e) => this.addToCart(item)}>
                                      <span><i className="fas fa-shopping-cart"></i></span>
                                      <span>Add to cart</span>
                                  </div>
                                ):(
                                  <div className='ibox_addedtocart_button'>
                                      <span><i className="fas fa-shopping-cart"></i></span>
                                      <span>Added to cart</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}

                        </div>
                      </div>
                    </div>
                 
                  </div>
                </div>

              </div>
           </div>
        <Footer/>
      </div>
    </div>

    )
  }
}

const TvCont = connect(mapStateToProps,mapDispatchToProps)(ConnectedTvCont);
export default TvCont;
