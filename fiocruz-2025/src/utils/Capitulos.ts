export interface Capitulo {
    id: string;
    title: string;
}

export interface Progresso {
    id: string;
    progressPercent: number;
}

export const capitulosM1: Capitulo[] = [
    { id: 'm1-c1', title: 'Minicurrículo do Autor' },
    { id: 'm1-c2', title: 'Apresentação da Unidade' },
    { id: 'm1-c3', title: 'Unidade 1 - Estrutura e Sistema Prisional' },
    { id: 'm1-c4', title: 'Encerramento da Unidade' },
    { id: 'm1-c5', title: 'Referências importantes' },
    { id: 'm1-c6', title: 'Referências' },
]
