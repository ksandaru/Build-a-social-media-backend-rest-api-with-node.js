const express = require('express');
const { getAllBlogs, addBlog, updateBlog , getById, deleteBlog, getBlogByUserId} = require('../controllers/blog-controller');
const blogRouter = express.Router();


blogRouter.get("/", getAllBlogs );
blogRouter.post("/add", addBlog );
blogRouter.put("/update/:id", updateBlog );
blogRouter.get("/:id", getById );
blogRouter.delete("/:id", deleteBlog );
blogRouter.get("/user/:userid", getBlogByUserId );

module.exports = blogRouter;