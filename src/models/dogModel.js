// src/models/dogModel.js

class DogModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.bred_for = data.bred_for;
        this.breed_group = data.breed_group;
        this.description = data.description;
        this.energy_level = data.energy_level;
        this.height = data.height;
        this.image_url = data.image_url;
        this.intelligence = data.intelligence;
        this.life_span = data.life_span;
        this.origin = data.origin;
        this.reference_image_id = data.reference_image_id;
        this.temperament = data.temperament;
        this.weight = data.weight;
    }
}

export default DogModel;
