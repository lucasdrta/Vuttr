import { Request, Response } from 'express';
import { User } from '../models/user';
import AuthService from '../services/auth';

export class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).send(newUser);
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: error.message,
      });
    }
  }

  public async authenticate(
    req: Request,
    res: Response
  ): Promise<void | undefined> {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).send({
        code: 401,
        message: 'User not found',
      });
    }

    if (!(await AuthService.comparePasswords(password, user.password))) {
      res.status(401).send({
        code: 401,
        message: 'Password does not match!',
      });
    }

    const token = AuthService.generateToken(user.toJSON());
    res.status(200).send({ token });
  }
}
