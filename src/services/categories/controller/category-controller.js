import CategoryRepositories from "../repositories/category-repositories.js";
import response from "../../../utils/response.js";
import {NotFoundError} from "../../../exceptions/index.js";

export const createCategory = async (req, res) => {
    const category = await CategoryRepositories.createCategory(req.validated);
    return response(res, 201, 'Category berhasil ditambahkan', {id: category.id})
};

export const getCategories = async (req, res) => {
    const categories = await CategoryRepositories.getCategories();
    return response(res, 200, 'Category berhasil ditampilkan', {categories});
};

export const getCategoryById = async (req, res, next) => {
    const category = await CategoryRepositories.getCategoryById(req.params.id);

    if (!category) {
        return next(new NotFoundError('Category tidak ditemukan'));
    }

    return response(res, 200, 'Category berhasil ditampilkan', category);
};

export const editCategory = async (req, res, next) => {
    const category = await CategoryRepositories.editCategory(req.params.id, req.validated);

    if (!category) {
        return next(new NotFoundError('Gagal memperbarui category. Id tidak ditemukan'));
    }

    return response(res, 200, 'Category berhasil diperbarui', {id: category.id});
};

export const deleteCategory = async (req, res, next) => {
    const category = await CategoryRepositories.deleteCategory(req.params.id);

    if (!category) {
        return next(new NotFoundError('Gagal menghapus category. Id tidak ditemukan'));
    }

    return response(res, 200, 'Category berhasil dihapus', {id: category.id});
};