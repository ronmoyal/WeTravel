const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world',
        location:{
            lat:40.7484474,
            lng:-73.9871516
        },
        address:'20 W 34th St, New York, NY 10001',
        creator: 'u1'
    }
];

const getPlaceById = (req,res,next) => { // '/api/places/*pid*'
    const placeId = req.params.pid //{pid: 'p1'}
    const place = DUMMY_PLACES.find(p =>{
        return p.id===placeId;
    });


if(!place){
    throw new HttpError ('Could not find a place for the provided id.',404);
}
    res.json({place});
};

const getPlacesByUserId = (req,res,next) =>{
    const userId= req.params.uid;
    const places = DUMMY_PLACES.filter(p =>{
        return p.creator===userId;
    })

    if(!places || places.length === 0){
        return next(
            new Error ('Could not find a place for the provided user id.'),404);
    }
        res.json({places});
}

const createPlace =(req,res,next) => {
    const { title,description,cordinates,address,creator} = req.body;
    const createdPlace = {
        id:uuidv4(),
        title,
        description,
        location: cordinates,
        address,
        creator
    };
    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace});
};

const updatePlaceById = ((req,res,next)=>{
    const { title,description } = req.body;
    const placeId = req.params.pid;

    const updatePlace = {...DUMMY_PLACES.find(p => p.id === placeId)}; //create copy - change the copy - to change all the object together 
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatePlace.title=title;
    updatePlace.description=description;

    DUMMY_PLACES[placeIndex] = updatePlace ;

    res.status(200).json({place: updatePlace});

});

const deletePlace = ((req,res,next)=>{
    const placeId = req.params.pid;
    DUMMY_PLACES=DUMMY_PLACES.filter(p => p.id !==placeId);
    res.status(200).json({message: 'Deleted place'});
});

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;