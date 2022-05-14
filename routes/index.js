const express = require('express');
const router = express.Router();
const Item = require('../models/items');
const Warehouse = require('../models/warehouse');


router.get('/', (req, res) => {

        res.render('dashboard');
})

router.get('/additem', (req, res) => {

    res.render('additem');

})

router.post('/additem', (req, res) => {
    
        const { name, quantity } = req.body;
        let errors = []; //WE CREATE AN EMPTY ARRAY

        if (!name || !quantity) {
            errors.push({ msg: "some fields are missing, please fill them up" });
        }
        if (errors.length > 0) {
res.render('additem', { name, quantity });
        } else {
            const item = new Item({
                name,
                quantity,
            })
            item.save((er) => {
                if (er) {
                    req.flash('error_msg', "there was a problem adding item");
                    res.redirect("/additem");
                } else {
                    req.flash("message", "Item now registered");
                    res.redirect('/additem');
                }
            })
        }
})

router.get('/viewitems', (req, res) => {

        Item.find({}, (er, items) => {
            if (er) {
                req.flash("error_msg", 'please check later');
                console.log(er)
            } else {
                res.render("viewitems", {
                    items
                });
            }
        })
    
})

router.get('/edit/:itemID', (req, res) => {
    const edit = req.params.itemID;

    
        Item.findById(edit, (er, ed) => {
            //console.log(ed)
            if (er) {
                req.flash('error_msg', "no item with this id");
            } else {
                res.render("edititem", {
                    item: ed
                });
            }
        })
    })

router.post('/edit/:itemID', (req, res) => {
    const edit = req.params.itemID;

        Item.updateOne({_id: edit },
                          {$set: req.body},
            (er, editpat) => {
                console.log(editpat);
                if (er) {
                    console.log(er);
                } else {
                    req.flash("message", "item edited successfully");
                    res.redirect("/viewitems")
            }
        })
    })

router.get('/delete/:itemID', (req, res) => {
    const del = req.params.itemID;

        Item.findByIdAndRemove(del, (er, ed) => {
            console.log(ed)
            if (er) {
                req.flash('error_msg', "no item with this id");
            } else {
                req.flash('message', "deleted this item");
                res.redirect('/viewitems')
            }
        })
    })

router.get('/warehouse', (req, res) => {

        res.render('warehouse');
    })

router.post('/warehouse', (req, res) => {

        const { item, quantity, location, details } = req.body;
        let errors = []; //WE CREATE AN EMPTY ARRAY

        if (!item || !quantity || !location || !details) {
            errors.push({ msg: "some fields are missing, please fill them up" });
        }
        if (errors.length > 0) {
            res.render('warehouse', { item, quantity, location, details });
        } else {
            const warehouse = new Warehouse({
                item,
                quantity,
                location,
                details
            })
            warehouse.save((er) => {
                if (er) {
                    req.flash('error_msg', "there was a problem adding warehouse");
                    res.redirect("/viewitems");
                } else {
                    req.flash("message", "warehouse Added");
                    res.redirect('/warehouse')
                }
            })
        }
})


router.get('/lwarehouse', (req, res) => {

    Warehouse.find({}, (er, locations) => {
        if(er) {
            req.flash("error_msg", 'please check later');
            req.redirect("/warehouse")
        } else {
            res.render("viewwarehouse", {
                locations
            });
        }
    })
})

module.exports = router;