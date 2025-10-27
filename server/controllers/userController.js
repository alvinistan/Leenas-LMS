import User from "../models/user.js"

//Get User Datails

export const gretUserData = async (req,res)=> {
    try {
        const {userId} = req.auth()
        const user = await User.findById(userId)

        if(!user){
            return res.json({success: false, message: 'user Not Found'})
        }
        req.json({success: true, user})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}