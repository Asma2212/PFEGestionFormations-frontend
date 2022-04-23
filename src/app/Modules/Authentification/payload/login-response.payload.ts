import {Roles} from "../../../models/Roles";

export class LoginResponsePayload{
    accessToken: string;
    username: string;
    roles :Array<string>;

}
