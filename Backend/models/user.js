const users = new mongoose.Schema({
    first_name:{
        type: String,
        requried: true
    },
    Last_name:{
        type:String,
        requried: true
    },
    email:{
        type: String,
        requried: true
    }
})
