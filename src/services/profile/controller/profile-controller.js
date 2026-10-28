import UserRepositories from "../../users/repositories/user-repositories.js";
import ApplicationRepositories from "../../applications/repositories/application-repositories.js";
import BookmarkRepositories from "../../bookmarks/repositories/bookmark-repositories.js";
import response from "../../../utils/response.js";
import {NotFoundError} from "../../../exceptions/index.js";

export const getProfile = async (req, res, next) => {
    const user = await UserRepositories.getUserById(req.user.id);

    if (!user) {
        return next(new NotFoundError('User tidak ditemukan'));
    }

    return response(res, 200, 'Profile berhasil ditampilkan', user);
};

export const getProfileApplications = async (req, res) => {
    const applications = await ApplicationRepositories.getApplicationsByUserId(req.user.id);

    return response(res, 200, 'Lamaran berhasil ditampilkan', {applications})
};

export const getProfileBookmarks = async (req, res) => {
    const bookmarks = await BookmarkRepositories.getBookmarksByUserId(req.user.id);

    return response(res, 200, 'Bookmark berhasil ditampilkan', {bookmarks})
};