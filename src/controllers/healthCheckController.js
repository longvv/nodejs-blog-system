class HealthCheckController extends VersionedBase {
    constructor() {
        const defaultHandlers = {
            v1: {
                getHealthInfo: this.getHealthInfo.bind(this),
            }
        };

        super({...defaultHandlers,...handlers });
    }

    getHealthInfo() {
        try {
            var _uptime = Math.round(process.uptime());
            res.json({
                status: 'OK',
                time: new Date(),
                uptime: _uptime,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = HealthCheckController;