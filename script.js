const database = [
    { tag: "SELECT", tip: "Seleciona e extrai colunas de dados de uma ou mais tabelas do banco." },
    { tag: "FROM", tip: "Especifica de qual tabela (ou tabelas) os registros e colunas serão buscados." },
    { tag: "WHERE", tip: "Filtra os registros da busca com base em uma ou mais condições específicas." },
    { tag: "INSERT INTO", tip: "Adiciona e insere novos registros (linhas de dados) dentro de uma tabela." },
    { tag: "UPDATE", tip: "Modifica e atualiza os valores de registros que já existem dentro da tabela." },
    { tag: "DELETE", tip: "Remove e apaga registros específicos de uma tabela com base em um filtro." },
    { tag: "CREATE TABLE", tip: "Cria uma tabela totalmente nova definindo suas colunas e tipos de dados." },
    { tag: "ORDER BY", tip: "Ordena as linhas retornadas em ordem crescente (ASC) ou decrescente (DESC)." },
    { tag: "GROUP BY", tip: "Agrupa linhas com valores idênticos para realizar cálculos agregados." },
    { tag: "HAVING", tip: "Aplica condições de filtragem aos blocos gerados pela cláusula GROUP BY." },
    { tag: "DISTINCT", tip: "Elimina valores duplicados do resultado, retornando apenas linhas exclusivas." },
    { tag: "BETWEEN", tip: "Filtra dados testando se um valor se encontra dentro de um intervalo inclusivo." },
    { tag: "LIKE", tip: "Busca por padrões de texto específicos em uma coluna usando curingas como '%'." },
    { tag: "IN", tip: "Verifica se um determinado valor corresponde a qualquer elemento contido em uma lista." },
    { tag: "INNER JOIN", tip: "Faz a junção de duas tabelas trazendo apenas os registros com correspondência mútua." },
    { tag: "LEFT JOIN", tip: "Traz todos os dados da tabela da esquerda e os dados relacionados correspondentes da direita." },
    { tag: "RIGHT JOIN", tip: "Traz todos os dados da tabela da direita e os dados relacionados correspondentes da esquerda." },
    { tag: "COUNT()", tip: "Função agregada que conta a quantidade total de linhas retornadas pela consulta." },
    { tag: "AVG()", tip: "Função agregada que calcula e retorna o valor médio de uma coluna numérica." },
    { tag: "SUM()", tip: "Função agregada que soma todos os valores numéricos contidos em uma coluna específica." },
    { tag: "MAX()", tip: "Função agregada que descobre e exibe o maior valor encontrado em uma coluna." },
    { tag: "MIN()", tip: "Função agregada que descobre e exibe o menor valor encontrado em uma coluna." },
    { tag: "LIMIT", tip: "Restringe e estabelece um teto para o número máximo de linhas que a consulta pode retornar." },
    { tag: "AS", tip: "Atribui um apelido temporário (alias) para facilitar a leitura de tabelas ou colunas." },
    { tag: "UNION", tip: "Combina os conjuntos de resultados de duas consultas SELECT distintas removendo registros duplicados." }
];

// Opcional: Embaralha a ordem para não ficar sempre na mesma sequência numérica
database.sort(() => Math.random() - 0.5);

let activeIndex = null;
const exploredSet = new Set(); // Guarda os índices que já foram clicados ao menos uma vez

const minefield = document.getElementById('minefield');
const terminalPanel = document.getElementById('terminal-panel');
const activeFieldTag = document.getElementById('active-field-tag');
const tipText = document.getElementById('tip-text');
const exploredCountDisplay = document.getElementById('explored-count');
const closeBtn = document.getElementById('close-btn');

function createBoard() {
    for (let i = 0; i < database.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${i}`;
        
        // Estado inicial do bloco fechado
        cell.innerHTML = `<span class="num-label">CAMPO ${i + 1}</span><span>❓</span>`;
        
        cell.addEventListener('click', () => handleCellClick(i));
        minefield.appendChild(cell);
    }
}

function handleCellClick(index) {
    const cell = document.getElementById(`cell-${index}`);
    const isRevealed = cell.classList.contains('revealed');

    // Remove destaque ativo de qualquer outra célula anterior
    if (activeIndex !== null) {
        document.getElementById(`cell-${activeIndex}`).classList.remove('active');
    }

    if (!isRevealed) {
        // --- PRIMEIRO CLIQUE: Revela qual é a Tag ---
        cell.classList.add('revealed');
        cell.innerHTML = `<span class="num-label">CAMPO ${index + 1}</span><span class="tag-label">${database[index].tag}</span>`;
        
        // Contabiliza como explorado
        exploredSet.add(index);
        exploredCountDisplay.textContent = exploredSet.size;
        
        // Fecha o painel caso estivesse aberto de outra célula antiga
        terminalPanel.classList.add('hidden');
        activeIndex = null;
    } else {
        // --- SEGUNDO CLIQUE: Mostra o que ela faz no terminal inferior ---
        activeIndex = index;
        cell.classList.add('active');
        
        // Abre e preenche o terminal com a descrição da documentação
        terminalPanel.classList.remove('hidden');
        activeFieldTag.textContent = database[index].tag;
        tipText.textContent = database[index].tip;
        
        // Rola a tela levemente para focar na leitura do terminal se necessário
        terminalPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function closeTerminal() {
    if (activeIndex !== null) {
        document.getElementById(`cell-${activeIndex}`).classList.remove('active');
    }
    terminalPanel.classList.add('hidden');
    activeIndex = null;
}

closeBtn.addEventListener('click', closeTerminal);

// Inicializa o tabuleiro
createBoard();
