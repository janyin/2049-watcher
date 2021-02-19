---
title: '作用域链scope chain，闭包closure'
excerpt: 'JS引擎在执行代码时候，会专门有一个执行环境栈。最初push进去的为全局执行上下文，代码执行遇到局部作用域（{}语句、函数等）时就会生成其相应的执行上下文并push进去，执行完毕就会pop出栈。一直到最后，全局执行上下文被pop出栈时，那么当前执行环境栈为空，即此JS脚本运行完毕！'
coverImage: '/assets/blog/default/cover.png'
date: '2020-03-23'
author:
  name: Red Yin
  picture: '/assets/blog/authors/red.jpeg'
ogImage:
  url: '/assets/blog/default/cover.png'
---

JS引擎在执行代码时候，会专门有一个执行环境栈。最初push进去的为全局执行上下文，代码执行遇到局部作用域（{}语句、函数等）时就会生成其相应的执行上下文并push进去，执行完毕就会pop出栈。一直到最后，全局执行上下文被pop出栈时，那么当前执行环境栈为空，即此JS脚本运行完毕！

> 执行函数时会push进去此函数的执行上下文。和全局执行上下文唯一不同的是，函数执行上下文不需要初始化全局对象，而是会创建一个arguments对象（一个储存了函数所有的参数变量数组）。

**调用一个变量时，如果在当前执行环境中未找到相应的值，则会沿着执行环境栈里的顺序，依次向上寻找变量，一直到栈顶即全局执行环境为止。如在环境找到变量，就立即返回相应值，不再往上寻找。这一寻找过程的链称为作用域链（Scope Chain）**

按照执行环境栈的道理，通常情况下，外部环境无法访问一个局部作用域环境的变量。例如：

```JavaScript
{
 let a = {};
}
console.log(a); //ReferenceError
```

而有一种特殊情况，一个函数返回的值是一个函数。例如：

```JavaScript
function outer(){
    let a = {};

    function inner(){
      console.log(a);
    }

    return inner;
}

let b = outer();
```

在这里执行outer函数，并把返回值赋值给b.那么b变量就是inner函数，而且会保留对outer函数内部环境的引用。以此现在全局执行环境可以通过b变量访问outer函数内部的变量。

**闭包（closure）是指内部函数总是可以访问其所在的外部函数中声明的变量和参数，即使外部函数已经被返回了，就是外部函数执行调用完了之后。**