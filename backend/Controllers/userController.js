const userModel = require("../Models/usersModel")
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


const JWT_SECRET = "balayya"


const createUser = async(req,res) =>{

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    let success = false;

    try {
        const {name,email,password} = req.body;
        let user = await userModel.findOne({email})
        if(user){
            return res.status(400).json({ success,error: "sorry a user with this email already exists" });
        }

        if(!name || !email || !password){
            return res.status(400).json({success,error:"All fields can't be Empty..."})
        }

        user = new userModel({name,email,password})

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password,salt)

        await user.save();

        const data = {
            user: {
              id: user.id,
            },
          };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.status(200).json({ success,data,name,email,authToken });

    } catch (error) {
        res.status(400).json("internal server error");
    }
};

const loginUser = async(req,res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    let success = false;

    try {
        const {email,password} = req.body;
        let user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({ success,error:"Please try to login with correct credentials" })
        }

        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(400).json({ success,error:"Please try to login with correct credentials"})
        }

        const data ={
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        return res.status(200).json({ success,data,name:user.name,email,authToken })

    } catch (error) {
        res.status(400).json("internal server error");
    }

};

const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
};

module.exports = { createUser,loginUser,getUser };