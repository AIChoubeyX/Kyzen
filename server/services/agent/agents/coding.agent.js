import { checkAgentLimit } from "../config/agentLimit.js"
import { getModel } from "../config/llmModel.js"
import { deductCredits } from "../utils/deductCredits.js"
import { jsonrepair } from "jsonrepair"

export const codingAgent=async (state) => {
try {
   await checkAgentLimit(state.userId,"coding")
   const intentLlm=await getModel("intent")
   const llm=await getModel("coding")
   const intentRes=await intentLlm.invoke(`
    You are an intent classifier.

Return ONLY one of these values.

CODE_GENERATION
CODE_REVIEW
CODE_EXPLANATION
DEBUGGING
OPTIMIZATION
CONVERSION
DOCUMENTATION

User Request:
${state.prompt}
    `)
    const intent=intentRes.content.trim()
    if(intent==="CODE_GENERATION"){
        const prompt=`
        You are KyzenAI Coding Agent.

  Generate exactly what the user requests. The requested programming language or file type
  always takes priority over the default stack below.

Default stack:
- HTML
- CSS
- JavaScript

Use React / Next.js / Vue ONLY if explicitly requested.

Rules:

- Responsive
- Modern UI
- CSS Variables
- Flexbox/Grid
- Smooth Scroll
- Hover Effects
- Beautiful spacing
- Single page unless user asks otherwise.

IMAGES (only for web projects)
=========================

Use real Unsplash images only when the user requests a web project.

Do not add web files or images to a non-web programming request.

Return ONLY valid JSON.

Schema:

{
  "files":[
    {
      "name":"filename.ext",
      "content":"..."
    }
  ]
}

Rules:

- Output must start with {
- Output must end with }
- No markdown
- No explanation
- No extra text
- No \`\`\`
- Never mention intent

User Request:
${state.prompt}
        ` 
        const res=await llm.invoke(prompt)
        console.log(res)
        if (res.response_metadata?.finish_reason === "length") {
          throw new Error("The coding model response was truncated. Please try again with a smaller request.")
        }
        const content=res.content?.trim()
        if (!content) {
          throw new Error("The coding model returned an empty response.")
        }
        let data
        try {
          data=JSON.parse(content)
        } catch {
          data=JSON.parse(jsonrepair(content))
        }
        if (!Array.isArray(data.files)) {
          throw new Error("The coding model returned an invalid files list.")
        }
        await deductCredits(state.userId,"coding")
        
        return {
            ...state,
            aiResponse:"Code Generated Successfully.",
            artifacts:[
                {
                    id:Date.now(),
                    type:"Project",
                    files:data.files || [],
                    title:state.prompt
                }
            ]
        }
    }

    const res=await llm.invoke(`
        The user's request is:

${intent}

Return Markdown only.

Never generate project files.

Use headings like:

# Overview

## Explanation

## Problems

## Improvements

## Best Practices

## Optimized Code (if needed)

User Request:

${state.prompt}
        `)

   const data=res.content   
   await deductCredits(state.userId,"coding")
   
   return {
    ...state,
    aiResponse:data,
    artifacts:[]
   }  
} catch (error) {
   console.log(error)
         return {
            ...state,
            aiResponse:error?.data?.message || error?.message || "failed to generate code",
            artifacts:[]
        }
}
  
}