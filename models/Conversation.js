const mongoose= require("mongoose");

const conversationSChema= new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }],
},{
    timestamps:true
});

const Conversation=mongoose.model("Conversation",conversationSChema);
module.exports=Conversation;