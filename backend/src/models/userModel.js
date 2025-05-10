const userSchema = new mongoose.Schema({
    name:{
    type:string,
    required:true
    },
    email:{
        type:string,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match: [/^\S+@\S+\.\S+$/, 'is invalid'],
    },
    password:{
        type:string,
        required:true
    },
    role:{
        type:string,
        enum:['user','admin'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}, {
    timestamps:true
})

userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
};
const User = mongoose.model('User', userSchema)
export default User                                                                                                             ;