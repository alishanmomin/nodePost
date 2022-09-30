const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) =>
{
    const { userName, mobile, email, password } = req.body;

    const newUser = new User({
        userName,
        mobile,
        email,
        password,
    });
    const found = await User.findOne({ email: req.body.email })
    if (found)
    {
        res.status(400).json({
            message: "Email Already Exist"
        });
    } else
    {
        try
        {
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (e)
        {
            res.status(400).json({
                error: e.message
            });
        }
    }
};

exports.login = async (req, res) =>
{
    try
    {
        const foundUser = await User.findOne({ email: req.body.email });
        if (!foundUser)
        {
            res.status(500).json({
                message: "Invalid Credentials"
            });

        }
        else if (foundUser.password !== req.body.password)
        {
            res.status(500).json({
                message: "Invalid Credentials"
            });

        }

        else if (foundUser.password === req.body.password)
        {
            const accessToken = jwt.sign(
                { id: foundUser._id },
                process.env.JWT_SEC,
                { expiresIn: "3d" }
            )
            res.json({
                status: "success",
                userID: foundUser._id,
                token: accessToken,
            });
        }

    } catch (error)
    {
        res.status(500).json({
            message: error
        });
    }
};

exports.getuser = async (req, res) =>
{
    const user = await User.find().populate({ path: "followers.userId", select: { userName: 1, email: 1 } });
    return res.status(200).json({ user });
};

exports.followRequest = async (req, res) =>
{
    try
    {
        await User.findByIdAndUpdate(
            { _id: req.body.id },
            { $push: { followers: { userId: req.user.id } } }
        )
        await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $push: { following: { userId: req.body.id } } }
        )
        return res.status(200).json({
            message: "User followed successfully!"
        });
    } catch (error)
    {
        res.status(500).json({
            message: error
        });
    }

    // try
    // {
    //     const follow = await User.findByIdAndUpdate(
    //         { _id: req.body.id },
    //         { $push: { followers: { userId: req.user.id } } }
    //     );
    //     return res.status(200).json("Follow Successfully");
    // } catch (e)
    // {
    //     console.log(e);
    // }
};
exports.getUsersFollowers = async (req, res) =>
{

    const user = await User.findById({ _id: req.body.id }).populate({ path: "followers.userId", select: { userName: 1, email: 1 } });
    let obj = {}
    var array = []
    user.followers.forEach((item, index) =>
    {
        obj.UserId = item.userId._id
        obj.userName = item.userId.userName
        obj.email = item.userId.email
        obj._id = item._id
        array.push(obj)
    })
    res.json({
        status: "success",
        data: array,
    });
}
