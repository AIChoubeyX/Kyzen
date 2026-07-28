import axios from "axios";
import { graph } from "../graph/graph.js";

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      content: prompt,
      role: "user",
      conversationId,
    });
    const result = await graph.invoke({
        prompt,
        conversationId
    })
    const response = result.aiResponse;
    return res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
