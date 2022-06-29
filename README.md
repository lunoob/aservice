<p align="center">
    <img width="300px" src="https://s1.ax1x.com/2022/06/29/jmacwt.png" />
</p>

<p align="center">
    <a href="https://codecov.io/gh/lunoob/aservice" > 
        <img src="https://codecov.io/gh/lunoob/aservice/branch/main/graph/badge.svg?token=94ASUVK46R"/> 
    </a>
</p>

> 遵循开放封闭原则，对 axios 拓展，增强其功能



## 安装

`npm`

```shell
npm install axios a-service
```

`yarn`

```shell
yarn add axios a-service
```

`pnpm`

```shell
pnpm add axios a-service
```



需要同时安装 axios 和 a-service，因为 a-service 依赖于 axios



## 特性

1. 请求路径支持动态路径参数
2. 统一成功与错误的响应体
4. 支持 TypeScript
4. FormData 也支持动态参数
4. 支持全局注册请求/响应拦截器
4. 支持全局注册成功/失败响应处理器
4. 实例支持单独设置拦截器
4. 实例支持单独设置处理器
4. 调整 axios 拦截器的执行顺序
4. 拦截器与处理器统一的使用方式



## 全局API

- [创建 request 对象](/docs/v1/create.md)
- [拦截器](/docs/v1/useInterceptor.md)
- [响应处理器](/docs/v1/useHandlers.md)



## 使用

### 普通使用

1. 创建实例

   ```typescript
   import { createRequest } from 'serivce'
   
   const http = createRequest({ baseURL: '/api' })
   ```

   

2. 发起请求

   ```typescript
   // 请求需要携带的参数
   const params = {
     name: 'luoob'
   }
   
   // 请求需要的配置，具体请参考 axios 请求配置
   const config = {}
   
   await http.request('get', '/data')(params[, config])
   ```

   

3. 接受数据

   ```typescript
   const result = await http.request('get', '/data')(params)
   
   // 返回的响应数据结构如下，无论是成功还是失败，统一都是以下结构
   interface result {
     status: number
     data: any
     message: string
   }
   ```

   

### 使用动态路径参数

#### 正常情况

当 URL 路径上需要支持动态参数时，这很有用。

例如：/list/id，id 为动态时，可以写为 /list/:id

那么就可以按以下写法以支持动态参数：

```typescript
http.request('get', '/list/:id')({
  _id: 123,
  name: 'xxx',
  age: 18
})
```



上述代码最终发起请求时的 URL 路径实际为：/list/123

如果请求方法是 post、put 等时，携带的参数为

```typescript
{
  name: 'xxx',
  age: 18
}
```



如果请求方法是 get、delete 等时，携带的参数为

```typescript
?name=xxx&age=18
// 会拼接在 url 路径上
```



#### 冲突情况

假如要传递的参数中也是以 `_xxx` 的形式，与动态 URL 冲突时。可换成以下这种写法

```typescript
const params = {
  _id: 123,
  name: 'xxx',
  age: 18
}

const config = {
  dynamic: {
    _id: 456
  }
}

http.request('get', '/list/:id')(params, config)
```

最终的 URL 将会是：`/list/456`，而不是 `/list/123`



#### FormData

```typescript
const fd = new FormData()
fd.append('file', file)

const config = {
  dynamic: {
    _id: '123'
  }
}

http.request('get', '/list/:id/upload')(fd, config)
// url => /list/123/upload
```



## 拦截器

axios 自带的拦截器功能，它的执行顺序是：

- request 拦截器执行顺序：先添加的拦截器后执行，**类似栈的数据结构**
- response 拦截器执行顺序：先添加的拦截器先执行，**类似队列的数据结构**



对于两者的执行顺序不一致的问题，我们对它进行了改进：

- request 拦截器执行顺序：先添加的拦截器先执行

- response 拦截器执行顺序：先添加的拦截器先执行

  

[<img src="https://s1.ax1x.com/2022/06/28/jmFyl9.md.png" alt="jmFyl9.md.png"  />](https://s1.ax1x.com/2022/06/28/jmFyl9.png)



**注意：**

1. 当需要使用全局拦截器时，请务必先创建全局拦截器。然后再创建 request 对象

2. 创建 request 对象上专属拦截器时，需要在请求发起之前进行创建



## 响应处理器

执行顺序和拦截器一致，均为先添加的先执行



**注意：**

1. 当需要使用全局响应处理器时，请务必先创建全局响应处理器。然后再创建 request 对象

2. 创建 request 对象上专属响应处理器时，需要在请求发起之前进行创建



## 注意

在使用原生 axios 拦截器的时候。axios 本身与 axios 实例两个是独立的，并不会出现继承的情况.

假如现在在 axios 上注册了一个请求前的拦截器，随后实例化一个 axios 实例 A.

打印 A 的拦截器列表可以发现，并没有自动继承之前在 axios 本身注册的拦截器.