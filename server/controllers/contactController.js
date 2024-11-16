const Contact = require('../models/contactModel');

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const getContants = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const searchQuery = search
            ? {
                $or: [
                    { "First Name": { $regex: search, $options: "i" } },
                    { "Last Name": { $regex: search, $options: "i" } },
                    { Email: { $regex: search, $options: "i" } },
                    { "Phone Number": { $regex: search, $options: "i" } },
                    { Company: { $regex: search, $options: "i" } },
                    { "Job Title": { $regex: search, $options: "i" } },
                ],
            }
            : {};

        const totalContacts = await Contact.countDocuments(searchQuery);

        const contacts = await Contact.find(searchQuery)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            totalContacts,
            currentPage: Number(page),
            totalPages: Math.ceil(totalContacts / limit),
            data: contacts,
        });
    } catch (err) {
        console.error("Error fetching contacts:", err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


const createContants = async (req, res) => {
    const { fName, lName, email, phoneNumber, company, jobTitle } = req.body;

    if (!fName || !lName || !validateEmail(email) || !phoneNumber || !company || !jobTitle) {
        return res.status(400).json({
            success: false,
            message: "Invalid input. Ensure all fields are filled correctly.",
        });
    }

    try {
        const existingContact = await Contact.findOne({
            "First Name": fName,
            "Last Name": lName,
        });

        if (existingContact) {
            return res.status(409).json({
                success: false,
                message: "Contact with the same First Name and Last Name already exists.",
            });
        }

        const newContact = await Contact.create({
            "First Name": fName,
            "Last Name": lName,
            "Email": email,
            "Phone Number": phoneNumber,
            "Company": company,
            "Job Title": jobTitle,
        });

        res.status(201).json({
            success: true,
            message: "Contact created successfully.",
            data: {
                "First Name": fName,
                "Last Name": lName,
                "Email": email,
                "Phone Number": phoneNumber,
                "Company": company,
                "Job Title": jobTitle,
            },
        });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const updateContact = async (req, res) => {
    const { fName, lName, email, phoneNumber, company, jobTitle } = req.body;

    if (!fName || !lName || !validateEmail(email) || !phoneNumber || !company || !jobTitle) {
        return res.status(400).json({
            success: false,
            message: "Invalid input. Ensure all fields are filled correctly.",
        });
    }

    try {
        const result = await Contact.updateOne(
            { "First Name": fName, "Last Name": lName },
            {
                $set: {
                    "Email": email,
                    "Phone Number": phoneNumber,
                    "Company": company,
                    "Job Title": jobTitle,
                }
            },
            { upsert: false }
        );

        if (result.modifiedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "Contact updated successfully.",
                data: {
                    "First Name": fName,
                    "Last Name": lName,
                    "Email": email,
                    "Phone Number": phoneNumber,
                    "Company": company,
                    "Job Title": jobTitle,
                },
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Contact not found.",
            });
        }
    } catch (error) {
        console.error("Error updating contact:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};


const deleteContacts = async (req, res) => {
    const fName = req.query.fName;
    const lName = req.query.lName;

    try {
        if (!fName || !lName) {
            return res.status(400).json({
                success: false,
                message: "Both First Name and Last Name are required for deletion.",
            });
        }

        const deletedContact = await Contact.findOneAndDelete({
            "First Name": fName,
            "Last Name": lName,
        });

        if (!deletedContact) {
            return res.status(404).json({
                success: false,
                message: `Contact with First Name "${fName}" and Last Name "${lName}" not found.`,
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact successfully deleted.",
            data: deletedContact,
        });
    } catch (err) {
        console.error("Error deleting contact:", err);
        res.status(500).json({
            success: false,
            message: "Server Error. Unable to delete contact.",
        });
    }
};


module.exports = { getContants, createContants, updateContact, deleteContacts };
