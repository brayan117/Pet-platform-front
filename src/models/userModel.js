// src/models/userModel.js

class UserModel {
    constructor(data) {
        this.id = data.id;
        this.mascotasFavoritas = data.mascotasFavoritas;
        this.mascotasRecomendadas = data.mascotasRecomendadas;
        this.nombre = data.nombre;
        this.perfilEncuesta = data.perfilEncuesta;
    }
}

export default UserModel;
