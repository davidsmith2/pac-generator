module.exports = (App) =>
    HostController = require('../../common/controllers/host/controller')(App)
    hostController = new HostController
        collectionType: require '../../entities/rules'
        relatedModel: require '../../entities/rule'
        regionName: 'rulesRegion'
        content:
            regionTitle: 'Rules'
            modalTitles:
                create: 'Create rule'
                edit: 'Edit rule'
    return hostController