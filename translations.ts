export type TranslationKeys = {
  title: string;
  subtitle: string;
  ingredientsLabel: string;
  ingredientsPlaceholder: string;
  cuisineLabel: string;
  dietLabel: string;
  allergiesLabel: string;
  courseLabel: string;
  languageLabel: string;
  generateButton: string;
  generatingMessage: string;
  errorTitle: string;
  resetButton: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  ingredients: string;
  pantryStaples: string;
  instructions: string;
};

type Translations = {
  [key: string]: TranslationKeys;
};

export const translations: Translations = {
  en: {
    title: "AI Recipe Generator",
    subtitle: "Tell us what you have, and we'll create a delicious recipe for you!",
    ingredientsLabel: "What ingredients do you have?",
    ingredientsPlaceholder: "e.g., chicken breast, tomatoes, rice",
    cuisineLabel: "Cuisine Preference",
    dietLabel: "Dietary Preference",
    allergiesLabel: "Allergies to Avoid",
    courseLabel: "Course Type",
    languageLabel: "Language",
    generateButton: "Generate Recipe",
    generatingMessage: "Creating your culinary masterpiece...",
    errorTitle: "Oops! Something went wrong.",
    resetButton: "Start Over",
    prepTime: "Prep Time",
    cookTime: "Cook Time",
    totalTime: "Total Time",
    servings: "Servings",
    ingredients: "Ingredients",
    pantryStaples: "Pantry Staples",
    instructions: "Instructions",
  },
  he: {
    title: "מחולל מתכונים AI",
    subtitle: "ספרו לנו מה יש לכם, ואנחנו ניצור עבורכם מתכון טעים!",
    ingredientsLabel: "אילו מצרכים יש לכם?",
    ingredientsPlaceholder: "למשל, חזה עוף, עגבניות, אורז",
    cuisineLabel: "העדפת מטבח",
    dietLabel: "העדפה תזונתית",
    allergiesLabel: "אלרגיות להימנע מהן",
    courseLabel: "סוג המנה",
    languageLabel: "שפה",
    generateButton: "צור מתכון",
    generatingMessage: "יוצרים את יצירת המופת הקולינרית שלכם...",
    errorTitle: "אופס! משהו השתבש.",
    resetButton: "התחל מחדש",
    prepTime: "זמן הכנה",
    cookTime: "זמן בישול",
    totalTime: "זמן כולל",
    servings: "מנות",
    ingredients: "מצרכים",
    pantryStaples: "מצרכי מזווה",
    instructions: "הוראות",
  },
  ar: {
    title: "مولد وصفات الذكاء الاصطناعي",
    subtitle: "أخبرنا بما لديك، وسنصنع لك وصفة لذيذة!",
    ingredientsLabel: "ما هي المكونات التي لديك؟",
    ingredientsPlaceholder: "على سبيل المثال، صدر دجاج، طماطم، أرز",
    cuisineLabel: "تفضيل المطبخ",
    dietLabel: "تفضيل غذائي",
    allergiesLabel: "الحساسية التي يجب تجنبها",
    courseLabel: "نوع الطبق",
    languageLabel: "لغة",
    generateButton: "إنشاء وصفة",
    generatingMessage: "نصنع تحفتك الفنية في الطهي...",
    errorTitle: "عفوًا! حدث خطأ ما.",
    resetButton: "ابدأ من جديد",
    prepTime: "وقت التحضير",
    cookTime: "وقت الطهي",
    totalTime: "الوقت الكلي",
    servings: "حصص",
    ingredients: "المكونات",
    pantryStaples: "أساسيات المخزن",
    instructions: "التعليمات",
  },
};
