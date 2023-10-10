import React, { useState, useRef, useEffect } from 'react';
import plus from '../Icons/plus.png';
import edit from '../Icons/Editor.png';
import copy from '../Icons/Copy.png';
import search from '../Icons/search.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


function Table() {
  const headers = [
    'transactionType',
    'documentDate',
    'year',
    'period',
    'reference',
    'paymentProject',
    'receiptProject',
    'amount',
    'status',
  ];

  

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const Cookie = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        'https://api.p360.build:6060/v1/fundflow/asset-funds/fetchAll',
        Cookie
      ); // Replace with your actual API endpoint
      const data = response.data.data; // Assuming your API response is an array of objects

      // Update the tableData state with the fetched data
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const transactionType = ['RAN', 'BLR', 'HYD', 'CO'];
  const statusOptions = [
    { label: 'Draft', color: 'red' },
    { label: 'Submit', color: 'green' },
  ];
  const statusSelectRefs = useRef([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [editableRows, setEditableRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [referenceErrors, setReferenceErrors] = useState([]);
  const [paymentProjectErrors, setPaymentProjectErrors] = useState([]);
  const [receiptProjectErrors, setReceiptProjectErrors] = useState([]);
  
  const [amountErrors, setAmountErrors] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const referenceInputRefs = useRef([]);
  const paymentProjectInputRefs = useRef([]);
  const receiptProjectInputRefs = useRef([]);
  
  
  const inputHeight = '16px';


  
  const toggleRowExpansion = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const toggleEditRow = (index) => {
    if (editableRows.includes(index)) {
      setEditableRows(editableRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setEditableRows([...editableRows, index]);
    }
  };

  const handleEditChange = (index, header, value) => {
  const updatedTableData = tableData.map((rowData, rowIndex) => {
    if (rowIndex === index) {
      if (header === 'documentDate') {
        // Parse the date string to a valid Date object
        const parsedDate = new Date(value);
        if (!isNaN(parsedDate.getTime())) {
          const year = parsedDate.getFullYear();
          const month = parsedDate.getMonth() + 1;
          return {
            ...rowData,
            year: year.toString(),
            period: month.toString(),
            [header]: parsedDate.toISOString(), // Store as ISO date string
          };
        } else {
          // Handle invalid date input
          return {
            ...rowData,
            [header]: value,
          };
        }
      } else if (header === 'amount') {
        if (!isNaN(value)) {
          const amountErrorsCopy = [...amountErrors];
          amountErrorsCopy[index] = '';
          setAmountErrors(amountErrorsCopy);
          return {
            ...rowData,
            [header]: value,
          };
        } else {
          const amountErrorsCopy = [...amountErrors];
          amountErrorsCopy[index] = 'Amount must be a valid number';
          setAmountErrors(amountErrorsCopy);
          return rowData;
        }
      } else {
        return {
          ...rowData,
          [header]: value,
        };
      }
    }
    return rowData;
  });

  setTableData(updatedTableData);
};

  const cancelEditRow = (index) => {
    if (editableRows.includes(index)) {
      setEditableRows(editableRows.filter((rowIndex) => rowIndex !== index));

      // Check if the row is a newly added row (index 0)
      if (index === 0 && tableData.length > 0 && !tableData[0]['documentDate']) {
        // If the canceled row is the first row (newly added), remove it from the table
        const updatedTableData = [...tableData];
        updatedTableData.splice(0, 1); // Remove the first row
        setTableData(updatedTableData);

        // Clear the corresponding amount error
        const amountErrorsCopy = [...amountErrors];
        amountErrorsCopy.splice(0, 1); // Remove the first error
        setAmountErrors(amountErrorsCopy);
      }
    }
  };

  const addNewRow = () => {
    const newRow = Object.fromEntries(
      headers.map((header) => [header, header === 'amount' ? '' : ''])
    );
    setTableData([newRow, ...tableData]);
    setEditableRows([0, ...editableRows]);
    setAmountErrors(['', ...amountErrors]);
  };

  const handleReferenceInputChange = (index, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].reference = value;

    const referenceErrorsCopy = [...referenceErrors];
    referenceErrorsCopy[index] = '';

    if (value.length > 30) {
      referenceErrorsCopy[index] = '("Reference" input must be 30 characters or less)';
    }

    setTableData(updatedTableData);
    setReferenceErrors(referenceErrorsCopy);
    adjustReferenceInputHeight(index);
  };

  const adjustReferenceInputHeight = (index) => {
    const input = referenceInputRefs.current[index];
    if (input) {
      input.style.height = inputHeight;
      input.style.width = '200px';
      input.style.overflowX = 'auto';
    }
  };

  const handlePaymentProjectInputChange = (index, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index]['paymentProject'] = value;

    const paymentProjectErrorsCopy = [...paymentProjectErrors];
    paymentProjectErrorsCopy[index] =
      value.length > 9 ? '("paymentProject" must be 9 characters or less)' : '';

    setTableData(updatedTableData);
    setPaymentProjectErrors(paymentProjectErrorsCopy);
    adjustPaymentProjectInput(index);
  };

  const adjustPaymentProjectInput = (index) => {
    // Add adjustment logic here if needed
  };

  const handleReceiptProjectInputChange = (index, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index]['receiptProject'] = value;

    const receiptProjectErrorsCopy = [...receiptProjectErrors];
    receiptProjectErrorsCopy[index] =
      value.length > 9 ? '("receiptProject" must be 9 characters or less)' : '';

    setTableData(updatedTableData);
    setReceiptProjectErrors(receiptProjectErrorsCopy);
    adjustReceiptProjectInput(index);
  };

  const adjustReceiptProjectInput = (index) => {
    // Add adjustment logic here if needed
  };

  const handleStatusChange = (index, value) => {
    const updatedStatusValues = [...statusValues];
    updatedStatusValues[index] = value;
    setStatusValues(updatedStatusValues);
  };

  const copyRow = (index) => {
    const newRowData = { ...tableData[index] };
    setTableData((prevData) => [newRowData, ...prevData]);
    setEditableRows([0, ...editableRows]);
    setAmountErrors(['', ...amountErrors]);
  };

  // const formatDate = (dateString) => {
  //   if (!dateString) return ''; // Handle empty dates
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };

  const validateRow = (index) => {
    // Add validation logic here for the row at the given index
    // Return true if the row is valid, false otherwise
    // You can use the referenceErrors, paymentProjectErrors, and other error states to perform validation
    // For example, check if any error state is not empty and return false if there are errors

    if (
      referenceErrors[index] ||
      paymentProjectErrors[index] ||
      receiptProjectErrors[index] ||
      amountErrors[index]
    ) {
      return false;
    }

    return true;
  };

  const handleSaveRow = async (index) => {
    if (!validateRow(index)) {
      return;
    }
  
    const rowToSave = tableData[index];
  
    try {
      const accessToken = localStorage.getItem('accessToken');
      const Cookie = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      };
  
      // Check if the row already has an 'id' property, which is used to identify existing rows
      if (rowToSave.id) {
        // Perform a PUT request to update an existing row
        await axios.put(
          `https://api.p360.build:6060/v1/fundflow/asset-funds/submit`,
          rowToSave, // Send the rowToSave object directly as the request body
          Cookie
        );
      } else {
        // Handle the case of adding a new row (you may want to adjust the URL)
        await axios.post(
          'https://api.p360.build:6060/v1/fundflow/asset-funds/draft',
          rowToSave, // Send the rowToSave object directly as the request body
          Cookie
        );
      }
  
      const updatedEditableRows = editableRows.filter((rowIndex) => rowIndex !== index);
      setEditableRows(updatedEditableRows);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
    


    const renderAdditionalFields = (index) => {
    const currentDate= new Date().toISOString().split('T')[0];
    return (
      <tr key={`additional-${index}`}>
        <td colSpan={headers.length + 2} style={{ padding: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 150px 0px 30px ' }}>
            <div>
              created date: <input type="dateTime"  formate='DD-MM-YYYY HH:mm:ss' value={currentDate} disabled />
            </div>
            <div>
              Created By: <input type="text" />
            </div>
            <div>
              Submitted on: <input type="dateTime"  formate='DD-MM-YYYY HH:mm:ss' value={currentDate} disabled />
            </div>
            <div>
              Submitted by: <input type="text" />
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '0px 20px 0px 20px',
        }}
      >
        <div>
          <h2>Assets</h2>
        </div>
        <div>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search..."
              style={{
                paddingRight: '30px',
                width: '150px',
                height: '30px',
                borderRadius: '5px',
               
              }}
            />
            <img
              src={search}
              alt="Search Icon"
              style={{
                width: '30px',
                height: '30px',
                position: 'absolute',
                right: '0px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
        </div>
        <div>
          <img
            src={plus}
            alt="Plus Icon"
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            onClick={addNewRow}
          />
        </div>
      </div>
      <div style={{ margin: '0px 20px 20px 20px', overflowX: 'auto' , maxHeight: '450px'}}>
        <table style={{ width: '100%', minWidth: '600px' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
            <tr>
              <th colSpan={headers.length + 2} style={{ textAlign: 'center' }}></th>
            </tr>
            <tr>
              <th></th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  style={{
                    padding: '5px',
                    textAlign: 'center',
                    borderBottom: '1px solid black',
                    backgroundColor: 'lightgreen',
                    color: 'black',
                    minWidth: '50px',
                    borderRadius:'8px',
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <FontAwesomeIcon
                      icon={expandedRows.includes(rowIndex) ? faCaretUp : faCaretDown}
                      onClick={() => toggleRowExpansion(rowIndex)}
                    />
                  </td>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} style={{ padding: '8px', textAlign: 'center', minWidth: '10px' }}>
                      {header === 'transactionType' ? (
                        <select
                          value={rowData[header]}
                          onChange={(e) => handleEditChange(rowIndex, header, e.target.value)}
                          disabled={!editableRows.includes(rowIndex)}
                        >
                          {transactionType.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : header === 'documentDate' ? (
                        <input
                          type="date"
                          // value={formatDate(rowData['documentDate'])} // Use the formatDate function to format the date
                          // onChange={(e) => handleEditChange(rowIndex, header, e.target.value)}
                          style={{ width: '100px', height: inputHeight }}
                          disabled={!editableRows.includes(rowIndex)}
                        />
                      ) : header === 'year' || header === 'period' ? (
                        <input
                          type="text"
                          value={rowData[header] || ''}
                          onChange={(e) => handleEditChange(rowIndex, header, e.target.value)}
                          style={{ width: '40px', height: inputHeight }}
                          disabled={!editableRows.includes(rowIndex)}
                        />                      
                        ) : header === 'reference' ? (
                        <input
                          type="text"
                          value={rowData[header]}
                          onChange={(e) => {
                            handleReferenceInputChange(rowIndex, e.target.value);
                          }}
                          onInput={() => adjustReferenceInputHeight(rowIndex)}
                          maxLength={30}
                          style={{ width: '200px', height: inputHeight }}
                          ref={(inputRef) => (referenceInputRefs.current[rowIndex] = inputRef)}
                          disabled={!editableRows.includes(rowIndex)}
                        />
                      ) : header === 'paymentProject' ? (
                        <input
                          type="text"
                          value={rowData[header]}
                          onChange={(e) => {
                            handlePaymentProjectInputChange(rowIndex, e.target.value);
                          }}
                          onInput={() => adjustPaymentProjectInput(rowIndex)}
                          maxLength={9}
                          style={{ width: '80px', height: inputHeight }}
                          ref={(inputRef) => (paymentProjectInputRefs.current[rowIndex] = inputRef)}
                          disabled={!editableRows.includes(rowIndex)}
                        />
                      ) : header === 'receiptProject' ? (
                        <input
                          type="text"
                          value={rowData[header]}
                          onChange={(e) => {
                            handleReceiptProjectInputChange(rowIndex, e.target.value);
                          }}
                          onInput={() => adjustReceiptProjectInput(rowIndex)}
                          maxLength={9}
                          style={{ width: '80px', height: inputHeight }}
                          ref={(inputRef) => (receiptProjectInputRefs.current[rowIndex] = inputRef)}
                          disabled={!editableRows.includes(rowIndex)}
                        />
                      ) : header === 'amount' ? (
                        <>
                          <input
                            type="text"
                            value={rowData[header]}
                            onChange={(e) => handleEditChange(rowIndex, header, e.target.value)}
                            style={{ width: '80px', height: inputHeight }}
                            disabled={!editableRows.includes(rowIndex)}
                          />
                          {amountErrors[rowIndex] && (
                            <div style={{ color: 'red' }}>{amountErrors[rowIndex]}</div>
                          )}
                        </>
                      ) : header === 'status' ? (
                        <select
                          value={statusValues[rowIndex] || 'Draft'}
                          onChange={(e) => handleStatusChange(rowIndex, e.target.value)}
                          style={{
                            color: statusValues[rowIndex] === 'Submit' ? 'green' : 'red',
                          }}
                          ref={(selectRef) => (statusSelectRefs.current[rowIndex] = selectRef)}
                          disabled={!editableRows.includes(rowIndex)}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.label} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : editableRows.includes(rowIndex) ? (
                        <input
                          type="text"
                          value={rowData[header]}
                          onChange={(e) => handleEditChange(rowIndex, header, e.target.value)}
                        />
                      ) : (
                        rowData[header]
                      )}
                    </td>
                  ))}
                  <td style={{ padding: '8px', textAlign: 'center', minWidth: '50px' }}>
                  {editableRows.includes(rowIndex) ? (
                    <>
                      <button onClick={() => handleSaveRow(rowIndex)}>Save</button>
                      <button onClick={() => cancelEditRow(rowIndex)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <img
                        src={edit}
                        alt="Edit Icon"
                        style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                        onClick={() => toggleEditRow(rowIndex)}
                      />
                      <img
                        src={copy}
                        alt="Copy Icon"
                        style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                        onClick={() => copyRow(rowIndex)}
                      />
                    </>
                  )}
                </td>

                </tr>
                {expandedRows.includes(rowIndex) && renderAdditionalFields(rowIndex)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
