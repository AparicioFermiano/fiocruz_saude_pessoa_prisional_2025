# Saúde das pessoas privadas de liberdade (Fiocruz, 2025)

Curso on-line da Fiocruz sobre a Política Nacional de Atenção Integral à Saúde das Pessoas Privadas de Liberdade (PNAISP). Cinco módulos, divididos em 19 unidades; cada unidade é uma página independente.

## Abrir

```bash
python -m http.server 8000
```

Acesse <http://localhost:8000/modulo1-unid1/> (troque pela unidade desejada, de `modulo1-unid1` a `modulo5-unid6`).

Servir por HTTP em vez de abrir o arquivo direto evita bloqueio do navegador a scripts e mídia locais.

## Estrutura

```
moduloN-unidM/
  index.html          a unidade
  css/ js/ fonts/ images/ media/
```

## Publicar

Copie a pasta da unidade para o servidor ou ambiente do curso. Não há build.

## Homologação

Não há ambiente de homologação.
