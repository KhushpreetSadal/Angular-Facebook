export interface login{
    Email:string,
    Password:string,
    id:undefined|string
}
export interface signin{
    Name:string,
    Email:string,
    Image:string,
    Password:string,
    id:undefined|string
}
export interface post{
    title:string,
    image:string,
    username:string|undefined,
    userimage:string|undefined,
    likes:number|undefined,
    id:undefined|string,
}

export interface video{
    title:string,
    video:string,
    username:string|undefined,
    userimage:string|undefined,
    likes:number|undefined,
    id:undefined|string,

}

export interface friends{
    user:string,
    Name:string,
    Image:string,
    id:undefined|string

}

export interface Product{
    Image:string,
    Price:string,
    Description:string,
    Email:string|undefined
    id:undefined|string,
}