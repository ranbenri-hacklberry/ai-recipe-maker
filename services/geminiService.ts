
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: { 
      type: Type.STRING, 
      description: 'Creative and catchy title for the recipe.' 
    },
    description: { 
      type: Type.STRING, 
      description: 'A brief, enticing description of the dish (2-3 sentences).' 
    },
    prepTime: { 
      type: Type.STRING, 
      description: 'The preparation time, e.g., "15 minutes".' 
    },
    cookTime: { 
      type: Type.STRING, 
      description: 'The cooking time, e.g., "25 minutes".' 
    },
    totalTime: { 
      type: Type.STRING, 
      description: 'The total time from start to finish, e.g., "40 minutes".' 
    },
    servings: { 
      type: Type.STRING, 
      description: 'The number of servings the recipe makes, e.g., "4 servings".' 
    },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A complete list of all ingredients with quantities, e.g., "1 cup flour". This list should include the ingredients the user provided.'
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Clear, step-by-step cooking instructions.'
    },
    pantryStaples: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'A short list of 5-7 common pantry items assumed to be available (e.g., salt, pepper, olive oil, common spices for the cuisine) that are required for the recipe.'
    }
  },
  required: ['title', 'description', 'prepTime', 'cookTime', 'totalTime', 'servings', 'ingredients', 'instructions', 'pantryStaples']
};

const languageMap: { [key: string]: string } = {
  en: 'English',
  he: 'Hebrew',
  ar: 'Arabic'
};


export const generateRecipe = async (
  ingredients: string,
  cuisine: string,
  diet: string,
  allergies: string,
  course: string,
  language: string
): Promise<Recipe> => {
  const languageName = languageMap[language] || 'English';

  const prompt = `
    You are a culinary expert who creates easy-to-follow recipes. Based on the ingredients and constraints provided, generate a delicious recipe.
    The entire recipe, including the title, description, ingredients, instructions, and pantry staples, must be in ${languageName}.

    Available ingredients: ${ingredients}
    Desired cuisine: ${cuisine === 'Any' ? 'Be creative' : cuisine}
    Dietary preference: ${diet === 'None' ? 'No specific restrictions' : diet}
    Allergies to avoid: ${allergies === 'None' ? 'None specified' : allergies}
    Desired course type: ${course === 'Any' ? 'Any type of dish is fine' : course}

    Please provide the output in the structured JSON format as specified. 
    The recipe must include: a creative title, a brief description, prep/cook/total times, servings, a list of all ingredients (including amounts), and step-by-step instructions.
    
    IMPORTANT: Also provide a separate short list named "pantryStaples" containing 5-7 common household items like salt, pepper, oil, and common spices relevant to the cuisine that the recipe assumes the user has.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);

    // Basic validation to ensure the response shape matches our Recipe interface
    if (
      !recipeData.title ||
      !Array.isArray(recipeData.ingredients) ||
      !Array.isArray(recipeData.instructions) ||
      !Array.isArray(recipeData.pantryStaples)
    ) {
      throw new Error("Invalid recipe format received from API.");
    }

    return recipeData as Recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe. The model may be unable to create a recipe with the provided ingredients or experienced an issue. Please try again.");
  }
};
