export interface Question {
    consecutivo: number;
    nombre: string;
    respuestas: Answer[];
}

interface Answer {
    idPregunta: number;
    consecutivo: number;
    respuesta: any;
}