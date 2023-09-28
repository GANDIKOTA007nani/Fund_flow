import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Video4 from '../Images/Video4.mp4';
import axios from 'axios'; // Import Axios

const loginStyles = {
  videoBackground: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    height: '100%',
  },
  box: {
    width: '350px',
    height: '250px',
    backgroundColor: 'rgba(225,225,225,0.18)',
    borderRadius: '10px',
    textAlign: 'center',
    fontSize: '18px',
    opacity: '80%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    position: 'relative',
  },
  loginHeader: {
    fontSize: '25px',
    fontWeight: 'bold',
    margin: '0px 230px 0px 0px',
    fontFamily: "'Open Sans', sans-serif",
    color: '#ffffff',
  },

  enterHeader: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '30px 200px 0px 0px',
    fontFamily: "'Open Sans', sans-serif",
    color: '#ffffff',
  },

  label: {
    fontSize: '18px',
    fontWeight: 'medium',
    margin: '40px 230px 0px 0px',
    marginTop: '20px',
    color: '#ffffff',
  },
  inputField: {
    width: '80%',
    padding: '10px 10px',
    fontSize: '16px',
    margin: '10px 0px 20px 25px',
    border: '3px solid #000000',
    borderRadius: '5px',
    background: 'transparent',
    color: '#ffffff',
    fontFamily: "'Open Sans', sans-serif",
  },
  buttons: {
    width: '50%',
    padding: '10px 20px',
    fontSize: '16px',
    background: '#39ff14',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '20px 0px 0px 80px',
  },
};

function Login() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [otp, setOtp] = useState('');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const navigate = useNavigate();
  const [sessionId,setsessionId]=useState();

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    setEmail(inputEmail);
    setIsValidEmail(emailPattern.test(inputEmail));
  };

  const generateOTP = () => {
    if (isValidEmail && email.trim() !== '') {
      axios
        .post(`https://api.p360.build:9003/v1/user/authenticateUser/${email}`) // Replace with your actual OTP generation API endpoint
        .then((response) => {
          console.log('OTP generated successfully:', response.data);
          setOtp(response.data.otp);
          setsessionId(response.data.sessionId);
          setIsOtpMode(true);
        })
        .catch((error) => {
          console.error('OTP generation failed:', error);
        });
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const submitOTP = () => {

    const reqbody = {
      session: sessionId,
      email: email,
      confirmationCode: otp,
    };
    
    axios
      .post(`https://api.p360.build:9003/v1/user/respondToAuthChallenge`, reqbody) // Replace with your actual OTP verification API endpoint
      .then((response) => {
        console.log('OTP verification successful:', response.data);
        localStorage.setItem("accessToken",response.data.accessToken);
        navigate('/Float');
      })
      .catch((error) => {
        console.error('OTP verification failed:', error);
        alert('OTP verification failed. Please try again.');
      });
  };

  return (
    <div style={loginStyles.videoBackground}>
       <video autoPlay loop muted style={loginStyles.video}>
        <source src={Video4} type="video/mp4" />
        Your browser does not support the video tag.
      </video> 

      <div style={loginStyles.content}>
        <div style={loginStyles.box}>
          {isOtpMode ? (
            <>
              <h2 style={loginStyles.enterHeader}>Enter OTP:</h2>
              <input
                type="text"
                placeholder="Enter OTP"
                style={loginStyles.inputField}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button style={loginStyles.buttons} onClick={submitOTP}>
                Submit
              </button>
            </>
          ) : (
            <>
              <h2 style={loginStyles.loginHeader}>Login:</h2>
              <label style={loginStyles.label}>UserID</label>
              <input
                type="email"
                placeholder="Enter your username"
                style={{
                  ...loginStyles.inputField,
                  borderColor: isValidEmail ? '#ffffff' : 'red',
                }}
                value={email}
                onChange={handleEmailChange}
              />
              <button style={loginStyles.buttons} onClick={generateOTP}>
                Generate OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
