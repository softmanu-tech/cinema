const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    cast: {
        type: [String],
        required: true,
    },
    postUrl: {
        type: String,
        required: true,
    },
    trailerUrl: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
},{timestamps:true});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;