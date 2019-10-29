const Book = require('../models/book');

exports.getRecord = (req, res) => {
  Book.findOne({
    _id: req.params.id
  }).then(
    (book) => {
      res.status(200).json(book);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.createRecord = (req, res, next) => {
  const data = req.body;
  const book = new Book(data);
  book.save().then(
    () => {
      res.status(201).json({
        message: 'Record created successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.updateRecord = (req, res) => {
  let data = new Book({ _id: req.params._id })
  data = req.body;
  
  Book.findOneAndUpdate({_id: req.params.id}, data).then(
    () => {
      res.status(200).json({
        message: 'Book updated successfully!',
        data
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

  exports.deleteRecord = (req, res) => {
    Book.findOne({_id: req.params.id}).then(
      () => {
          Book.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
      }
    );
  };

  exports.getAll = (req, res, next) => {
    Book.find().then(
        (books) => {
            res.status(200).json(books);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
  };
