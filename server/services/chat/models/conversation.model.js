import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "New Chat",
  },
  userId: {
    type: string,
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
