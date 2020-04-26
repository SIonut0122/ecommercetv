import React, { Component  } from 'react';
import { connect           } from "react-redux";
import { openTvCont        } from '../actions/index';
import { openContact       } from '../actions/index';
import { openUserMenuFunct } from '../actions/index';
import { Link              } from 'react-router-dom'
import Header                from './Header';
import Footer                from './Footer';
import '../css/Contact.css';



 function mapDispatchToProps(dispatch) {
  return {
    openTvCont        : bol => dispatch(openTvCont(bol)),
    openContact       : bol => dispatch(openContact(bol)),
    openUserMenuFunct : bol => dispatch(openUserMenuFunct(bol))
  };
}


class ConnectedContact extends Component {
  constructor(props) {
    super(props)

    this.state = {
            contactEmailAddressInput : '',
            contactEmailValid        : false,
            contactEmailErrorTxt     : false,
            contactSubjectInput      : '',
            contactSubjectValid      : false,
            contactDetailsValue      : '',
            contactDetailsValid      : false,
            inputsCannotBeBlank      : false,
            allowedImageType         : false,
            requestSelected          : false,
            requestDivLoad           : false,
            requestSent              : false
    }
  }



componentDidMount() {
    // Highlight 'Contact' nav
  document.querySelector('.nav_sp_home').classList.remove('nav_active');
  document.querySelector('.nav_sp_contact').classList.add('nav_active');
    // Set document title
  document.title = 'Tv Innovation - Contact';
}

subNavHome() {
  this.props.openTvCont  ({ openTvCont: true })
  this.props.openContact ({ openContact: false })
}

ctEmailHandler(e) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        emailValue = e.target.value;

      // If input mail match, setstate value
    if(emailValue.match(mailformat)) {
        this.setState({contactEmailAddressInput: emailValue, contactEmailValid: true})
    } else if(emailValue.length === 0) {
      // If input is empty, reset value input
        this.setState({contactEmailAddressInput: '', contactEmailValid: false})
    } else {
        this.setState({contactEmailAddressInput: '', contactEmailValid: false})
    }
}

ctSubjectHandler(e) {
     let subjectValue = e.target.value,
       // Check subject length to be higher than 0 characters
        checkSubjectLength = subjectValue.length > 0,
      // Check for blank spaces
        checkWhiteSpaces = subjectValue.trim().length === subjectValue.length;
  
      // if subject value match, setstate value 
    if(checkSubjectLength && checkWhiteSpaces) {
        this.setState({contactSubjectInput: subjectValue, contactSubjectValid: true})
        console.log('subject ready');
    } else if(subjectValue.length === 0) {
      // If input is empty, reset value input
        this.setState({contactSubjectInput: '', contactSubjectValid: false})
    } else {
        this.setState({contactSubjectInput: subjectValue, contactSubjectValid: false})
    }  
}

ctDetailsHandler(e) {
     let detailsValue = e.target.value,
      // Check username length to be higher than 4 characters
        checkDetailsLength = detailsValue.length > 0,
      // Check for blank spaces
        checkWhiteSpaces = detailsValue.trim().length === detailsValue.length;
  
      // if fullname value match, setstate value 
    if(checkDetailsLength && checkWhiteSpaces) {
        this.setState({contactDetailsValue: detailsValue, contactDetailsValid: true})
        console.log('details ready');
    } else if(detailsValue.length === 0) {
      // If input is empty, reset value input
        this.setState({contactDetailsValue: '', contactDetailsValid: false})
    } else {
        this.setState({contactDetailsValue: detailsValue, contactDetailsValid: false})
    }
}



handleFormChange(e) {
    // If selected file is a has a valid supported type, set badImg to false
  if(e.target.value.match(/.png|.PNG|.jpg|.JPG|.jpeg|.JPEG/g)) {
      this.setState({ badImgFormat: false});
  } else {
      this.setState({ badImgFormat: true });
  }
}

handleContactSubmit() {
    // Check it all inputs are valid, otherwise display error message
  if(this.state.contactEmailValid) {
    this.setState({ contactEmailErrorTxt: false})
      if(this.state.contactSubjectValid && this.state.contactDetailsValid) {
        this.setState({ inputsCannotBeBlank: false, requestDivLoad: true })
          
          setTimeout(() => {
            this.setState({ requestDivLoad: false, requestSelected: false, requestSent: true})
          },1000);

      } else {
        this.setState({ inputsCannotBeBlank: true })
      }
  } else {
      this.setState({ contactEmailErrorTxt: true })
  }
}



handleRequestType(e) {
    // Check is request type was selected and display inputs box
  if(e.target.value.length > 1) {
        // Change requestSelected to true to display inputs box and requestDivLoad to true to display loading effect
      this.setState({ requestSelected: true, requestDivLoad: true, requestSent: false })
        // Hide loading effect after .5s
      setTimeout(() => {
        this.setState({requestDivLoad: false})
      },500)
  
  } else {
    this.setState({ requestSelected: false, requestDivLoad: false })
  }
}

handleContactContainerClick() {
  this.props.openUserMenuFunct({ openUserMenu: false })
}


  render() {
    return (

        <div>
          <div className='col-12'>
            <Header />
          
            <div className='row justify-content-center'>
              <div className='contact_container col-12' onClick={() => this.handleContactContainerClick()}>
                <div className='row justify-content-center'>
                  <div className='contact_wrapper col-12 col-sm-12 col-md-10 col-lg-11 col-xl-11'>
                    

                        {/* ------- Sub nav  ------ */}
                        <div className='row justify-content-center'>
                          <div className='contact_subnav col-12'>
                            <div className='row'>
                             <Link to={process.env.PUBLIC_URL + '/'}
                                   tabIndex='0' 
                                   className='subnav_address' 
                                   onClick={() => this.subNavHome()}>
                                   Home
                             </Link>
                              <span> / </span>
                              <span>Contact</span>
                            </div>
                          </div>
                        </div>
                      
                        <div className='row justify-content-center'>
                          <span className='contact_title col-11'>Contact</span>
                        </div> 
                        
                        <div className='row justify-content-center'>
                          <span className='contact_subtitle col-11'>
                            Please choose a request type below
                          </span>
                        </div> 

                        {/* ------- Select option ------ */}
                        <div className='row justify-content-center'>
                          <div className='contact_select_div col-11'>
                            <div className='row'>
                              <div className='contact_wrap_select'>
                                <select tabIndex='0' className='contact_select' onChange={(e) => this.handleRequestType(e)}>
                                  <option>-</option>
                                  <option>Help with my account</option>
                                  <option>Request to return my product</option>
                                  <option>Request a refund</option>
                                  <option>I am having an issue with my product</option>
                                  <option>Cancel my recent order</option>
                                  <option>My question or issue is not listed above</option>
                                  <option>Other</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div> 

                    {/* ------- Contact inputs ------ */}
                    {this.state.requestSelected && (
                      <div className='row justify-content-center'>
                          <div className='contact_wrap_inputs col-12 col-sm-12 col-md-10'>
                                  
                                  {this.state.requestDivLoad && (
                                    <div className='contact_req_load'>
                                      <div className='row justify-content-center'>
                                        <div className='ct_load'>
                                          <div></div><div></div>
                                          <div></div><div></div><div></div><div>
                                          </div><div></div><div></div><div></div>
                                          <div></div><div></div><div></div>
                                        </div>
                                      </div>
                                    </div>
                                    )}

                                    {/* ------- Email input  ------ */}

                                    <div className='row'>
                                      <span className='ct_input_title'>Your email address<span> *</span></span>
                                    </div>
                                    <div className='row'>
                                      <span className='ct_input'>
                                        <input type='text'
                                               onChange={(e) => this.ctEmailHandler(e)}>
                                        </input>
                                      </span>
                                    </div>
                                
                                    <div className='row'>
                                    {this.state.contactEmailErrorTxt && (
                                     <span className='ct_email_error_msg'>Please use a valid email.</span>
                                    )}
                                    </div>

                                    {/* ------- Product input ------ */}

                                    <div className='row'>
                                      <span className='ct_input_title'>Product</span>
                                    </div>
                                    <div className='row'>
                                      <div className='ct_input ct_input_select'>
                                        <select>
                                        <option>-</option>
                                        <option>Tv</option>
                                        </select>
                                      </div>
                                    </div>
                                 
                                    {/* ------- Subject input ------ */}

                                    <div className='row'>
                                      <span className='ct_input_title'>Subject<span> *</span></span>
                                    </div>
                                    <div className='row'>
                                      <span className='ct_input'>
                                        <input type='text'
                                               onChange={(e) => this.ctSubjectHandler(e)}>
                                        </input>
                                      </span>
                                    </div>
                            
                                    {/* ------- Details input ------ */}

                                    <div className='row'>
                                      <span className='ct_input_title'>
                                            Please provide details on your request
                                            <span> *</span>
                                      </span>
                                    </div>
                                    <div className='row'>
                                      <span className='ct_input ct_input_textarea'>
                                        <textarea type='text'
                                                  onChange={(e) => this.ctDetailsHandler(e)}>
                                        </textarea>
                                      </span>
                                    </div>
                                 
                                    {/* ------- Attachments section ------ */}
                                  
                                    <div className='row'>
                                      <span className='ct_input_title'>Attachments</span>
                                    </div>
                                    <div className='row'>
                                      <div tabIndex='0' className='ct_input ct_attach_div'>
                                          <div className='row'>
                                              <form>
                                                <input className='form' 
                                                       type='file'
                                                       accept='image/*'
                                                       onChange={(e) => this.handleFormChange(e)}></input>
                                              </form>    
                                          </div>
                                      </div>
                                    </div>

                                    <div className='row'>
                                        {this.state.badImgFormat && (
                                            <span className='ct_form_error_msg'>
                                                Only .JPG or .PNG format.
                                            </span>
                                         )}
                                    </div>

                                    <div className='row'>
                                      <span className='ct_submsg_txt'>
                                                Please note that any feedback or suggestions provided 
                                                are subject to our <span tabIndex='0'>Terms of Service</span>, including 
                                                specific terms regarding Feedback. 
                                      </span>
                                    </div>
                                   
                                    <div className='row'>
                                        {this.state.inputsCannotBeBlank && (
                                        <span className='ct_submsg_err_txt'>
                                                Inputs marked with '*' cannot be blank.
                                        </span>
                                        )}
                                    </div>
                                    <div className='row'>
                                        <span className='ct_submit_button'
                                              tabIndex='0'
                                              onClick={() => this.handleContactSubmit()}>
                                                Submit
                                        </span>
                                    </div>

                        </div>
                      </div>
                    )}
                    
                    {this.state.requestSent && (
                      <div className='row justify-content-center'>
                        <span className='contact_req_sent_msg col-11'>
                          <span className='row mr-auto'>
                            Thank you. Your message has been sent. If you have any other problem, feel free to contact us.
                          </span>   
                        </span>
                      </div>
                    )}

                      <div className='row justify-content-center'>
                        <span className='ct_und_txt col-11'>
                          <span>Our team is available to assist you with any questions or inquiries <br /> 
                                you have. We will contact you as quickly as possible 
                                (generally within 1 to 2 business days).
                          </span>
                        </span>
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

const Contact = connect(null,mapDispatchToProps)(ConnectedContact);
export default Contact;
