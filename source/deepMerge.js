'use strict';

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

  return Object.entries(obj2).reduce((accum, [key, newValue]) => { //делаем массив пар ключ 2го объекта + желаемое значение для результирующего объекта
    const currentValue = accum[key]; //смотрим какое текущее значение в первом объекте по текущему ключу 

    // Если оба значения по текущему ключу являются объектами (вынесено в хелпер), то объединяем (рекурсивно самой же deepMerge)
    if (isObject(currentValue) && isObject(newValue)) {
      accum[key] = deepMerge(currentValue, newValue);
    } else {
      // если нет, то перезаписываем значением из второго объекта
      accum[key] = newValue;
    }
    return accum;
  }, { ...obj1 });
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

