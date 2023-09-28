import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BusinessIcon from '@mui/icons-material/Business';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
// import Table from '../Mycomponents/Table'

const iconSize = 16; // Change the icon size as needed

const actions = [
  { icon: <CommentBankIcon sx={{ fontSize: iconSize }} />, name: 'Reserves' },
  { icon: <AccountBalanceIcon sx={{ fontSize: iconSize }}/>, name: 'Term Loan Setoff' },
  { icon: <PaymentIcon sx={{ fontSize: iconSize }} />, name: 'Assets Funds' },
  { icon: <MonetizationOnIcon sx={{ fontSize: iconSize }} />, name: 'CO Levies' },
  { icon: <AttachMoneyIcon sx={{ fontSize: iconSize }} />, name: 'Receipt From RO' },
  { icon: <ReceiptIcon sx={{ fontSize: iconSize }} />, name: 'R2C Surplus Funds Transfer' },//
  { icon: <BusinessIcon sx={{ fontSize: iconSize }} />, name: 'Payments' },
  { icon: <BusinessCenterIcon sx={{ fontSize: iconSize }} />, name: 'P2R Surplus Funds Transfer' },
  { icon: <AccountBalanceWalletIcon sx={{ fontSize: iconSize }} />, name: 'RO To RO Loans' },
  { icon: <CategoryIcon sx={{ fontSize: iconSize }} />, name: 'P2P Loans' },
  { icon: <StoreIcon sx={{ fontSize: iconSize }} />, name: 'P2P Payments' },
];

const actionSpacing = -0.2; // Adjust the spacing between actions (papers) as needed

const paperWidth = 30; // Adjust the width of the papers as needed
const paperHeight = 30; // Adjust the height of the papers as needed

export default function BasicSpeedDial() {
  
  return (
    <div>
    {/* <Table/> */}
    <Box sx={{ height: 300, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: 0, left: 1 }} 
        icon={<SpeedDialIcon />}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            sx={{
              marginBottom: actionSpacing,
              width: paperWidth,
              height: paperHeight,
            }}
          />
        ))}
      </SpeedDial>
    </Box>
    </div>
  );
}
