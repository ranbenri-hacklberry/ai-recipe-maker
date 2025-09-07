
import React from 'react';
import type { Recipe } from '../types';
import type { TranslationKeys } from '../translations';

interface RecipeDisplayProps {
  recipe: Recipe;
  t: TranslationKeys;
}

const InfoPill: React.FC<{ icon: JSX.Element; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex flex-col items-center text-center bg-green-50 p-3 rounded-lg">
        <div className="text-green-700">{icon}</div>
        <span className="text-xs font-semibold text-slate-500 uppercase mt-1">{label}</span>
        <span className="text-slate-800 font-medium">{value}</span>
    </div>
);

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, t }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">{recipe.title}</h2>
      <p className="text-slate-600 mb-6">{recipe.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <InfoPill label={t.prepTime} value={recipe.prepTime} icon={<ClockIcon />} />
        <InfoPill label={t.cookTime} value={recipe.cookTime} icon={<FireIcon />} />
        <InfoPill label={t.totalTime} value={recipe.totalTime} icon={<TotalTimeIcon />} />
        <InfoPill label={t.servings} value={recipe.servings} icon={<UsersIcon />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold text-slate-800 border-b-2 border-green-500 pb-2 mb-4">{t.ingredients}</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2 mt-1 rtl:ml-2 rtl:mr-0">&#10003;</span>
                <span className="text-slate-700">{ingredient}</span>
              </li>
            ))}
          </ul>
          {recipe.pantryStaples && recipe.pantryStaples.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-slate-700 border-b border-slate-300 pb-2 mb-3">{t.pantryStaples}</h4>
              <ul className="space-y-2">
                {recipe.pantryStaples.map((staple, index) => (
                   <li key={index} className="flex items-start">
                    <span className="text-slate-400 mr-2 mt-1 rtl:ml-2 rtl:mr-0">&#10022;</span>
                    <span className="text-slate-600">{staple}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <h3 className="text-2xl font-semibold text-slate-800 border-b-2 border-green-500 pb-2 mb-4">{t.instructions}</h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-green-600 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0 rtl:ml-4 rtl:mr-0">{index + 1}</span>
                <p className="text-slate-700 pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

// SVG Icons defined outside to prevent re-creation on re-renders
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1014.12 11.88a3 3 0 00-4.242 4.242z" /></svg>
);
const TotalTimeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6m-3-3v6" /></svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

export default RecipeDisplay;
