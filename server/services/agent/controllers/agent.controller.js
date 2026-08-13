import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId, agent } = req.body;
    await addMessage(conversationId, "user", prompt);
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      content: prompt,
      role: "user",
      conversationId,
    });
    const result = await graph.invoke({
        prompt,
        conversationId,
        agent
    })
    const response = result.aiResponse;

    await addMessage(conversationId, "assistant", response);
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      content: response,
      role: "assistant",
      conversationId,
    });
    return res.status(200).json({
      answer : result.aiResponse,
      images : result.images
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
