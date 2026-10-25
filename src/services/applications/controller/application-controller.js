import ApplicationRepositories from "../repositories/application-repositories.js";
import response from "../../../utils/response.js";
import {NotFoundError} from "../../../exceptions/index.js";

export const createApplication = async (req, res) => {
    const application = await ApplicationRepositories.createApplication(req.validated);
    return response(res, 201, 'Lamaran berhasil ditambahkan', {id: application.id});
};

export const getApplications = async (req, res) => {
    const applications = await ApplicationRepositories.getApplications();
    return response(res, 200, 'Lamaran berhasil ditampilkan', {applications});
};

export const getApplicationById = async (req, res, next) => {
    const application = await ApplicationRepositories.getApplicationById(req.params.id);

    if (!application) {
        return next(new NotFoundError('Lamaran tidak ditemukan'));
    }

    return response(res, 200, 'Lamaran berhasil ditampilkan', application);
};

export const getApplicationsByUserId = async (req, res) => {
    const applications = await ApplicationRepositories.getApplicationsByUserId(req.params.userId);
    return response(res, 200, 'Lamaran berhasil ditampilkan', {applications});
};

export const getApplicationsByJobId = async (req, res) => {
    const applications = await ApplicationRepositories.getApplicationsByJobId(req.params.jobId);
    return response(res, 200, 'Lamaran berhasil ditampilkan', {applications});
};

export const editApplicationStatus = async (req, res, next) => {
    const application = await ApplicationRepositories.editApplicationStatus(req.params.id, req.validated.status);

    if (!application) {
        return next(new NotFoundError('Gagal memperbarui lamaran. Id tidak ditemukan'));
    }

    return response(res, 200, 'Status lamaran berhasil diperbarui', {id: application.id});
};

export const deleteApplication = async (req, res, next) => {
    const application = await ApplicationRepositories.deleteApplication(req.params.id);

    if (!application) {
        return next(new NotFoundError('Gagal menghapus lamaran. Id tidak ditemukan'));
    }

    return response(res, 200, 'Lamaran berhasil dihapus', {id: application.id});
};
