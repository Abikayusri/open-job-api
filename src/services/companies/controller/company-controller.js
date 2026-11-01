import CompanyRepositories from "../repositories/company-repositories.js";
import response from "../../../utils/response.js";
import {NotFoundError} from "../../../exceptions/index.js";
import CacheService from "../../../cache/redis-service.js";

export const createCompany = async (req, res) => {
    const company = await CompanyRepositories.createCompany(req.validated, req.user.id);
    return response(res, 201, 'Company berhasil ditambahkan', {id: company.id});
};

export const getCompanies = async (req, res) => {
    const companies = await CompanyRepositories.getCompanies();
    return response(res, 200, 'Company berhasil ditampilkan', {companies});
};

export const getCompanyById = async (req, res, next) => {
    const {data: company, source} = await CacheService.getOrSet(
        `company:${req.params.id}`,
        () => CompanyRepositories.getCompanyById(req.params.id)
    );

    if (!company) {
        return next(new NotFoundError('Company tidak ditemukan'));
    }

    res.set('X-Data-Source', source);
    return response(res, 200, 'Company berhasil ditampilkan', company);
};

export const editCompany = async (req, res, next) => {
    const company = await CompanyRepositories.editCompany(req.params.id, req.validated);

    if (!company) {
        return next(new NotFoundError('Gagal memperbarui company. Id tidak ditemukan'));
    }

    await CacheService.delete(`company:${req.params.id}`);

    return response(res, 200, 'Company berhasil diperbarui', {id: company.id});
};

export const deleteCompany = async (req, res, next) => {
    const company = await CompanyRepositories.deleteCompany(req.params.id);

    if (!company) {
        return next(new NotFoundError('Gagal menghapus company. Id tidak ditemukan'));
    }

    await CacheService.delete(`company:${req.params.id}`);

    return response(res, 200, 'Company berhasil dihapus', {id: company.id});
};
