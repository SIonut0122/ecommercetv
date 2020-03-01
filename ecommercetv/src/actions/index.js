
import { OPEN_FAV_LIST }        from "../constants/action-types";
import { ADD_TO_FAV }           from "../constants/action-types";

import { OPEN_CART }            from "../constants/action-types";
import { OPEN_TV_CONT }         from "../constants/action-types";
import { TV_CART_PROD }         from "../constants/action-types";

import { USER_SIGNEDIN }        from "../constants/action-types";
import { USER_INFO }            from "../constants/action-types";

import { OPEN_SIGNIN_SIGNUP }   from "../constants/action-types";

import { OPEN_USER_MENU }       from "../constants/action-types";

import { OPEN_CONTACT }         from "../constants/action-types";

import { VIEW_PROD_DETAILS }    from "../constants/action-types";
import { SELECTED_PRODUCT }     from "../constants/action-types";
import { ADD_TO_CART }          from "../constants/action-types";

import { MAY_BE_INT }           from "../constants/action-types";
import { MAY_BE_INT_TWO }       from "../constants/action-types";

import { CART_TOTAL_SUM }       from "../constants/action-types";

import { OPEN_CHECKOUT }        from "../constants/action-types";
import { CHECKOUT_SEL_COUNTRY } from "../constants/action-types";

import { OPEN_FIND_STORE }      from "../constants/action-types";



 


export function openFavoriteList(payload) {
  return { type: OPEN_FAV_LIST, payload };
}

export function favListProducts(payload) {
  return { type: ADD_TO_FAV, payload };
}

export function openCart(payload) {
  return { type: OPEN_CART, payload };
}

export function openTvCont(payload) {
  return { type: OPEN_TV_CONT, payload };
}

export function tvCartProductsFunc(payload) {
  return { type: TV_CART_PROD, payload };
}

export function userSignedInFunc(payload) {
  return { type: USER_SIGNEDIN, payload };
}
 
export function userInfoFunc(payload) {
  return { type: USER_INFO, payload };
} 

export function openSigninSignUp(payload) {
  return { type: OPEN_SIGNIN_SIGNUP, payload };
}

export function openUserMenuFunct(payload) {
  return { type: OPEN_USER_MENU, payload };
}

export function openContact(payload) {
  return { type: OPEN_CONTACT, payload };
} 

export function selectedProduct(payload) {
  return { type: SELECTED_PRODUCT, payload };
} 

export function viewProductDetails(payload) {
  return { type: VIEW_PROD_DETAILS, payload };
} 

export function addedToCart(payload) {
  return { type: ADD_TO_CART, payload };
} 

export function mayBeInterested(payload) {
  return { type: MAY_BE_INT, payload };
} 

export function mayBeInterestedTwo(payload) {
  return { type: MAY_BE_INT_TWO, payload };
}

export function openCheckout(payload) {
  return { type: OPEN_CHECKOUT, payload };
}
export function cartTotalSum(payload) {
  return { type: CART_TOTAL_SUM, payload };
}
 
export function checkoutSelCountry(payload) {
  return { type: CHECKOUT_SEL_COUNTRY, payload };
}

export function openFindStore(payload) {
  return { type: OPEN_FIND_STORE, payload };
}