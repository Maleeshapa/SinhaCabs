// import React, { useEffect, useState } from 'react';
// import Table from '../Table/Table';
// import config from '../../config';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const History = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 25;

//   const columns = [
//     '#',
//     'Sale Date',
//     'Customer Name',
//     'Customer Nic',
//     'Guarantor Name',
//     'Guarantor Nic',
//     'Vechicle',
//     'Payment Status',
//     'Rent / Hire Price',
//     'Extra Charges',
//     'Total Amount',
//     'Paid Amount',
//     'Due Amount',
//     'Rent or Hire'
//   ];

//   useEffect(() => {
//     fetchSalesHistory();
//   }, []);

//   const fetchSalesHistory = async () => {
//     try {
//       const response = await fetch(`${config.BASE_URL}/salesGet`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch history');
//       }
//       const salesData = await response.json();

//       // Fetch customer and product details for each sale
//       const formattedData = await Promise.all(salesData.map(async (sale, index) => {
//         // Fetch customer name
//         const customerResponse = await fetch(`${config.BASE_URL}/customer/${sale.customerId}`);
//         const customerData = await customerResponse.json();
//         const customerName = customerData.cusName;
//         const customerNic = customerData.nic;

//         const guarantorsResponse = await fetch(`${config.BASE_URL}/guarantor/${sale.guarantorId}`);
//         const guarantorsData = await guarantorsResponse.json();
//         const guarantorsName = guarantorsData.guarantorName;
//         const guarantorsNic = guarantorsData.guarantorNic;


//         // Fetch product name
//         const productResponse = await fetch(`${config.BASE_URL}/product/${sale.productId}`);
//         const productData = await productResponse.json();
//         const productName = productData.productName;

//         return [
//           index + 1,
//           new Date(sale.saleDate).toLocaleDateString(),
//           customerName, // Use customer name instead of ID
//           customerNic,
//           guarantorsName,
//           guarantorsNic,
//           productName,  // Use product name instead of ID
//           sale.paymentStatus,
//           sale.Transaction?.price,
//           sale.Transaction?.extraCharges,
//           sale.Transaction?.totalAmount || 0,
//           sale.Transaction?.paidAmount || 0,
//           sale.Transaction?.due || 0,
//           sale.status
//         ];
//       }));

//       // Sort by sale date descending
//       formattedData.sort((a, b) => new Date(b[1]) - new Date(a[1]));

//       setData(formattedData);
//       setIsLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setIsLoading(false);
//     }
//   };

//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const getPaginatedData = () => {
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;
//     return data.slice(startIndex, endIndex);
//   };

//   const title = 'Hire and Rent History';
//   const invoice = 'hire and rent history.pdf';

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="scrolling-container">
//       <h4>Rent and Hire History</h4>
//       <Table
//         data={getPaginatedData()}
//         columns={columns}
//         showButton={false}
//         showDate={true}
//         title={title}
//         invoice={invoice}
//         showEdit={false}
//       />
//       <nav>
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
//           </li>
//           {[...Array(totalPages)].map((_, index) => (
//             <li
//               key={index}
//               className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
//             >
//               <button className="page-link" onClick={() => handlePageChange(index + 1)}>
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//             <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default History;




//-----------------------------------------------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import Table from '../Table/Table';
// import config from '../../config';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const History = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 25;

//   const [showColumns, setShowColumns] = useState({
//     saleDate: true,
//     customerName: true,
//     customerNic: false,
//     guarantorName: true,
//     guarantorNic: false,
//     vehicle: true,
//     paymentStatus: true,
//     rentHirePrice: false,
//     extraCharges: true,
//     totalAmount: true,
//     paidAmount: true,
//     dueAmount: true,
//     rentOrHire: true
//   });

//   // Define columns as simple strings to match Table component expectations
//   const columns = [
//     '#',
//     'Sale Date',
//     'Customer Name',
//     'Customer NIC',
//     'Guarantor Name',
//     'Guarantor NIC',
//     'Vehicle',
//     'Payment Status',
//     'Rent/Hire Price',
//     'Extra Charges',
//     'Total Amount',
//     'Paid Amount',
//     'Due Amount',
//     'Rent or Hire'
//   ];

//   useEffect(() => {
//     fetchSalesHistory();
//   }, []);

//   const fetchSalesHistory = async () => {
//     try {
//       const response = await fetch(`${config.BASE_URL}/salesGet`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch history');
//       }
//       const salesData = await response.json();

//       const formattedData = await Promise.all(salesData.map(async (sale, index) => {
//         const customerResponse = await fetch(`${config.BASE_URL}/customer/${sale.customerId}`);
//         const customerData = await customerResponse.json();
//         const customerName = customerData.cusName;
//         const customerNic = customerData.nic;

//         const guarantorsResponse = await fetch(`${config.BASE_URL}/guarantor/${sale.guarantorId}`);
//         const guarantorsData = await guarantorsResponse.json();
//         const guarantorsName = guarantorsData.guarantorName;
//         const guarantorsNic = guarantorsData.guarantorNic;

//         const productResponse = await fetch(`${config.BASE_URL}/product/${sale.productId}`);
//         const productData = await productResponse.json();
//         const productName = productData.productName;

//         // Return array format to match Table component expectations
//         return [
//           (index + 1).toString(),
//           new Date(sale.saleDate).toLocaleDateString(),
//           customerName,
//           customerNic,
//           guarantorsName,
//           guarantorsNic,
//           productName,
//           sale.paymentStatus,
//           (sale.Transaction?.price || '0').toString(),
//           (sale.Transaction?.extraCharges || '0').toString(),
//           (sale.Transaction?.totalAmount || '0').toString(),
//           (sale.Transaction?.paidAmount || '0').toString(),
//           (sale.Transaction?.due || '0').toString(),
//           sale.status
//         ];
//       }));

//       formattedData.sort((a, b) => new Date(b[1]) - new Date(a[1]));

//       setData(formattedData);
//       setIsLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setIsLoading(false);
//     }
//   };

//   const toggleColumn = (columnIndex) => {
//     const columnKey = Object.keys(showColumns)[columnIndex];
//     setShowColumns(prevState => ({
//       ...prevState,
//       [columnKey]: !prevState[columnKey]
//     }));
//   };

//   const title = 'Hire and Rent History';
//   const invoice = 'Hire and Rent history.pdf';

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Get visible column indices
//   const visibleColumnIndices = Object.values(showColumns)
//     .map((isVisible, index) => isVisible ? index : -1)
//     .filter(index => index !== -1);

//   // Filter columns and data based on visibility
//   const visibleColumns = columns.filter((_, index) => 
//     Object.values(showColumns)[index]
//   );

//   const visibleData = data.map(row => 
//     visibleColumnIndices.map(index => row[index])
//   );

//   return (
//     <div className="scrolling-container">
//       <h4>Rent and Hire History</h4>
//       <div className="d-flex justify-content-end mb-3">
//         <div className="dropdown">
//           <button
//             className="btn btn-secondary dropdown-toggle"
//             type="button"
//             id="columnToggleDropdown"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             Toggle Columns
//           </button>
//           <ul className="dropdown-menu dropdown-menu-end p-3" aria-labelledby="columnToggleDropdown">
//             {columns.map((col, index) => (
//               <li key={index} className="form-check">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id={`col-${index}`}
//                   checked={Object.values(showColumns)[index]}
//                   onChange={() => toggleColumn(index)}
//                 />
//                 <label className="form-check-label ms-2" htmlFor={`col-${index}`}>
//                   {col}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <Table
//         data={visibleData}
//         columns={visibleColumns}
//         showButton={false}
//         showDate={true}
//         title={title}
//         invoice={invoice}
//         showEdit={false}
//         showRow={true}
//       />
//     </div>
//   );
// };

// export default History;


// import React, { useEffect, useState } from 'react';
// import config from '../../config';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import PaginatedTable from '../Table/PaginatedTable';

// const History = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [showColumns, setShowColumns] = useState({
//     saleDate: true,
//     customerName: true,
//     customerNic: false,
//     guarantorName: true,
//     guarantorNic: false,
//     vehicle: true,
//     paymentStatus: true,
//     rentHirePrice: false,
//     extraCharges: true,
//     totalAmount: true,
//     paidAmount: true,
//     dueAmount: true,
//     rentOrHire: true
//   });

//   // Define columns as simple strings to match Table component expectations
//   const columns = [
//     '#',
//     'Sale Date',
//     'Customer Name',
//     'Customer NIC',
//     'Guarantor Name',
//     'Guarantor NIC',
//     'Vehicle',
//     'Payment Status',
//     'Rent/Hire Price',
//     'Extra Charges',
//     'Total Amount',
//     'Paid Amount',
//     'Due Amount',
//     'Rent or Hire'
//   ];

//   useEffect(() => {
//     fetchSalesHistory();
//   }, []);

//   const fetchSalesHistory = async () => {
//     try {
//       const response = await fetch(`${config.BASE_URL}/salesGet`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch history');
//       }
//       const salesData = await response.json();

//       const formattedData = await Promise.all(salesData.map(async (sale, index) => {
//         // Fetch customer data
//         const customerResponse = await fetch(`${config.BASE_URL}/customer/${sale.customerId}`);
//         const customerData = await customerResponse.json();

//         // Fetch guarantor data
//         const guarantorsResponse = await fetch(`${config.BASE_URL}/guarantor/${sale.guarantorId}`);
//         const guarantorsData = await guarantorsResponse.json();

//         // Fetch product data
//         const productResponse = await fetch(`${config.BASE_URL}/product/${sale.productId}`);
//         const productData = await productResponse.json();

//         // Return array format to match Table component expectations
//         return [
//           (index + 1).toString(),
//           new Date(sale.saleDate).toLocaleDateString(),
//           customerData.cusName,
//           customerData.nic,
//           guarantorsData.guarantorName,
//           guarantorsData.guarantorNic,
//           productData.productName,
//           sale.paymentStatus,
//           (sale.Transaction?.price || '0').toString(),
//           (sale.Transaction?.extraCharges || '0').toString(),
//           (sale.Transaction?.totalAmount || '0').toString(),
//           (sale.Transaction?.paidAmount || '0').toString(),
//           (sale.Transaction?.due || '0').toString(),
//           sale.status
//         ];
//       }));

//       // Sort by date in descending order
//       formattedData.sort((a, b) => {
//         const dateA = new Date(a[1]);
//         const dateB = new Date(b[1]);
//         return dateB - dateA;
//       });

//       // Update the index numbers after sorting
//       const indexedData = formattedData.map((row, index) => {
//         const newRow = [...row];
//         newRow[0] = (index + 1).toString();
//         return newRow;
//       });

//       setData(indexedData);
//       setIsLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setIsLoading(false);
//     }
//   };

//   const toggleColumn = (columnIndex) => {
//     const columnKey = Object.keys(showColumns)[columnIndex];
//     setShowColumns(prevState => ({
//       ...prevState,
//       [columnKey]: !prevState[columnKey]
//     }));
//   };

//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Error: {error}
//       </div>
//     );
//   }

//   // Get visible column indices
//   const visibleColumnIndices = Object.values(showColumns)
//     .map((isVisible, index) => isVisible ? index : -1)
//     .filter(index => index !== -1);

//   // Filter columns and data based on visibility
//   const visibleColumns = columns.filter((_, index) => 
//     Object.values(showColumns)[index]
//   );

//   const visibleData = data.map(row => 
//     visibleColumnIndices.map(index => row[index])
//   );

//   return (
//     <div className="container-fluid py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="mb-0">Rent and Hire History</h4>
//         <div className="dropdown">
//           <button
//             className="btn btn-secondary dropdown-toggle"
//             type="button"
//             id="columnToggleDropdown"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             Toggle Columns
//           </button>
//           <ul 
//             className="dropdown-menu dropdown-menu-end p-3" 
//             aria-labelledby="columnToggleDropdown"
//             style={{ maxHeight: '400px', overflowY: 'auto' }}
//           >
//             {columns.map((col, index) => (
//               <li key={index} className="form-check">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id={`col-${index}`}
//                   checked={Object.values(showColumns)[index]}
//                   onChange={() => toggleColumn(index)}
//                 />
//                 <label className="form-check-label ms-2" htmlFor={`col-${index}`}>
//                   {col}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="card">
//         <div className="card-body p-0">
//           <PaginatedTable
//             data={visibleData}
//             columns={visibleColumns}
//             showButton={false}
//             showDate={true}
//             title="Rent and Hire History"
//             invoice="rent-hire-history.pdf"
//             showEdit={false}
//             showDelete={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default History;

import React, { useEffect, useState } from 'react';
import config from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginatedTable from '../Table/PaginatedTable';

const History = () => {
  const [rawData, setRawData] = useState([]); // Store the complete raw data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showColumns, setShowColumns] = useState({
    saleDate: true,
    customerName: true,
    customerNic: false,
    guarantorName: true,
    guarantorNic: false,
    vehicle: true,
    paymentStatus: true,
    rentHirePrice: false,
    extraCharges: true,
    totalAmount: true,
    paidAmount: true,
    dueAmount: true,
    rentOrHire: true
  });

  const columns = [
    '#',
    'Sale Date',
    'Customer Name',
    'Customer NIC',
    'Guarantor Name',
    'Guarantor NIC',
    'Vehicle',
    'Payment Status',
    'Rent/Hire Price',
    'Extra Charges',
    'Total Amount',
    'Paid Amount',
    'Due Amount',
    'Rent or Hire'
  ];

  const handleDelete = async (rowIndex) => {
    try {
      // Get the actual sale object from rawData
      const saleToDelete = rawData[rowIndex];
  
      if (!saleToDelete || !saleToDelete.salesId) {
        console.error('Sale data not found for index:', rowIndex);
        console.error('Raw data:', rawData);
        throw new Error('Sale data not found');
      }
  
      const response = await fetch(`${config.BASE_URL}/salesDelete/${saleToDelete.salesId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete sale');
      }
  
      // Remove the deleted row from rawData
      setRawData(prevData => prevData.filter((_, index) => index !== rowIndex));
      alert('Sale deleted successfully');
    } catch (err) {
      console.error('Error deleting sale:', err);
      alert('Failed to delete sale: ' + err.message);
    }
  };

  useEffect(() => {
    fetchSalesHistory();
  }, []);

  const fetchSalesHistory = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/salesGet`);
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      const salesData = await response.json();

      const formattedData = await Promise.all(salesData.map(async (sale) => {
        // Fetch customer data
        const customerResponse = await fetch(`${config.BASE_URL}/customer/${sale.customerId}`);
        const customerData = await customerResponse.json();

        // Fetch guarantor data
        const guarantorsResponse = await fetch(`${config.BASE_URL}/guarantor/${sale.guarantorId}`);
        const guarantorsData = await guarantorsResponse.json();

        // Fetch product data
        const productResponse = await fetch(`${config.BASE_URL}/product/${sale.productId}`);
        const productData = await productResponse.json();

        return {
          salesId: sale.salesId,
          customerId: sale.customerId,
          guarantorId: sale.guarantorId,
          productId: sale.productId,
          displayData: [
            '', // Index will be added later
            new Date(sale.saleDate).toLocaleDateString(),
            customerData.cusName,
            customerData.nic,
            guarantorsData.guarantorName,
            guarantorsData.guarantorNic,
            productData.productName,
            sale.paymentStatus,
            (sale.Transaction?.price || '0').toString(),
            (sale.Transaction?.extraCharges || '0').toString(),
            (sale.Transaction?.totalAmount || '0').toString(),
            (sale.Transaction?.paidAmount || '0').toString(),
            (sale.Transaction?.due || '0').toString(),
            sale.status
          ]
        };
      }));

      // Sort by date in descending order
      formattedData.sort((a, b) => {
        const dateA = new Date(a.displayData[1]);
        const dateB = new Date(b.displayData[1]);
        return dateB - dateA;
      });

      // Add indices after sorting
      formattedData.forEach((item, index) => {
        item.displayData[0] = (index + 1).toString();
      });

      setRawData(formattedData);
      setIsLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const toggleColumn = (columnIndex) => {
    const columnKey = Object.keys(showColumns)[columnIndex];
    setShowColumns(prevState => ({
      ...prevState,
      [columnKey]: !prevState[columnKey]
    }));
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  // Get visible column indices
  const visibleColumnIndices = Object.values(showColumns)
    .map((isVisible, index) => isVisible ? index : -1)
    .filter(index => index !== -1);

  // Filter columns based on visibility
  const visibleColumns = columns.filter((_, index) => 
    Object.values(showColumns)[index]
  );

  // Prepare visible data for the table
  const visibleData = rawData.map(item => 
    visibleColumnIndices.map(index => item.displayData[index])
  );

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Rent and Hire History</h4>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="columnToggleDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Toggle Columns
          </button>
          <ul 
            className="dropdown-menu dropdown-menu-end p-3" 
            aria-labelledby="columnToggleDropdown"
            style={{ maxHeight: '400px', overflowY: 'auto' }}
          >
            {columns.map((col, index) => (
              <li key={index} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`col-${index}`}
                  checked={Object.values(showColumns)[index]}
                  onChange={() => toggleColumn(index)}
                />
                <label className="form-check-label ms-2" htmlFor={`col-${index}`}>
                  {col}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <PaginatedTable
            data={visibleData}
            columns={visibleColumns}
            showButton={false}
            showDate={true}
            title="Rent and Hire History"
            invoice="rent-hire-history.pdf"
            showEdit={false}
            showDelete={true}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default History;