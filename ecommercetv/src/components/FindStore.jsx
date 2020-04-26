import   React, { Component } from 'react';
import { connect            } from "react-redux";
import { openTvCont         } from '../actions/index';
import { openFindStore      } from '../actions/index';
import { openUserMenuFunct  } from '../actions/index';
import { Link               } from 'react-router-dom';
import   GoogleMapReact       from 'google-map-react';
import   Header               from './Header';
import   Footer               from './Footer';
import '../css/FindStore.css';



 function mapDispatchToProps(dispatch) {
  return {
    openTvCont        : bol => dispatch(openTvCont(bol)),
    openFindStore     : bol => dispatch(openFindStore(bol)),
    openUserMenuFunct : bol => dispatch(openUserMenuFunct(bol))
  };
}


class ConnectedFindStore extends Component {
  constructor(props) {
    super(props);

    this.state = {  
                    openCountryList : false,
                    countryList     : [],
                    center          : {lat: 44.79, lng: 10.32},
                    zoom            : 9,
                 }
    }
 
componentDidMount() {
    // Fetch coutries list
  fetch('https://restcountries.eu/rest/v2/all')
  .then((res)  => res.json())
  .then((res)  => this.setState({ countryList: res}))
  .catch((err) => console.log(err))
    // Set document title
  document.title = 'Tv Innovation - Find store';
}
selectFsCountry(e,co) {
  e.stopPropagation();
    // Open / close 'select your country' list
  this.setState({ openCountryList: !this.state.openCountryList})
    // If co exists, get country value
  if(co) {
    let obj = Object.values(co);
      // Set country name to select span  
    document.querySelector('.wfc_sec_fspan_select').innerHTML = obj[0];
  }
}
handleOutsideSelectCountry() {
    // Handle outside of 'Select your country' div to hide countries list
  this.setState                 ({ openCountryList: false})
  this.props.openUserMenuFunct  ({ openUserMenu: false })
}
 
findStoreSubNavHome() {
    // Go back to home page
  this.props.openFindStore  ({ openFindStore: false })
  this.props.openTvCont     ({ openTvCont: true })
}


  render() {
    return (
        <div>
        <div className='col-12'>
          <Header />
            <div className='row justify-content-center'>
              <div className='findstore_container col-12' onClick={() => this.handleOutsideSelectCountry()}>
                <div className='row justify-content-center'>
                  <div className='wrap_findstore_cont col-11'>
                   
                    <div className='row'>
                      <div className='wrap_fsc_nav col-12'>
                         <Link to={process.env.PUBLIC_URL + '/'}
                               className='fas_subnav_address'
                               tabIndex='0'
                               onClick={() => this.findStoreSubNavHome()}>
                               Home
                         </Link> 
                         <span> / </span>
                         <span>Find a store</span>
                      </div>
                    </div> 
                 
                    <div className='row justify-content-center'>
                      <div className='wfc_sect wfc_sec_first col-12 col-sm-8 col-md-5 col-lg-5'>
                        <div className='row justify-content-center'>
                          <div className='wfc_sec_wrap_first col-10'>
                             <div className='row justify-content-center'>
                                <span>Find a store</span>
                             </div>
                             <div className='row justify-content-center'>
                                <span>Select your country</span>
                             </div>

                              <div className='row justify-content-center'>
                                 <span tabIndex='0' className='wfc_sec_fspan_select' onClick={(e) => this.selectFsCountry(e)}></span>
                              </div>

                            {this.state.openCountryList ? (
                              <div className='row justify-content-center'>
                                <ul className='wfc_sel_ul'>
                                  {this.state.countryList.map((co,ind) =>
                                    <li key={ind} 
                                        tabIndex='0'
                                        onClick={(e) => this.selectFsCountry(e,co)}>{co.name}</li>
                                  )}
                                </ul>
                              </div>
                            ):('')}
                              
                              <div className='row justify-content-center'>
                                <span className='wfc_selcountry_button'>
                                  Search store
                                  <i className='fas fa-caret-right'></i>
                                </span>
                              </div>

                          </div>
                        </div>  
                      </div>
                      
                      <div className='wfc_sect col-12 col-sm-12 col-md-7 col-lg-7'>
                        <div className='row justify-content-center'>
                            <div tabIndex='0' id='map' className='col-11'>
                              <GoogleMapReact
                                  bootstrapURLKeys={{ key: 'AIzaSyAyThGTUr4MaS1l1Dk0aFOjzgUlb2nIoZw' }}
                                  defaultCenter={this.state.center}
                                  defaultZoom={this.state.zoom}>
                              </GoogleMapReact>
                            </div>
                        </div>
                      </div>
                    </div>    

                    <hr />
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

const FindStore = connect(null,mapDispatchToProps)(ConnectedFindStore);
export default FindStore;
