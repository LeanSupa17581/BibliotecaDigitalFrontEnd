export interface Revista{
    _id: string,
    autor: string,
    titulo: string,
    edicion: string,
    descripcion: string,
    frecuencia: string,
    ejemplar: string,
    temas: [],
    palabrasClave: [],
    copias: number,
    disponibles: number,
    imagen: string,
    prestamo: number,
    busqueda: number
}