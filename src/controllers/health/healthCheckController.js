class HealthCheck {
    constructor() {
        
    }

    healthCheck() {
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