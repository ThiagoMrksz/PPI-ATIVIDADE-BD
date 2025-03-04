import pool from '../config/db.js';

// Função para criar um novo pacote de viagem
async function createPacoteViagem(pacote) {
    try {
        const [result] = await pool.execute(
            'INSERT INTO pacotes_viagem (destino, partida, duracao, preco, lugares_disponiveis) VALUES (?, ?, ?, ?, ?)',
            [pacote.destino, pacote.partida, pacote.duracao, pacote.preco, pacote.lugares_disponiveis]
        );
        console.log('Pacote de viagem criado com ID:', result.insertId);
    } catch (error) {
        console.error('Erro ao criar pacote de viagem:', error);
    }
}

// Função para consultar todos os pacotes de viagem
async function getAllPacotesViagem() {
    try {
        const [rows] = await pool.execute('SELECT * FROM pacotes_viagem');
        console.log('Pacotes de viagem:', rows);
        return rows;
    } catch (error) {
        console.error('Erro ao consultar pacotes de viagem:', error);
    }
}

// Função para consultar um pacote de viagem por ID
async function getPacoteViagemById(id) {
    try {
        const [rows] = await pool.execute('SELECT * FROM pacotes_viagem WHERE id = ?', [id]);
        if (rows.length > 0) {
            console.log('Pacote de viagem encontrado:', rows[0]);
            return rows[0];
        } else {
            console.log('Pacote de viagem não encontrado.');
            return null;
        }
    } catch (error) {
        console.error('Erro ao consultar pacote de viagem:', error);
    }
}

// Função para atualizar um pacote de viagem
async function updatePacoteViagem(id, pacote) {
    try {
        await pool.execute(
            'UPDATE pacotes_viagem SET destino = ?, partida = ?, duracao = ?, preco = ?, lugares_disponiveis = ? WHERE id = ?',
            [pacote.destino, pacote.partida, pacote.duracao, pacote.preco, pacote.lugares_disponiveis, id]
        );
        console.log('Pacote de viagem atualizado com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar pacote de viagem:', error);
    }
}

// Função para excluir um pacote de viagem
async function deletePacoteViagem(id) {
    try {
        await pool.execute('DELETE FROM pacotes_viagem WHERE id = ?', [id]);
        console.log('Pacote de viagem excluído com sucesso.');
    } catch (error) {
        console.error('Erro ao excluir pacote de viagem:', error);
    }
}

// Função principal para testar as operações
async function main() {
    // Criar um novo pacote de viagem
    await createPacoteViagem({
        destino: 'Kyoto, Japão',
        partida: '2023-12-01',
        duracao: 10,
        preco: 12500.00,
        lugares_disponiveis: 20
    });

    // Consultar todos os pacotes de viagem
    await getAllPacotesViagem();

    // Consultar um pacote de viagem por ID
    const pacote = await getPacoteViagemById(1);
    if (pacote) {
        // Atualizar o pacote de viagem
        await updatePacoteViagem(1, {
            destino: 'Kyoto, Japão',
            partida: '2023-12-01',
            duracao: 12,
            preco: 13000.00,
            lugares_disponiveis: 18
        });

        // Excluir o pacote de viagem
        await deletePacoteViagem(1);
    }
}

// Executar a função principal
main().catch(console.error);