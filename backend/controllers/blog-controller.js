const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");


const getAllBlogs = async (req,res,next)=>{
    let blogs;
    try {
         blogs = await Blog.find();
    } catch (error) {
        console.log(error);
    }
    if(!blogs){
        return await res.status(494).json({message: "No blogs found!"})
    }
    res.status(200).json({blogs});
}

const addBlog = async (req, res, next)=>{
    const {title, description,image, user}= req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        res.status(400).json({message: "unable to find user for the ID"})
        
    }

    
    const blog = new Blog({
        title,
        description,
        image,
        user
    })
    try {
        // session to save a blog
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();

    } catch (error) {
       return console.log(error)
    }
    return res.status(200).json({blog})
}

const updateBlog= async (req,res,next)=>{
    let blog;
    const{ title, description}= req.body;
    const blogid = req.params.id;
    try {
         blog = await Blog.findByIdAndUpdate(blogid,{
            title,
            description
        });
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(500).json({message: "unable to update blog"});
    }
    res.status(200).json({blog});

}

const getById= async (req,res,next)=>{
    let blog;
    const blogId = req.params.id;
    try {
         blog = await Blog.findById(blogId)
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(404).json({message: "No blog found"});
    } 
    return res.status(200).json({blog});
    
}

const deleteBlog = async(req, res, next)=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.log(error);
        
    }
    if(!blog){
        return res.status(404).json({message: "No blog found"});
        
    }
    return res.status(200).json({message: "blog deleted successfully!"});
}


const getBlogByUserId =async(req,res,next)=>{
    const userId = req.params.userid;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        return console.log(error);
    }
    if(!userBlogs){
        return res.status(404).json({message: "No blog found for this user"});
        
    }
    return res.status(200).json({blogs: userBlogs})
}

module.exports = {getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getBlogByUserId}