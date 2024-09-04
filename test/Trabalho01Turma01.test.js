const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe('GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('adicionando uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toContain(tarefa);
    });

    test('erro ao adicionar tarefa com descrição curta', () => {
        expect(() => gerenciador.adicionarTarefa({ id: 2, descricao: 'ab', concluida: false }))
            .toThrow('Erro ao cadastrar tarefa');
    });

    test('remover uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(1);
        expect(gerenciador.listarTarefas()).not.toContain(tarefa);
    });

    test('deve atualizar uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(1, { descricao: 'Tarefa Atualizada' });
        expect(gerenciador.buscarTarefaPorId(1).descricao).toBe('Tarefa Atualizada');
    });

    test('deve marcar uma tarefa como concluída', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
    });

    test('deve listar tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasConcluidas()).toContain(tarefa1);
        expect(gerenciador.listarTarefasConcluidas()).not.toContain(tarefa2);
    });

    test('adicionar e remover tags de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(1, 'importante');
        expect(gerenciador.buscarTarefaPorId(1).tags).toContain('importante');
        gerenciador.removerTagDaTarefa(1, 'importante');
        expect(gerenciador.buscarTarefaPorId(1).tags).not.toContain('importante');
    });

    test('deve listar tarefas por tag', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', tags: ['importante'] };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', tags: ['urgente'] };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorTag('importante')).toContain(tarefa1);
        expect(gerenciador.listarTarefasPorTag('importante')).not.toContain(tarefa2);
    });

    test('deve atualizar a prioridade de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(1, 2);
        expect(gerenciador.buscarTarefaPorId(1).prioridade).toBe(2);
    });

    test('marcar todas as tarefas como concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([
            expect.objectContaining({ id: 1, concluida: true }),
            expect.objectContaining({ id: 2, concluida: true })
        ]);
    });

    test('deve reabrir uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: true };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.reabrirTarefa(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(false);
    });

    test('ordenar tarefas por data', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', data: '2024-09-03' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', data: '2024-09-04' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('ordenar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', prioridade: 2 };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });
});


