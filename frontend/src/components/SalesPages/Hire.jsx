// import React, { useState, useEffect } from "react";
// import './Hire.css';
// import { User, CarFront } from "lucide-react";
// import { Link } from "react-router-dom";
// import CusNicSuggest from './CusNicSuggest';
// import GNicSuggest from './GNicSuggest';
// import config from "../../config";


// const Hire = () => {
//     const [customerData, setCustomerData] = useState({
//         cusId: '',
//         nic: '',
//         license: '',
//         cusName: '',
//         cusAddress: '',
//         cusPhone: ''
//     });

//     const [guarantorData, setGuarantorData] = useState({
//         guarantorId: '',
//         nic: '',
//         guarantorName: '',
//         guarantorPhone: '',
//         guarantorAddress: ''
//     });

//     const [vehicles, setVehicles] = useState([]);
//     const [selectedVehicle, setSelectedVehicle] = useState({
//         productId: '',
//         productName: '',
//         productCode: '',
//         productSellingPrice: ''
//     });

//     const [tableData, setTableData] = useState([]);


//     useEffect(() => {
//         const fetchHireVehicles = async () => {
//             try {
//                 const response = await fetch(`${config.BASE_URL}/products`);
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch vehicles: ${response.status} ${response.statusText}`);
//                 }
//                 const data = await response.json();

//                 const hireVehicles = data.filter(vehicle => vehicle.rentOrHire === 'hire');
//                 setVehicles(hireVehicles);
//             } catch (error) {
//                 console.error('Error fetching hire vehicles:', error);
//             }
//         };

//         fetchHireVehicles();
//     }, []);


//     // Handle customer selection from suggestions
//     const handleSelectCustomer = (customer) => {
//         setCustomerData({
//             cusId: customer.cusId,
//             nic: customer.nic,
//             license: customer.license || '',
//             cusName: customer.cusName || '',
//             cusAddress: customer.cusAddress || '',
//             cusPhone: customer.cusPhone || ''
//         });
//     };

//     const handleSelectGuarantor = (guarantor) => {
//         setGuarantorData({
//             guarantorId: guarantor.guarantorId,
//             nic: guarantor.nic,
//             guarantorName: guarantor.guarantorName || '',
//             guarantorPhone: guarantor.guarantorPhone || '',
//             guarantorAddress: guarantor.guarantorAddress || ''
//         });
//     };

//     const handleVehicleSelect = (e) => {
//         const selectedId = e.target.value;
//         const selected = vehicles.find(vehicle => vehicle.productId === parseInt(selectedId));

//         if (selected) {
//             setSelectedVehicle({
//                 productId: selected.productId,
//                 productName: selected.productName,
//                 productCode: selected.productCode,
//                 productSellingPrice: selected.productSellingPrice
//             });
//         }
//     };

//     const handleAdd = () => {
//         const newRow = {
//             customerName: customerData.cusName,
//             customerNIC: customerData.nic,
//             guarantorName: guarantorData.guarantorName,
//             guarantorNIC: guarantorData.nic,
//             vehicleName: selectedVehicle.productName,
//             numberPlate: selectedVehicle.productCode,
//             hirePrice: selectedVehicle.productSellingPrice
//         };

//         setTableData([...tableData, newRow]);
//     };

//     return (
//         <div className="container-fluid p-5">
//             <div className="row">
//                 <div className="col-md-4 col-sm-12 border-end">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="d-flex align-items-center">
//                             <User className="me-2" /> Customer Details
//                         </h5>
//                         <Link to="/customer/customer-list">
//                             <button className="btn btn-success btn-sm">Create Customer</button>
//                         </Link>
//                     </div>

//                     {/* NIC input with suggestions */}
//                     <CusNicSuggest onSelectCustomer={handleSelectCustomer} />

//                     <input
//                         type="text"
//                         className="form-control mb-2  bg-light"
//                         placeholder="Customer Licence"
//                         value={customerData.license}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2  bg-light"
//                         placeholder="Customer Name"
//                         value={customerData.cusName}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2  bg-light bg-light"
//                         placeholder="Customer Address"
//                         value={customerData.cusAddress}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2  bg-light"
//                         placeholder="Customer Phone"
//                         value={customerData.cusPhone}
//                         readOnly
//                     />
//                 </div>

//                 {/* Guarantor Details */}
//                 <div className="col-md-4 col-sm-12  border-end">
//                     {/* <h5>Guarantor Details</h5> */}


//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="d-flex align-items-center">
//                             <i className="bi bi-person-raised-hand me-2" style={{ fontSize: '20px' }}></i>  Guarantor Details
//                         </h5>
//                         <Link to="/gurantor">
//                             <button className="btn btn-success btn-sm">Create Guarantor</button>
//                         </Link>
//                     </div>


//                     <GNicSuggest onSelectGuarantor={handleSelectGuarantor} />

//                     {/* Other guarantor fields */}
//                     <input
//                         type="text"
//                         className="form-control mb-2 bg-light"
//                         placeholder="Guarantor Name"
//                         value={guarantorData.guarantorName}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2 bg-light"
//                         placeholder="Guarantor Phone"
//                         value={guarantorData.guarantorPhone}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2 bg-light"
//                         placeholder="Guarantor Address"
//                         value={guarantorData.guarantorAddress}
//                         readOnly
//                     />


//                 </div>

//                 {/* Vehicle Details */}
//                 <div className="col-md-4  col-sm-12 ">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="d-flex align-items-center">
//                             <CarFront className="me-2" />Hire Vehicle Details
//                         </h5>
//                         <Link to="/product/hire-vechicle-list">
//                             <button className="btn btn-success btn-sm">Create Hire Vechicle</button>
//                         </Link>
//                     </div>
//                     <select
//                         className="form-control mb-2"
//                         onChange={handleVehicleSelect}
//                         value={selectedVehicle.productId}
//                     >
//                         <option value="">Select Vehicle</option>
//                         {vehicles.map(vehicle => (
//                             <option key={vehicle.productId} value={vehicle.productId}>
//                                 {vehicle.productName}
//                             </option>
//                         ))}
//                     </select>

//                     <input
//                         type="text"
//                         className="form-control mb-2 d-none"
//                         placeholder="Vehicle Name"
//                         value={selectedVehicle.productName}
//                         readOnly
//                     />

//                     <input
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="Number Plate"
//                         value={selectedVehicle.productCode}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="Hire Price"
//                         value={selectedVehicle.productSellingPrice}

//                     />
//                 </div>
//             </div>



//             <div className="d-flex justify-content-end">
//                 <button className="btn btn-primary mt-3" onClick={handleAdd}>Add</button>
//             </div>


//             {/* Table */}
//             <div className="table-responsive mt-3">
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th>Customer Name</th>
//                             <th>Customer NIC</th>
//                             <th>Gurantor Name</th>
//                             <th>Gurantor NIC</th>
//                             <th>Vehicle Name</th>
//                             <th>Number Plate</th>
//                             <th>Hire Price</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tableData.map((row, index) => (
//                             <tr key={index}>
//                                 <td>{row.customerName}</td>
//                                 <td>{row.customerNIC}</td>
//                                 <td>{row.guarantorName}</td>
//                                 <td>{row.guarantorNIC}</td>
//                                 <td>{row.vehicleName}</td>
//                                 <td>{row.numberPlate}</td>
//                                 <td>{row.hirePrice}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Payment Section */}
//             <div className="row mt-3">
//                 <div className="col-md-6">
//                     <label>Cashier</label>
//                     <input type="text" className="form-control mb-2" placeholder="Cashier Name" />
//                 </div>

//                 <div className="col-md-6">
//                     <label>Today's Date</label>
//                     <input type="text" className="form-control mb-2" value={new Date().toLocaleString()} readOnly />
//                 </div>

//             </div>

//             <div className="col-md-6">

//                 <label >Driver select</label>
//                 <select className="form-control mb-2" id="exampleFormControlSelect1">
//                     <option>1</option>
//                     <option>2</option>
//                     <option>3</option>
//                     <option>4</option>
//                     <option>5</option>
//                 </select>

//             </div>


//             <div className="row mt-3">


//                 <div className="col-md-6">
//                     <label>Payable Amount</label>
//                     <input type="text" className="form-control mb-2" placeholder="Payable Amount" />
//                     <button className="btn btn-success me-2 mt-2">Cash</button>
//                     <button className="btn btn-warning me-2 mt-2">Pay Later</button>
//                     <button className="btn btn-info me-2 mt-2">Online Payment</button>
//                 </div>
//                 <div className="col-md-6">
//                     <label>Total Amount</label>
//                     <input type="text" className="form-control mb-2" placeholder="Total Amount" />
//                     <label>Paid Amount</label>
//                     <input type="text" className="form-control mb-2" placeholder="Paid Amount" />
//                     <label>Due</label>
//                     <input type="text" className="form-control mb-2" placeholder="Due" />
//                     <label>Note</label>
//                     <textarea className="form-control mb-2" placeholder="Note"></textarea>
//                 </div>
//             </div>

//             <div className="mt-3 justify-content-end d-flex">
//                 <button className="btn btn-danger me-2">Cancel</button>
//                 <button className="btn btn-primary">Create</button>
//             </div>
//         </div>
//     );
// };

// export default Hire;




//---------------------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import './Hire.css';
// import { User, CarFront } from "lucide-react";
// import { Link } from "react-router-dom";
// import CusNicSuggest from './CusNicSuggest';
// import GNicSuggest from './GNicSuggest';
// import config from "../../config";

// const Hire = () => {
//     const [customerData, setCustomerData] = useState({
//         cusId: '',
//         nic: '',
//         license: '',
//         cusName: '',
//         cusAddress: '',
//         cusPhone: ''
//     });

//     const [guarantorData, setGuarantorData] = useState({
//         guarantorId: '',
//         nic: '',
//         guarantorName: '',
//         guarantorPhone: '',
//         guarantorAddress: ''
//     });

//     const [vehicles, setVehicles] = useState([]);
//     const [selectedVehicle, setSelectedVehicle] = useState({
//         productId: '',
//         productName: '',
//         productCode: '',
//         productSellingPrice: ''
//     });

//     const [tableData, setTableData] = useState([]);
//     const [drivers, setDrivers] = useState([]);
//     const [selectedDriver, setSelectedDriver] = useState('');

//     useEffect(() => {
//         const fetchHireVehicles = async () => {
//             try {
//                 const response = await fetch(`${config.BASE_URL}/products`);
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch vehicles: ${response.status} ${response.statusText}`);
//                 }
//                 const data = await response.json();

//                 const hireVehicles = data.filter(vehicle => vehicle.rentOrHire === 'hire');
//                 setVehicles(hireVehicles);
//             } catch (error) {
//                 console.error('Error fetching hire vehicles:', error);
//             }
//         };

//         const fetchDrivers = async () => {
//             try {
//                 const response = await fetch(`${config.BASE_URL}/getAllDrivers`);
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch drivers: ${response.status} ${response.statusText}`);
//                 }
//                 const data = await response.json();
//                 setDrivers(data);
//             } catch (error) {
//                 console.error('Error fetching drivers:', error);
//             }
//         };

//         fetchHireVehicles();
//         fetchDrivers();
//     }, []);

//     const handleSelectCustomer = (customer) => {
//         setCustomerData({
//             cusId: customer.cusId,
//             nic: customer.nic,
//             license: customer.license || '',
//             cusName: customer.cusName || '',
//             cusAddress: customer.cusAddress || '',
//             cusPhone: customer.cusPhone || ''
//         });
//     };

//     const handleSelectGuarantor = (guarantor) => {
//         setGuarantorData({
//             guarantorId: guarantor.guarantorId,
//             nic: guarantor.nic,
//             guarantorName: guarantor.guarantorName || '',
//             guarantorPhone: guarantor.guarantorPhone || '',
//             guarantorAddress: guarantor.guarantorAddress || ''
//         });
//     };

//     const handleVehicleSelect = (e) => {
//         const selectedId = e.target.value;
//         const selected = vehicles.find(vehicle => vehicle.productId === parseInt(selectedId));

//         if (selected) {
//             setSelectedVehicle({
//                 productId: selected.productId,
//                 productName: selected.productName,
//                 productCode: selected.productCode,
//                 productSellingPrice: selected.productSellingPrice
//             });
//         }
//     };

//     const handleDriverSelect = (e) => {
//         setSelectedDriver(e.target.value);
//     };

//     const handleAdd = () => {
//         const newRow = {
//             customerName: customerData.cusName,
//             customerNIC: customerData.nic,
//             guarantorName: guarantorData.guarantorName,
//             guarantorNIC: guarantorData.nic,
//             vehicleName: selectedVehicle.productName,
//             numberPlate: selectedVehicle.productCode,
//             hirePrice: selectedVehicle.productSellingPrice
//         };

//         setTableData([...tableData, newRow]);
//     };

//     const handleRemoveRow = (index) => {
//         setTableData(tableData.filter((_, i) => i !== index));
//     };


//     const [extraCharges, setExtraCharges] = useState(0);
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [paidAmount, setPaidAmount] = useState(0);


//     const [images, setImages] = useState([]);

//     const handleFileChange = (event) => {
//         setImages(event.target.files);
//     };

//     const [cashierName, setCashierName] = useState('');
//     const [note, setNote] = useState('');
//     const [paymentType, setPaymentType] = useState('');

//     const handleCreate = async () => {
//         try {
//             // Validate required fields
//             if (!customerData.cusId || !guarantorData.guarantorId || !selectedVehicle.productId) {
//                 alert('Please fill in all required fields');
//                 return;
//             }

//             const totalAmount = Number(selectedVehicle.productSellingPrice) + Number(extraCharges);

//             const saleData = {
//                 customerId: customerData.cusId,
//                 guarantorId: guarantorData.guarantorId,
//                 productId: selectedVehicle.productId,
//                 saleDate: new Date().toISOString(),
//                 cashierName,
//                 driverId: selectedDriver,
//                 note,
//                 // Transaction data
//                 price: Number(selectedVehicle.productSellingPrice),
//                 extraCharges: Number(extraCharges),
//                 totalAmount,
//                 paymentType,
//                 paidAmount: Number(paidAmount),
//                 due: Math.max(0, totalAmount - Number(paidAmount))
//             };

//             const response = await fetch(`${config.BASE_URL}/salesCreate`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(saleData)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create Hire');
//             }

//             const result = await response.json();
//             alert('Hire is Done!');

//             // Reset form
//             setCustomerData({
//                 cusId: '',
//                 nic: '',
//                 license: '',
//                 cusName: '',
//                 cusAddress: '',
//                 cusPhone: ''
//             });
//             setGuarantorData({
//                 guarantorId: '',
//                 nic: '',
//                 guarantorName: '',
//                 guarantorPhone: '',
//                 guarantorAddress: ''
//             });
//             setSelectedVehicle({
//                 productId: '',
//                 productName: '',
//                 productCode: '',
//                 productSellingPrice: ''
//             });
//             setSelectedDriver('');
//             setCashierName('');
//             setNote('');
//             setPaymentType('');
//             setPaidAmount(0);
//             setExtraCharges(0);
//             setTableData([]);
//         } catch (error) {
//             console.error('Error creating hire:', error);
//             alert('Failed to create hire. Please try again.');
//         }
//     };

//     return (
//         <div className="container-fluid p-5">
//             <div className="row">
//                 <div className="col-md-4 col-sm-12 border-end">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="d-flex align-items-center">
//                             <User className="me-2" /> Customer Details
//                         </h5>
//                         <Link to="/customer/customer-list">
//                             <button className="btn btn-success btn-sm">Create Customer</button>
//                         </Link>
//                     </div>

//                     <CusNicSuggest onSelectCustomer={handleSelectCustomer} />

//                     <input
//                         type="text"
//                         className="form-control mb-2  bg-light"
//                         placeholder="Customer Licence"
//                         value={customerData.license}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2  bg-light"
//                         placeholder="Customer Name"
//                         value={customerData.cusName}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2  bg-light bg-light"
//                         placeholder="Customer Address"
//                         value={customerData.cusAddress}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2  bg-light"
//                         placeholder="Customer Phone"
//                         value={customerData.cusPhone}
//                         readOnly
//                     />
//                 </div>

//                 <div className="col-md-4 col-sm-12  border-end">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="d-flex align-items-center">
//                             <i className="bi bi-person-raised-hand me-2" style={{ fontSize: '20px' }}></i>  Guarantor Details
//                         </h5>
//                         <Link to="/gurantor">
//                             <button className="btn btn-success btn-sm">Create Guarantor</button>
//                         </Link>
//                     </div>

//                     <GNicSuggest onSelectGuarantor={handleSelectGuarantor} />

//                     <input
//                         type="text"
//                         className="form-control mb-2 bg-light"
//                         placeholder="Guarantor Name"
//                         value={guarantorData.guarantorName}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2 bg-light"
//                         placeholder="Guarantor Phone"
//                         value={guarantorData.guarantorPhone}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2 bg-light"
//                         placeholder="Guarantor Address"
//                         value={guarantorData.guarantorAddress}
//                         readOnly
//                     />
//                 </div>

//                 <div className="col-md-4  col-sm-12 ">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <h5 className="d-flex align-items-center">
//                             <CarFront className="me-2" />Hire Vehicle Details
//                         </h5>
//                         <Link to="/product/hire-vechicle-list">
//                             <button className="btn btn-success btn-sm">Create Hire Vechicle</button>
//                         </Link>
//                     </div>
//                     <select
//                         className="form-control mb-2"
//                         onChange={handleVehicleSelect}
//                         value={selectedVehicle.productId}
//                     >
//                         <option value="">Select Vehicle</option>
//                         {vehicles.map(vehicle => (
//                             <option key={vehicle.productId} value={vehicle.productId}>
//                                 {vehicle.productName}
//                             </option>
//                         ))}
//                     </select>

//                     <input
//                         type="text"
//                         className="form-control mb-2 d-none"
//                         placeholder="Vehicle Name"
//                         value={selectedVehicle.productName}
//                         readOnly
//                     />

//                     <input
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="Number Plate"
//                         value={selectedVehicle.productCode}
//                         readOnly
//                     />
//                     <input
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="Hire Price"
//                         value={selectedVehicle.productSellingPrice}
//                         onChange={(e) =>
//                             setSelectedVehicle({ ...selectedVehicle, productSellingPrice: e.target.value })
//                         }
//                     />

//                 </div>
//             </div>

//             <div className="d-flex justify-content-end">
//                 <button className="btn btn-primary mt-3" onClick={handleAdd}>Add</button>
//             </div>

//             <div className="table-responsive mt-3">
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th>Customer Name</th>
//                             <th>Customer NIC</th>
//                             <th>Guarantor Name</th>
//                             <th>Guarantor NIC</th>
//                             <th>Vehicle Name</th>
//                             <th>Number Plate</th>
//                             <th>Hire Price</th>
//                             <th>Action</th> {/* New Action Column */}
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {tableData.map((row, index) => (
//                             <tr key={index}>
//                                 <td>{row.customerName}</td>
//                                 <td>{row.customerNIC}</td>
//                                 <td>{row.guarantorName}</td>
//                                 <td>{row.guarantorNIC}</td>
//                                 <td>{row.vehicleName}</td>
//                                 <td>{row.numberPlate}</td>
//                                 <td>{row.hirePrice}</td>
//                                 <td>
//                                     <button
//                                         className="btn btn-danger btn-sm p-2"
//                                         onClick={() => handleRemoveRow(index)}
//                                     >
//                                         -
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             </div>

//             <div className="row mt-3">
//                 {/* Left Section */}
//                 <div className="col-md-6">
//                     <label>Today's Date</label>
//                     <input type="text" className="form-control mb-2" value={new Date().toLocaleString()} readOnly />

//                     <label>Cashier</label>
//                     <input
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="Cashier Name"
//                         value={cashierName}
//                         onChange={(e) => setCashierName(e.target.value)}
//                     />

//                     <label>Driver Select</label>
//                     <select className="form-control mb-2" onChange={handleDriverSelect} value={selectedDriver}>
//                         <option value="">Select Driver</option>
//                         {drivers.map(driver => (
//                             <option key={driver.id} value={driver.id}>
//                                 {driver.driverName} - {driver.driverNic}
//                             </option>
//                         ))}
//                     </select>


//                     <label>Upload Images</label>
//                     <input
//                         type="file"
//                         className="form-control mb-2"
//                         multiple
//                         accept="image/*"

//                     />

//                     {/* Display Selected Files */}
//                     {/* {selectedFiles.length > 0 && (
//                         <div className="mt-2">
//                             <strong>Selected Files:</strong>
//                             <ul className="list-unstyled">
//                                 {selectedFiles.map((file, index) => (
//                                     <li key={index}>{file.name}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )} */}
//                 </div>

//                 {/* Right Section */}
//                 <div className="col-md-6">
//                     <label>Hire Price</label>
//                     <input
//                         type="number"
//                         className="form-control mb-2"
//                         value={selectedVehicle.productSellingPrice}
//                         onChange={(e) => setSelectedVehicle({ ...selectedVehicle, productSellingPrice: e.target.value })}
//                     />

//                     <label>Extra Charges</label>
//                     <input
//                         type="number"
//                         className="form-control mb-2"
//                         value={extraCharges}
//                         onChange={(e) => setExtraCharges(e.target.value)}
//                     />

//                     <label>Total Amount</label>
//                     <input
//                         type="number"
//                         className="form-control mb-2"
//                         value={Number(selectedVehicle.productSellingPrice) + Number(extraCharges)}
//                         readOnly
//                     />

//                     {/* <div className="d-flex gap-2 mt-2">
//                         <button
//                             className={`btn ${paymentType === 'cash' ? 'btn-success active' : 'btn-outline-success'}`}
//                             onClick={() => setPaymentType('cash')}
//                         >
//                             Cash
//                         </button>
//                         <button
//                             className={`btn ${paymentType === 'pay_later' ? 'btn-warning active' : 'btn-outline-warning'}`}
//                             onClick={() => setPaymentType('pay_later')}
//                         >
//                             Pay Later
//                         </button>
//                         <button
//                             className={`btn ${paymentType === 'online' ? 'btn-info active' : 'btn-outline-info'}`}
//                             onClick={() => setPaymentType('online')}
//                         >
//                             Online Payment
//                         </button>
//                     </div>

//                     {paymentMethod && (
//                         <>
//                             <label className="mt-2">Paid Amount</label>
//                             <input
//                                 type="number"
//                                 className="form-control mb-2"
//                                 value={paidAmount}
//                                 onChange={(e) => setPaidAmount(e.target.value)}
//                             />

//                             <label>Due</label>
//                             <input
//                                 type="number"
//                                 className="form-control mb-2"
//                                 value={Math.max(0, (Number(selectedVehicle.productSellingPrice) + Number(extraCharges)) - Number(paidAmount))}
//                                 readOnly
//                             />
//                         </>
//                     )} */}


// <div className="d-flex gap-2 mt-2">
//     <button
//         className={`btn ${paymentType === 'cash' ? 'btn-dark' : 'btn-secondary'}`}
//         onClick={() => setPaymentType('cash')}
//     >
//         Cash
//     </button>
//     <button
//         className={`btn ${paymentType === 'pay_later' ? 'btn-dark' : 'btn-secondary'}`}
//         onClick={() => setPaymentType('pay_later')}
//     >
//         Pay Later
//     </button>
//     <button
//         className={`btn ${paymentType === 'online' ? 'btn-dark' : 'btn-secondary' }`}
//         onClick={() => setPaymentType('online')}
//     >
//         Online Payment
//     </button>
// </div>

// {paymentType && (
//     <>
//         <label className="mt-2">Paid Amount</label>
//         <input
//             type="number"
//             className="form-control mb-2"
//             value={paidAmount}
//             onChange={(e) => setPaidAmount(e.target.value)}
//         />

//         {/* <label>Extra Charges</label>
//         <input
//             type="number"
//             className="form-control mb-2"
//             value={extraCharges}
//             onChange={(e) => setExtraCharges(e.target.value)}
//         /> */}

//         <label>Due</label>
//         <input
//             type="number"
//             className="form-control mb-2"
//             value={Math.max(0, (Number(selectedVehicle.productSellingPrice) + Number(extraCharges)) - Number(paidAmount))}
//             readOnly
//         />
//     </>
// )}

//                     <label>Note</label>
//                     <textarea
//                         className="form-control mb-2"
//                         placeholder="Note"
//                         value={note}
//                         onChange={(e) => setNote(e.target.value)}
//                     ></textarea>

//                 </div>
//             </div>


//             <div className="mt-3 justify-content-end d-flex">
//                 <button className="btn btn-danger me-2">Cancel</button>
//                 <button className="btn btn-primary" onClick={handleCreate}>Create</button>
//             </div>
//         </div>
//     );
// };

// export default Hire;

import React, { useState, useEffect, useCallback } from "react";
import './Hire.css';
import { User, CarFront } from "lucide-react";
import { Link } from "react-router-dom";
import CusNicSuggest from './CusNicSuggest';
import GNicSuggest from './GNicSuggest';
import config from "../../config";

const Hire = ({ onSubmit }) => {
    const [customerData, setCustomerData] = useState({
        cusId: '',
        nic: '',
        license: '',
        cusName: '',
        cusAddress: '',
        cusPhone: ''
    });

    const [guarantorData, setGuarantorData] = useState({
        guarantorId: '',
        nic: '',
        guarantorName: '',
        guarantorPhone: '',
        guarantorAddress: ''
    });

    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState({
        productId: '',
        productName: '',
        productCode: '',
        productSellingPrice: ''
    });

    const [tableData, setTableData] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');

    const [extraCharges, setExtraCharges] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paidAmount, setPaidAmount] = useState(0);
    const [cashierName, setCashierName] = useState('');
    const [note, setNote] = useState('');
    const [paymentType, setPaymentType] = useState('');

    useEffect(() => {
        const fetchHireVehicles = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/products`);
                if (!response.ok) throw new Error(`Failed to fetch vehicles: ${response.status} ${response.statusText}`);
                const data = await response.json();
                setVehicles(data.filter(vehicle => vehicle.rentOrHire === 'hire'));
            } catch (error) {
                console.error('Error fetching hire vehicles:', error);
            }
        };

        const fetchDrivers = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/getAllDrivers`);
                if (!response.ok) throw new Error(`Failed to fetch drivers: ${response.status} ${response.statusText}`);
                const data = await response.json();
                setDrivers(data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchHireVehicles();
        fetchDrivers();
    }, []);

    const handleSelectCustomer = useCallback((customer) => {
        setCustomerData({
            cusId: customer.cusId,
            nic: customer.nic,
            license: customer.license || '',
            cusName: customer.cusName || '',
            cusAddress: customer.cusAddress || '',
            cusPhone: customer.cusPhone || ''
        });
    }, []);

    const handleSelectGuarantor = useCallback((guarantor) => {
        setGuarantorData({
            guarantorId: guarantor.guarantorId,
            nic: guarantor.nic,
            guarantorName: guarantor.guarantorName || '',
            guarantorPhone: guarantor.guarantorPhone || '',
            guarantorAddress: guarantor.guarantorAddress || ''
        });
    }, []);

    const handleVehicleSelect = useCallback((e) => {
        const selectedId = e.target.value;
        const selected = vehicles.find(vehicle => vehicle.productId === parseInt(selectedId));
        if (selected) {
            setSelectedVehicle({
                productId: selected.productId,
                productName: selected.productName,
                productCode: selected.productCode,
                productSellingPrice: selected.productSellingPrice
            });
        }
    }, [vehicles]);

    const handleDriverSelect = useCallback((e) => {
        setSelectedDriver(e.target.value);
    }, []);

    const handleAdd = useCallback(() => {
        const newRow = {
            customerName: customerData.cusName,
            customerNIC: customerData.nic,
            guarantorName: guarantorData.guarantorName,
            guarantorNIC: guarantorData.nic,
            vehicleName: selectedVehicle.productName,
            numberPlate: selectedVehicle.productCode,
            hirePrice: selectedVehicle.productSellingPrice
        };
        setTableData([...tableData, newRow]);
    }, [customerData, guarantorData, selectedVehicle, tableData]);

    const handleRemoveRow = useCallback((index) => {
        setTableData(tableData.filter((_, i) => i !== index));
    }, [tableData]);

    // const handleCreate = async () => {
    //     try {
    //         if (!customerData.cusId || !guarantorData.guarantorId || !selectedVehicle.productId) {
    //             alert('Please fill in all required fields');
    //             return;
    //         }

    //         const totalAmount = Number(selectedVehicle.productSellingPrice) + Number(extraCharges);

    //         const saleData = {
    //             customerId: customerData.cusId,
    //             guarantorId: guarantorData.guarantorId,
    //             productId: selectedVehicle.productId,
    //             saleDate: new Date().toISOString(),
    //             cashierName,
    //             driverId: selectedDriver,
    //             note,
    //             price: Number(selectedVehicle.productSellingPrice),
    //             extraCharges: Number(extraCharges),
    //             totalAmount,
    //             paymentType,
    //             paidAmount: Number(paidAmount),
    //             due: Math.max(0, totalAmount - Number(paidAmount))
    //         };

    //         const response = await fetch(`${config.BASE_URL}/salesCreate`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(saleData)
    //         });

    //         if (!response.ok) throw new Error('Failed to create Hire');

    //         const result = await response.json();
    //         alert('Hire is Done!');

    //         // Reset form
    //         setCustomerData({ cusId: '', nic: '', license: '', cusName: '', cusAddress: '', cusPhone: '' });
    //         setGuarantorData({ guarantorId: '', nic: '', guarantorName: '', guarantorPhone: '', guarantorAddress: '' });
    //         setSelectedVehicle({ productId: '', productName: '', productCode: '', productSellingPrice: '' });
    //         setSelectedDriver('');
    //         setCashierName('');
    //         setNote('');
    //         setPaymentType('');
    //         setPaidAmount(0);
    //         setExtraCharges(0);
    //         setTableData([]);
    //     } catch (error) {
    //         console.error('Error creating hire:', error);
    //         alert(`Failed to create hire: ${error.message}`);
    //     }
    // };

    const handleCreate = async () => {
        try {

            if (!customerData.cusId) {
                alert('Please select a customer');
                return;
            }
            if (!guarantorData.guarantorId) {
                alert('Please select a guarantor');
                return;
            }
            if (!selectedVehicle.productId) {
                alert('Please select a vehicle');
                return;
            }


            const totalAmount = Number(selectedVehicle.productSellingPrice) + Number(extraCharges);

            const saleData = {
                customerId: customerData.cusId,
                guarantorId: guarantorData.guarantorId,
                productId: selectedVehicle.productId,
                saleDate: new Date().toISOString(),
                cashierName,
                driverId: selectedDriver || null,
                note,
                price: Number(selectedVehicle.productSellingPrice),
                extraCharges: Number(extraCharges),
                totalAmount,
                paymentType,
                paidAmount: Number(paidAmount),
                due: Math.max(0, totalAmount - Number(paidAmount))
            };

            const response = await fetch(`${config.BASE_URL}/salesCreate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saleData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create Hire');
            }

            const result = await response.json();
            alert('Hire is Done!');
            setCustomerData({ cusId: '', nic: '', license: '', cusName: '', cusAddress: '', cusPhone: '' });
            setGuarantorData({ guarantorId: '', nic: '', guarantorName: '', guarantorPhone: '', guarantorAddress: '' });
            setSelectedVehicle({ productId: '', productName: '', productCode: '', productSellingPrice: '' });
            setSelectedDriver('');
            setCashierName('');
            setNote('');
            setPaymentType('');
            setPaidAmount(0);
            setExtraCharges(0);
            setTableData([]);
        } catch (error) {
            console.error('Error creating hire:', error);
            alert(`Failed to create hire: ${error.message}`);
        }
    };

    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-md-4 col-sm-12 border-end">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="d-flex align-items-center">
                            <User className="me-2" /> Customer Details
                        </h5>
                        <Link to="/customer/customer-list">
                            <button className="btn btn-success btn-sm">+ New Customer</button>
                        </Link>
                    </div>

                    <CusNicSuggest onSelectCustomer={handleSelectCustomer} />

                    <input
                        type="text"
                        className="form-control mb-2  bg-light"
                        placeholder="Customer Licence"
                        value={customerData.license}
                        readOnly
                    />
                    <input
                        type="text"
                        className="form-control mb-2  bg-light"
                        placeholder="Customer Name"
                        value={customerData.cusName}
                        readOnly
                    />
                    <input
                        type="text"
                        className="form-control mb-2  bg-light bg-light"
                        placeholder="Customer Address"
                        value={customerData.cusAddress}
                        readOnly
                    />
                    <input
                        type="text"
                        className="form-control mb-2  bg-light"
                        placeholder="Customer Phone"
                        value={customerData.cusPhone}
                        readOnly
                    />
                </div>

                <div className="col-md-4 col-sm-12  border-end">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="d-flex align-items-center">
                            <i className="bi bi-person-raised-hand me-2" style={{ fontSize: '20px' }}></i>  Guarantor Details
                        </h5>
                        <Link to="/gurantor">
                            <button className="btn btn-success btn-sm">+ New Guarantor</button>
                        </Link>
                    </div>

                    <GNicSuggest onSelectGuarantor={handleSelectGuarantor} />

                    <input
                        type="text"
                        className="form-control mb-2 bg-light"
                        placeholder="Guarantor Name"
                        value={guarantorData.guarantorName}
                        readOnly
                    />
                    <input
                        type="text"
                        className="form-control mb-2 bg-light"
                        placeholder="Guarantor Phone"
                        value={guarantorData.guarantorPhone}
                        readOnly
                    />
                    <input
                        type="text"
                        className="form-control mb-2 bg-light"
                        placeholder="Guarantor Address"
                        value={guarantorData.guarantorAddress}
                        readOnly
                    />
                </div>

                <div className="col-md-4  col-sm-12 ">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="d-flex align-items-center">
                            <CarFront className="me-2" />Hire Vehicle Details
                        </h5>
                        <Link to="/product/hire-vechicle-list">
                            <button className="btn btn-success btn-sm">+ New Hire Vechicle</button>
                        </Link>
                    </div>
                    <select
                        className="form-control mb-2"
                        onChange={handleVehicleSelect}
                        value={selectedVehicle.productId}
                    >
                        <option value="">Select Vehicle</option>
                        {vehicles.map(vehicle => (
                            <option key={vehicle.productId} value={vehicle.productId}>
                                {vehicle.productName}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        className="form-control mb-2 d-none"
                        placeholder="Vehicle Name"
                        value={selectedVehicle.productName}
                        readOnly
                    />

                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Number Plate"
                        value={selectedVehicle.productCode}
                        readOnly
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Hire Price"
                        value={selectedVehicle.productSellingPrice}
                        onChange={(e) =>
                            setSelectedVehicle({ ...selectedVehicle, productSellingPrice: e.target.value })
                        }
                    />

                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-primary mt-3" onClick={handleAdd}>Add</button>
            </div>

            <div className="table-responsive mt-3">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Customer NIC</th>
                            <th>Guarantor Name</th>
                            <th>Guarantor NIC</th>
                            <th>Vehicle Name</th>
                            <th>Number Plate</th>
                            <th>Hire Price</th>
                            <th>Action</th> {/* New Action Column */}
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.customerName}</td>
                                <td>{row.customerNIC}</td>
                                <td>{row.guarantorName}</td>
                                <td>{row.guarantorNIC}</td>
                                <td>{row.vehicleName}</td>
                                <td>{row.numberPlate}</td>
                                <td>{row.hirePrice}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm p-2"
                                        onClick={() => handleRemoveRow(index)}
                                    >
                                        -
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <div className="row mt-3">
                {/* Left Section */}
                <div className="col-md-6">
                    <label>Today's Date</label>
                    <input type="text" className="form-control mb-2" value={new Date().toLocaleString()} readOnly />

                    <label>Cashier</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Cashier Name"
                        value={cashierName}
                        onChange={(e) => setCashierName(e.target.value)}
                    />

                    <label>Driver Select</label>
                    <select className="form-control mb-2" onChange={handleDriverSelect} value={selectedDriver}>
                        <option value="">Select Driver</option>
                        {drivers.map(driver => (
                            <option key={driver.id} value={driver.id}>
                                {driver.driverName} - {driver.driverNic}
                            </option>
                        ))}
                    </select>


                    <label>Upload Images</label>
                    <input
                        type="file"
                        className="form-control mb-2"
                        multiple
                        accept="image/*"

                    />

                    {/* Display Selected Files */}
                    {/* {selectedFiles.length > 0 && (
                                <div className="mt-2">
                                    <strong>Selected Files:</strong>
                                    <ul className="list-unstyled">
                                        {selectedFiles.map((file, index) => (
                                            <li key={index}>{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )} */}
                </div>

                {/* Right Section */}
                <div className="col-md-6">
                    <label>Hire Price</label>
                    <input
                        type="number"
                        className="form-control mb-2"
                        value={selectedVehicle.productSellingPrice}
                        onChange={(e) => setSelectedVehicle({ ...selectedVehicle, productSellingPrice: e.target.value })}
                    />

                    <label>Extra Charges</label>
                    <input
                        type="number"
                        className="form-control mb-2"
                        value={extraCharges}
                        onChange={(e) => setExtraCharges(e.target.value)}
                    />

                    <label>Total Amount</label>
                    <input
                        type="number"
                        className="form-control mb-2"
                        value={Number(selectedVehicle.productSellingPrice) + Number(extraCharges)}
                        readOnly
                    />

                    {/* <div className="d-flex gap-2 mt-2">
                                <button
                                    className={`btn ${paymentType === 'cash' ? 'btn-success active' : 'btn-outline-success'}`}
                                    onClick={() => setPaymentType('cash')}
                                >
                                    Cash
                                </button>
                                <button
                                    className={`btn ${paymentType === 'pay_later' ? 'btn-warning active' : 'btn-outline-warning'}`}
                                    onClick={() => setPaymentType('pay_later')}
                                >
                                    Pay Later
                                </button>
                                <button
                                    className={`btn ${paymentType === 'online' ? 'btn-info active' : 'btn-outline-info'}`}
                                    onClick={() => setPaymentType('online')}
                                >
                                    Online Payment
                                </button>
                            </div>
        
                            {paymentMethod && (
                                <>
                                    <label className="mt-2">Paid Amount</label>
                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        value={paidAmount}
                                        onChange={(e) => setPaidAmount(e.target.value)}
                                    />
        
                                    <label>Due</label>
                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        value={Math.max(0, (Number(selectedVehicle.productSellingPrice) + Number(extraCharges)) - Number(paidAmount))}
                                        readOnly
                                    />
                                </>
                            )} */}


                    {/* <div className="d-flex gap-2 mt-2">
            <button
                className={`btn ${paymentType === 'cash' ? 'btn-dark' : 'btn-secondary'}`}
                onClick={() => setPaymentType('cash')}
            >
                Cash
            </button>
            <button
                className={`btn ${paymentType === 'pay_later' ? 'btn-dark' : 'btn-secondary'}`}
                onClick={() => setPaymentType('pay_later')}
            >
                Pay Later
            </button>
            <button
                className={`btn ${paymentType === 'online' ? 'btn-dark' : 'btn-secondary' }`}
                onClick={() => setPaymentType('online')}
            >
                Online Payment
            </button>
        </div> */}

                    <div className="d-flex gap-2 mt-2">
                        <button
                            className={`btn ${paymentType === 'cash' ? 'btn-dark' : 'btn-secondary'}`}
                            onClick={() => setPaymentType('cash')}
                        >
                            Cash
                        </button>
                        <button
                            className={`btn ${paymentType === 'pay_later' ? 'btn-dark' : 'btn-secondary'}`}
                            onClick={() => setPaymentType('pay_later')}
                        >
                            Pay Later
                        </button>
                        <button
                            className={`btn ${paymentType === 'online' ? 'btn-dark' : 'btn-secondary'}`}
                            onClick={() => setPaymentType('online')}
                        >
                            Online Payment
                        </button>
                    </div>

                    {paymentType && (
                        <>
                            <label className="mt-2">Paid Amount</label>
                            <input
                                type="number"
                                className="form-control mb-2"
                                value={paidAmount}
                                onChange={(e) => setPaidAmount(e.target.value)}
                            />

                            {/* <label>Extra Charges</label>
                <input
                    type="number"
                    className="form-control mb-2"
                    value={extraCharges}
                    onChange={(e) => setExtraCharges(e.target.value)}
                /> */}

                            <label>Due</label>
                            <input
                                type="number"
                                className="form-control mb-2"
                                value={Math.max(0, (Number(selectedVehicle.productSellingPrice) + Number(extraCharges)) - Number(paidAmount))}
                                readOnly
                            />
                        </>
                    )}

                    <label>Note</label>
                    <textarea
                        className="form-control mb-2"
                        placeholder="Note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>

                </div>
            </div>


            <div className="mt-3 justify-content-end d-flex">
                <button className="btn btn-danger me-2">Cancel</button>
                {/* <button className="btn btn-primary" onClick={handleCreate} >Create</button> */}

                <button
    className="btn btn-primary me-2"
    disabled={!paymentType}
    onClick={handleCreate}
>
    Create
</button>
            </div>
        </div>
    );
};

export default Hire;