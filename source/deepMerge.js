/**
 * Функция для слияния двух объектов
 * @param {Object} obj1 первый объект 
 * @param {Object} obj2 второй объект 
 * 
 * @example
 * // returns {a: 1, b: {c: 3, d: 4}, e: 5}
 * deepMerge({a: 1, b: {c: 2}}, {b: {c: 3, d: 4}, e: 5});
 * 
 * @returns {Object} объект-результат слияния
 */
const deepMerge = (obj1, obj2) => {

  if (typeof obj1 !== 'object' || obj1 === null) {
    obj1 = {};
  }

  if (typeof obj2 !== 'object' || obj2 === null) {
    obj2 = {};
  }

  const result = { ...obj1 }; // делаем копию первого объекта как предварительный результат обработки 

  for (const key in obj2) { //для каждого ключа из второго объекта
    const currentValue = result[key]; //смотри какое текущее значение в первом объекте по текущему ключу 
    const newValue = obj2[key]; //смотрим каким мы хотим его видеть по текущему ключу

    // Если оба значения по текущему ключу являются объектами (вынесено в хелпер), то объединяем (рекурсивно самой же deepMerge)
    if (isObject(currentValue) && isObject(newValue)) {
      result[key] = deepMerge(currentValue, newValue);
    } else {
      // если нет, то перезаписываем значением из второго объекта
      result[key] = newValue;
    }
  }

  return result;
};

/**
 * Хелпер для проверки, является ли значение объектом
 * @param {any} value значение 
 * @returns {boolean} true если значение - типа объект + не массив + не пустое + исключаем любой другой конструктор, кроме Object (для исключания Data, Regex)
 */
const isObject = value =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  value.constructor === Object;

