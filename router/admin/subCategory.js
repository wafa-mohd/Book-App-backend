const express = require("express");
const router = express.Router();
const Auth = require("../../libs/auth");
const SubCategory = require("../../models/SubCategory");
const Category = require("../../models/Category");

// SubCategory.updateMany({},{isActive: true}).then(() => console.log('yessaasssssss')).catch((err) => console.log('err',err))

router.post("/add", Auth.isAdminAuthorized, (req, res) => {
  let { name, image, category,showInWebsite } = req.body;
  SubCategory.create({
    name,
    image,
    category: category,
    showInWebsite,
  })
    .then(() => {
      res.json({ message: "sub category created" });
    })
    .catch((err) => {
      res.status(401).json("Something went wrong", err);
    });
});

router.get("/list", Auth.isAdminAuthorized, async (req, res) => {
  let subCategory = await SubCategory.find({ isActive: true }).populate(
    "category"
  );
  res.json({ list: subCategory });
});

router.get("/id/:id", Auth.isAdminAuthorized, async (req, res) => {
  let { id } = req.params;
  let subCategory = await SubCategory.findById(id);
  res.json({ subCategory });
});

router.put(
  "/update/:subCategoryId",
  Auth.isAdminAuthorized,
  async (req, res) => {
    let { name, image, category,showInWebsite } = req.body;
    let subCategory = await SubCategory.findOne({
      _id: req.params.subCategoryId,
    });
    if (!subCategory) {
      return res.status(404).json({
        message: "category not found!",
      });
    }
    if (name) {
      subCategory.name = name;
    }
    if (image) {
      subCategory.image = image;
    }
    if (category) {
      subCategory.category = category;
    }
    if(image){
        subCategory.image=image
    }
    if(showInWebsite){
        subCategory.showInWebsite=showInWebsite
    }

    subCategory
      .save()
      .then(() => {
        return res.json({
          message: "Sub-Category updated!",
        });
      })
      .catch((err) => {
        console.log("Error ", err);
        return res.status(403).json({
          message: "Something went wrong!",
        });
      });
  }
);

router.delete("/remove/:id", (req, res) => {
  let { id } = req.params;
  SubCategory.findByIdAndUpdate(id, { isActive: false })
    .then(() => {
      res.json({ message: "SubCategory removed!" });
    })
    .catch((err) => {
      console.log("Error ", err);
      return res.status(403).json({
        message: "Something went wrong!",
      });
    });
});

module.exports = router;
