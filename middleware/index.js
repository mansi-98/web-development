// all the middleware goes here
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment     =require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){ // if user is logged in
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
               req.flash("error", "Campground not found");
                res.redirect("back");
            } else{
                if(foundCampground.author.id.equals(req.user._id)){ //does user owns the campground
                    next();
                } else {
                     req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){ // if user is logged in
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user._id)){ //does user owns the campground
                    next();
                } else {
                 req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
      req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
       req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;