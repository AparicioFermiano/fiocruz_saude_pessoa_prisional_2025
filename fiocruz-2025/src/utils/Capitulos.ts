export interface Capitulo {
    id: string;
    title: string;
    url: string;
}

export interface Progresso {
    id: string;
    progressPercent: number;
}

export const capitulosM1: Capitulo[] = [
    { id: 'm1-c1', title: 'Minicurrículo do Autor', url: 'minicurriculo-do-autor' },
    { id: 'm1-c2', title: 'Apresentação da Unidade', url: 'apresentacao-da-unidade' },
    { id: 'm1-c3', title: 'Unidade 1 - Estrutura e Sistema Prisional', url: 'unidade-1-estrutura-e-sistema-prisional' },
    { id: 'm1-c4', title: 'Encerramento da Unidade', url: 'encerramento-da-unidade' },
    { id: 'm1-c5', title: 'Referências importantes', url: 'referencias-importantes' },
    { id: 'm1-c6', title: 'Referências', url: 'referencias' },
]
