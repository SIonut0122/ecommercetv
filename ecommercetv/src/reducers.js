
import { OPEN_FAV_LIST }           from "./constants/action-types";
import { ADD_TO_FAV }              from "./constants/action-types";

import { OPEN_CART }               from "./constants/action-types";
import { ADD_TO_CART }             from "./constants/action-types";
import { CART_TOTAL_SUM }          from "./constants/action-types";

import { OPEN_TV_CONT }            from "./constants/action-types";
import { TV_CART_PROD }            from "./constants/action-types";

import { USER_SIGNEDIN }           from "./constants/action-types";
import { USER_INFO }               from "./constants/action-types";
import { OPEN_SIGNIN_SIGNUP }      from "./constants/action-types";
import { OPEN_USER_MENU }          from "./constants/action-types";

import { SELECTED_PRODUCT }        from "./constants/action-types";
import { VIEW_PROD_DETAILS }       from "./constants/action-types";

import { MAY_BE_INT }              from "./constants/action-types";
import { MAY_BE_INT_TWO }          from "./constants/action-types";

import { OPEN_CHECKOUT }           from "./constants/action-types";
import { CHECKOUT_SEL_COUNTRY }    from "./constants/action-types";

import { OPEN_FIND_STORE }         from "./constants/action-types";
import { OPEN_CONTACT }            from "./constants/action-types";

import tvProducts                  from './jsonData/tvProducts.js';
import mayBeInterestedProducts     from './jsonData/mayBeInterestedProducts.js';
import mayBeInterestedProducts_two from './jsonData/mayBeInterestedProducts_two.js';

 
    
    const initialState = {
         openCart:                    false,
         openTvCont:                  false,
         openSigninOrSignUp:          false,
         openUserMenu:                false,
         openContact:                 false,
         tvCartProducts:              tvProducts,
         cartItems:                   [],
         userSignedIn:                false,
         userInfo:                    {},
         viewProductDetails:          false,
         product:                     [],
         mayBeInterestedProducts:     mayBeInterestedProducts,
         mayBeInterestedProducts_two: mayBeInterestedProducts_two,
         cartTotalSum:                0,
         openCheckout:                false,
         checkoutSelectedCountry:     '',
         openFindStore:               false,
         favoriteList:                [],
         openFavList:                 false,
        
  }



    function rootReducer(state = initialState, action) {
      if (action.type === OPEN_CART) {
        return Object.assign({}, state, {
          openCart: action.payload.openCart
        });
      }
      if (action.type === OPEN_FAV_LIST) {
        return Object.assign({}, state, {
          openFavList: action.payload.openFavList
        });
      }
      if (action.type === ADD_TO_FAV) {
        return Object.assign({}, state, {
          favoriteList: action.payload.favoriteList
        });
      }

      if (action.type === TV_CART_PROD) {
        return Object.assign({}, state, {
          tvCartProducts: action.payload.tvCartProducts
        });
      }

      if (action.type === OPEN_TV_CONT) {
        return Object.assign({}, state, {
          openTvCont: action.payload.openTvCont
        });
      }

      if (action.type === USER_SIGNEDIN) {
        return Object.assign({}, state, {
          userSignedIn: action.payload.userSignedIn
        });
      }

      if (action.type === OPEN_SIGNIN_SIGNUP) {
        return Object.assign({}, state, {
          openSigninOrSignUp: action.payload.openSigninOrSignUp
        });
      }

      if (action.type === USER_INFO) {
        return Object.assign({}, state, {
          userInfo: action.payload.userInfo
        });
      }

      if (action.type === OPEN_USER_MENU) {
        return Object.assign({}, state, {
          openUserMenu: action.payload.openUserMenu
        });
      }

      if (action.type === OPEN_CONTACT) {
        return Object.assign({}, state, {
          openContact: action.payload.openContact
        });
      }

      if (action.type === VIEW_PROD_DETAILS) {
        return Object.assign({}, state, {
          viewProductDetails: action.payload.viewProductDetails
        });
      }

      if (action.type === SELECTED_PRODUCT) {
        return Object.assign({}, state, {
          product: action.payload.product
        });
      }

      if (action.type === ADD_TO_CART) {
        return Object.assign({}, state, {
          cartItems: action.payload.cartItems
        });
      }

      if (action.type === MAY_BE_INT) {
        return Object.assign({}, state, {
          mayBeInterestedProducts: action.payload.mayBeInterestedProducts
        });
      }

      if (action.type === MAY_BE_INT_TWO) {
        return Object.assign({}, state, {
          mayBeInterestedProducts_two: action.payload.mayBeInterestedProducts_two
        });
      }

      if (action.type === OPEN_CHECKOUT) {
        return Object.assign({}, state, {
          openCheckout: action.payload.openCheckout
        });
      }

      if (action.type === CART_TOTAL_SUM) {
        return Object.assign({}, state, {
          cartTotalSum: action.payload.cartTotalSum
        });
      }
      if (action.type === OPEN_FIND_STORE) {
        return Object.assign({}, state, {
          openFindStore: action.payload.openFindStore
        });
      }
      if (action.type === CHECKOUT_SEL_COUNTRY) {
        return Object.assign({}, state, {
          checkoutSelectedCountry: action.payload.checkoutSelectedCountry
        });
      }

      return state;
    }



  export default rootReducer;