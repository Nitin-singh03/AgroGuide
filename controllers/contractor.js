const Contractor = require('../model/contractor'); 
const Contract = require('../model/contract');


exports.renderApplyPage = (req, res) => {
    res.render("login-signup/applyContr.ejs"); 
}

exports.applyForContractor = async (req, res) => {
    try {
        const { username, email, Pnumber, aadhar, district, password } = req.body;

        const existingContractor1 = await Contractor.findOne({ Pnumber });
        if (existingContractor1) {
            req.flash("error", "User with this number already exist!");
            return res.redirect('/applyCo');
        }
        const existingContractor2 = await Contractor.findOne({ aadhar });
        if (existingContractor2) {
            req.flash("error", "User with this Adhaar id already exist!");
            return res.redirect('/applyCo');
        }

        const profileImageUrl = req.file ? req.file.path : undefined;

        const newContractor = new Contractor({
            username,
            email,
            Pnumber,
            aadhar,
            district,
            image: profileImageUrl,
        });

        Contractor.register(newContractor, password);
        req.flash("success", "Successfully Applied to become contractor!");
        res.redirect('/');
    } catch (error) {
        console.error(error);
        req.flash("error", "some error occurred2");
        res.redirect('/');
    }
}

exports.checkContractorStatusPage = (req, res) => {
    res.render("contractorPage/status.ejs");
};

exports.checkContractorStatus = async (req, res) => {
    const { Pnumber, password } = req.body;

    try {
        const contractor = await Contractor.findOne({ Pnumber });
        
        if (!contractor) {
            req.flash("error", "Wrong phone number or password. Your application may have been rejected.");
            return res.redirect('/contractor/status');
        }

        contractor.authenticate(password, (err, result) => {
            if (err || !result) {
                req.flash("error", "Wrong phone number or password. Your application may have been rejected.");
                return res.redirect('/contractor/status');
            }

            if (contractor.valid) {
                req.flash("success", "Congratulations! Your application has been approved.");
            } else {
                req.flash("warning", "Your application is pending. Please note that it may still be rejected.");
            }
            
            return res.redirect('/contractor/status');
        });

    } catch (error) {
        console.error("Error checking contractor status:", error);
        req.flash("error", "An error occurred. Please try again later.");
        res.redirect('/contractor/status');
    }
};

exports.renderContractorLoginPage = (req, res) => {
    res.render("contractorPage/login.ejs");
};

exports.contractorLogin = async (req, res) => {
    const { Pnumber, password } = req.body;

    try {
        const contractor = await Contractor.findOne({ Pnumber });

        if (!contractor) {
            req.flash("error", "No contractor found with this phone number.");
            return res.redirect('/contractor/login');
        }

        contractor.authenticate(password, (err, result) => {
            if (err || !result) {
                req.flash("error", "Incorrect password. Please try again.");
                return res.redirect('/contractor/login');
            }

            if (!contractor.valid) {
                req.flash("warning", "Your account is not approved yet. Please wait for approval.");
                return res.redirect('/contractor/login');
            }

            req.flash("success", "Welcome back! You are now logged in.");
            req.session.contractorId = contractor._id; 
            return res.redirect('/');
        });

    } catch (error) {
        console.error("Error during contractor login:", error);
        req.flash("error", "An error occurred during login. Please try again later.");
        return res.redirect('/contractor/login');
    }
};

exports.renderDashboard = async (req, res) => {
    try {
        const contractorId = req.session.contractorId;

        if (!contractorId) {
            req.flash('error', 'You need to log in first!');
            return res.redirect('/contractor/login');
        }

        const contracts = await Contract.find({ owner: contractorId });
        res.render('contractorPage/contractorDashboard', { contracts });
    } catch (err) {
        console.error("Error loading contractor's dashboard:", err);
        req.flash('error', 'An error occurred while loading your dashboard.');
        res.redirect('/');
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const contractorId = req.session.contractorId;

        const contractor = await Contractor.findById(contractorId);

        if (!contractor) {
            req.flash("error", "Contractor not found.");
            return res.redirect('/contractor/dashboard');
        }

        res.render('contractorPage/editProfile.ejs', { contractor });
    } catch (error) {
        console.error("Error fetching contractor details:", error);
        req.flash("error", "An error occurred while fetching your profile details.");
        res.redirect('/contractor/dashboard');
    }
};

exports.updateContractorProfile = async (req, res) => {
    const { Pnumber, email, aadhar, district } = req.body;
    const contractorId = req.session.contractorId;
    
    try {
        const contractor = await Contractor.findById(contractorId);

        if (!contractor) {
            req.flash("error", "Contractor not found.");
            return res.redirect('/contractor/edit');
        }
        contractor.Pnumber = Pnumber;
        contractor.email = email;
        contractor.aadhar = aadhar;
        contractor.district = district;

        if (req.file) {
            contractor.image = `/uploads/${req.file.filename}`;
        }

        await contractor.save();

        req.flash("success", "Profile updated successfully.");
        res.redirect('/contractor/dashboard');

    } catch (error) {
        console.error("Error updating contractor profile:", error);

        if (error.code === 11000) {
            req.flash("error", "Duplicate entry: Aadhar or phone number already in use.");
        } else {
            req.flash("error", "An error occurred while updating your profile.");
        }
        res.redirect('/contractor/edit');
    }
};