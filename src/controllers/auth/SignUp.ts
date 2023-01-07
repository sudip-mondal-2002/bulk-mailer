import {Request, Response} from "express";
import {BadRequestError} from "../../errors";
import bcrypt from "bcrypt";
import {UserEntity} from "../../entities";
import jwt from "jsonwebtoken";
import {HttpHeaders, HttpStatus} from "../../enums";
import {AppDataSource} from "../../ormconfig";

const userRepository = AppDataSource.getRepository(UserEntity);

export const signup = async (req: Request, res: Response) => {
    const {email, password, name} = req.body
    const existingUser = await userRepository.findOne({
        where: {
            email
        }
    })
    if (existingUser) {
        throw new BadRequestError("Email in use", "email")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new UserEntity(email, hashedPassword, name)
    await userRepository.save(user)

    const userJwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userJwt = jwt.sign(userJwtPayload, process.env.JWT_KEY!)

    res.status(HttpStatus.CREATED).set(HttpHeaders.AUTHORIZATION, userJwt).json(user)
}
