var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });

var NoteSchema = new Schema({
  title: {
    type:String
  },
  body: {
    type:String
  }
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;