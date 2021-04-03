---
title: '神秘人this到底是谁'
excerpt: 'JavaScript不同场景下的this理解'
date: '2020-03-21'
author:
  name: Red Yin
  picture: '/assets/red.jpeg'
ogImage:
  url: ''
---

在 JavaScript 函数中 this 指的是什么？有以下五种情景规则去判断：

**1. 隐式绑定 2. 显式绑定 3. new 绑定 4. 箭头函数 5. 默认的 window**

## 隐式绑定

据不可靠调查，有 80%的 this 都是这种情景。

```JavaScript
let user = {
    name: 'Tom',
    getName() {
        alert(`My name is ${this.name}`);
    }
};

user.getName(); //My name is Tom
```

首先看 this 所在的函数，找到其被调用的地方。如果函数调用的地方左边有个'点符号'，那么'点符号'左边的对象就是 this 所指。

简单说就是：**this 指的就是点符号左边的对象**；

这就是隐式绑定 this,这种情况并没有明确的指定 this 是什么，需要你去寻找函数是被谁调用的。

## 显式绑定

那不是 80%的其他情况就是下面这些。

```JavaScript
let user = {
    name: 'Tom'
};

function getName() {
    alert(`My name is ${this.name}`);
}
```

咱们这个函数不在对象的属性里，而是“独立函数”。那现在调用这个函数需要 user 里的属性怎么办？
JS 中的所有函数都可以调用一种方法，可以让函数指定 this 的值。其实是 3 种方法：call(), apply(), bind();

```JavaScript
getName.call(user);
```

上面的代码通过 call 方法指定函数 getName 内的 this 为 user 对象，那么就会输出"My name is Tom";
同理，call(), apply(), bind()都是为函数指定 this 的方法，第一个参数均为 this 的值；

### 不同点

**1. call 方法从第二个参数开始（如果有），一直到最后均为传入函数的参数； 2. apply 方法第二个参数为传入函数的参数数组，和 call 不同的是它把所有参数放进了一个数组中传进函数中。 3. bind 方法和 call 参数使用定义完全相同，不同的是它不会立即调用运行函数，而是返回一个拥有指定 this 和初始参数的原函数的拷贝**

通过以上三种方法指定了函数的 this 值，有明显的指定，所以说为显式绑定。

## new 绑定

```JavaScript
function Person(name) {
    this.name = name;
}

let Tom = new Person('Tom');
console.log(Tom.name); //Tom
```

如果函数前面有**new 关键词**，那么 this 所指的是通过 new 创建出来的新对象。在上面代码中，this 指的是 Tom 对象，Tom 对象就是通过 new 创建出的新对象。
所以在上面例子中，this.name 就会转化为 Tom.name;

## 箭头函数的 this

箭头函数中没有 this,也没有 arguments 对象。

```JavaScript
let user = {
    name: 'Tom',
    getName: () => {
        console.log(this.name);
    }
};
var name = 'Mary';

//Mary 非严格模式下
console.log(user.getName());
```

根据我们上面的经验，按道理应该输出'Tom'。但是由于箭头函数中不存在 this，它会和寻找变量一样去沿着作用域链往上寻找值。
简单说：**箭头函数中 this 指向的是父级的作用域；**
这里的父级作用域就是全局环境，this.name 就会转化为 window.name（浏览器环境）,即值为 Mary。

## 不严格的 window

```JavaScript
var name = 'Mary';

function printName(){
    console.log(this.name);
}

printName();//Mary 非严格模式下
```

在非严格模式下，咱们在调用函数的时候，前面几种情景都不是。调用函数前面没有"点符号"、"new 关键词"，后面没有 call 这类的。
**光秃秃的调用函数，在非严格模式下 this 所指的就是 window 对象（浏览器环境），严格模式下 this 为 undefined.**

以上就是五种 this 使用的情景。
