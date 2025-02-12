// const { Sales, Transaction } = require('../model/Sales');
// const sequelize = require('../dbConfig');

// const createSale = async (req, res) => {
//     const t = await sequelize.transaction();

//     try {
//         const {
//             customerId, guarantorId, productId, saleDate, cashierName,
//             driverId, note, price, extraCharges, totalAmount,
//             paymentType, paidAmount, due
//         } = req.body;

//         // Create sale record
//         const sale = await Sales.create({
//             customerId,
//             guarantorId,
//             productId,
//             saleDate,
//             cashierName,
//             driverId,
//             paymentStatus: 'pending',
//             status: 'hire',
//             note
//         }, { transaction: t });

//          const transaction = await Transaction.create({
//             salesId: sale.salesId,
//             price,
//             extraCharges,
//             totalAmount,
//             paymentType,
//             paidAmount,
//             due
//         }, { transaction: t });

        
//         await sale.update({
//             transactionId: transaction.transactionId
//         }, { transaction: t });

//         await t.commit();
//         res.status(201).json({ sale, transaction });
//     } catch (error) {
//         await t.rollback();
//         res.status(500).json({ error: error.message });
//     }
// };

// const getAllSales = async (req, res) => {
//     try {
//         const sales = await Sales.findAll({
//             include: [Transaction]
//         });
//         res.status(200).json(sales);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const getSaleById = async (req, res) => {
//     try {
//         const sale = await Sales.findByPk(req.params.id, {
//             include: [Transaction]
//         });
//         if (!sale) {
//             return res.status(404).json({ message: 'Sale not found' });
//         }
//         res.status(200).json(sale);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const updateSale = async (req, res) => {
//     const t = await sequelize.transaction();

//     try {
//         const {
//             customerId, guarantorId, productId, saleDate, cashierName,
//             driverId, note, price, extraCharges, totalAmount,
//             paymentType, paidAmount, due
//         } = req.body;

//         const sale = await Sales.findByPk(req.params.id);
//         if (!sale) {
//             await t.rollback();
//             return res.status(404).json({ message: 'Sale not found' });
//         }

//         // Update sale
//         await sale.update({
//             customerId,
//             guarantorId,
//             productId,
//             saleDate,
//             cashierName,
//             driverId,
//             note
//         }, { transaction: t });

//         // Update transaction
//         const transaction = await Transaction.findOne({
//             where: { salesId: sale.salesId }
//         });

//         if (transaction) {
//             await transaction.update({
//                 price,
//                 extraCharges,
//                 totalAmount,
//                 paymentType,
//                 paidAmount,
//                 due
//             }, { transaction: t });
//         }

//         await t.commit();
//         res.status(200).json({ sale, transaction });
//     } catch (error) {
//         await t.rollback();
//         res.status(500).json({ error: error.message });
//     }
// };

// const deleteSale = async (req, res) => {
//     const t = await sequelize.transaction();

//     try {
//         const sale = await Sales.findByPk(req.params.id);
//         if (!sale) {
//             await t.rollback();
//             return res.status(404).json({ message: 'Sale not found' });
//         }

//         // Delete transaction first due to foreign key constraint
//         await Transaction.destroy({
//             where: { salesId: sale.salesId },
//             transaction: t
//         });

//         // Delete sale
//         await sale.destroy({ transaction: t });

//         await t.commit();
//         res.status(200).json({ message: 'Sale deleted successfully' });
//     } catch (error) {
//         await t.rollback();
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     createSale,
//     getAllSales,
//     getSaleById,
//     updateSale,
//     deleteSale
// };


///---------------


// const { Sales, Transaction } = require('../model/Sales');
// const sequelize = require('../dbConfig');

// const createSale = async (req, res) => {
//     const t = await sequelize.transaction();

//     try {
//         const {
//             customerId, guarantorId, productId, saleDate, cashierName,
//             driverId, note, price, extraCharges, totalAmount,
//             paymentType, paidAmount, due
//         } = req.body;

//         const sale = await Sales.create({
//             customerId,
//             guarantorId,
//             productId,
//             saleDate,
//             cashierName,
//             driverId,
//             paymentStatus: 'pending',
//             status: 'hire',
//             note
//         }, { transaction: t });

//         const transaction = await Transaction.create({
//             salesId: sale.salesId,
//             price,
//             extraCharges,
//             totalAmount,
//             paymentType,
//             paidAmount,
//             due
//         }, { transaction: t });

//         await sale.update({ transactionId: transaction.transactionId }, { transaction: t });

//         await t.commit();
//         res.status(201).json({ sale, transaction });
//     } catch (error) {
//         await t.rollback();
//         res.status(500).json({ error: error.message });
//     }
// };


const { Sales, Transaction } = require('../model/Sales');
const sequelize = require('../dbConfig');
const Customer = require('../model/Customer');
const Product = require('../model/Products');
const { Op, Sequelize } = require('sequelize');

const createSale = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {
            customerId, guarantorId, productId, saleDate, cashierName,
            driverId, note, price, extraCharges, totalAmount,
            paymentType, paidAmount, due
        } = req.body;

        // Create the Sale record
        const sale = await Sales.create({
            customerId,
            guarantorId,
            productId,
            saleDate,
            cashierName,
            driverId,
            paymentStatus: 'pending', // Ensure this is included
            status: 'hire', // Ensure this is included
            note
        }, { transaction: t });

        // Create the Transaction record
        const transaction = await Transaction.create({
            salesId: sale.salesId,
            price,
            extraCharges,
            totalAmount,
            paymentType,
            paidAmount,
            due,
            pId: productId
        }, { transaction: t });

        // Update the Sale record with the transactionId
        await sale.update({ transactionId: transaction.transactionId }, { transaction: t });

        // Commit the transaction
        await t.commit();

        // Send the response
        res.status(201).json({ sale, transaction });
    } catch (error) {
        // Rollback the transaction in case of error
        await t.rollback();
        console.error('Error creating sale:', error);
        res.status(500).json({ error: error.message });
    }
};

const getAllSales = async (req, res) => {
    try {
        const sales = await Sales.findAll({ include: [Transaction] });
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// const getAllSales = async (req, res) => {
//     try {
//       const sales = await Sale.findAll({
//         include: [
//           { model: Customer, attributes: ['cusName'] },
//           { model: Product, attributes: ['productName'] }
//         ]
//       });
//       res.json(sales);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

const getSaleById = async (req, res) => {
    try {
        const sale = await Sales.findByPk(req.params.id, { include: [Transaction] });
        if (!sale) return res.status(404).json({ message: 'Sale not found' });
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSale = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {
            customerId, guarantorId, productId, saleDate, cashierName,
            driverId, note, price, extraCharges, totalAmount,
            paymentType, paidAmount, due
        } = req.body;

        const sale = await Sales.findByPk(req.params.id);
        if (!sale) {
            await t.rollback();
            return res.status(404).json({ message: 'Sale not found' });
        }

        await sale.update({
            customerId,
            guarantorId,
            productId,
            saleDate,
            cashierName,
            driverId,
            note
        }, { transaction: t });

        const transaction = await Transaction.findOne({ where: { salesId: sale.salesId } });
        if (transaction) {
            await transaction.update({
                price,
                extraCharges,
                totalAmount,
                paymentType,
                paidAmount,
                due
            }, { transaction: t });
        }

        await t.commit();
        res.status(200).json({ sale, transaction });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
};

const deleteSale = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const sale = await Sales.findByPk(req.params.id);
        if (!sale) {
            await t.rollback();
            return res.status(404).json({ message: 'Sale not found' });
        }

        await Transaction.destroy({ where: { salesId: sale.salesId }, transaction: t });
        await sale.destroy({ transaction: t });

        await t.commit();
        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
};

const getAllSalesHire = async (req, res) => {
    try {
        // Fetch only sales where the status is 'hire' and include the associated transactions
        const sales = await Sales.findAll({
            where: { status: 'hire' },  // Filter by 'hire' status
            include: [Transaction]      // Include associated Transaction data
        });

        if (sales.length === 0) {
            return res.status(404).json({ message: 'No sales with status "hire" found' });
        }

        res.status(200).json(sales);  // Return the filtered sales data
    } catch (error) {
        res.status(500).json({ error: error.message });  // Handle any errors
    }
};

const getAllSalesRent = async (req, res) => {
    try {
         
        const sales = await Sales.findAll({
            where: { status: 'rent' },   
            include: [Transaction]       
        });

        if (sales.length === 0) {
            return res.status(404).json({ message: 'No sales with status "rent" found' });
        }

        res.status(200).json(sales);   
    } catch (error) {
        res.status(500).json({ error: error.message });   
    }
};


const hireCreate = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {
            customerId, guarantorId, productId, saleDate, cashierName,
            driverId, note, price, extraCharges, totalAmount,
            paymentType, paidAmount, due
        } = req.body;

        const sale = await Sales.create({
            customerId,
            guarantorId,
            productId,
            saleDate,
            cashierName,
            driverId,
            paymentStatus: 'pending', 
            status: 'rent',
            note
        }, { transaction: t });

    
        const transaction = await Transaction.create({
            salesId: sale.salesId,
            price,
            extraCharges,
            totalAmount,
            paymentType,
            paidAmount,
            due,
            pId: productId
        }, { transaction: t });

        // Update the Sale record with the transactionId
        await sale.update({ transactionId: transaction.transactionId }, { transaction: t });

        // Commit the transaction
        await t.commit();

        // Send the response
        res.status(201).json({ sale, transaction });
    } catch (error) {
        // Rollback the transaction in case of error
        await t.rollback();
        console.error('Error creating sale:', error);
        res.status(500).json({ error: error.message });
    }
};

const getRevenueAnalytics = async (req, res) => {
    try {
        const { startDate, endDate, groupBy = 'day' } = req.query;

        // Validate date parameters
        if (!startDate || !endDate) {
            return res.status(400).json({ 
                error: 'Both startDate and endDate are required' 
            });
        }

        // Define time grouping formats based on groupBy parameter
        const timeFormats = {
            day: '%Y-%m-%d',
            week: '%Y-%U',
            month: '%Y-%m',
            year: '%Y'
        };

        const format = timeFormats[groupBy] || timeFormats.day;

        // Perform optimized aggregate query
        const revenue = await Transaction.findAll({
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), format), 'timePeriod'],
                [Sequelize.fn('SUM', Sequelize.col('paidAmount')), 'totalRevenue'],
                [Sequelize.fn('COUNT', Sequelize.col('transactionId')), 'transactionCount']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
                paidAmount: {
                    [Op.gt]: 0  // Only include transactions with positive amounts
                }
            },
            group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), format)],
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), format), 'ASC']],
            raw: true
        });

        // Calculate summary statistics
        const summary = {
            totalRevenue: revenue.reduce((sum, record) => sum + parseFloat(record.totalRevenue), 0),
            totalTransactions: revenue.reduce((sum, record) => sum + parseInt(record.transactionCount), 0),
            averageRevenuePerPeriod: revenue.length > 0 
                ? (revenue.reduce((sum, record) => sum + parseFloat(record.totalRevenue), 0) / revenue.length).toFixed(2)
                : 0
        };

        res.status(200).json({
            groupedBy: groupBy,
            timeRange: {
                start: startDate,
                end: endDate
            },
            summary,
            revenueData: revenue
        });

    } catch (error) {
        console.error('Error in revenue analytics:', error);
        res.status(500).json({ 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

const getMonthlyProductIncome = async (req, res) => {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const monthlyIncome = await Transaction.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('paidAmount')), 'totalIncome'],
                [Sequelize.col('Product.productName'), 'productName']
            ],
            include: [{
                model: Product,
                attributes: ['productName']
            }],
            where: {
                createdAt: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                }
            },
            group: ['Product.productId'],
            raw: true
        });

        res.status(200).json(monthlyIncome);
    } catch (error) {
        console.error('Error fetching monthly product income:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { 
    createSale, 
    getAllSales, 
    getSaleById, 
    updateSale, 
    deleteSale, 
    getAllSalesHire , 
    getAllSalesRent , 
    hireCreate ,
    getRevenueAnalytics,
    getMonthlyProductIncome
  };
