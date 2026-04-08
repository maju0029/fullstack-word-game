import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
    name: String,
    timeMS: Number,
    guesses: [String],
    wordLength: Number,
    uniqueLetters: Boolean,
    createdAT: { type: Date, default: Date.now }
});

const Highscore = mongoose.model('Highscore', highscoreSchema);

export default Highscore;