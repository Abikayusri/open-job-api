import BookmarkRepositories from "../repositories/bookmark-repositories.js"
import {NotFoundError} from "../../../exceptions/index.js";
import response from "../../../utils/response.js";

export const addBookmark = async (req, res) => {
    const bookmark = await BookmarkRepositories.addBookmark(req.user.id, req.params.jobId);
    return response(res, 201, 'Bookmark berhasil ditambahkan', {id: bookmark.id});
};

export const getBookmarkById = async (req, res, next) => {
    const bookmark = await BookmarkRepositories.getBookmarkById(req.params.id, req.params.jobId);

    if (!bookmark) {
        return next(new NotFoundError('Bookmark tidak ditemukan'))
    }

    return response(res, 200, 'Bookmark berhasil ditampilkan', bookmark)
};

export const getBookmarks = async (req, res) => {
    const bookmarks = await BookmarkRepositories.getBookmarksByUserId(req.user.id);
    return response(res, 200, 'Bookmark berhasil ditampilkan', {bookmarks});
};

export const deleteBookmark = async (req, res, next) => {
    const bookmark = await BookmarkRepositories.deleteBookmark(req.user.id, req.params.jobId);

    if (!bookmark) {
        return next(new NotFoundError('Gagal menghapus bookmark. Bookmark tidak ditemukan'));
    }

    return response(res, 200, 'Bookmark berhasil dihapus', {id: bookmark.id})
}