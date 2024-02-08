const { User } = require("../models/userModel");
const Contact = require("../models/contactModel");
//doubt why next 
const getAllUsers = async (req, res,next) => {
    try {
        const users = await User.find({},{password:0});
        if (!users || users.length == 0) {
           
            return res.status(404).json({ message: "No User Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
       
    }
} 

const getAllContacts = async (req, res,next) => {
    try {
        const contacts = await Contact.find({});
        if (!contacts || contacts.length == 0) {
            return res.json(404).json({ message: "No Contact details found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}


// single user logic
const getUserById = async(req,res,next) => {
    try {
        const id = req.params.id;
        const data=await User.findOne({ _id: id } ,{password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

//update user By Id
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.updateOne({ _id: id }, {
            $set:updateUserData,
        });

        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

// delete user by id
const deleteUserById = async(req,res,next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        next(error);
    }
}
//contacts delete logic
const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
};