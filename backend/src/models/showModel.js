import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Please provide a movie']
  },
  showtime: {
    type: Date,
    required: [true, 'Please provide showtime']
  },
  theater: {
    type: String,
    required: [true, 'Please provide theater name']
  },
  screen: {
    type: String,
    required: [true, 'Please provide screen number']
  },
  totalSeats: {
    type: Number,
    required: [true, 'Please provide total seats']
  },
  availableSeats: {
    type: Number,
    required: [true, 'Please provide available seats']
  },
  price: {
    type: Number,
    required: [true, 'Please provide ticket price']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Show = mongoose.model('Show', showSchema);

export default Show;