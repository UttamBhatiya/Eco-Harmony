const express = require('express');
const router = express.Router({mergeParams:true});
const { handleAllListing, handleNewListing, renderEditForm, updateListing, deleteListing, showListing, renderNewForm } = require('../Controllers/Listing');

router.get('/', handleAllListing);
router.post('/', handleNewListing);

router.get('/new', renderNewForm);

router.route('/:id')
    .get(showListing)
    .put(updateListing)
    .delete(deleteListing)


router.get('/:id/edit', renderEditForm);

module.exports = router;