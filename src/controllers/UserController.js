import User from "../models/User";
import { createPasswordHash } from "../services/auth";


class UserController {

    async index(req, res) {
        try {
            const users = await User.find();
            return res.json(users);

        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: "Internal server error." })

        }

    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "user not found." });
            }

            return res.json(user);

        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ error: "Internal server error." })
        }
    }

    async create(req, res) {

        try {

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user) {
                return res
                    .status(422)
                    .json({ message: `User ${email} already exists.` })
            }


            const encryptedPassword = await createPasswordHash(password);

            const newUser = await User.create( {email,  password: encryptedPassword} );

            return res
                .status(201)
                .json(newUser);


        } catch (err) {

            console.error(err);
            return res
                .status(500)
                .json({ message: "o bug ta aqui" });

        }


    }

    async uptade(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const user = await User.findById(id);

            if (!user) {
                return res
                    .status(404)
                    .json();
            }

            const encryptedPassword = await createPasswordHash(password)

            await user.update({ email, password: encryptedPassword} );

            return res.status(200).json();

        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ message: "Internal server error." });

        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res
                    .status(404)
                    .json();
            }

            await user.deleteOne();

            return res.status(200).json();

        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ message: "Internal server error." });
        }
    }
}

export default new UserController();