import db from './Infraestructura/config/db.js';

async function check() {
    try {
        await db.authenticate();
        console.log('Connected to DB');
        const [results] = await db.query('SHOW TABLES');
        const tables = results.map(r => Object.values(r)[0]);
        console.log('Tables found:', tables);

        if (tables.length > 0) {
            console.log('VERIFICATION SUCCESS: Tables exist.');
        } else {
            console.log('VERIFICATION FAILED: No tables found.');
        }
        process.exit(0);
    } catch (e) {
        console.error('VERIFICATION ERROR:', e);
        process.exit(1);
    }
}

check();
