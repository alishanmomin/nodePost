const Post = require("../models/posts");

exports.addPost = async (req, res) =>
{
    const { title, description, postStatus } = req.body;
    const newUser = new Post({
        title,
        description,
        postStatus,
        userId: req.user.id,
    });

    try
    {
        await newUser.save();
        return res.status(200).json({
            status: "Post Successfully added"
        });
    } catch (e)
    {
        res.status(500).json(e);
    }
};

exports.getPosts = async (req, res) =>
{
    try
    {
        const getPost = await Post.find();
        return res.status(200).json({
            status: "Success",
            data: getPost
        });
    } catch (e)
    {
        console.log(e);
    }
};

exports.getPostById = async (req, res) =>
{
    try
    {
        let isLiked = 0
        const post = await Post.findById({ _id: req.body.id });
        if (post.likes.filter(x => JSON.stringify(x.userId) === JSON.stringify(req.user.id)).length > 0)
        {
            isLiked = 1
        }
        var newF = { ...post._doc, isLiked }
        return res.status(200).json({
            status: "Success",
            data: newF,
        });
    } catch (e)
    {
        console.log(e);
    }
};

exports.updatePost = async (req, res) =>
{
    try
    {
        const updatePost = await Post.findByIdAndUpdate(
            { _id: req.body.id },
            req.body
        );
        res.status(200).json("Post updated Successfully");
    } catch (e)
    {
        console.log(e);
    }
};

exports.deletePost = async (req, res) =>
{
    try
    {
        const deletePost = await Post.findOneAndRemove({ _id: req.body.id });
        res.status(200).json("Post deleted Successfully");
    } catch (e)
    {
        console.log(e);
    }
};
exports.postLike = async (req, res) =>
{

    try
    {
        let isLiked = 0
        const postUser = await Post.findById({ _id: req.body.id });

        postUser.likes.length > 0 && postUser.likes.forEach((item) =>
        {
            if (JSON.stringify(item.userId) === JSON.stringify(req.user.id))
            {
                isLiked = 1
            }
        })

        if (isLiked === 1)
        {
            await Post.findByIdAndUpdate(
                { _id: req.body.id },
                { $pull: { likes: { userId: req.user.id } } }
            );
            return res.status(200).json({
                status: "Liked Removed"
            });
        } else if (isLiked === 0)
        {
            await Post.findByIdAndUpdate(
                { _id: req.body.id },
                { $push: { likes: { userId: req.user.id } } }
            );
            return res.status(200).json({
                status: "Liked Added"
            });
        }
    } catch (e)
    {
        console.log(e);
    }
};


