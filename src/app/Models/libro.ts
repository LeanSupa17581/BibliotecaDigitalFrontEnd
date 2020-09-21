export interface Libro {
    _id: string,
    autor: string,
    titulo: string,
    edicion: string,
    palabrasClave: [],
    descripcion: string,
    temas: [],
    copias: number,
    disponibles: number,
    imagen: string,
    image: File,
    prestamo: number,
    busqueda: number
}