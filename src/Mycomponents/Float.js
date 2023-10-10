import React, { useState } from 'react';
import Draggable from 'react-draggable';
import icon1 from '../Icons/icon1.png';
import icon2 from '../Icons/icon2.png';
import icon3 from '../Icons/icon3.png';
import icon4 from '../Icons/icon4.png';
import icon5 from '../Icons/icon5.png';
import icon6 from '../Icons/icon6.png';
import icon7 from '../Icons/icon7.png';
import icon8 from '../Icons/icon8.png';
import icon9 from '../Icons/icon9.png';
import icon10 from '../Icons/icon10.png';
import icon11 from '../Icons/icon11.png';
import P2p from './P2p'
import Co from './Co';
import P2ploans from './P2ploans';
import ROtoRO from './ROtoRO';
import P2R from './P2R';
import Receipt from './Receipt';
import Assets from './Assets';
import Payments from './Payments';
import R2C from './R2C';
import Term from './Term';
import Reserves from './Reserves';




const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px',
  borderRadius: '50%',
  background: 'blue',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  zIndex:'2'
};

const BoxStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(173, 216, 230, 0.5)',
  borderRadius: '20px',
  padding: '20px',
  width: '500px',
  height: '400px',
  overflow: 'auto',
  boxShadow: '0px 4px 6px  1px black',
  color: 'black',
  textAlign: 'center',
  zIndex:'2'
};

const cardStyle = {
  width: '80px',
  background: 'lightblue',
  height: '80px',
  borderRadius: '20px',
  padding: '5px',
  margin: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'black',
  fontFamily: 'Open Sans, sans-serif',
  fontSize: '14px',
  transition: 'transform 0.3s',
  cursor: 'pointer',
};

const cardIcons = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
]; // Imported icons

const cardNames = [
  'P2P Payments',
  'P2P Loans',
  'RO To RO Loans',
  'P2R Surplus',
  'Payments',
  'R2C Surplus',
  'Receipt From RO',
  'CO Levies',
  'Assets Funds',
  'Term Loan Setoff',
  'Reserves',
];

function Float() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
   
  };

  const handleCardClick = (cardName) => {
    setSelectedCard(cardName);
  };

  const renderSelectedComponent = () => {
    switch (selectedCard) {
      case 'CO Levies':
        return <Co />;
      case 'P2P Payments':
        return <P2p/>;
      case 'P2P Loans':
        return <P2ploans/>;
      case 'RO To RO Loans':
        return <ROtoRO/>;
      case 'P2R Surplus':
        return <P2R/>; 
      case 'Receipt From RO':
        return <Receipt/>; 
      case 'Assets Funds':
        return <Assets/>;
      case 'Term Loan Setoff':
        return <Term/>;
      case 'Reserves':
        return <Reserves/>; 
      case 'Payments':
        return <Payments/>;
      case 'R2C Surplus':
        return <R2C/>;
      default:
        return null; // Render nothing by default
    }
  };

  return (
    <div>
      {/* Your content */}
      {/* Floating Button */}
      <Draggable>
        <button style={buttonStyle} onClick={toggleMenu}>
          Menu
        </button>
      </Draggable>

      {/* Glassmorphism Box */}
      {isMenuOpen && (
        <div style={BoxStyle}>
          {/* Box content */}
          {/* Cards */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {cardNames.map((cardName, index) => (
              <div
                key={index}
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)'; 
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)'; 
                }}
                onClick={() => handleCardClick(cardName)} // Add onClick handler for each card
              >
                <img src={cardIcons[index]} alt={cardName} width="32" height="32" />
                {cardName}
              </div>
            ))}
          </div>

          <button onClick={toggleMenu}>Close</button>
        </div>
      )}

      {/* Render the selected component */}
      {selectedCard && renderSelectedComponent()}
    </div>
  );
}

export default Float;
