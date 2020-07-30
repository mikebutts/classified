const Post = require("../models/post");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dpmmpzfrw",
  api_key: "353574615323935",
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = {
  // Posts index
  async postIndex(req, res, next) {
    let posts = await Post.find({});
    console.log(posts);
    res.render("posts/index", { posts });
  },

  // Posts new
  postNew(req, res, next) {
    res.render("posts/new");
  },

  // Posts Create
  async postCreate(req, res, next) {
    req.body.post.images = [];
    for (let file of req.files) {
      let image = await cloudinary.v2.uploader.upload(file.path);
      req.body.post.images.push({
        url: image.secure_url,
        public_id: image.public_id,
      });
    }
    let post = await Post.create(req.body.post);
    res.redirect(`/posts/${post.id}`);
  },

  async postShow(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render("posts/show", { post });
  },

  async postEdit(req, res, next) {
    let post = await Post.findById(req.params.id);
    res.render("posts/edit", { post });
  },
  //Posts Update
  async postUpdate(req, res, next) {
    //find post by Id
    let post = await Post.findByI(req.params.id);
    // check if there's any images for deletion
    if (req.body.deleteImages && req.body.deleteImages.length) {
      //assign deleteImages from req.body to its own variable
      let deleteImages = req.body.deleteImages;
      // loop over deleteImages
      for (const public_id of deleteImages) {
        // delete images from cloudinary
        await cloudinary.v2.uploader.destroy(public_id);
        // delete image from post.images
        for (const image of post.images) {
          if (image.public_id === public_id) {
            // get index of the image
            let index = post.images.indexOf(image);
            // delete that image
            post.images.splice(index, 1);
          }
        }
      }
    }
    //check if any files for upload
    if (req.files) {
      // upload images
      for (let file of req.files) {
        let image = await cloudinary.v2.uploader.upload(file.path);
        //add images to post.images array
        post.images.push({
          url: image.secure_url,
          public_id: image.public_id,
        });
      }
    }
    // update the post with any new properties
    post.title = req.body.post.title;
    post.description = req.body.post.description;
    post.price = req.body.post.price;
    post.location = req.body.post.location;
    //save the updates post into the db
    post.save();
    //redirect to show page
    res.redirect(`/posts/${post.id}`);
  },

  //Posts Destroy
  async postDestroy(req, res, next) {
    // find the post needed to delete
    let post = await Post.findByIdAndRemove(req.params.id);
    // loop over the images and delete from cloudinary
    for (const image of post.images) {
      await cloudinary.v2.uploader.destroy(image.public_id);
    }
    await post.remove();
    res.redirect("/posts");
  },
};
