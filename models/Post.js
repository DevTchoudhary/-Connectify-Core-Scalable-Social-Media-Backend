const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    caption:{
        type:String,
        trim:true,
    },

    image:[{
        type:String,
        required:false,
    }],

    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    }],

    comments:[{
        tyoe:mongoose.Schema.Types.ObjectId,
        ref:"comment",
    }],

},{
    timestamps:true,
});

const Post=mongoose.model("Post",postSchema);
module.exports=Post;