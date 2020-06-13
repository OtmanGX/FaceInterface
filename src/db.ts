// CONSTANTS
const SUCCESS_MSG = 'L\'opération est s\'effectuée avec succès';
const ERROR_MSG = 'Il y\'avais une erreur';

export { SUCCESS_MSG, ERROR_MSG } ;

export interface Person {
    id?: number;
    name:string;
    avatar?;
    matricule?:string;
    age?:number;
    labels?;
    active?:boolean;
    created_at?:Date;
    last_updated?:Date;
}

const emptyPerson: Person = {name:'',age:null,avatar:'',matricule:''}

export {emptyPerson}