// src/models/catModel.js

class CatModel {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.energy_level = data.energy_level;
        this.hairless = data.hairless;
        this.image_url = data.image_url;
        this.intelligence = data.intelligence;
        this.life_span = data.life_span;
        this.origin = data.origin;
        this.reference_image_id = data.reference_image_id;
        this.temperament = data.temperament;
        this.weight = data.weight;
    }
}

export default CatModel;
