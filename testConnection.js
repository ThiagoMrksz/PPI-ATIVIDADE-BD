import mysql from 'mysql2/promise';

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'passalopaipa',
            database: 'pacote_viagem_db',
            port: 3306
        });
        console.log('Conexão com o MySQL estabelecida com sucesso!');
        await connection.end();
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
    }
}

testConnection();