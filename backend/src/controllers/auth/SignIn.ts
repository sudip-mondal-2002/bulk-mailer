import {Request, Response} from "express";
import {UnauthorizedError} from "../../errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {HttpHeaders, HttpStatus} from "../../enums";
import {AppDataSource} from "../../ormconfig";
import {UserEntity} from "../../entities";
import {UserJwtPayload} from "../../payloads";
const userRepository = AppDataSource.getRepository(UserEntity);

export const signin = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const existingUser = await userRepository.findOne({
        where: {
            email
        }
    })
    if (!existingUser) {
        throw new UnauthorizedError()
    }
    const passwordsMatch = await bcrypt.compare(password, existingUser.password)
    if (!passwordsMatch) {
        throw new UnauthorizedError()
    }
    const userJwtPayload: UserJwtPayload = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userJwt = jwt.sign(userJwtPayload, process.env.JWT_KEY!)

    res.status(HttpStatus.OK).set(HttpHeaders.AUTHORIZATION, userJwt).json(existingUser)
}