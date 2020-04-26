import   React, { Component } from 'react';
import { connect            } from "react-redux";
import { userSignedInFunc   } from '../actions/index';
import { userInfoFunc       } from '../actions/index';
import { openTvCont         } from '../actions/index';
import { openSigninSignUp   } from '../actions/index';
import { Redirect           } from 'react-router'
import   Header               from './Header';
import   Footer               from './Footer';
import   firebase             from '@firebase/app';
import '../css/LoginSignup.css';
import 'firebase/auth';
import '../firebase';



 const mapStateToProps = state => {
  return {  
            openSigninOrSignUp : state.openSigninOrSignUp,
            userInfo           : state.userInfo,
            userSignedIn       : state.userSignedIn,
        };
};


 function mapDispatchToProps(dispatch) {
  return {
    userSignedInFunc : bol  => dispatch(userSignedInFunc(bol)),
    userInfoFunc     : info => dispatch(userInfoFunc(info)),
    openTvCont       : bol  => dispatch(openTvCont(bol)),
    openSigninSignUp : bol  => dispatch(openSigninSignUp(bol))
  };
}




class ConnectedSigninSignup extends Component {

  constructor(props) {
    super(props)

        this.state = {
            signupUsername      : '',
            signupUsernameValid : false,
            signupFullname      : '',
            signupFullnameValid : false,
            signupEmail         : '',
            signupEmailValid    : false,
            signupPassword      : '',
            signupPasswordValid : false,
            signinEmail         : '',
            signinEmailValid    : false,
            signinPassword      : '',
            signinPasswordValid : false,
            forgotPasswordValue : '',
            forgotPasswordValid : false,
            preloadEff          : true
        }

    }


 


componentDidMount() {
    // Call authlistener to check if user is logged in
  this.authListener();
    // Disable loading effect
      setTimeout(() => {
        this.setState({ preloadEff: false })
      },1300);

    // Set document title
  document.title = 'Tv Innovation - Sign in / Sign up';

  // ADD / REMOVE CLASSES //

    // Hide 'Sign in/Sign up' button
  document.querySelector('.nav_l_side').classList.add('signinup_accessed');
  document.querySelector('.mob_nav_logsign').classList.add('signinup_accessed');
  document.querySelector('.nav_right_side').setAttribute('style','padding:7px 0 0 235px');
    
    // Disable all highlighted nav
  document.querySelector('.nav_sp_home').classList.remove('nav_active');
  document.querySelector('.nav_sp_contact').classList.remove('nav_active');


  // EVENT LISTENERS //

  // Handle focus outline on mouse / keyboard
  document.body.addEventListener('mousedown', function() {
    document.body.classList.add('using-mouse');
  });
  document.body.addEventListener('keydown', function() {
    document.body.classList.remove('using-mouse');
  });

    
}




 showHideSignupPass() {
  let showHidePassIcon           = document.querySelector('.showHidePassIcon'),
      signup_text_input_password = document.querySelector('.signup_text_input_password');

    // Show / hide input signup password
      showHidePassIcon.classList.toggle('fa-eye-slash');

      signup_text_input_password.getAttribute('type') === 'password' ? 
      signup_text_input_password.setAttribute('type' ,'text') :
      signup_text_input_password.setAttribute('type', 'password');
 }

/* ---------- Handler input title click -------- */


signupUsernameFocus() {document.querySelector('.signup_text_input_username').focus();}
 
signupFullNameFocus() {document.querySelector('.signup_text_input_fullName').focus();}
 
signupEmailFocus   ()    {document.querySelector('.signup_text_input_email').focus();}
 
signupPasswordFocus() { document.querySelector('.signup_text_input_password').focus();}

 
/* ---------- HANDLE SIGN UP CHANGES ----------- */



handleChangeUsername(e) {
  let usernameValue       = e.target.value,
    // Check if username characters matches
      checkUsername       =  usernameValue.split('').every(x => x.match(/[a-zA-Z0-9]+/g)),
    // Check username length to be between 3 and 15 characters
      checkUsernameLength = usernameValue.length >= 3 && usernameValue.length <= 15,
    // Check for blank spaces
      checkWhiteSpaces    = usernameValue.trim().length === usernameValue.length;
  

      // if username value match, setstate value 
    if(checkUsername && checkUsernameLength && checkWhiteSpaces) {
        this.setState({signupUsername: usernameValue, signupUsernameValid: true})
    } else if(usernameValue.length === 0) {
      // If input is empty, reset value input
        this.setState({signupUsername: '', signupUsernameValid: false})
    } else {
        this.setState({signupUsername: usernameValue, signupUsernameValid: false})
    }
}
 

handleChangeFullName(e) {
  let fullNameValue       = e.target.value,
     // Check if username characters matches
      checkFullName       =  fullNameValue.split('').every(x => x.match(/[a-zA-Z ]+/g)),
    // Check username length to higher than 4 characters
      checkFullNameLength = fullNameValue.length >= 4,
    // Check for blank spaces
      checkWhiteSpaces    = fullNameValue.trim().length === fullNameValue.length;
  
 
      // If fullname value match, setstate value 
    if(checkFullName && checkFullNameLength && checkWhiteSpaces) {
        this.setState({signupFullname: fullNameValue, signupFullnameValid: true})
    } else if(fullNameValue.length === 0) {
      // If input is empty, reset value input
        this.setState({signupFullname: '', signupFullnameValid: false})
    } else {
        this.setState({signupFullname: fullNameValue, signupFullnameValid: false})
    }

}

handleChangeEmail(e) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      emailValue = e.target.value;

      // If input mail match, setstate value
    if(emailValue.match(mailformat)) {
        this.setState({signupEmail: emailValue, signupEmailValid: true})
    } else if(emailValue.length === 0) {
      // If input is empty, reset value input
        this.setState({signupEmail: '', signupEmailValid: false})
    } else {
        this.setState({signupEmail: '', signupEmailValid: false})
    }

}

handleChangePassword(e) {
  let passwordValue       = e.target.value,
    // Check username length to be higher than 4 characters
      checkPasswordLength = passwordValue.length >= 6,
    // Check for blank spaces
      checkWhiteSpaces    = passwordValue.trim().length === passwordValue.length;
  
 
      // if fullname value match, setstate value 
    if(checkPasswordLength && checkWhiteSpaces) {
        this.setState({signupPassword: passwordValue, signupPasswordValid: true})
    } else if(passwordValue.length === 0) {
      // If input is empty, reset value input
        this.setState({signupPassword: '', signupPasswordValid: false})
    } else {
        this.setState({signupPassword: passwordValue, signupPasswordValid: false})
    }

}


/* ---------- HANDLE SIGN IN CHANGES ----------- */

handleSigninEmail(e) {
  let signinEmailValue = e.target.value,
    // Check signinemail length to be higher than 0
      checkValueLength = signinEmailValue.length > 0,
    // Check for blank spaces
      checkWhiteSpaces = signinEmailValue.trim().length === signinEmailValue.length;

        // if fullname value match, setstate value 
    if(checkValueLength && checkWhiteSpaces) {
        this.setState({signinEmail: signinEmailValue, signinEmailValid: true})
    } else if(signinEmailValue.length === 0) {
      // If input is empty, reset value input
        this.setState({signinEmail: '', signinEmailValid: false})
    } else {
        this.setState({signinEmail: signinEmailValue, signinEmailValid: false})
    }

}

handleSigninPassword(e) {
  let signinPasswordValue = e.target.value,
    // Check signinemail length to be higher than 0
      checkValueLength = signinPasswordValue.length > 0,
    // Check for blank spaces
      checkWhiteSpaces = signinPasswordValue.trim().length === signinPasswordValue.length;

        // if fullname value match, setstate value 
    if(checkValueLength && checkWhiteSpaces) {
        this.setState({signinPassword: signinPasswordValue, signinPasswordValid: true})
    } else if(signinPasswordValue.length === 0) {
      // If input is empty, reset value input
        this.setState({signinPassword: '', signinPasswordValid: false})
    } else {
        this.setState({signinPassword: signinPasswordValue, signinPasswordValid: false})
    }

}

handleSigninButton() {
  let invalidSigninEmailMsg      = document.querySelector('.signin_invalidemail_msg'),
      wongEmailOrPasswordMsg     = document.querySelector('.signin_wrongemail_msg'),
      enterValidEmailPasswordMsg = document.querySelector('.signin_enterEmail_msg'),
      signinLoadingDiv           = document.querySelector('.signin_loading');

        // If signinEmailValid and signInPasswordValid:
    if(this.state.signinEmailValid && this.state.signinPasswordValid) {
      firebase.auth().signInWithEmailAndPassword(this.state.signinEmail, this.state.signinPassword)
        .then((u) => {
          // Display signing loading div
            signinLoadingDiv.style.display = 'block';
          // Hide signin loading div, close signinsignup component and display tv component after 2.5sec
          setTimeout(() => {
            signinLoadingDiv.style.display = 'none';
            this.props.openSigninSignUp({ openSigninOrSignUp: false })
            this.props.openTvCont({ openTvCont: true })
          },4500);
        
      }).catch((error) => {
        if (error.code === 'auth/invalid-email') {
              // If firebase code error is 'auth/invalid-email', display message
            invalidSigninEmailMsg.style.display = 'block';
      } else if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
             // If firebase code error: 'auth/user-not-found' or 'auth/wrong-password', display message
            wongEmailOrPasswordMsg.style.display = 'block';
         } 
      });
    } else {
            // Display 'Enter a valid email/password' message
            enterValidEmailPasswordMsg.style.display = 'block';
            // Hide 'Enter a valid email/password' message after 4 seconds
          setTimeout(function() {
             enterValidEmailPasswordMsg.style.display = 'none';
          },3000);
  }
}

handleSigninKeyDown(e) {
    // If Enter key is pressed, execute signin function
  if(e.keyCode === 13) {
    this.handleSigninButton();
  }
}

openForgotPassSect() {document.querySelector('.signin_forgotpassword_div').setAttribute('style','height:100%');}

  
handleForgotPassword(e) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      emailValue = e.target.value;

      // If input mail match, setstate value
    if(emailValue.match(mailformat)) {
        this.setState({forgotPasswordValue: emailValue, forgotPasswordValid: true})
    } else if(emailValue.length === 0) {
      // If input is empty, reset value input
        this.setState({forgotPasswordValue: '', forgotPasswordValid: false})
    } else {
        this.setState({forgotPasswordValue: '', forgotPasswordValid: false})
    }
}

handleForgotPassButton() {
  let forgotPassInvalidMail   = document.querySelector('.forgotpass_invalidemail'),
      forgotPassEmailNotFound = document.querySelector('.forgotpass_emailnotfound'),
      forgotPassEmailSent     = document.querySelector('.forgotpass_emailsent_div');


  if(this.state.forgotPasswordValid) {
    firebase.auth().sendPasswordResetEmail(this.state.forgotPasswordValue)
        .then(() => {
            // Display 'Email was sent' message
          forgotPassEmailSent.style.display = 'block';
         })
        .catch((err) => {
            // If email is not valid or doesn't exist, display error message
          err ? forgotPassEmailNotFound.style.display = 'block' : forgotPassEmailNotFound.style.display = 'block';
        })
  } else {
            // If email is not valid, display error message
          forgotPassInvalidMail.style.display = 'block';
  }
}

handleForgotPassKeyDown(e) {
  // If Enter key is pressed, execute forgot password function
  if(e.keyCode === 13) {
    this.handleForgotPassButton();
  }

}

forgotPassResendEmail() {
  let forgotPassEmailSent = document.querySelector('.forgotpass_emailsent_div'),
      forgotpassInput     = document.querySelector('.forgotpass_input_type');

      // Display 'Recover password' div
        // Set email value to input and focus on it 
    forgotPassEmailSent.style.display = 'none';
    forgotpassInput.value = this.state.forgotPasswordValue;
    forgotpassInput.focus();
}

handleForgotPassCancelButton() {
  let signinForgotpasswordDiv = document.querySelector('.signin_forgotpassword_div');

      // Hide forgot password div and display 'Sign in' div
    signinForgotpasswordDiv.setAttribute('style', 'height:0');
      // Hide forgot password error messages
    document.querySelector('.forgotpass_invalidemail').style.display = 'none';
    document.querySelector('.forgotpass_emailnotfound').style.display = 'none';
}
emailSentBackToSignIn() {
  let forgotPassEmailSent = document.querySelector('.forgotpass_emailsent_div'),
      forgotPassDivMain   = document.querySelector('.signin_forgotpassword_div');

    // Hide email sent div
    forgotPassEmailSent.style.display = 'none';
    // Hide forgot password main div
    forgotPassDivMain.setAttribute('style', 'height:0');
}


/* ---------- Firebase settings ----------- */

authListener() {
         // If user is logged in, set state user to user and use the data
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // If user is signed in, set the state user
      this.props.userSignedInFunc({ userSignedIn: true })
      this.props.userInfoFunc({ userInfo: user })
    } else {
      this.props.userSignedInFunc({ userSignedIn: false })
      this.props.userInfoFunc({ userInfo: user })
    }
  });
}


/* ---------- Sign up ----------- */

updateNewAccountInfo() {
    // After account was created, update user name info
  let user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: this.state.signupUsername, // Use displayName to store the Username
    photoURL: this.state.signupFullname // Use photoURL to store the Fullname
  })
}


createNewAccount() {
  let signupLoadingDiv = document.querySelector('.signup_loading');

    // Send signup email and password to firebase auth
  firebase.auth().createUserWithEmailAndPassword(this.state.signupEmail, this.state.signupPassword)
      .then((u) => {
        this.updateNewAccountInfo();
          // Display signup loading div
            signupLoadingDiv.style.display = 'block';
          // Hide signup loading div, close signinsignup component and display tv component after 2.5sec
          setTimeout(() => {
            signupLoadingDiv.style.display = 'none';
            this.props.openSigninSignUp({ openSigninOrSignUp: false })
            this.props.openTvCont({ openTvCont: true })
          },2500);

        // set states to default / clear inputs if there is any value inside
        this.setState({
            signupUsername: '',
            signupUsernameValid: false,
            signupFullname: '',
            signupFullnameValid: false,
            signupEmail: '',
            signupEmailValid: false,
            signupPassword: '',
            signupPasswordValid: false,
        })

      }).catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            // Display 'Email already in use' error message
          document.querySelector('.signup_email_alreadyinuse').style.display = 'block';
        }
    })
}


handleCreateAccount() {
 let signupUsernameErrorTxt = document.querySelector('.signup_username_error'),
     signupFullnameErrorTxt = document.querySelector('.signup_fullname_error'),
     signupEmailErrorTxt    = document.querySelector('.signup_email_error'),
     signupPassErrorTxt     = document.querySelector('.signup_password_error');


 if(this.state.signupUsernameValid) {
    signupUsernameErrorTxt.style.display = 'none';
    if(this.state.signupFullnameValid) {
      signupFullnameErrorTxt.style.display = 'none';
        if(this.state.signupEmailValid) {
          signupEmailErrorTxt.style.display = 'none';
            if(this.state.signupPasswordValid) {
              signupPassErrorTxt.style.display = 'none';
                // If all inputs are valid, call function to create new account
                this.createNewAccount();

            } else { signupPassErrorTxt.style.display = 'block';}
        } else {signupEmailErrorTxt.style.display = 'block';}
    } else {signupFullnameErrorTxt.style.display = 'block';}
 } else {signupUsernameErrorTxt.style.display = 'block';}
}
 



  render() {
    if(this.props.userSignedIn) { 
      return <Redirect to={process.env.PUBLIC_URL + '/'}/>;
    }
    return (
        <div>
          <div className='col-12'>
          <Header />
            <div className='row justify-content-center'>
              <div className='signinorsignup_container col-12'>
              {this.state.preloadEff && (
                <div className='preload_sign_div col-12'>
                  <div className='row justify-content-center'>
                  <div className='preloadsign_eff'><div></div><div></div><div></div><div></div></div>
                  </div>
                </div>
              )}

                <div className='row justify-content-center'>
                  <div className='signinorsignup_container col-12'>

                    <div className='row justify-content-center'>
                      <div className='signin_section col-12 col-md-12 col-lg-6 col-xl-6'>
                        <div className='signin_loading'>
                          <div className='row justify-content-center'>
                            <div className='signin_loading_ring'><div></div><div></div><div></div><div></div></div>
                          </div>
                        </div>

                      {/* ------ Forgot password section -------- */}
                        <div className='row justify-content-center'>

                        {/* ------ Forgot pass input section -------- */}
                          <div className='signin_forgotpassword_div col-12'>
                            <div className='row justify-content-center'>
                             <span className='signin_section_img'>
                               <i className="fas fa-lock"></i>
                             </span>
                            </div>
                            <div className='row justify-content-center'>
                              <span className='forgotpass_title'>
                                Forgot password
                              </span>
                            </div>
                            <div className='row justify-content-center'>
                              <span className='forgotpass_subtitle'>
                                We'll email you a link to reset your password.
                              </span>
                            </div>
                            <div className='row justify-content-center'>
                              <div className='forgotpass_input'>
                                <input type='text' 
                                       tabIndex='0'
                                       className='forgotpass_input_type'
                                       placeholder='Email Address'
                                       onChange={(e) => this.handleForgotPassword(e)}
                                       onKeyDown={(e) => this.handleForgotPassKeyDown(e)}>
                                </input>
                              </div>
                            </div>
                            <div className='row justify-content-center'>
                              <span className='forgotpass_invalidemail'>
                                Please use a valid email address.
                              </span>
                            </div>
                            <div className='row justify-content-center'>
                              <span className='forgotpass_emailnotfound'>
                                Email not found. Please sign up.
                              </span>
                            </div>
                            <div className='row justify-content-center'>
                              <span className='forgotpass_button'
                                    tabIndex='0'
                                    onClick={() => this.handleForgotPassButton()}>
                                Send Email
                              </span>
                            </div>
                            <div className='row justify-content-center'>
                              <span className='forgotpass_cancel_button'
                                    tabIndex='0'
                                    onClick={() => this.handleForgotPassCancelButton()}>
                                Cancel
                              </span>
                            </div>

                          </div>
                         {/* ------ Forgot pass email sent section -------- */}

                         <div className='forgotpass_emailsent_div col-12'>
                             <div className='row justify-content-center'>
                              <span className='forgotpass_emailsent_img'><i className='fas fa-paper-plane'></i></span>
                            </div>
                            <div className='row justify-content-center'>
                              <span className='forgotpass_emsent_txt'>
                              We’ve sent an email to <span>{this.state.forgotPasswordValue}</span> 
                               with a link to reset your password.</span>
                            </div>
                            <div className='row justify-content-center'>
                              <span className='forgotpass_subtxt'>
                                If you don’t see the email, check your spam folder. 
                                If a few minutes have gone by and you still don’t see it, 
                                <span onClick={() => this.forgotPassResendEmail()}>
                                try to resend the email
                                </span>.
                              </span>
                            </div>
                            <div className='row justify-content-center'>
                              <span className='forgotpass_emailsent_back' onClick={() => this.emailSentBackToSignIn()}>Back to sign in</span>
                            </div>
                         </div>


                        </div>
                      
                         {/* ------ Sign in section -------- */}

                        <div className='row justify-content-center'>
                          <span className='signin_section_img'><i className='fas fa-user'></i></span>
                        </div>

                        <div className='row justify-content-center'>
                          <span className='signin_section_title'>Sign In</span>
                        </div>
                        
                        {/* ------ Sign in input email -------- */}
                        <div className='row justify-content-center'>
                          <div className='signin_email_input signin_input'>
                            <input type='text' 
                                   placeholder='Email'
                                   onChange={(e) => this.handleSigninEmail(e)}
                                   onKeyDown={(e) => this.handleSigninKeyDown(e)}>
                            </input>
                          </div>
                        </div>

                        {/* ------ Invalid / Wrong email message -------- */}
                        <div className='row justify-content-center'>
                          <span className='signin_invalidemail_msg'>Invalid email</span>
                        </div>
                        <div className='row justify-content-center'>
                          <span className='signin_wrongemail_msg'>Wrong email and / or password</span>
                        </div>
                        <div className='row justify-content-center'>
                          <span className='signin_enterEmail_msg'>Please enter a valid email / password</span>
                        </div>

                        {/* ------ Sign in input password -------- */}
                        <div className='row justify-content-center'>
                          <div className='signup_email_input signin_input'>
                            <input type='password' 
                                   placeholder='Password'
                                   onChange={(e) => this.handleSigninPassword(e)}
                                   onKeyDown={(e) => this.handleSigninKeyDown(e)}>
                            </input>
                          </div>
                        </div>

                        <div className='row justify-content-center'>
                          <span className='signin_button'
                                tabIndex='0'
                                onClick={() => this.handleSigninButton()}>
                                  Sign In
                          </span>
                        </div>
                        <div className='row justify-content-center'>
                          <span className='forgot_password'
                                onClick={() => this.openForgotPassSect()}
                                tabIndex='0'>
                                  Forgot password
                          </span>
                        </div>
                      </div>

                    {/* -------- Sign up section ------- */}

                      <div className='signup_section col-12 col-md-12 col-lg-6 col-xl-6'>
                        <div className='signup_loading'>
                          <div className='row justify-content-center'>
                            <div className='signup_loading_ring'>
                              <div></div><div></div><div></div><div></div>
                            </div>
                          </div>
                        </div>
                         <div className='row'>
                              <span className='signup_title'>Sign Up</span>
                         </div>

                         <div className='row justify-content-center'>
                            <div className='signup_section_wrap'>
                                {/* --- Username --- */}

                                <div className='row'>
                                  <span className='signup_username_title'
                                        onClick={() => this.signupUsernameFocus()}>
                                        Username
                                  </span>
                                </div>
                                <div className='row justify-content-center'>
                                  <div className='signup_username signup_input'>
                                    <input type='text' 
                                           className='signup_text_input_username'
                                           onChange={(e) => this.handleChangeUsername(e)}>
                                    </input>
                                  </div>
                                </div>
                                <div className='row'>  
                                    <span className='signup_username_error'>
                                            Please specify a valid username. 
                                            Username must be between 3-15 characters in length, 
                                            and may include letters and numbers.
                                    </span>
                                </div>

                                {/* --- First and Last Name --- */}
                                <div className='row'>
                                  <span className='signup_fullname_title'
                                        onClick={() => this.signupFullNameFocus()}>
                                        Full name
                                  </span>
                                </div>
                                <div className='row justify-content-center'>
                                  <div className='signup_fullName signup_input'>
                                    <input type='text' 
                                           className='signup_text_input_fullName'
                                           onChange={(e) => this.handleChangeFullName(e)}>
                                    </input>
                                  </div>
                                </div>
                                <div className='row'>  
                                    <span className='signup_fullname_error'>
                                          Please enter a valid full name. Must have at least 4 letters.
                                    </span>
                                </div>

                                {/* --- Email --- */}
                                <div className='row'>
                                  <span className='signup_email_title'
                                        onClick={() => this.signupEmailFocus()}>
                                          Email
                                  </span>
                                </div>
                                <div className='row justify-content-center'>
                                  <div className='signup_email signup_input'>
                                    <input type='text' 
                                           className='signup_text_input_email'
                                           onChange={(e) => this.handleChangeEmail(e)}>
                                    </input>
                                  </div>
                                </div>
                                  <div className='row'>  
                                    <span className='signup_email_alreadyinuse'>
                                           Email already in use.
                                    </span>
                                </div>
                                <div className='row'>  
                                    <span className='signup_email_error'>
                                           Please enter a valid email address.
                                    </span>
                                </div>

                                {/* --- Password --- */}
                                <div className='row'>
                                  <span className='signup_password_title'
                                        onClick={() => this.signupPasswordFocus()}>
                                            Password
                                     <i tabIndex='0' className='far fa-eye showHidePassIcon' 
                                        onClick={() => this.showHideSignupPass()}>
                                    </i>
                                  </span>
                                </div>

                                <div className='row justify-content-center'>
                                  <div className='signup_password signup_input'>
                                    <input type='password' 
                                           className='signup_text_input_password'
                                           onChange={(e) => this.handleChangePassword(e)}>
                                    </input>
                                  </div>
                                </div>
                                <div className='row'>  
                                    <span className='signup_password_error'>
                                           Password must have at leaste 6 characters.
                                    </span>
                                </div>

                                <div className='row justify-content-center'>
                                  <span className='signup_terms'>
                                    By creating an account, I agree to the <span tabIndex='0'>Terms of Service</span> and <span tabIndex='0'>Privacy Policy</span>.
                                  </span>
                                </div>

                                <div className='row justify-content-center'>
                                  <span className='signup_button' 
                                        tabIndex='0'
                                        onClick={() => this.handleCreateAccount()}>
                                          Create account
                                  </span>
                                </div>
                           </div>
                         </div>
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

const SigninSignup = connect(mapStateToProps,mapDispatchToProps)(ConnectedSigninSignup);

export default SigninSignup;
