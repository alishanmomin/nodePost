const Categories = require("../models/categories");
const Subcategories = require("../models/subcategories");

exports.addCategory = async (req, res) =>
{
    const { title, description } = req.body;
    const newUser = new Categories({
        title,
        description,
        userId: req.user.id,
    });

    try
    {
        await newUser.save();
        return res.status(200).json({
            status: "Category Successfully added"
        });
    } catch (e)
    {
        res.status(500).json(e);
    }
};
exports.addSubCategory = async (req, res) =>
{
    const idExist = await Categories.findById({ _id: req.body.categoryId })
    const { price, name } = req.body;
    // console.log("idExist", idExist)
    if (!idExist)
    {
        return res.status(500).json({
            status: "Invalid category Id"
        });
    } else
    {
        try
        {
            const newUser = new Subcategories({
                price,
                name,
                categoryId: req.body.categoryId,
            });
            await newUser.save();
            return res.status(200).json({
                status: "Sub Category Successfully added"
            });
        } catch (e)
        {
            res.status(500).json(e);
        }
    }
};
exports.getSubCategory = async (req, res) =>
{
    const posts = await Subcategories.find({ categoryId: req.body.id })
        .populate({ path: "categoryId", select: { title: 1 } });
    try
    {
        res.status(200).json({
            status: "Success",
            data: posts
        });

    } catch (e)
    {
        res.status(500).json(e);
    }

};