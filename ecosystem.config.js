/**
 * PM2 Ecosystem Configuration for Client Health Dashboard
 */

module.exports = {
  apps: [
    {
      name: 'client-health-dashboard',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3100',
      cwd: '/home/ubuntu/client-health-dashboard/app',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3100,
      },
      error_file: '/home/ubuntu/client-health-dashboard/logs/pm2-error.log',
      out_file: '/home/ubuntu/client-health-dashboard/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
