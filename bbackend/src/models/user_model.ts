export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface UserCreate {
    name: string
    email: string
    password: string
    role: Role
}

export interface User extends UserCreate {
    id: number
    createdAt: Date
    updatedAt: Date
}