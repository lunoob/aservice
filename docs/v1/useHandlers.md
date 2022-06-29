# 使用响应处理器

响应处理器分为全局响应处理器和 request 对象的响应处理器，而处理器又分为

- 成功响应处理器
- 失败/错误响应处理器



## 全局响应处理器

### 成功响应处理器

#### createSuccessHandler

创建全局的成功响应处理器

```typescript
import { createSuccessHandler } from 'service'

createSuccessHandler((response) => {
  // to do something
  return response
})
```



#### deleteSuccessHandler

删除全局的成功响应处理器

```typescript
import { deleteSuccessHandler, createSuccessHandler } from 'service'

const code = createSuccessHandler((response) => {
  // to do something
  return response
})

deleteSuccessHandler(code)
```



#### clearSuccessHandler

清空所有已注册的全局成功响应处理器

```typescript
import { createSuccessHandler, clearSuccessHandler } from 'service'

createSuccessHandler(/** ...01 **/)
createSuccessHandler(/** ...02 **/)
createSuccessHandler(/** ...03 **/)

// 会将上述 3 个全局成功处理器全部删除
clearSuccessHandler()
```



### 失败/错误响应处理器

#### createErrorHandler

创建全局的失败/错误响应处理器

```typescript
import { createErrorHandler } from 'service'

createErrorHandler((error) => {
  // to do something
  return error
})
```



#### deleteErrorHandler

删除全局的失败/错误响应处理器

```typescript
import { deleteErrorHandler, createErrorHandler } from 'service'

const code = createErrorHandler((error) => {
  // to do something
  return error
})

deleteErrorHandler(code)
```



#### clearErrorHandler

清空所有已注册的全局失败/错误响应处理器

```typescript
import { createErrorHandler, clearErrorHandler } from 'service'

createErrorHandler(/** ...01 **/)
createErrorHandler(/** ...02 **/)
createErrorHandler(/** ...03 **/)

// 会将上述 3 个全局成功处理器全部删除
clearErrorHandler()
```



### 默认响应处理器

默认使用的全局响应处理器



#### defaultSuccessHandler

默认的成功响应处理器，调用顺序为最后一个，它的作用是将响应结果序列化为一个约定好的对象，格式如下

```typescript
interface ErrorResponse {
  status: number
  messgae: string
  data: any
}
```

**注意：**在创建 request 对象时，可以取消使用默认的失败/错误响应处理器



#### defaultErrorHandler

默认的失败/错误响应处理器，调用顺序为最后一个，它的作用是将响应结果序列化为一个约定好的对象，格式如下

```typescript
interface ErrorResponse {
  status: number | string
  messgae: string
  data: null
}
```

**注意：**在创建 request 对象时，可以取消使用默认的失败/错误响应处理器



## 内置响应处理器

#### errorLogHandler

将失败/错误信息打印在控制台

```typescript
import { errorLogHandler, createErrorHandler } from 'service'

// log 默认为 true
createErrorHandler(errorLogHandler({ log: true }))
```



## request 对象响应处理器

### 成功响应处理器

#### addSuccessHandler

增加成功响应处理器

```typescript
http.addSuccessHandler((response) => {
  // to do something
  return response
})
```



#### clearSuccessHandler(code)

删除成功响应处理器

```typescript
const code = http.addSuccessHandler((response) => {
  // to do something
  return response
})

http.clearSuccessHandler(code)
```



#### clearSuccessHandler

清空成功响应处理器队列

```typescript
http.clearSuccessHandler()
```



### 失败/错误响应处理器

#### addErrorHandler

增加失败/错误响应处理器

```typescript
http.addErrorHandler((error) => {
  // to do something
  return error
})
```



#### clearErrorHandler(code)

删除失败/错误响应处理器

```typescript
const code = http.clearErrorHandler((error) => {
  // to do something
  return error
})

http.clearErrorHandler(code)
```



#### clearErrorHandler

清空失败/错误响应处理器

```typescript
http.clearErrorHandler()
```

