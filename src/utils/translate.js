export const getLocal = (obj, field, lang = 'en') => {
  if (!obj) return '';
  const currentLang = lang.slice(0, 2);
  if (currentLang !== 'en') {
    const localizedKey = `${field}_${currentLang}`;
    if (obj[localizedKey]) {
      return obj[localizedKey];
    }
  }
  return obj[field] || '';
};
