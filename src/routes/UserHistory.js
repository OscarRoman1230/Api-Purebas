const express = require('express');
const router = express.Router();
const UserHistory = require('../models/UserHistory');

// get Users enabled
router.get('/:id', UserHistory.getUserHistories);


// create UserHistory
router.post('/create', UserHistory.createUserHistory);

// update UserHistory
router.put('/update', UserHistory.updateUserHistory);

// delete UserHistory
router.put('/delete', UserHistory.deleteUserHistory);

module.exports = router;
