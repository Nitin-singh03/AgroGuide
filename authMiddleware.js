const isAuthenticated = (req, res, next) => {
    if (req.session.sellerId && req.session.contractorId && req.session.user) {
        return next();
    }
    req.flash("error", "You need to be logged in to access this page.");
    res.redirect("/login");
};


const isAuthorized = (req, res, next) => {
    const userId = req.user._id.toString(); 
    const targetUserId = req.params.userId;

    if (userId === targetUserId) {
        return next();
    }

    req.flash("error", "You are not authorized to perform this action.");
    return res.redirect("/");
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next(); 
    }
    req.flash("error", "Admin access only.");
    res.redirect("/");
};

module.exports = { isAuthenticated, isAuthorized, isAdmin };
