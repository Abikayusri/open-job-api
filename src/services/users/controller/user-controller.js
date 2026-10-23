import UserRepositories from "../repositories/user-repositories.js";
import response from '../../../utils/response.js';
import {NotFoundError} from '../../../exceptions/index.js';

export const createUser = async (req, res) => {
    const user = await UserRepositories.createUser(req.validated);
    return response(res, 201, 'User berhasil ditambahkan', {id: user.id});
};

export const getUserById = async (req, res, next) => {
    const user = await UserRepositories.getUserById(req.params.id);

    if (!user) {
        return next(new NotFoundError('User tidak ditemukan'));
    }

    return response(res, 200, 'User berhasil ditampilkan', user);
};