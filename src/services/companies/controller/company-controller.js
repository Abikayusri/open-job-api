import CompanyRepositories from "../repositories/company-repositories.js";
import response from "../../../utils/response.js";
import {NotFoundError} from "../../../exceptions/index.js";

export const createCompany = async (req, res) => {
    const company = await CompanyRepositories.createCompany(req.validated);
    return response(res, 201, 'Company berhasil ditambahkan', {id: company.id});
};

export const getCompanies = async (req, res) => {
    const companies = await CompanyRepositories.getCompanies();
    return response(res, 200, 'Company berhasil ditampilkan', {companies});
};

export const getCompanyById = async (req, res, next) => {
    const company = await CompanyRepositories.getCompanyById(req.params.id);

    if (!company) {
        return next(new NotFoundError('Company tidak ditemukan'));
    }

    return response(res, 200, 'Company berhasil ditampilkan', company);
};

export const editCompany = async (req, res, next) => {
    const company = await CompanyRepositories.editCompany(req.params.id, req.validated);

    if (!company) {
        return next(new NotFoundError('Gagal memperbarui company. Id tidak ditemukan'));
    }

    return response(res, 200, 'Company berhasil diperbarui', {id: company.id});
};

export const deleteCompany = async (req, res, next) => {
    const company = await CompanyRepositories.deleteCompany(req.params.id);

    if (!company) {
        return next(new NotFoundError('Gagal menghapus company. Id tidak ditemukan'));
    }

    return response(res, 200, 'Company berhasil dihapus', {id: company.id});
};
