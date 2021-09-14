const Pool = require('pg').Pool;

const pg_conn = new Pool (
    {
        user: 'htbiohskphvkbe',
        host: 'ec2-34-194-14-176.compute-1.amazonaws.com',
        database: 'd7t1sjnmc907ai',
        password: '22899fc2854c4c9d4216a5185de090b48d9ce50d3cb0ced081e253a5878e6c76',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
          },
    });

module.exports = pg_conn;