import ApplicationRepositories from "../repositories/application-repositories.js";
import response from "../../../utils/response.js";
import {NotFoundError} from "../../../exceptions/index.js";
import CacheService from "../../../cache/redis-service.js";
import ProducerService, {APPLICATION_QUEUE} from "../../../queue/producer-service.js";


const deleteApplicationListCache = ({userId, jobId}) => CacheService.delete(
    `applications:user:${userId}`,
    `applications:job:${jobId}`,
);


export const createApplication = async (req, res) => {
    const application = await ApplicationRepositories.createApplication(req.validated);

    await deleteApplicationListCache({userId: req.validated.user_id, jobId: req.validated.job_id});

    ProducerService.sendMessage(APPLICATION_QUEUE, JSON.stringify({
        application_id: application.id
    })).catch((error) => console.error(error));

    return response(res, 201, 'Lamaran berhasil ditambahkan', application);
};

export const getApplications = async (req, res) => {
    const applications = await ApplicationRepositories.getApplications();
    return response(res, 200, 'Lamaran berhasil ditampilkan', {applications});
};

export const getApplicationById = async (req, res, next) => {
    const {data: application, source} = await CacheService.getOrSet(
        `application:${req.params.id}`,
        () => ApplicationRepositories.getApplicationById(req.params.id),
    );

    if (!application) {
        return next(new NotFoundError('Lamaran tidak ditemukan'));
    }

    res.set('X-Data-Source', source);
    return response(res, 200, 'Lamaran berhasil ditampilkan', application);
};

export const getApplicationsByUserId = async (req, res) => {
    const {data: applications, source} = await CacheService.getOrSet(
        `applications:user:${req.params.userId}`,
        () => ApplicationRepositories.getApplicationsByUserId(req.params.userId),
    );

    res.set('X-Data-Source', source);
    return response(res, 200, 'Lamaran berhasil ditampilkan', {applications});
};

export const getApplicationsByJobId = async (req, res) => {
    const {data: applications, source} = await CacheService.getOrSet(
        `applications:job:${req.params.jobId}`,
        () => ApplicationRepositories.getApplicationsByJobId(req.params.jobId),
    );

    res.set('X-Data-Source', source);
    return response(res, 200, 'Lamaran berhasil ditampilkan', {applications});
};

export const editApplicationStatus = async (req, res, next) => {
    const application = await ApplicationRepositories.editApplicationStatus(req.params.id, req.validated.status);

    if (!application) {
        return next(new NotFoundError('Gagal memperbarui lamaran. Id tidak ditemukan'));
    }

    await CacheService.delete(`application:${req.params.id}`);
    await deleteApplicationListCache({userId: application.user_id, jobId: application.job_id});

    return response(res, 200, 'Status lamaran berhasil diperbarui', {id: application.id});
};

export const deleteApplication = async (req, res, next) => {
    const application = await ApplicationRepositories.deleteApplication(req.params.id);

    if (!application) {
        return next(new NotFoundError('Gagal menghapus lamaran. Id tidak ditemukan'));
    }

    await CacheService.delete(`application:${req.params.id}`);
    await deleteApplicationListCache({userId: application.user_id, jobId: application.job_id});

    return response(res, 200, 'Lamaran berhasil dihapus', {id: application.id});
};