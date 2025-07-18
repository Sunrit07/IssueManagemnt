export interface User{
    name:string,
    email:string,
    userName:string,
    password:string,
    confirmPassword:string,
    dob:string,
    city:string,
    country:string,
    acceptTerms:boolean,
    role:'user' | 'resolver'
}