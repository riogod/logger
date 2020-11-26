## Install

clone repo and type ``yarn`` in console

## Run

``yarn start``

## Annotation
Логгер реализован в виде отдельного модуля, который находиться в `packages/ts-lib-logger`.
и может подключаться в любой проект.
В модуле реализованны патерны singleton и Pub-Sub.

Логика работы модуля ts-lib-logger: 
 - Вешаем event listener на событие 'error
 - По событию вызываем вывод объекта ошибки в консоль и отправку всем подписчикам.

В логгируемом проекте неодходимо инициализировать логгирование по средством создания инстанса класса Logger в начале index.js/.ts:

```
import { Logger } from 'ts-lib-logger'

new Logger();
```

Что бы получить событие - необходимо подписаться на них :
```
import { Logger } from 'ts-lib-logger'

Logger.getInstance().subscribe((data) => {
  ...
})
```

С тестами под ts пока все сложно :( не смог с наскока реализовать - необходимы вдумчивое чтение доков & практика.

p.s.: в CRA Env development есть особенность - если кидать exeption то он выкидывается два раза. В production - нормальная работа. 
