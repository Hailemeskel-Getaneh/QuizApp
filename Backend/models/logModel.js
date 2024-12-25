import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Check if the model already exists before defining it
const signUpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Hash password before saving
signUpSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare passwords
signUpSchema.methods.comparePassword = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

// Use `mongoose.models` to check if the model is already compiled
const SignUp = mongoose.models.SignUp || mongoose.model('SignUp', signUpSchema);
export default SignUp;

