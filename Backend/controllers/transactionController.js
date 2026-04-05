import Transaction from '../models/Transaction.js';

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public
export const getTransactions = async (req, res, next) => {
  try {
    const { type, category, sort, order, page, limit, search } = req.query;

    let query = {};
    
    // Filtering
    if (type) query.type = type;
    if (category) query.category = category;
    
    // Searching
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Sorting
    let sortQuery = {};
    if (sort) {
      sortQuery[sort] = order === 'asc' ? 1 : -1;
    } else {
      // Default sort by date descending
      sortQuery = { date: -1 };
    }

    // Pagination
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const startIndex = (pageNum - 1) * limitNum;

    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort(sortQuery)
      .skip(startIndex)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly summary
// @route   GET /api/transactions/summary
// @access  Public
export const getTransactionSummary = async (req, res, next) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: { 
            month: { $month: "$date" }, 
            year: { $year: "$date" }, 
            type: "$type" 
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } }
    ]);
    
    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Public
export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Public
export const updateTransaction = async (req, res, next) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error(`Transaction not found with id of ${req.params.id}`);
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Public
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error(`Transaction not found with id of ${req.params.id}`);
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
