# firebase

[![Webpack](https://img.shields.io/badge/Webpack-5.6.0-61DAFB?style=for-the-badge)](https://webpack.js.org/)
[![firebase](https://img.shields.io/badge/firebase-9.6.1-6cc644?style=for-the-badge)](https://github.com/firebase/firebase-js-sdk)
[![Лицензия](https://img.shields.io/github/license/kluevevga/FashionEmporium?color=6cc644&style=for-the-badge)](https://github.com/kluevga/FashionEmporium/blob/master/LICENSE)

## О проекте

Проект посвящен изучению работы с Firebase, а также включает в себя операции по добавлению, удалению и изменению данных
в базе. Для облегчения работы с Firebase была разработана простая HTML-форма, которая позволяет удобно отправлять данные
в базу. Моя цель в этом проекте - освоить работу с Firebase и продемонстрировать, как можно взаимодействовать с ней с
использованием этой формы.

## Установка

1. **Склонируйте репозиторий**

   ```bash
   git clone https://github.com/kluevevga/firebase.git
   ```

2. **Перейдите в каталог проекта**

   ```bash
   cd firebase
   ```

3. **Установите зависимости**

   ```bash
   npm install
   ```


4. **Запуск проекта**

   ```bash
   npm start
   ```
   Webpack Dev Server запустит проект в браузере, проект будет доступен по адресу `http://localhost:8080`

## Дополнительные настройки

В проекте используется firebase-name === test.  
Для работы необходимо настроить Rules, пример:

```config
   rules_version = '1';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if
             request.time < timestamp.date(2050, 12, 1);
       }
     }
   }
```

## Лицензия 📜

Этот проект распространяется под лицензией `MIT`. Дополнительную информацию можно найти в
файле [LICENSE](https://github.com/kluevevga/firebase/blob/master/LICENSE).