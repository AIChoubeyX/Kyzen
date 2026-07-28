import Coversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("User ID from header:", userId);
    const conversation = await Coversation.create({
      userId: userId,
    });
    res.status(201).json(conversation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating conversation", error: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    console.log("User ID from header:", userId);
    const conversations = await Coversation.find({
      userId: userId,
    }).sort({ updateAt: -1 });
    res.status(201).json(conversation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching conversation", error: error.message });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { id, title } = req.body;
    const conversation = await Coversation.findByIdAndUpdate(id, { title });
    res.status(201).json(conversation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating conversation", error: error.message });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;
    const message = await Message.create({
      conversationId,
      role,
      content,
    });
    return res.status(201).json(message);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving message", error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).sort({
      createdAt: 1,
    });
    return res.status(201).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
};
