export interface JwtResponse {
    /*payload:{
        sub: string,
        nombre: string,
        usuario: string,
        iat: string,
        exp: string
    }*/
    token: string,
    rol: string,
    message: string
}
