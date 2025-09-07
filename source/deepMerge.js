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

  if (!isObject(obj1)) {
    obj1 = {};
  }

  if (!isObject(obj2)) {
    obj2 = {};
  }

  const result = { ...obj1 }; // делаем копию первого объекта как предварительный результат обработки 

  for (const key in obj2) { //для каждого ключа из второго объекта
    const currentValue = result[key]; //смотрим какое текущее значение в первом объекте по текущему ключу 
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
 * @returns {boolean} true если значение - типа объект + не массив + не пустое + исключаем специальные объекты Date, Regex, Set, Map
 */
const isObject = value => {
  if (typeof value !== 'object' || 
     value === null ||
      Array.isArray(value)
    ) {
    return false;
  }
  
  if (value instanceof Date ||
      value instanceof RegExp ||
      value instanceof Map ||
      value instanceof Set
    ) {
    return false;
  }
 
  return true; //если выше всё гуд, то остальное пропускаем к обработке
  
};

