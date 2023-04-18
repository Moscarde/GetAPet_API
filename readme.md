# Get A Pet - BackEnd
<h1 align="center"><img src="pictures/header.png" alt="logo" width=700/></h1>
Get A Pet é uma aplicação web que permite a adoção de animais de estimação. O objetivo deste projeto é fornecer uma API de back-end para uma aplicação front-end que permita que usuários cadastrem ou adotem animais de estimação.

⚠️ Este projeto faz parte do curso de <a href="https://www.udemy.com/course/nodejs-do-zero-a-maestria-com-diversos-projetos/">Node.js do Matheus Battisti!</a> 


## Tecnologias 👩‍💻

- Node.Js
- Express
- MongoDB
- Mongoose
- Axios


## Configuração 🛠️

### Requisitos

- Node.js instalado
- MongoDB instalado e em execução
- Git instalado

### Instalação 

1. Clone este repositório e instale as dependencias

````
    git clone https://github.com/seu_usuario/get-a-pet-backend.git
    npm install
````

2. Configure as variáveis de ambiente em `./db/conn.js`

````
    await mongoose.connect('mongodb://127.0.0.1:27017/getapet')
````

3. Inicie o servidor

````
    npm start
````


## Endpoints

Os endpoints da aplicação estão localizados em ./routes. Alguns exemplos:

`GET /pets`

Retorna uma lista de animais de estimação disponíveis para adoção.

**Parâmetros**

Nenhum.

**Resposta**
````
{
"pets": [
    {
        "_id": "643dea4f823c5e2abd64dd6c",
        "name": "Doge",
        "age": 10,
        "weight": 12,
        "color": "Caramelo",
        "images": [
            "Nicolas-1681779279922-11.png",
            "Nicolas-1681779279925-62.png",
            "Nicolas-1681779279927-71.png"
        ],
        "available": true,
        "user": {
            "_id": "643dea37823c5e2abd64dd63",
            "name": "Nicolas",
            "phone": "12341234"
        },
        "createdAt": "2023-04-18T00:54:39.936Z",
        "updatedAt": "2023-04-18T00:54:58.538Z",
        "__v": 0
    },
]
}
````


`POST /users/register`

Cria um novo usuário.

**Parâmetros**

````
{
    "name": "LALA",
    "email": "lala@gmail.com",
    "phone": 1212341234,
    "password": "1234",
    "confirmPassword": "1234"
}
````

**Resposta**

````
{
    "message": "Você está autenticado",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTEFMQSIsImlkIjoiNjQzZGZmNzY5ZThhNzAzNTJiNGQ3NmMxIiwiaWF0IjoxNjgxNzg0Njk0fQ._7KzLWFhXP0co5JMnhYkEgKx1K1ut4uTvHm7wdbiHfw",
    "userId": "643dff769e8a70352b4d76c1"
}
````