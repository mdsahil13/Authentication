const User =  require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async(req , res) =>{
try{
    const {name, email, password } = req.body;
    
    if(!name || !email || !password){
        return res.send(400).json({message:"All fields required"});
    }

    const userExists = await User.findOne({email});
    if(userExists){
        return res.send(400).json({message: "user already exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    });

    res.status(201).json({
        message:"user register succcessfully",
        userId: user._id
    });
}
catch(error){
    res.status(500).json({message:"server error"});
}



};

const loginUser = async(req,res)=>{
    try{
       const{email, password} = req.body;
       if(!email || !password){
        return res.status(400).json({message:"all fields are required"});
       }
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({message:"invalid credentials"});
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
        return res.status(400).json({message:"invalid credentiials"});
        
       }
       const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
       );

       res.json({
        message:"Login successful",
        token,
        user: {
            id: user._id,
            name:user.name,
            email:user.email
        }
       });
    }catch(error){
        res.status(500).json({message:"server error"});
    }
};
module.exports = {registerUser, loginUser};