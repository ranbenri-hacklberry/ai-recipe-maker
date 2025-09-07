import React, { useState, useMemo } from 'react';
import type { Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import RecipeDisplay from './components/RecipeDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import {
  CUISINE_OPTIONS,
  DIET_OPTIONS,
  ALLERGY_OPTIONS,
  COURSE_OPTIONS,
} from './constants';
import { translations } from './translations';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState(CUISINE_OPTIONS[0]);
  const [diet, setDiet] = useState(DIET_OPTIONS[0]);
  const [allergies, setAllergies] = useState(ALLERGY_OPTIONS[0]);
  const [course, setCourse] = useState(COURSE_OPTIONS[0]);
  const [language, setLanguage] = useState('en');

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useMemo(() => translations[language], [language]);
  const dir = useMemo(() => (language === 'he' || language === 'ar' ? 'rtl' : 'ltr'), [language]);


  const handleGenerateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError("Please enter some ingredients to get started.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const result = await generateRecipe(
        ingredients,
        cuisine,
        diet,
        allergies,
        course,
        language
      );
      setRecipe(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIngredients('');
    setCuisine(CUISINE_OPTIONS[0]);
    setDiet(DIET_OPTIONS[0]);
    setAllergies(ALLERGY_OPTIONS[0]);
    setCourse(COURSE_OPTIONS[0]);
    setRecipe(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="bg-green-50 min-h-screen font-sans" dir={dir}>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 tracking-tight">
            {t.title}
          </h1>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          {!recipe ? (
            <form
              onSubmit={handleGenerateRecipe}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="ingredients" className="block text-lg font-semibold text-slate-700">
                  {t.ingredientsLabel}
                </label>
                <textarea
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder={t.ingredientsPlaceholder}
                  rows={3}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Select inputs */}
                <SelectInput id="cuisine" label={t.cuisineLabel} value={cuisine} onChange={setCuisine} options={CUISINE_OPTIONS} />
                <SelectInput id="diet" label={t.dietLabel} value={diet} onChange={setDiet} options={DIET_OPTIONS} />
                <SelectInput id="allergies" label={t.allergiesLabel} value={allergies} onChange={setAllergies} options={ALLERGY_OPTIONS} />
                <SelectInput id="course" label={t.courseLabel} value={course} onChange={setCourse} options={COURSE_OPTIONS} />
              </div>
              
              <div className="border-t border-slate-200 pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="w-full sm:w-auto">
                    <label htmlFor="language" className="block text-sm font-medium text-slate-700 mb-1">{t.languageLabel}</label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full sm:w-auto p-2 border border-slate-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="en">English</option>
                      <option value="he">עברית</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    {t.generateButton}
                  </button>
                </div>
              </div>
            </form>
          ) : (
             <div className="text-center">
                <button
                    onClick={handleReset}
                    className="mb-8 bg-slate-200 text-slate-800 font-bold py-2 px-6 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-300 transition"
                >
                    {t.resetButton}
                </button>
             </div>
          )}

          <div className="mt-8">
            {isLoading && <LoadingSpinner message={t.generatingMessage} />}
            {error && !isLoading && <ErrorMessage title={t.errorTitle} message={error} />}
            {recipe && !isLoading && <RecipeDisplay recipe={recipe} t={t} />}
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper component for select inputs to avoid repetition
const SelectInput: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}> = ({ id, label, value, onChange, options }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-semibold text-slate-700">{label}</label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
    >
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default App;
