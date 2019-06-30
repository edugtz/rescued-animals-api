const createdAt = new Date();
const updatedAt = new Date();

module.exports = [
    { 
        id: 1,
        location: 'Guadalajara',
        publication_date: createdAt,
        animal_id: 1,
        picture: 'https://rescued-animals-assets.s3-us-west-1.amazonaws.com/puppy-1207816_960_720.jpg',
        createdAt,
        updatedAt
     },
     { 
        id: 2,
        location: 'Zapopan',
        publication_date: createdAt,
        animal_id: 2,
        picture: 'https://rescued-animals-assets.s3-us-west-1.amazonaws.com/schafer-dog-3388580_960_720.jpg',
        createdAt,
        updatedAt
     }
];