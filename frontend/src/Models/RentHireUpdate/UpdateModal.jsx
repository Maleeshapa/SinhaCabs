// import React, { useState, useEffect } from 'react';
// import { faPen } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import config from '../../config';


// const UpdateModal = ({ sale, show, onClose, onSaleUpdated }) => {
//   const [formData, setFormData] = useState({
//     saleDate: '',
//     price: 0,
//     extraCharges: 0,
//     totalAmount: 0,
//     paidAmount: 0,
//     due: 0
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (sale) {
//       setFormData({
//         saleDate: new Date(sale.saleDate).toISOString().split('T')[0],
//         price: sale.Transaction?.price || 0,
//         extraCharges: sale.Transaction?.extraCharges || 0,
//         totalAmount: sale.Transaction?.totalAmount || 0,
//         paidAmount: sale.Transaction?.paidAmount || 0,
//         due: sale.Transaction?.due || 0
//       });
//     }
//   }, [sale]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const numValue = name !== 'saleDate' ? parseFloat(value) || 0 : value;

//     setFormData(prev => {
//       const newData = { ...prev, [name]: numValue };

//       // Recalculate totals if price, extraCharges, or paidAmount changes
//       if (['price', 'extraCharges', 'paidAmount'].includes(name)) {
//         const newTotalAmount = newData.price + newData.extraCharges;
//         const newDue = newTotalAmount - newData.paidAmount;
        
//         return {
//           ...newData,
//           totalAmount: newTotalAmount,
//           due: newDue
//         };
//       }
      
//       return newData;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${config.BASE_URL}/salesUpdate/${sale.salesId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...sale,
//           saleDate: formData.saleDate,
//           price: formData.price,
//           extraCharges: formData.extraCharges,
//           totalAmount: formData.totalAmount,
//           paidAmount: formData.paidAmount,
//           due: formData.due
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update sale');
//       }

//       const updatedSale = await response.json();
//       onSaleUpdated(updatedSale);
//       onClose();
//     } catch (error) {
//       console.error('Error updating sale:', error);
//       alert('Failed to update sale. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={`modal fade ${show ? 'show' : ''}`} 
//          style={{ display: show ? 'block' : 'none' }}
//          tabIndex="-1">
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Edit Sale Details</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Sale Date</label>
//                 <input
//                   type="date"
//                   name="saleDate"
//                   className="form-control"
//                   value={formData.saleDate}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Hire / Rent Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   className="form-control"
//                   value={formData.price}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Extra Charges</label>
//                 <input
//                   type="number"
//                   name="extraCharges"
//                   className="form-control"
//                   value={formData.extraCharges}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Total Amount</label>
//                 <input
//                   type="number"
//                   name="totalAmount"
//                   className="form-control bg-light"
//                   value={formData.totalAmount}
//                   disabled
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Paid Amount</label>
//                 <input
//                   type="number"
//                   name="paidAmount"
//                   className="form-control"
//                   value={formData.paidAmount}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Due Amount</label>
//                 <input
//                   type="number"
//                   name="due"
//                   className="form-control bg-light"
//                   value={formData.due}
//                   disabled
//                 />
//               </div>

//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={onClose}
//                   disabled={isLoading}
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Updating...' : 'Update Sale'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       {show && <div className="modal-backdrop fade show"></div>}
//     </div>
//   );
// };

// export default UpdateModal;

import React, { useState, useEffect } from 'react';
import config from '../../config';
import './UpdateModal.css';

const UpdateModal = ({ sale, show, onClose, onSaleUpdated }) => {
  const [formData, setFormData] = useState({
    saleDate: '',
    price: 0,
    extraCharges: 0,
    totalAmount: 0,
    paidAmount: 0,
    due: 0
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sale) {
      setFormData({
        saleDate: new Date(sale.saleDate).toISOString().split('T')[0],
        price: sale.Transaction?.price || 0,
        extraCharges: sale.Transaction?.extraCharges || 0,
        totalAmount: sale.Transaction?.totalAmount || 0,
        paidAmount: sale.Transaction?.paidAmount || 0,
        due: sale.Transaction?.due || 0
      });
    }
  }, [sale]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = name !== 'saleDate' ? parseFloat(value) || 0 : value;

    setFormData(prev => {
      const newData = { ...prev, [name]: numValue };

      if (['price', 'extraCharges', 'paidAmount'].includes(name)) {
        const newTotalAmount = newData.price + newData.extraCharges;
        const newDue = newTotalAmount - newData.paidAmount;
        
        return {
          ...newData,
          totalAmount: newTotalAmount,
          due: newDue
        };
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${config.BASE_URL}/salesUpdate/${sale.salesId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sale,
          saleDate: formData.saleDate,
          price: formData.price,
          extraCharges: formData.extraCharges,
          totalAmount: formData.totalAmount,
          paidAmount: formData.paidAmount,
          due: formData.due
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update sale');
      }

      const updatedSale = await response.json();
      onSaleUpdated(updatedSale);
      onClose();
    } catch (error) {
      console.error('Error updating sale:', error);
      alert('Failed to update sale. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Edit Sale Details</h4>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="saleDate">Sale Date</label>
            <input
              type="date"
              id="saleDate"
              name="saleDate"
              value={formData.saleDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Hire / Rent Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="extraCharges">Extra Charges</label>
            <input
              type="number"
              id="extraCharges"
              name="extraCharges"
              value={formData.extraCharges}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount</label>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              disabled
              className="bg-light"
            />
          </div>

          <div className="form-group">
            <label htmlFor="paidAmount">Paid Amount</label>
            <input
              type="number"
              id="paidAmount"
              name="paidAmount"
              value={formData.paidAmount}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="due">Due Amount</label>
            <input
              type="number"
              id="due"
              name="due"
              value={formData.due}
              disabled
              className="bg-light"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-danger"
              onClick={onClose}
              disabled={isLoading}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Sale'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;