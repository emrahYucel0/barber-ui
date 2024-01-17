import { User } from "../models/user";

export interface TokenResultDto {
    token:string;
    user:User;
}