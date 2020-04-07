import logger from '../logging/logger.mjs';
import dataExchangeService from '../service/data-exchange-service.mjs';

const writeJson = (res, activity, attachments) => {
    res.json({
        activityId: activity.activityId,
        name: activity.name,
        description: activity.description,
        status: activity.status,
        priority: activity.priority,
        startDate: activity.startDate,
        endDate: activity.endDate,
        createdBy: activity.createdBy,
        creationDate: activity.creationDate,
        modifiedBy: activity.modifiedBy,
        modificationDate: activity.modificationDate,
        attachments: attachments
    });
};

const ActivityController = {

    getActivity: (req, res) => {
        const activityId = req.params.activityId;

        dataExchangeService.get('http://127.0.0.1:8081/activities/' + activityId, null, (activity) => {
            const contentRefs = activity.contentResources;
            const promises = [];
            for (let i in contentRefs) {
                const resourceId = contentRefs[i].contentResourceId;
                logger.debug("fetch content resource by id: " + resourceId);
                promises.push(dataExchangeService.getWithPromise('http://127.0.0.1:8082/metadata/' + resourceId));
            }
            Promise.all(promises).then(responses => {
                const mediaFiles = [];
                responses.map(response => {
                    mediaFiles.push(response.data);
                });
                writeJson(res, activity, mediaFiles);
            }).catch(error => {
                logger.error(error);
            });
        });
    }

};

export default ActivityController;
