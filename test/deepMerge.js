'use strict';

QUnit.module("Тестируем функцию deepMerge", function () {
    QUnit.test("Работает правильно с вложенными объектами", function (assert) {
        const source = {
            user: {
                name: "Alice",
                age: 25,
                address: {
                    city: "Wonderland",
                    zip: 12345
                }
            },
            hobbies: ["reading", "gaming"]
        };

        const target = {
            user: {
                age: 30,
                address: {
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const expected = {
            user: {
                name: "Alice",
                age: 30,
                address: {
                    city: "Wonderland",
                    zip: 12345,
                    country: "Fantasyland"
                }
            },
            hobbies: ["traveling"],
            isActive: true
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно работать правильно с вложенными объектами");
    });

    QUnit.test("Работает правильно с невложенными объектами", function (assert) {
        const source = {
            name: "Алиса",
            age: 25,
        };

        const target = {
            age: 30,
            isInWonderland: true,
        };

        const expected = {
            name: "Алиса",
            age: 30,
            isInWonderland: true,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно правильно перезаписывать ключи");
    });

    QUnit.test("Работает с пустым исходным объектом", function (assert) {
        const source = {
            name: "Алиса",
            age: 25
        };

        const target = {};

        const expected = {
            name: "Алиса",
            age: 25,
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно возвращать исходный объект при отсутствии второго");
    });

    QUnit.test("Работа с null значением в первом объекте", function (assert) {
        const source = null;

        const target = {
            name: "Алиса",
            age: 25
        };

        const expected = {
            name: "Алиса",
            age: 25
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно вернуть второй объект при null первом")
    });

    QUnit.test("Работа с null значением во втором объекте", function (assert) {
        const source = {
            city: "Wonderland",
            zip: 12345,
            country: "Fantasyland"
        };

        const target = null;

        const expected = {
            city: "Wonderland",
            zip: 12345,
            country: "Fantasyland"
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно вернуть первый объект при null втором")
    });

    QUnit.test("Работа с undefined значением в первом объекте", function (assert) {
        const source = undefined;

        const target = {
            city: "Wonderland",
            zip: 12345,
            country: "Fantasyland"
        };

        const expected = {
            city: "Wonderland",
            zip: 12345,
            country: "Fantasyland"
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно вернуть второй объект, когда первый = undefined");
    });

    QUnit.test("Работа с undefined значением во втором объекте", function (assert) {
        const source = {
            city: "Анапа",
            country: "Россия"
        };

        const target = undefined;

        const expected = {
            city: "Анапа",
            country: "Россия"
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно вернуть первый объект, когда второй = undefined");
    });

    QUnit.test("Работа с null и undefined значениеми в обоих объектах", function (assert) {
        const source = null;

        const target = undefined;

        const expected = {};
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно вернуть пустой объект когда оба аргумента = null или undefined");

    });

    QUnit.test("Работа с примитивными типами: число", function (assert) {
        const source = 42;

        const target = {
            name: "Виктория Ширяева",
            job: "Центральный функциональный руководитель"
        };

        const expected = {
            name: "Виктория Ширяева",
            job: "Центральный функциональный руководитель"
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно вернуть второй объект, когда первый - число");
    });

    QUnit.test("Работа с примитивными типами: строка", function (assert) {
        const source = {
            name: "Shana Dale",
            phone: "1-936-264-2446",
            email: "pretium@icloud.ca",
            country: "Chile",
            list: 5
        };
        const target = "invalid target";

        const expected = {
            name: "Shana Dale",
            phone: "1-936-264-2446",
            email: "pretium@icloud.ca",
            country: "Chile",
            list: 5
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно вернуть первый объект, когда второй - число");
    });

    QUnit.test("Работа с примитивными типами: boolean", function (assert) {
        const source = false;

        const target = {
            user: {
                name: "Kylynn West",
                phone: "(755) 648-9177",
                preferences: {
                    theme: "dark",
                    language: "ru",
                    notifications: true
                }
            }
        };

        const expected = {
            user: {
                name: "Kylynn West",
                phone: "(755) 648-9177",
                preferences: {
                    theme: "dark",
                    language: "ru",
                    notifications: true
                }
            }
        };

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно вернуть второй объект, когда первый - boolean");
    });


    QUnit.test("Работа с примитивными типами: оба объекта - примитивные типы", function (assert) {
        const source = "nomercy";

        const target = 0;

        const expected = {};

        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Должно вернуть пустой объект");
    });

    QUnit.test("Работает со специальными объектами разного уровня вложенности: Date", function (assert) {
        const source = {
            registration: new Date('2023-01-01T10:00:00Z'),
            user: {
                birth: new Date('1990-05-15T00:00:00Z'),
                lastPurhase: {
                    paid: new Date('2023-12-01T15:30:00Z')
                }
            }
        };

        const target = {
            registration: new Date('2024-01-01T12:00:00Z'),
            user: {
                birth: new Date('1995-08-20T00:00:00Z'),
                lastPurhase: {
                    paid: new Date('2024-01-10T09:45:00Z')
                }
            }
        };

        const expected = {
            registration: target.registration,
            user: {
                birth: target.user.birth,
                lastPurhase: {
                    paid: target.user.lastPurhase.paid
                }
            }
        };

        const result = deepMerge(source, target);
        assert.strictEqual(result.registration, target.registration, "Date объекты верхнего уровня заменены");
        assert.strictEqual(result.user.birth, target.user.birth, "Вложенные Date объекты заменены");
        assert.strictEqual(result.user.lastPurhase.paid, target.user.lastPurhase.paid, "Дальше вложенные Date объекты заменены");
    });

    QUnit.test("Работает со специальными объектами разного уровня вложенности: RegExp", function (assert) {
        const source = {
            validation: /^[a-z]+$/,
            user: {
                usernamePattern: /^[a-zA-Z0-9_]{3,20}$/,
                security: {
                    passwordRegex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
                }
            }
        };

        const target = {
            validation: /^[a-z0-9]+$/,
            user: {
                usernamePattern: /^[a-zA-Z0-9_-]{4,25}$/,
                security: {
                    passwordRegex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{10,}$/
                }
            }
        };

        const expected = {
            validation: target.validation,
            user: {
                usernamePattern: target.user.usernamePattern,
                security: {
                    passwordRegex: target.user.security.passwordRegex
                }
            }
        };

        const result = deepMerge(source, target);
        assert.strictEqual(result.validation, target.validation, "RegExp объекты верхнего уровня заменены");
        assert.strictEqual(result.user.usernamePattern, target.user.usernamePattern, "Вложенные RegExp объекты заменены");
        assert.strictEqual(result.user.security.passwordRegex, target.user.security.passwordRegex, "Дальше вложенные RegExp объекты заменены");
    });

    QUnit.test("Работает со смешанными специальными объектами: Date и RegExp", function (assert) {
        const source = {
            createdAt: new Date('2023-06-01T00:00:00Z'),
            validation: /^[a-z]+@[a-z]+\.[a-z]+$/,
            settings: {
                startDate: new Date('2023-01-01T00:00:00Z'),
                patterns: {
                    search: /search_old/,
                    validation: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
                }
            }
        };

        const target = {
            createdAt: new Date('2024-06-01T00:00:00Z'),
            validation: /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/,
            settings: {
                startDate: new Date('2024-01-01T00:00:00Z'),
                patterns: {
                    search: /search_new/,
                    validation: /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$/
                }
            }
        };

        const expected = {
            createdAt: target.createdAt,
            validation: target.validation,
            settings: {
                startDate: target.settings.startDate,
                patterns: {
                    search: target.settings.patterns.search,
                    validation: target.settings.patterns.validation
                }
            }
        };

        const result = deepMerge(source, target);

        assert.strictEqual(result.createdAt, target.createdAt, "Date объекты заменены");
        assert.strictEqual(result.settings.startDate, target.settings.startDate, "Вложенные Date объекты заменены");
        assert.strictEqual(result.validation, target.validation, "RegExp объекты заменены");
        assert.strictEqual(result.settings.patterns.validation, target.settings.patterns.validation, "Вложенные RegExp объекты заменены");
    });

    QUnit.test("Работает с пустыми объектами", function (assert) {
        const source1 = {};
        const target1 = {};
        const expected1 = {};
        const result1 = deepMerge(source1, target1);
        assert.deepEqual(result1, expected1, "Два пустых объекта должны возвращать пустой объект")
    });

    QUnit.test("Работает с частично пустыми объектами", function (assert) {
        const source = {
            name: "Алиса",
            age: null,
            address: {},
            hobbies: []
        };
        const target = {
            age: 25,
            address: {
                city: "Москва"
            },
            hobbies: ["серфинг"],
            isActive: true
        };
        const expected = {
            name: "Алиса",
            age: 25,
            address: {
                city: "Москва"
            },
            hobbies: ["серфинг"],
            isActive: true
        };
        const result = deepMerge(source, target);
        assert.deepEqual(result, expected, "Частично пустые объекты перезаписываются");
    });
});

