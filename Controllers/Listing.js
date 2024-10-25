const connection = require('../Config/Connection');

const handleAllListing = (req, res) => {
    const category = req.query.category;
    const country = req.query.search;
    let allListing;
    if(category){
        const query = 'SELECT * FROM listings WHERE Category = ?;';
        connection.query(query, [category], (err, result) => {
            if(err){
                return res.render('/');
            }
            allListing = result;
        })
    }else{
        const query = 'SELECT * FROM listings;';
        connection.query(query, (err, result) => {
            if(err){
                return res.render('/');
            }
            allListing = result;
        })
    }
    res.render("./listing/index", {allListing});
}

const handleNewListing = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send()

    let url = req.file.path;
    let filename = req.file.filename;
    const {title, description, price, location, category} = req.body;
    const newListing = new Listing({title, description, price, location, country, category});
    newListing.image = {url, filename};
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listing")
}

const renderEditForm = async(req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does not exists");
        res.redirect("/listing");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")
    res.render('./listing/edit', {listing, originalImageUrl});
}


const updateListing = async(req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send()
    const {id} = req.params;
    const {title, description, price, location, country, category} = req.body;
    let listing = await Listing.findByIdAndUpdate(id, {title, description, price, location, country, category});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
    }
    listing.geometry = response.body.features[0].geometry;
    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`)
}

const deleteListing = async(req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect('/listing')
}

const showListing = async(req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({path: "reviews", populate:{path: "author"} }).populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exists");
        res.redirect("/listing");
    }
    res.render("./listing/show", {listing});
}

const renderNewForm = (req, res) => {
    res.render("./listing/new")
}

module.exports = {
    handleAllListing,
    handleNewListing,
    renderEditForm,
    updateListing,
    deleteListing,
    showListing,
    renderNewForm
}