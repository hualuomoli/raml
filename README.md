# RAML API


# 如何使用

Raml设计器依赖`Nodejs`，使用前请先确认已经安装<br>
安装API设计器 `npm install -g api-designer`<br>
安装API转换器 `npm install -g raml2html`<br>

# 文档结构
    schema    存放schema文件
    doc       存放阅读文档
    script    脚本和生成的html文档

# RAML
-----------

RAML 是一种 RESTful API 的建模语言。

RAML 规格说明：[http://raml.org/spec.html](http://raml.org/spec.html)

RAML 基础文档：[http://raml.org/docs.html](http://raml.org/docs.html)

RAML 进阶文档：[http://raml.org/docs-200.html](http://raml.org/docs-200.html)

# JSON Schema
-----------

JSON Schema 是一种用于描述/验证 JSON 数据的结构的声明方式.

官网: http://json-schema.org/

学习文档: http://spacetelescope.github.io/understanding-json-schema/

在线验证: http://jsonschema.net/#/

# 服务端
-----------

使用[生成器](https://github.com/hualuomoli/raml-parser-nodejs)生成基于Nodejs的服务端

# 脚本
-----------

script目录下为脚本文件，设计raml的API时，使用相同的头信息，使用script\script.bat生成统一api.raml和文档script\index.html
```
#%RAML 0.8
title: RAML
baseUri: http://server/api/
version: v0.1
mediaType: application/json

documentation:
  - title: Getting Started 
    content: !include doc/getting-started.md
    
schemas:
  - respWithoutDataSchema: !include schema/resp-without-data.schema
  - respWithDataSchema: !include schema/resp-with-data.schema
  - respErrorSchema: !include schema/resp-error.schema
  - pagedSchema: !include schema/paged.schema

traits:
  # 接口响应中不包含data
  - respWithoutData:
      responses:
        200:
          body:
            application/json:
              schema: respWithoutDataSchema
              example: |
                {
                  "code": "0"
                }
  # 接口响应中包含data
  - respWithData:
      responses:
        200:
          body:
            application/json:
              schema: <<exampleSchema>>
              example: |
                {
                  "code": "0",
                  "data" : <<exampleData>>
                }
   # 接口响应错误
  - respError:
      responses:
        500:
          body:
            application/json:
              schema: respErrorSchema
              example: |
                {
                  "code": "9",
                  "msg" : <<msg>>
                }
  # 接口响应的描述
  - responseDesc:
      responses:
        200:
          description: <<desc>>
  # 分页
  - paged:
      queryParameters:
          pageNumber:
            displayName: pageNumber
            description: 查询的页面编码，从1开始.如第六页=6
            type: integer
            minimum: 1
            required: false
            default: 1
            example: 6
          pageSize:
            displayName: pageSize
            description: 查询页面每页显示数据数量，如每页显示二十条数据=20
            type: integer
            maximum: 10 
            required: false
            default: 10
            example: 20
      responses:
        200:
          body:
            application/json:
              schema: <<exampleSchema>>
              example: |
                {
                  "code" : "0",
                  "data" : {
                    "pageNumber" : 1,
                    "pageSize" : 20,
                    "totalRow" : 362,
                    "list" : <<exampleList>>
                  }
                }
 

  # 查询用户权限
  - queryToken:
      queryParameters:
        username:
          displayName: username
          description: 用户唯一标志，使用32位UUID
          type: string
          required: true
          example: 72297c8842604c059b05d28bfb11d10b
        token:
          displayName: token
          description: 用户令牌
          type: string
          required: true
          example: 245accec3c124642967fe476cef558c4
  - bodyToken:
      body:
        application/x-www-form-urlencoded:
          formParameters:
            username:
              displayName: username
              description: 用户唯一标志，使用32位UUID
              type: string
              required: true
              example: 72297c8842604c059b05d28bfb11d10b
            token:
              displayName: token
              description: 用户令牌
              type: string
              required: true
              example: 245accec3c124642967fe476cef558c4
```