module.exports = (App) =>
    HostController = require('../../common/controllers/host/controller')(App)
    hostController = new HostController
        collectionType: require '../../entities/exceptions'
        relatedModel: require '../../entities/exception'
        regionName: 'exceptionsRegion'
        content:
            regionTitle: 'Exceptions'
            modalTitles:
                create: 'Create exception'
                edit: 'Edit exception'
    return hostController