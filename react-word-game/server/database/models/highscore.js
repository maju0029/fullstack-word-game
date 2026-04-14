import mongoose from 'mongoose';

const highscoreSchema = new mongoose.Schema({
    name: String,
    timeMs: Number,
    guesses: [String],
    wordLength: Number,
    uniqueLetters: Boolean,
    createdAt: { type: Date, default: Date.now }
});

const Highscore = mongoose.model('Highscore', highscoreSchema);

export default Highscore;