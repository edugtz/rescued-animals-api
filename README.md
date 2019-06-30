# Rescued Animals 

### Prerequisites

In order to be able to run the app you will need to install the following before:

- [Node.js](https://nodejs.org/en/)
- [Sequelize CLI](http://docs.sequelizejs.com/manual/migrations.html#installing-cli)
- [PostgreSQL](https://www.postgresql.org/download/)

### Getting Started
Follow next instructions to be able to clone this project and run it locally.

1. First download the project by cloning the repository
```
git clone https://github.com/edugtz/rescued-animals-api.git
```

2. Go to project **root** folder
```bash
cd rescued-animals-api
```

3. Inside the **root** folder run the following command to install all the necessary dependencies:
```bash
npm install
```

4. Finally just run the app with:
```bash
npm start or npm run start:dev
```

The **app** will start running on `http://localhost:8080`

### Important note

The app is intended to work with some Amazon Web Services features, therefore you would need to have the 
necessary access credentials to be able to run the app properly, but you can always give it a try to the
deployed version: 
- [https://rescued-animals-api.herokuapp.com/api/](https://rescued-animals-api.herokuapp.com/api/)

## Route list
### Register a new animal
#### POST /animals/

Example: https://rescued-animals-api.herokuapp.com/api/animals

```javascript
{
    name: 'Terry',
    species: 'Dog',
    image: picture.jpg,
    age: 1,
    breed: 'Bulldog',
    color: 'White',
    location: 'Guadalajara'
}
```

### Get list of animals
#### GET /animals/

Example: https://rescued-animals-api.herokuapp.com/api/animals

### Get an specific animal
#### GET /animals/:id

Example: https://rescued-animals-api.herokuapp.com/api/animals/12

### Delete an existing animal
#### DELETE /animals/:id

Example: https://rescued-animals-api.herokuapp.com/api/animals/2

### Update an existing animal
#### DELETE /animals/:id

Example: https://rescued-animals-api.herokuapp.com/api/animals/3
