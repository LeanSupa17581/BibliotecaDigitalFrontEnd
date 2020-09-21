export interface Prestamo{
    _id: string,
    fechaPrestamo: Date,
    libroP: Boolean,
    revistaP: Boolean,
    libro: string,
    revista: string,
    devolucion: Boolean,
    fechaDevolucion: Date,
    usuario: string
}