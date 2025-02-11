const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./dbConfig");
const path = require('path');
const multer = require('multer');
const fs = require('fs');

//Controllers
// const SupplierController = require("./controller/SupplerController");
const UserController = require("./controller/UserController");
const CategoryController = require("./controller/CategoryController");
const ProductController = require("./controller/ProductController");
// const InvoiceController = require("./controller/InvoiceController");
// const TransactionController = require("./controller/TransactionController");
const StoreController = require("./controller/StoreController");
// const ReturnController = require("./controller/ReturnController");
// const ReturnProductController = require("./controller/ReturnProductController");
const ExpenseController = require("./controller/ExpensesController");
const ExpensesCatController = require("./controller/ExpensesCatController");
const ReportController = require("./controller/Reports/ReportController");
const ProductNStockController = require("./controller/Reports/ProductStockController");
const InvoiceProductController = require('./controller/InvoiceProduct');
const CustomerController = require('./controller/CustomerController');
// const DeliveryNoteController = require('./controller/DeliveryNoteController');
const ChequeController = require('./controller/ChequeController');
const Transaction = require("./model/Transaction");
const DueCustomerController = require("./controller/DueCustomerController");
// const SupplierPaymentController = require("./controller/SupplierPaymentController");

const SwitchController = require('./controller/SwitchController');

const DueCustomer = require("./model/DueCustomer");
const DueController = require("./controller/DueController");
const GuarantorController = require("./controller/GuarantorController");

const DriverController = require("./controller/DriverController");

const SalesController = require("./controller/SalesController");
 

const app = express();
const PORT = process.env.PORT;




// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads', 'purchase-orders')));

app.use(express.static(path.join(__dirname, 'build')));
//user routes
app.post("/user", UserController.createUser);
app.get("/users", UserController.getAllUsers);
app.get("/user/:id", UserController.getUserById);
app.get('/user/name/:name', UserController.getUserByName);
app.put("/user/:id", UserController.updateUser);
app.delete("/user/:id", UserController.deleteUser);
app.post("/userLogin", UserController.userLogin);



//category routes
app.post("/category", CategoryController.createCategory);
app.get("/categories", CategoryController.getAllCategories);
app.get("/category/:id", CategoryController.getCategoryById);
app.put("/category/:id", CategoryController.updateCategory);
app.delete("/category/:id", CategoryController.deleteCustomer);
app.get("/category/name/:name", CategoryController.getNameCategories);

//customer routes
app.post('/customer', CustomerController.createCustomer);
app.get('/customers', CustomerController.getAllCustomers);
app.get('/customer/:id', CustomerController.getCustomerById);
app.put('/customer/:id', CustomerController.updateCustomer);
app.delete('/customer/:id', CustomerController.deleteCustomer);
app.get("/customer/cusCode/:code", CustomerController.getCustomerByCode);
app.get("/customer/cusName/:name", CustomerController.getCustomerByName);
app.get('/customers/suggestions', CustomerController.getCustomerSuggestions);
app.get('/customers/suggestion', CustomerController.getCustomerSuggestion);
app.get("/customer/nic/:nic", CustomerController.getCustomerByNIC);
app.get("/customer/nic-suggestions/:query", CustomerController.getNICsuggestions);


//product routes
app.post("/product", ProductController.createProduct);
app.get("/products", ProductController.getAllProducts);
app.get("/product/:id", ProductController.getProductById);
app.put("/product/:id", ProductController.updateProduct);
app.delete("/product/:id", ProductController.deleteProduct);
app.get("/product/productName/:name", ProductController.getProductByName);
app.get('/product/codeOrName/:value', ProductController.getProductByCodeOrName);
app.get('/products/suggestions', ProductController.getProductSuggestions);
app.get('/product/image/:productCode', ProductController.getProductImageByCode);



//guarantor routes
app.post("/guarantor", GuarantorController.createGuarantor);
app.get("/guarantors", GuarantorController.getAllGuarantors);
app.get("/guarantor/:id", GuarantorController.getGurantorById);
app.put('/guarantors/:id', GuarantorController.updateGuarantor);
app.delete('/guarantors/:id', GuarantorController.deleteGuarantor);
app.get("/guarantors/suggestions/:name", GuarantorController.getGurantorSuggestions);
app.get("/guarantors/nic-suggestions/:query", GuarantorController.getGurantorNICsuggestions);



app.post("/salesCreate", SalesController.createSale);
app.post("/hireCreate", SalesController.hireCreate);
app.get("/salesGet", SalesController.getAllSales);
app.get("/salesHireGet", SalesController.getAllSalesHire);
app.get("/salesRentGet", SalesController.getAllSalesRent);
app.get('/salesGet/:id', SalesController.getSaleById);
app.put('/salesUpdate/:id', SalesController.updateSale);
app.delete('/salesDelete/:id', SalesController.deleteSale);


//store routes
app.post("/store", StoreController.createStore);
app.get("/stores", StoreController.getAllStores);
app.get("/store/:id", StoreController.getStoreById);
app.put("/store/:id", StoreController.updateStore);
app.delete("/store/:id", StoreController.deleteStore);



//expenses routes
app.post("/expense", ExpenseController.createExpense);
app.get("/expenses", ExpenseController.getAllExpenses);
app.get("/expense/:id", ExpenseController.getExpenseById);
app.put("/expense/:id", ExpenseController.updateExpense);
app.delete("/expense/:id", ExpenseController.deleteExpense);

//expenses category routes
app.post("/expensesCat", ExpensesCatController.createExpensesCategory);
app.get("/expensesCats", ExpensesCatController.getAllExpensesCats);
app.get("/expensesCat/:id", ExpensesCatController.getExpensesCatById);
app.put("/expensesCat/:id", ExpensesCatController.updateExpensesCat);
app.delete("/expensesCat/:id", ExpensesCatController.deleteExpensesCat);

app.get("/getDriver", DriverController.getDriverSuggestions);
app.get("/getDriverId/:id", DriverController.getDriverById);
app.get("/getAllDrivers", DriverController.getAllDrivers);

//get reports
// app.get("/getReports", ReportController.getReports);
// app.get("/productStock", ProductNStockController.getStockReports);


// status endpoint
app.get('/api/switch', SwitchController.getStatus);
app.post('/api/switch', SwitchController.updateStatus);

sequelize
    .sync()
    .then(() => {
        console.log("Database synchronized");
    })
    .catch((err) => {
        console.error("Error synchronizing database:", err);
    });


    

app.get('/download/invoice/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', 'invoice', filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath, filename, (err) => {
            if (err) {
                res.status(500).json({ error: "Error downloading the file" });
            }
        });
    } else {
        res.status(404).json({ error: "File not found" });
    }
});



// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});