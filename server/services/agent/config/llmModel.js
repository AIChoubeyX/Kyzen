import dotenv from "dotenv"
dotenv.config()
import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter";

let groq;
let gemini;
let openrouter;

const getGroqModel = () => {
    if (!groq) {
        groq = new ChatGroq({
            model: "openai/gpt-oss-120b",
            apiKey: process.env.GROQ_API_KEY,
        });
    }
    return groq;
}

const getGeminiModel = () => {
    if (!gemini) {
        gemini = new ChatGoogleGenerativeAI({
            model: "gemini-3.6-flash",
            apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
        });
    }
    return gemini;
}

const getOpenRouterModel = () => {
    if (!openrouter) {
        openrouter = new ChatOpenRouter({
            model: "cohere/north-mini-code:free",
            temperature: 0,
            maxTokens: 8000,
            modelKwargs: {
                reasoning: {
                    effort: "none"
                }
            },
            apiKey: process.env.OPENROUTER_API_KEY,
        });
    }
    return openrouter;
}


export const getModel=async (agent)=>{
    switch (agent) {
        case "chat":
            return getGroqModel();
        case "search" :    
           return getGroqModel();
        case "coding": 
           return getOpenRouterModel(); 
        case "imageAnalyzer": 
           return getGeminiModel();   
    
        default:
            return getGroqModel();
    }
}

