export const getHealthStatus = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
};
