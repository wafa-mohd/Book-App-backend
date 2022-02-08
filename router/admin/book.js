const express = require("express");
const router = express.Router();
const Auth = require("../../libs/auth");
const Book = require("../../models/Book");

// Book.updateMany({},{isActive:true}).then(() => console.log('yesssssssss')).catch((err) => console.log('err',err))

router.post("/add", Auth.isAdminAuthorized, (req, res) => {
  let { bookName, authorName, publisher, amount, categoryId, subCategoryId, image } = req.body;
  Book.create({
    bookName,
    authorName,
    publisher,
    amount,
    category: categoryId,
    subCategory: subCategoryId,
    image
  })
    .then(() => {
      res.json("Book Added");
    })
    .catch((err) => {
      console.log("error", err);
      res.status(401).json({ message: "Something went wrong" });
    });
});


router.get("/list",Auth.isAdminAuthorized, async(req, res) => {
  let book= await Book.find({isActive: true}).populate('category').populate('subCategory')
  res.json({book})
}) 

router.get('/byId/:id',Auth.isAdminAuthorized,async(req,res)=>{
  let {id} = req.params
  let book= await Book.findById(id)
  res.json({book})
})

router.put('/update/:bookId',Auth.isAdminAuthorized,async(req,res)=>{
  let{bookName, authorName, publisher, amount, categoryId, subCategoryId,image}=req.body
  let book = await Book.findOne({
      _id: req.params.bookId,
  })
  if (!book) {
      return res.status(404).json({
          message: "book not found!"
      })
  }
  if (bookName) {
      book.bookName= bookName
  }
  if (authorName) {
      book.authorName = authorName
  }
  if (publisher) {
      book.publisher = publisher
  }
  if (amount) {
      book.amount = amount
}
if (categoryId) {
      book.category = categoryId
}
if (subCategoryId) {
      book.subCategory = subCategoryId
}
if(image){
    book.image=image
}

  book.save().then(() => {
      
      return res.json({
          message: "Book updated!"
      })
  }).catch(err => {
      console.log('Error ', err);
      return res.status(403).json({
          message: "Something went wrong!"
      })
  })
})

router.post("/update-stock/:bookId", Auth.isAdminAuthorized, (req, res) => {
    let {stock} =req.body;
    let {bookId} = req.params;
    console.log('sss ',typeof stock);
    Book.findByIdAndUpdate(bookId,{stock: Number(stock)}).then(() => {
        return res.json({message: "Stock updated!"})
    }).catch((err) => {
        return res.json({message: "Something went wrong!"})
    })
})

router.delete("/remove/:id", (req, res) => {
  let {id} = req.params
  Book.findByIdAndUpdate(id, {isActive: false})
      .then(() => {
          res.json({message: "Book removed!"})
      }).catch((err) => {
          console.log('Error ', err);
          return res.status(403).json({
              message: "Something went wrong!"
          })
      })
})

module.exports = router;
