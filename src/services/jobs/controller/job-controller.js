import JobRepositories from "../repositories/job-repositories.js";
import response from "../../../utils/response.js";
import {NotFoundError} from "../../../exceptions/index.js";

export const createJob = async (req, res) => {
    const job = await JobRepositories.createJob(req.validated);
    return response(res, 201, 'Job berhasil ditambahkan', {id: job.id});
};

export const getJobs = async (req, res) => {
    const {title, 'company-name': companyName} = req.validated;
    const jobs = await JobRepositories.getJobs({title, companyName});
    return response(res, 200, 'Job berhasil ditampilkan', {jobs});
};

export const getJobById = async (req, res, next) => {
    const job = await JobRepositories.getJobById(req.params.id);

    if (!job) {
        return next(new NotFoundError('Job tidak ditemukan'));
    }

    return response(res, 200, 'Job berhasil ditampilkan', job);
};

export const getJobsByCompanyId = async (req, res) => {
    const jobs = await JobRepositories.getJobsByCompanyId(req.params.companyId);
    return response(res, 200, 'Job berhasil ditampilkan', {jobs});
};

export const getJobsByCategoryId = async (req, res) => {
    const jobs = await JobRepositories.getJobsByCategoryId(req.params.categoryId);
    return response(res, 200, 'Job berhasil ditampilkan', {jobs});
};

export const editJob = async (req, res, next) => {
    const job = await JobRepositories.editJob(req.params.id, req.validated);

    if (!job) {
        return next(new NotFoundError('Gagal memperbarui job. Id tidak ditemukan'));
    }

    return response(res, 200, 'Job berhasil diperbarui', {id: job.id});
};

export const deleteJob = async (req, res, next) => {
    const job = await JobRepositories.deleteJob(req.params.id);

    if (!job) {
        return next(new NotFoundError('Gagal menghapus job. Id tidak ditemukan'));
    }

    return response(res, 200, 'Job berhasil dihapus', {id: job.id});
};
