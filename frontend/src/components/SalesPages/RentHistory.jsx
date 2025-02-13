// import React, { useEffect, useState } from 'react';
// import Table from '../Table/Table';
// import config from '../../config';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const RentHistory = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 25;

//   const columns = [
//     '#',
//     'Sale Date',
//     'Customer',
//     'Product',
//     'Guarantor Name',
//     'Total Amount',
//     'Paid Amount',
//     'Due Amount',
//     'Status'
//   ];

//   useEffect(() => {
//     fetchSalesHistory();
//   }, []);

//   const fetchSalesHistory = async () => {
//     try {
//       const response = await fetch(`${config.BASE_URL}/salesRentGet`);
//       if (!response.ok) {
//         throw new Error('No Rent History to Show');
//       }
//       const salesData = await response.json();

//       // Fetch customer and product details for each sale
//       const formattedData = await Promise.all(salesData.map(async (sale, index) => {
//         // Fetch customer name
//         const customerResponse = await fetch(`${config.BASE_URL}/customer/${sale.customerId}`);
//         const customerData = await customerResponse.json();
//         const customerName = customerData.cusName;

//         // Fetch product name
//         const productResponse = await fetch(`${config.BASE_URL}/product/${sale.productId}`);
//         const productData = await productResponse.json();
//         const productName = productData.productName;

//         const guarantorResponse = await fetch(`${config.BASE_URL}/guarantor/${sale.guarantorId}`);
//         const guarantorData = await guarantorResponse.json();
//         const guarantorName = guarantorData.guarantorName;


//         return [
//           index + 1,
//           new Date(sale.saleDate).toLocaleDateString(),
//           customerName, // Use customer name instead of ID

//           productName,  // Use product name instead of ID
//           // sale.paymentStatus,
//           guarantorName,
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

//   const title = 'Hire History';
//   const invoice = 'hire_history.pdf';

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="scrolling-container">
//       <h4>Rent History</h4>
//       <Table
//         data={getPaginatedData()}
//         columns={columns}
//         showButton={false}
//         showDate={true}
//         title={title}
//         invoice={invoice}
//         showDelete={true}
//         onDelete={handleDelete}
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

// export default RentHistory;

// import React, { useEffect, useState } from 'react';
// import Table from '../Table/Table';
// import config from '../../config';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import UpdateModal from '../../Models/RentHireUpdate/UpdateModal';
// import { faPen } from '@fortawesome/free-solid-svg-icons';

// const RentHistory = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 25;

//   const [selectedSale, setSelectedSale] = useState(null);
// const [showEditModal, setShowEditModal] = useState(false);

//   const columns = [
//     '#',
//     'Sale Date',
//     'Customer',
//     'Product',
//     'Guarantor Name',
//     'Total Amount',
//     'Paid Amount',
//     'Due Amount',
//     'Status',
//     'Actions',
    
//   ];

//   useEffect(() => {
//     fetchSalesHistory();
//   }, []);

//   const fetchSalesHistory = async () => {
//     try {
//       const response = await fetch(`${config.BASE_URL}/salesRentGet`);
//       if (!response.ok) {
//         throw new Error('No Rent History to Show');
//       }
//       const salesData = await response.json();

//       // Fetch details for each sale
//       const formattedData = await Promise.all(salesData.map(async (sale, index) => {
//         const customerResponse = await fetch(`${config.BASE_URL}/customer/${sale.customerId}`);
//         const customerData = await customerResponse.json();
//         const customerName = customerData.cusName;

//         const productResponse = await fetch(`${config.BASE_URL}/product/${sale.productId}`);
//         const productData = await productResponse.json();
//         const productName = productData.productName;

//         const guarantorResponse = await fetch(`${config.BASE_URL}/guarantor/${sale.guarantorId}`);
//         const guarantorData = await guarantorResponse.json();
//         const guarantorName = guarantorData.guarantorName;

//         return {
//           id: sale.salesId,
//           rowData: [
//             index + 1,
//             new Date(sale.saleDate).toLocaleDateString(),
//             customerName,
//             productName,
//             guarantorName,
//             sale.Transaction?.totalAmount || 0,
//             sale.Transaction?.paidAmount || 0,
//             sale.Transaction?.due || 0,
//             sale.status,
//             <div className="btn-group" role="group">
//               <button 
//                 className="btn btn-warning btn-sm"
//                 onClick={() => handleEdit(sale)}
//               >
//                 <FontAwesomeIcon icon={faPen} />
//               </button>
//               <button 
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDelete(sale.salesId)}
//               >
//                 <FontAwesomeIcon icon={faTrash} />
//               </button>
//             </div>
//           ]
//         };
//       }));

//       formattedData.sort((a, b) => new Date(b.rowData[1]) - new Date(a.rowData[1]));

//       setData(formattedData);
//       setIsLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (salesId) => {
//     if (!window.confirm("Are you sure you want to delete this sale?")) return;

//     try {
//       const response = await fetch(`${config.BASE_URL}/salesDelete/${salesId}`, {
//         method: 'DELETE'
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete sale');
//       }

//       // Update state instantly by removing the deleted sale
//       setData(prevData => prevData.filter(sale => sale.id !== salesId));
//     } catch (err) {
//       alert(`Error: ${err.message}`);
//     }
//   };

//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const getPaginatedData = () => {
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;
//     return data.slice(startIndex, endIndex).map(sale => sale.rowData);
//   };

//   const title = 'Hire History';
//   const invoice = 'hire_history.pdf';

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const handleSaleUpdated = (updatedSale) => {
//     setData(prevData => 
//       prevData.map(item => {
//         if (item.id === updatedSale.sale.salesId) {
//           const newRowData = [...item.rowData];
//           newRowData[1] = new Date(updatedSale.sale.saleDate).toLocaleDateString();
//           newRowData[5] = updatedSale.transaction.totalAmount;
//           newRowData[6] = updatedSale.transaction.paidAmount;
//           newRowData[7] = updatedSale.transaction.due;
//           return { ...item, rowData: newRowData };
//         }
//         return item;
//       })
//     );
//   };

//   const handleEdit = (sale) => {
//     setSelectedSale(sale);
//     setShowEditModal(true);
//   };



//   return (
//     <div className="scrolling-container">
//       <h4>Rent History</h4>
//       <Table
//         data={getPaginatedData()}
//         columns={columns}
//         showButton={false}
//         showDate={true}
//         title={title}
//         invoice={invoice}
//         showActions={false}
//       />
//       <UpdateModal
//       sale={selectedSale}
//       show={showEditModal}
//       onClose={() => {
//         setShowEditModal(false);
//         setSelectedSale(null);
//       }}
//       onSaleUpdated={handleSaleUpdated}
//     />
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

// export default RentHistory;

import React, { useEffect, useState } from 'react';
import Table from '../Table/Table';
import config from '../../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateModal from '../../Models/RentHireUpdate/UpdateModal';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const RentHistory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const rowsPerPage = 25;

  const columns = [
    '#',
    'Sale Date',
    'Customer',
    'Product',
    'Guarantor Name',
    'Total Amount',
    'Paid Amount',
    'Due Amount',
    'Status',
    'Actions',
  ];

  // Define handlers first
  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setShowEditModal(true);
  };

  const handleDelete = async (salesId) => {
    if (!window.confirm("Are you sure you want to delete this sale?")) return;

    try {
      const response = await fetch(`${config.BASE_URL}/salesDelete/${salesId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete sale');
      }

      setData(prevData => prevData.filter(sale => sale.id !== salesId));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSaleUpdated = (updatedSale) => {
    setData(prevData => 
      prevData.map(item => {
        if (item.id === updatedSale.sale.salesId) {
          const newRowData = [...item.rowData];
          newRowData[1] = new Date(updatedSale.sale.saleDate).toLocaleDateString();
          newRowData[5] = updatedSale.transaction.totalAmount;
          newRowData[6] = updatedSale.transaction.paidAmount;
          newRowData[7] = updatedSale.transaction.due;
          return { ...item, rowData: newRowData };
        }
        return item;
      })
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchSalesHistory = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/salesRentGet`);
      if (!response.ok) {
        throw new Error('No Rent History to Show');
      }
      const salesData = await response.json();

      const formattedData = await Promise.all(salesData.map(async (sale, index) => {
        const customerResponse = await fetch(`${config.BASE_URL}/customer/${sale.customerId}`);
        const customerData = await customerResponse.json();
        const customerName = customerData.cusName;

        const productResponse = await fetch(`${config.BASE_URL}/product/${sale.productId}`);
        const productData = await productResponse.json();
        const productName = productData.productName;

        const guarantorResponse = await fetch(`${config.BASE_URL}/guarantor/${sale.guarantorId}`);
        const guarantorData = await guarantorResponse.json();
        const guarantorName = guarantorData.guarantorName;

        return {
          id: sale.salesId,
          rowData: [
            index + 1,
            new Date(sale.saleDate).toLocaleDateString(),
            customerName,
            productName,
            guarantorName,
            sale.Transaction?.totalAmount || 0,
            sale.Transaction?.paidAmount || 0,
            sale.Transaction?.due || 0,
            sale.status,
            <div className="btn-group" role="group">
              <button 
                className="btn btn-warning btn-sm"
                onClick={() => handleEdit(sale)}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(sale.salesId)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ]
        };
      }));

      formattedData.sort((a, b) => new Date(b.rowData[1]) - new Date(a.rowData[1]));
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesHistory();
  }, []);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex).map(sale => sale.rowData);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const title = 'Hire History';
  const invoice = 'hire_history.pdf';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="scrolling-container">
      <h4>Rent History</h4>
      <Table
        data={getPaginatedData()}
        columns={columns}
        showButton={false}
        showDate={true}
        title={title}
        invoice={invoice}
        showActions={false}
      />
      <UpdateModal
        sale={selectedSale}
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedSale(null);
        }}
        onSaleUpdated={handleSaleUpdated}
      />
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RentHistory;