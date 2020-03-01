import React, { Component }   from 'react';
import '../css/FavList.css';
import Header                 from './Header';
import Footer                 from './Footer';
import { connect }            from "react-redux";
import {Link }                from 'react-router-dom'
import { openFavoriteList }   from '../actions/index';
import { favListProducts }    from '../actions/index';
import { selectedProduct }    from '../actions/index';
import { viewProductDetails } from '../actions/index';
import { openTvCont }         from '../actions/index';
import { FacebookShareButton, TwitterShareButton,WhatsappShareButton,RedditShareButton, LinkedinShareButton, EmailShareButton }
                              from 'react-share';
         
        
 function mapDispatchToProps(dispatch) {
  return {
    openFavoriteList:   bol => dispatch(openFavoriteList(bol)),
    favListProducts:    prod => dispatch(favListProducts(prod)),
    openTvCont:         bol => dispatch(openTvCont(bol)),
    selectedProduct:    product => dispatch(selectedProduct(product)),
    viewProductDetails: bol => dispatch(viewProductDetails(bol)),
  };
}

 const mapStateToProps = state => {
  return {  
          openFavList:  state.openFavList,
          favoriteList: state.favoriteList,
          product:      state.product,
        };
};
 


class ConnectedFavList extends Component {
  constructor(props) {
    super(props)
        
        this.state = { shareFavListOpen: false} 
                        
    }

componentDidMount() {
     // Remove highlighted nav menu
  document.querySelector('.nav_sp_home').classList.remove('nav_active');
  document.querySelector('.nav_sp_contact').classList.remove('nav_active');
    // Set document title
  document.title = 'Tv Innovation - Your wishlist';
}

favListSubNavHome() {
    // Close wishlist / open home container
  this.props.openFavoriteList ({ openFavList: false })
  this.props.openTvCont       ({ openTvCont: true })
}

viewFavProduct(prod) {
  let product         = [];
       // Push favorite product to display the info
      product.push(prod);
     
  this.props.selectedProduct    ({ product: product })
  this.props.openFavoriteList   ({ openFavList: false })
  this.props.viewProductDetails ({ viewProductDetails: true})

}

removeFavProduct(prod) {
  let favList    = [...this.props.favoriteList],
      newFavList = favList.filter((x) => x.id !== prod.id);
        // Set new favlist and new localStorage
      this.props.favListProducts({ favoriteList: newFavList })
      localStorage.setItem('favoriteList', JSON.stringify(newFavList));
}

clearFavList() {
    this.props.favListProducts({ favoriteList: [] })
    localStorage.removeItem('favoriteList');
}

openShareFavList(e) {
      e.stopPropagation();
      this.setState({ shareFavListOpen: !this.state.shareFavListOpen })
}
handleFavListContClick() { this.setState({ shareFavListOpen: false })}
  


  render() {
    let url   = 'http://www.ionutdev.com';
    let quote = 'Check out my cool wishlit :)';

    return (
         <div>
           <div className='col-12'>
           <Header />
            <div className='row justify-content-center'>
              <div className='favlist_container col-12' onClick={() => this.handleFavListContClick()}>
                <div className='row justify-content-center'>
                  <div className='wrap_favlist_cont col-11'>
                    {/* -- FavList nav -- */}
                    <div className='row'>
                      <div className='wrap_favlist_nav col-12'>
                        <Link to={process.env.PUBLIC_URL + '/'}>
                        <span tabIndex='0' className='favlist_subnav_address' onClick={() => this.favListSubNavHome()}>Home</span>
                        </Link>
                        <span> / </span>
                        <span>Favorite list</span>
                      </div>
                    </div>
                  
                    <div className='row justify-content-center'>
                      <div className='favlist_wrap_title col-11'>
                        <i className='far fa-heart'></i>
                        Your list
                        {this.props.favoriteList.length > 0 && (
                        <span>{this.props.favoriteList.length}</span>
                        )}
                      </div>
                    </div>

                    <div className='row justify-content-center'>
                      <div className='favlist_util_row col-11 col-sm-10 col-md-9'>
                        <div className='row'>
                          <div className='favlist_util_wrap ml-auto'>
                            <div className='row justify-content-center'>
                              <span tabIndex='0' className='fl_uw_clearwishlist' onClick={() => this.clearFavList()}>
                                <i className='fas fa-trash-alt'></i>
                                Clear your list
                              </span>
                              <span tabIndex='0' className='fl_uw_sharelist' onClick={(e) => this.openShareFavList(e)}>
                                <i className='fas fa-share-alt'></i>
                                Share your list
                                {this.state.shareFavListOpen && (
                                <ul className='fl_ul_sharelist_ul' onClick={(e) => this.openShareFavList(e)}>
                                  <FacebookShareButton url={url}
                                                       tabIndex='0'
                                                       quote={'Check out my cool wishlist! :)'}>
                                                       <li><i style={{color:'#4267b2'}} className='fab fa-facebook-f'></i>Facebook</li>
                                  </FacebookShareButton>                      
                                  <TwitterShareButton  url={url}
                                                       tabIndex='0'
                                                       quote={quote}>
                                  <li><i style={{color:'#1da1f2'}} className='fab fa-twitter'></i>Twitter</li>
                                  </TwitterShareButton> 
                                  <WhatsappShareButton url={url}
                                                       tabIndex='0'
                                                       quote={quote}>
                                  <li><i style={{color:'#25d366'}} className='fab fa-whatsapp'></i>WhatsApp</li>
                                  </WhatsappShareButton> 
                                  <LinkedinShareButton url={url}
                                                       tabIndex='0'
                                                       quote={quote}>
                                  <li><i style={{color:'#283e4a'}} className='fab fa-linkedin-in'></i>Linkedin</li>
                                  </LinkedinShareButton> 
                                  <RedditShareButton   url={url}
                                                       tabIndex='0'
                                                       quote={quote}>
                                  <li><i style={{color:'#FF4500'}} className='fab fa-reddit'></i>Reddit</li>
                                  </RedditShareButton> 
                                  <EmailShareButton    url={url}
                                                       tabIndex='0'
                                                       quote={quote}>
                                  <li><i style={{color:'#1da1f2'}} className='far fa-envelope'></i>Email</li>
                                  </EmailShareButton>

                                </ul>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                
                    <div className='row justify-content-center'>
                      <div className='favlist_list_div col-11 col-sm-10 col-md-9'>

                  {this.props.favoriteList.length > 0 ? (
                    <div>
                    {this.props.favoriteList.map((prod,ind) => 
                        <div key={ind} className='row justify-content-center'>
                          <div className='fav_prod_box col-12'>
                            <div className='row justify-content-center'>
                              <div className='fav_box_img col-12 col-lg-8 col-xl-6'>
                                <span className='fav_box_date'>Added at: {prod.addedDate}</span>
                                  <div className='row justify-content-center'>
                                    <span className='fav_box_img_span col-11 col-sm-4 col-lg-4 col-xl-4'>
                                      <span className='row justify-content-center'>
                                        <span className='fav_box_wrap_img'>
                                          <Link to={process.env.PUBLIC_URL + '/viewprod/'+prod.id}>
                                            <img src={prod.image} alt={prod.title} title={prod.title}></img>
                                          </Link>
                                        </span>
                                      </span>
                                    </span>
                                    <span className='fav_box_title col-12 col-sm-8 col-lg-8 col-xl-8'>
                                      <span className='row justify-content-center'>
                                        <Link to={process.env.PUBLIC_URL + '/viewprod/'+prod.id}>
                                          <span className='fav_box_title_link' onClick={(e) => this.viewFavProduct(prod)}>{prod.title}</span>
                                        </Link>
                                      </span>
                                      <span className='row justify-content-center'>
                                          <span>{prod.brand}</span>
                                      </span>
                                      <span className='row justify-content-center'>
                                          <span>In stock</span>
                                      </span>
                                    </span>
                                  </div>
                              </div>
                              
                              <div className='fav_box_offerprice col-4 col-lg-1 col-xl-3'>
                              
                              {prod.oldPrice && (
                                <span className='row'>
                                  <span className='fav_box_oldprice col-12'>${prod.oldPrice}</span>
                                </span>
                              )}
                                <span className='row'>
                                  <span className='fav_box_originalprice col-12'>${prod.originalPrice}</span>
                                </span>
                              </div>
                              <div className='fav_box_butt col-8 col-lg-3 col-xl-3'>
                                 
                                <span className='row justify-content-center'>
                                   <Link to={process.env.PUBLIC_URL + '/viewprod/'+prod.id}
                                         className='fav_box_button favbox_view_button col-10 col-sm-8 col-md-6 col-lg-9 col-xl-8'
                                         onClick={(e) => this.viewFavProduct(prod)}>
                                         View
                                   </Link>
                                </span>
                                <span className='row justify-content-center'>
                                  <span className='fav_box_button favbox_remove_button col-10 col-sm-8 col-md-6 col-lg-9 col-xl-8'
                                        onClick={(e) => this.removeFavProduct(prod)}>Remove</span>
                                </span>

                              </div>
                            </div>
                          </div>
                        </div>
                        )}
                    </div>
                   ):(
                        <div className='favlist_emptylist_div'>
                          <div className='row justify-content-center'>
                            <span>Your wishlist is empty :(</span>
                          </div>
                          <div className='row justify-content-center'>
                            <span>Explore 
                              <Link to={process.env.PUBLIC_URL + '/'}
                                    tabIndex='0'
                                    onClick={() => this.favListSubNavHome()}
                                    className='favlist_exp_prod_txt'> 
                                    our products 
                              </Link>
                                    to find what you like.
                            </span>
                          </div>
                        </div>
                  )}   
                      </div>
                    </div>
                

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

const FavList = connect(mapStateToProps,mapDispatchToProps)(ConnectedFavList);
export default FavList;
