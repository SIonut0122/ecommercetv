import React, { Component }   from 'react';
import { openTvCont }         from '../actions/index';
import { connect }            from "react-redux";
import {Link }                from 'react-router-dom'
import Header                 from './Header';
import Footer                 from './Footer';
import '../css/PageNotFound.css';



function mapDispatchToProps(dispatch) {
  return {
        openTvCont:         bol => dispatch(openTvCont(bol)), 
  };
}


class ConnectedPageNotFound extends Component {
  constructor(props) {
    super(props)
        
        this.state = {
                 
        }
    }


componentDidMount() {
    // Set document title
  document.title = 'Tv Innovation - 404 - Page not found';
}

  render() {
    return (
        <div>
          <div className='col-12'>
            <Header />
              <div className='row justify-content-center'>
                <div className='pagenotfound_container col-12'>
                  <div className='row justify-content-center'>
                    <div className='wrap_pagenotfound col-11'>
                      <div className='row justify-content-center'>
                          <div className='wid_noproduct_err_div col-11 col-md-12 col-lg-11'>
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
                  </div>
                </div>      
              </div>
            <Footer/>
          </div>
        </div>
      )
  }
}

const PageNotFound = connect(null,mapDispatchToProps)(ConnectedPageNotFound);
export default PageNotFound;
