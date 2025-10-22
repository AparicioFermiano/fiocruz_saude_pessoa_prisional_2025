<script setup lang="ts">
import TemplateModulo1 from '@/template/TemplateModulo1.vue';
import TituloCapitulo from '@/components/TituloCapitulo.vue';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { saveChapterProgress, useProgressoStore, clearAllProgress } from '@/utils/progressService'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const progressoStore = useProgressoStore()

const moduloAtual = 1
const capituloAtual = 3

const progressoCapitulo = ref(0)

function atualizarProgresso() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight

    const progressoBruto = (scrollTop / (scrollHeight - clientHeight)) * 100
    const progressoLimitado = Math.min(100, Math.max(0, progressoBruto))
    const progresso = Math.round(progressoLimitado / 5) * 5

    if (progresso > progressoCapitulo.value) {
        progressoCapitulo.value = progresso
        progressoStore.setProgresso(`m${moduloAtual}-c${capituloAtual}`, progresso)
    }
}

onMounted(async () => {
    await progressoStore.carregarDoCache()
    window.addEventListener('scroll', atualizarProgresso)
})

onUnmounted(() => {
    window.removeEventListener('scroll', atualizarProgresso)
})

watch(progressoCapitulo, async (novoValor) => {
    await saveChapterProgress(moduloAtual, capituloAtual, { progressPercent: novoValor })
})
</script>

<template>
    <TemplateModulo1>
        <template v-slot:conteudo-site>
            <div class="flex flex-col justify-between">
                <TituloCapitulo :capitulo="3" color="--modulo1-main"
                    titulo="Unidade 1 - Estrutura e Sistema Prisional" />
                <div class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7 text-xl leading-10">
                    <h2 class="text-2xl md:text-3xl font-bold">1.1 Breve história do sistema prisional no mundo e no
                        Brasil</h2>
                    <p>Para entender como surgiram as instituições penais modernas, precisamos compreender como o Estado
                        passou a ser responsável pela execução das penas criminais e como essas penas foram mudando ao
                        longo do tempo..</p>
                    <p>Você sabia que a expressão “olho por olho, dente por dente”, que às vezes ouvimos em conversas do
                        dia a dia, tem origem em uma antiga lei chamada Lei de Talião? Pois é, essa lei foi utilizada
                        por muitos povos antigos, como é o caso dos babilônios e hebreus. O princípio dessa lei era
                        simples: a punição deveria ser proporcional ao crime cometido (Muraro, 2017). Se alguém fizesse
                        algo de ruim para outra pessoa, a punição seria equivalente a esse ato.</p>
                    <p>Essa lei baseava-se na ideia de vingança privada, onde a vítima era responsável por aplicar a
                        justiça, ou seja, era ela quem decidia a punição. Não havia intervenção do Estado nesse
                        processo.</p>
                    <p>Com o tempo, toda a lógica de punição foi mudando, mas foi só na Revolução Industrial que as
                        bases do sistema prisional moderno foram estabelecidas. Muita gente saiu do campo e foi para as
                        cidades, o que causou superlotação urbana e falta de empregos. O aumento da pobreza e,
                        consequentemente, dos pequenos crimes levou o Estado a criar instituições para controlar a
                        população, como as primeiras casas de correição, que são os antecessores das instituições penais
                        como as conhecemos hoje. Nessas casas, o objetivo era reformar as pessoas por meio do trabalho,
                        buscando reintegrá-las à sociedade de maneira produtiva (Muraro, 2017).</p>

                </div>
                <div class="bg-gray-100 py-20 text-lg font-serif leading-9">
                    <div class="timeline flex flex-col gap-20">
                        <div
                            class="timeline-item shadow-xl max-w-[800px] mx-auto p-5 md:p-10 border-l-4 border-orange-500 rounded-sm bg-white">
                            <h2 class="font-sans text-orange-500 font-bold mb-5"><i>
                                    Estados Unidos
                                </i></h2>
                            <p>Nos Estados Unidos, a origem das instituições penais modernas também teve forte
                                influência do racismo. Mesmo após a abolição da escravidão, o regime de segregação
                                permanecia inalterado e pessoas negras eram legalmente consideradas de segunda classe,
                                ocasionando a restrição ou a completa negação de direitos a essas pessoas. O regulamento
                                das primeiras prisões nos Estados Unidos mantinha características intrínsecas do período
                                escravocrata, como é o exemplo da obrigação de trabalhar por longos períodos e a
                                dependência de outras pessoas para o fornecimento de comida e abrigo (Davis, 2018).</p>
                        </div>
                        <div
                            class="timeline-item shadow-xl max-w-[800px] mx-auto p-5 md:p-10 border-l-4 border-orange-500 rounded-sm bg-white">
                            <h2 class="font-sans text-orange-500 font-bold mb-5"><i>
                                    Brasil
                                </i></h2>
                            <p class="font-sans font-bold">Colonização até a Constituição de 1824</p>
                            <p>Já no Brasil, da colonização até a Constituição de 1824, as leis
                                eram baseadas nas
                                Ordenações portuguesas, que aplicavam penas severas, como tortura e morte. Pessoas
                                escravizadas eram julgadas e punidas diretamente por seus senhores. Com a Independência
                                e a Constituição de 1824, começou-se a proibir penas cruéis, mas, mesmo com a criação
                                das prisões, a lógica de punição de pessoas escravizadas se manteve, acentuando a
                                diferenciação da punição entre as pessoas negras escravizadas e não escravizadas.</p>
                        </div>
                        <div
                            class="timeline-item shadow-xl max-w-[800px] mx-auto p-5 md:p-10 border-l-4 border-orange-500 rounded-sm bg-white">
                            <h2 class="font-sans text-orange-500 font-bold mb-5"><i>
                                    Brasil
                                </i></h2>
                            <p class="font-sans font-bold">Código Criminal de 1830</p>
                            <p>Depois, o Código Criminal de 1830 introduziu a pena de privação de liberdade, marcando a
                                transição para o atual modelo prisional. A partir da Proclamação da República (1889),
                                novos códigos penais foram criados.</p>
                        </div>
                        <div
                            class="timeline-item shadow-xl max-w-[800px] mx-auto p-5 md:p-10 border-l-4 border-orange-500 rounded-sm bg-white">
                            <h2 class="font-sans text-orange-500 font-bold mb-5"><i>
                                    Brasil
                                </i></h2>
                            <p class="font-sans font-bold">Código Penal de 1940 e Código Penal de 1969</p>
                            <p>O atual Código Penal, de 1940, eliminou a pena de morte e introduziu a progressão da
                                pena. Durante a Ditadura Militar (1964-1985), no entanto, o Código Penal de 1969 voltou
                                a prever penas de prisão perpétua e de morte, mas, com a redemocratização, essas medidas
                                foram revistas.</p>
                        </div>
                        <div
                            class="timeline-item shadow-xl max-w-[800px] mx-auto p-5 md:p-10 border-l-4 border-orange-500 rounded-sm bg-white">
                            <h2 class="font-sans text-orange-500 font-bold mb-5"><i>
                                    Brasil
                                </i></h2>
                            <p class="font-sans font-bold">Lei de Execução Penal de 1984</p>
                            <p>Em 1984, foi aprovada a Lei de Execução Penal, que organiza e determina como as penas
                                devem ser aplicadas, respeitando os direitos das pessoas privadas de liberdade e
                                fortalecendo o papel do Estado nesse processo (Muraro, 2017).</p>
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7 text-xl leading-10 font-serif">
                    <h2 class="text-2xl md:text-3xl font-bold font-sans">1.2 Modelos de organização prisional no mundo
                    </h2>
                    <p>Vamos conversar um pouco sobre os modelos de organização prisional no mundo? Para entender como
                        eles funcionam hoje, é essencial compreender por que estamos aprisionando tantas pessoas e quais
                        fatores levaram ao aumento expressivo no número de pessoas privadas de liberdade.</p>
                    <p>
                        A partir da década de 1970, houve um crescimento significativo nas taxas de aprisionamento em
                        diversos países. Mas por quê? Segundo Pavarini (2006 apud Muraro, 2017), esse aumento aconteceu
                        devido a uma combinação de fatores, como: a crise do Estado de Bem-Estar Social; o crescimento
                        da criminalidade entre as décadas de 1970 e 1980; a criminalização das drogas; e o aumento da
                        sensação de insegurança social, amplificada pelos meios de comunicação de massa. Mas vamos por
                        partes. A seguir trataremos brevemente de cada um desses pontos.
                    </p>
                    <p>
                        A ideia de Estado de Bem-Estar Social foi criada pelos ingleses em 1945, logo após a Segunda
                        Guerra Mundial, e visava proteger os cidadãos em momentos de vulnerabilidade. Na década de 1960,
                        uma crise econômica originada por conflitos relacionados ao modelo de Estado de Bem-Estar Social
                        fez com que muitas pessoas que antes eram assistidas financeiramente pelo governo passassem a
                        não receber mais essa ajuda, e isso levou a um aumento da criminalidade nas décadas seguintes.
                    </p>
                    <p>
                        Enquanto isso, nos Estados Unidos, o uso de drogas começou a crescer, e tanto o uso como o
                        tráfico de drogas passaram a ser caracterizados como responsáveis pelo aumento da criminalidade
                        (National Research Council, 2014). Nesse contexto, a Lei Antidrogas, criada em 1986, durante o
                        governo Reagan, gerou uma política penal desigual, que punia mais severamente o uso e o porte de
                        crack do que de outras drogas. O problema era: o crack era muito mais barato do que outras
                        drogas e, por isso, era mais consumido por pessoas pobres e minorias raciais, o que acabou
                        criando uma situação de desigualdade social mais aprofundada.
                    </p>
                    <p>
                        De acordo com Pavarini (2006 apud Muraro, 2017), outro fator que contribui para o aumento das
                        taxas de aprisionamento é o aumento da sensação de insegurança social, amplificada pelos meios
                        de comunicação de massa, que está ligada ao fenômeno do neoliberalismo, em que os cidadãos
                        excluídos pelo mercado de trabalho são vistos como um problema a ser “neutralizado”, levando à
                        criminalização da pobreza.
                    </p>
                    <p>
                        Esse modelo penal ampliou a repressão e influenciou outros países, inclusive o Brasil. Por aqui,
                        também começamos a ver um aprisionamento em massa, principalmente de pessoas que carregavam
                        marcadores sociais de raça, gênero e classe. A população privada de liberdade não parou de
                        crescer e aumentou consideravelmente no Brasil nas últimas décadas, sobretudo a partir da
                        promulgação da Lei nº 11.343, de 23 de agosto de 2006, a Lei Antidrogas brasileira (Brasil,
                        2006), que intensificou a criminalização do tráfico de drogas e, por consequência, o
                        aprisionamento (Campos, 2018). Para se ter uma ideia, entre os anos de 2000 e 2015, enquanto a
                        população mundial cresceu em média 18% ao ano, a população privada de liberdade aumentou 20%
                        (Muraro, 2017). O número de pessoas privadas de liberdade cresceu mais rápido que o número de
                        pessoas no mundo!
                    </p>
                    <p>
                        Esses dados demonstram quanto as políticas punitivas adotadas ao redor do mundo têm sido
                        repressivas. Em 2025, de acordo com a base de dados World Prison Brief (2025), os países com o
                        maior número de pessoas em cumprimento de pena são Estados Unidos, China, Brasil, Índia e
                        Rússia, conforma Figura 1.
                    </p>
                    <h3 class="text-xl md:text-2xl font-bold font-sans">Figura 1 - Países com maior número de pessoas em
                        cumprimento de pena</h3>
                    <div id="mapa">
                        <small class="font-sans">Fonte: World Prison Brief (2025).</small>
                    </div>
                    <p>Enquanto muitos países, especialmente nas Américas, adotaram, ao longo das últimas décadas,
                        políticas cada vez mais punitivas e, com isso, aumentaram o número de pessoas presas, alguns
                        países da Europa seguiram por um caminho diferente, o de adotar políticas menos repressivas, que
                        ajudaram a reduzir as taxas de aprisionamento em 21% (Muraro, 2017). De acordo com Muraro
                        (2017), alguns dos países com as menores taxas de aprisionamento são:</p>
                    <ul class="list-disc pl-10 [&_li::marker]:text-orange-500">
                        <li>Islândia: 45 pessoas presas para cada 100 mil
                            habitantes;</li>
                        <li>Suécia: 55 para cada 100 mil;</li>
                        <li>Finlândia: 57 para cada 100 mil;</li>
                        <li>Dinamarca: 61 para cada 100 mil;</li>
                        <li>Noruega: 71 para cada 100 mil.</li>
                    </ul>
                    <p>
                        O que será que explica esse cenário? Será que esses países têm menores taxas de criminalidade ou
                        lidam de forma diferente com esse assunto? De acordo com Zaffaroni (2013 apud Muraro 2017, p.
                        59), o número de pessoas presas em um país não está relacionado apenas à quantidade de crimes
                        cometidos, mas principalmente às escolhas políticas e culturais daquele lugar.
                    </p>
                    <h2 class="text-2xl md:text-3xl font-bold font-sans">1.3 Organização (estrutura, filosofia e
                        objetivos) do
                        sistema prisional brasileiro</h2>
                    <p>Para compreender como funciona a aplicação de penas no Brasil em 2025, é importante recapitular
                        que essa é uma atribuição do Estado, que a exerce por meio de uma estrutura e com base em uma
                        filosofia e objetivos próprios. Antes da aplicação de uma pena, é necessário que haja um
                        processo judicial, no qual o Estado deve apurar os fatos por meio de um juiz imparcial e
                        competente, para só então aplicar a pena, caso seja confirmada alguma ilicitude (Brasil, 1984).
                    </p>
                    <p>
                        Você já ouviu falar do Código Penal (Decreto-Lei nº 2.848, de 7 de dezembro de 1940) (Brasil,
                        1940) e da Lei de Execução Penal (Lei nº 7.210, de 11 de julho de 1984) (Brasil, 1984)? Elas são
                        as principais normas que tratam do direito penal no Brasil. A principal diferença entre elas é
                        que o Código Penal define as penalidades, enquanto a Lei de Execução Penal regulamenta como
                        essas penas devem ser cumpridas.
                    </p>
                    <p>
                        De acordo com o Código Penal Brasileiro, as penas podem ser de três tipos: privativas de
                        liberdade, restritivas de direitos ou multa. O sistema de cumprimento de penas é progressivo e
                        abrange três regimes: fechado, semiaberto e aberto (Brasil, 1940).
                    </p>
                    <p>
                        A pena privativa de liberdade é dividida em duas categorias: reclusão e detenção. A reclusão é
                        uma pena mais grave, aplicada em crimes mais sérios, e pode ser cumprida em regime fechado,
                        semiaberto ou aberto, dependendo do caso. O regime de reclusão é executado de forma progressiva,
                        o que significa que a pena pode ser atenuada ao longo do tempo, se forem verificados bom
                        comportamento da pessoa e o cumprimento de certos critérios (Brasil, 1940). Já a detenção é uma
                        pena mais leve, aplicada em crimes menos graves, cumprida, geralmente, em regime semiaberto ou
                        aberto. Os regimes funcionam assim (Brasil, 1940):
                    </p>
                    <div id="cards"></div>
                    <p>
                        As penas restritivas de direitos, por sua vez, são diferentes e, em vez de impor a privação de
                        liberdade a alguém, o juiz pode aplicar uma das seguintes medidas: prestação pecuniária
                        (pagamento de uma quantia em dinheiro à vítima); perda de bens e valores (em favor do Fundo
                        Penitenciário Nacional); limitação de fim de semana (obrigação de permanecer por cinco horas
                        diárias aos sábados e domingos em estabelecimento penal); prestação de serviços à comunidade ou
                        a entidades públicas, aplicável às condenações superiores a seis meses de privação da liberdade;
                        e interdição temporária de direitos, como a proibição do exercício de certos cargos ou
                        profissões (Brasil, 1940). Além disso, a pena de multa consiste no pagamento da quantia fixada
                        na sentença ao Fundo Penitenciário Nacional.
                    </p>
                    <p>
                        A principal norma reguladora desse assunto é a Lei de Execução Penal. Ela é baseada na teoria da
                        prevenção especial positiva, que defende que a pena tem o objetivo de melhorar o indivíduo a fim
                        de possibilitar a sua ressocialização, reeducação e reinserção na sociedade (Fernandes; Matos,
                        2016). Para que a ressocialização ocorra de forma efetiva, a Lei de Execução Penal (Brasil,
                        1984) estabelece parâmetros que incluem:
                    </p>
                    <div id="pop"></div>
                    <h2 class="text-2xl md:text-3xl font-bold font-sans">1.4 Caracterização da população privada de
                        liberdade brasileira</h2>
                    <p>
                        No segundo semestre de 2024, a população privada de liberdade no Brasil era de 909.594 pessoas
                        (Brasil, 2025a), das quais 674.543 cumpriam pena em estabelecimentos penais físicos e 235.051,
                        em prisão domiciliar. Esse número tem crescido consideravelmente ao longo dos anos. A Figura 2
                        ilustra esse crescimento desde 2016.
                    </p>
                    <h3 class="text-xl md:text-2xl font-bold font-sans">Figura 2 - Crescimento da população privada de
                        liberdade no Brasil, 2016/2-2024/2</h3>
                    <div id="image">
                        <img src="" alt="">
                        <small>Fonte: Brasil (2025a).</small>
                        <hr>
                    </div>
                    <p>
                        Com relação ao perfil da população privada de liberdade, das 909.594 pessoas, apenas 53.880
                        (5,9%) são mulheres, enquanto 855.714 (94,1%) são homens. A faixa etária predominante em ambos
                        os sexos está entre 35 e 45 anos. Há quase 22.000 pessoas privadas de liberdade com mais de 60
                        anos, das quais 4.618 têm mais de 70 anos.
                    </p>
                    <p>
                        No que diz respeito à cor, a predominante entre as pessoas privadas de liberdade no Brasil é a
                        parda, seguida pelas cores branca e preta. Já com relação à população indígena, existem pouco
                        mais de 2.000 indígenas privados de liberdade (Brasil, 2025a).
                    </p>
                    <p>
                        Há pouco mais de 9.000 pessoas privadas de liberdade com algum tipo de deficiência, das quais
                        513 são cadeirantes. Na população masculina, a deficiência física é a mais prevalente. Já na
                        população feminina, a mais prevalente é a deficiência intelectual (Brasil, 2025a).
                    </p>
                    <p>
                        Dados sobre a orientação sexual das pessoas privadas de liberdade são escassos, já que nem todos
                        os estados e estabelecimentos penais têm essas informações de forma detalhada. De acordo com a
                        Secretaria Nacional de Políticas Penais (SENAPPEN), que realizou uma coleta de dados em 2022
                        para reunir informações sobre a população privada de liberdade de Lésbicas, Gays, Bissexuais,
                        Travestis, Transexuais e Intersexos (LGBTI), no total, 12.356 pessoas privadas de liberdade se
                        autodeclararam LGBTI (Brasil, 2023a).
                    </p>
                    <p>
                        No que diz respeito à escolaridade, quando se analisa o perfil educacional das pessoas privadas
                        de liberdade, é possível perceber que tanto homens quanto mulheres não concluíram o ensino
                        fundamental, totalizando 350.037 pessoas. Esse dado é seguido de um número significativo de
                        pessoas que também não concluíram o ensino médio (139.982). Ao todo, 490.019 pessoas em
                        cumprimento de pena no Brasil não concluíram o ensino fundamental ou o ensino médio (Brasil,
                        2025a). Essa realidade já foi denunciada por estudos internacionais, como o relatório de
                        tendências prisionais globais (Penal Reform International, 2015). Segundo o relatório, a grande
                        maioria das pessoas privadas de liberdade ao redor do mundo provém das camadas mais pobres da
                        sociedade, que têm pouco acesso ao sistema de ensino formal. A Figura 3 ilustra a distribuição
                        das pessoas privadas de liberdade por grau de instrução.
                    </p>
                    <h3 class="text-xl md:text-2xl font-bold font-sans">Figura 3 – Quantidade de pessoas privadas de
                        liberdade no Brasil por grau de instrução, 2024/2</h3>
                    <div id="image">
                        <img src="" alt="">
                        <small>Fonte: Brasil (2025a).</small>
                        <hr>
                    </div>
                    <p>
                        Outro dado que chama bastante a atenção é o déficit de vagas nos estabelecimentos prisionais de
                        regime fechado. No segundo semestre de 2024, a capacidade do sistema prisional era de 495.419
                        vagas pessoas para o cumprimento de penas em regime fechado. No entanto, havia 674.543 pessoas
                        privadas de liberdade em regime fechado no país, o que caracteriza superlotação. Isso significa
                        que há um excesso de quase 200 mil pessoas no sistema, portanto a taxa de ocupação é de 136,15%
                        (Brasil, 2025a).
                    </p>
                    <p>
                        A instituição penal, por si só, é um ambiente desafiador para a prestação de cuidados em saúde.
                        Imagine esse cenário sendo agravado por celas superlotadas, pouca ventilação, falta de higiene
                        etc. Não é difícil concluir que os estabelecimentos prisionais, frequentemente insalubres,
                        acabam contribuindo ainda mais para o adoecimento das pessoas.
                    </p>
                    <p>
                        E qual é o resultado disso? As taxas de infecção por HIV, hepatite B e C e tuberculose entre
                        pessoas privadas de liberdade são significativamente maiores do que na população em geral (World
                        Health Organization; United Nations Office On Drugs And Crime, 2013), o que demonstra a
                        necessidade de se efetivar o acesso a serviços de saúde com alta capacidade resolutiva em
                        ambientes prisionais.
                    </p>
                    <h2 class="text-2xl md:text-3xl font-bold font-sans">1.5 Gestão do sistema prisional (tipos de
                        estabelecimento penal) brasileiro</h2>
                    <p>
                        Um tema complexo e muito relevante para a garantia dos direitos humanos e efetividade das
                        políticas de segurança pública é a gestão do sistema prisional. Você conhece o papel e a
                        responsabilidade das esferas de governo nessa gestão? A gestão do sistema prisional brasileiro é
                        dividida em duas esferas: federal e estadual. Cada uma delas desempenha um papel diferente na
                        administração dos estabelecimentos penais.
                    </p>
                    <p>
                        No âmbito federal, a administração desses estabelecimentos é responsabilidade do Ministério da
                        Justiça e Segurança Pública. Estão sob sua responsabilidade as chamadas Penitenciárias Federais,
                        que abrigam pessoas envolvidas em questões de segurança pública. Já os sistemas prisionais
                        estaduais e do Distrito Federal são administrados pelos respectivos governos por meio das
                        Secretarias de Administração Penitenciária ou órgão congênere.
                    </p>
                    <p>
                        Você deve estar se perguntando: quais são os tipos de estabelecimento penal e por que são
                        divididos assim? Eles são organizados de acordo com o tipo de regime (fechado, semiaberto e
                        aberto) e com a situação jurídica da pessoa, ou seja, se ela já foi condenada ou ainda está
                        aguardando julgamento. No Brasil, existem seis tipos de estabelecimento penal (Brasil, 1984):
                    </p>
                    <div class="flex flex-col gap-5 my-10">
                        <div class="flex">
                            <span class="w-10 h-10 rounded-full bg-orange-500 text-center my-auto">1</span>
                            <p class="px-5 md:px-10">Penitenciária;</p>
                        </div>
                        <div class="flex">
                            <span class="w-10 h-10 rounded-full bg-orange-500 text-center my-auto">2</span>
                            <p class="px-5 md:px-10">Colônia Agrícola, Industrial ou Similar;</p>
                        </div>
                        <div class="flex">
                            <span class="w-10 h-10 rounded-full bg-orange-500 text-center my-auto">3</span>
                            <p class="px-5 md:px-10">Casa do Albergado;</p>
                        </div>
                        <div class="flex">
                            <span class="w-10 h-10 rounded-full bg-orange-500 text-center my-auto">4</span>
                            <p class="px-5 md:px-10">Centro de Observação;</p>
                        </div>
                        <div class="flex">
                            <span class="w-10 h-10 rounded-full bg-orange-500 text-center my-auto">5</span>
                            <p class="px-5 md:px-10">Hospital de Custódia e Tratamento Psiquiátrico;</p>
                        </div>
                        <div class="flex">
                            <span class="w-10 h-10 rounded-full bg-orange-500 text-center my-auto">6</span>
                            <p class="px-5 md:px-10">Cadeia Pública.</p>
                        </div>
                    </div>
                    <p>As penitenciárias são o tipo mais conhecido de estabelecimento penal. São destinadas ao
                        cumprimento de pena em regime fechado, no qual a pessoa condenada deve ser alojada em cela.</p>
                    <p>
                        As colônias agrícolas, industriais ou similares são destinadas ao cumprimento de pena em regime
                        semiaberto. Nesse regime, a pessoa cumpre pena por um período de quatro a oito anos, com
                        possibilidade de progressão do regime aberto ou regressão ao regime fechado.
                    </p>
                    <p>
                        As casas do albergado são voltadas para o cumprimento de pena em regime aberto ou para a
                        limitação de fim de semana. No entanto, a falta desses locais em muitos estados brasileiros
                        resulta na substituição da pena por prisão domiciliar, que frequentemente carece de fiscalização
                        (Muraro, 2017).
                    </p>
                    <p>
                        Já a função dos centros de observação é realizar exames criminológicos e outros testes, cujos
                        resultados são encaminhados à Comissão Técnica de Classificação. O objetivo desses exames é
                        classificar a pessoa com base em sua personalidade, no crime cometido e na reincidência,
                        garantindo sua alocação em estabelecimento adequado.
                    </p>
                    <p>
                        Os hospitais de custódia e tratamento psiquiátrico acolhem pessoas consideradas inimputáveis ou
                        semi-inimputáveis, ou seja, aquelas que não podem ser responsabilizadas totalmente por seus atos
                        (Brasil, 1984) e para as quais é aplicada a chamada medida de segurança. Em 2023, uma resolução
                        importante foi publicada: a Resolução nº 487, de 15 de fevereiro de 2023, do Conselho Nacional
                        de Justiça, que estabelece diretrizes para a implementação da Política Antimanicomial no Poder
                        Judiciário. O objetivo foi revisar processos de pessoas internadas em hospitais de custódia e
                        estabelecimentos penais ou similares, com foco na adoção de ações e estratégias que promovessem
                        o cuidado e a inclusão social das pessoas em sofrimento psíquico, a chamada reabilitação
                        psicossocial, e na progressiva extinção desse tipo de estabelecimento penal (Conselho Nacional
                        de Justiça, 2023).
                    </p>
                    <p>
                        Por último, as cadeias públicas são estabelecimentos destinados às pessoas em prisão provisória
                        e àquelas que ainda não foram condenadas, mas que tiveram prisão preventiva ou temporária
                        decretada (Brasil, 1984).
                    </p>
                </div>

                <div class="w-full bg-blue-200 text-xl leading-10 font-serif">
                    <div class="max-w-[800px] px-2 py-10 mx-auto flex flex-col gap-7">
                        <p class="font-bold">Vamos praticar?</p>
                        <p>Caro estudante-trabalhador, agora que você já sabe os principais tipos de estabelecimento
                            penal existentes no Brasil, é hora de fixar esse conhecimento de forma prática e rápida!</p>
                        <p>
                            Preparamos um exercício especial para que você possa relacionar cada tipo de estabelecimento
                            com sua principal função. Essa atividade vai te ajudar a consolidar o conteúdo e a entender
                            melhor como funciona a organização do sistema prisional.
                        </p>
                    </div>
                </div>

                <div class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7">

                </div>

                <p class="font-bold text-xl md:text-2xl py-10 md:py-20">Carga Horária de Estudo: 5 horas</p>



                <div id="exercicio" class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7">
                    <p>Gabarito</p>
                    <p>1 → A / 2 → B / 3 → C / 4 → D / 5 → E / 6 → F</p>
                </div>

                <div class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7">
                    <h2 class="text-2xl md:text-3xl font-bold">1.6 Estrutura física (projeto arquitetônico) e jurídica
                        voltada às pessoas privadas de liberdade no Brasil</h2>
                    <p>
                        Será que a estrutura física (projeto arquitetônico) dos estabelecimentos voltados às pessoas
                        privadas de liberdade tem alguma relação com o regime de cumprimento da pena? A resposta é sim.
                        Os projetos arquitetônicos e as estruturas físicas dos estabelecimentos penais estão diretamente
                        relacionados ao regime de cumprimento da pena, porque cada regime exige determinadas
                        características arquitetônicas e físicas, como capacidade máxima e grau de segurança. A Lei de
                        Execução Penal (Brasil, 1984) prevê, em seu Art. 88, que a pessoa privada de liberdade deve ser
                        alojada em cela individual com área mínima de seis metros quadrados que contenha dormitório,
                        aparelho sanitário e lavatório para a manutenção da salubridade, considerando fatores como
                        aeração, insolação e condicionamento térmico adequado.
                    </p>
                    <p>
                        Duas resoluções orientam a construção e a segurança dessas unidades: a Resolução nº 9, de 9 de
                        novembro de 2011 (Brasil, 2011), e a Resolução nº 16, de 10 de junho de 2021 (Brasil, 2021),
                        ambas publicadas pelo Conselho Nacional de Política Criminal e Penitenciária (CNPCP), vinculado
                        ao Ministério da Justiça e Segurança Pública.
                    </p>
                    <p>
                        A Resolução nº 9/2011 estabelece as orientações e recomendações técnicas para a construção de
                        estabelecimentos prisionais. Entre os principais pontos estão: a capacidade dos
                        estabelecimentos, os parâmetros arquitetônicos que devem ser adotados, a localização das
                        instituições penais, as medidas de segurança contra incêndios e as condições de conforto
                        ambiental, como ventilação e iluminação (Brasil, 2011). Já a Resolução nº 16/2021 trata da
                        segurança interna dos estabelecimentos penais, proibindo, por exemplo, a instalação de tomadas e
                        pontos de energia dentro e nas proximidades das celas. Essa medida tem como principal objetivo
                        reduzir o uso de aparelhos celulares nos estabelecimentos para limitar a comunicação entre as
                        pessoas privadas de liberdade e o ambiente externo (Brasil, 2021).
                    </p>
                </div>

                <div class="w-full  bg-green-200 text-xl leading-10 font-serif">
                    <div class="max-w-[800px] mx-auto py-10 flex flex-col gap-7">
                        <p class="font-bold">Saiba mais</p>
                        <p><b>Título:</b> <i>Manual de Intervenções Ambientais para o Controle da Tuberculose nas
                                Prisões</i></p>
                        <p><b>Autores:</b> Mauro Santos et al. (2012).</p>
                        <p><b>Descrição:</b> em 2012, o projeto Fundo Global Tuberculose - Brasil, com o apoio dos
                            Ministérios da Justiça e da Saúde, publicou esse manual.</p>
                        <p><b>Acesse:</b> <a class="underline text-blue-500 break-words"
                                href="https://bvsms.saude.gov.br/bvs/publicacoes/manual_intervencoes_ambientais_controle_tuberculose_prisoes.pdf">https://bvsms.saude.gov.br/bvs/publicacoes/manual_intervencoes_ambientais_controle_tuberculose_prisoes.pdf</a>
                        </p>
                    </div>
                </div>

                <div class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7 font-serif text-xl leading-10">
                    <p>Já a estrutura jurídica do sistema prisional no Brasil é composta por diversos órgãos
                        responsáveis pela execução penal. Cada um deles tem atribuições específicas, como veremos a
                        seguir, incluindo o Conselho Nacional de Política Criminal e Penitenciária (CNPCP), o Juízo da
                        Execução, o Ministério Público, o Conselho Penitenciário (COPEN), a Secretaria Nacional de
                        Políticas Penais (SENAPPEN), o Patronato Penitenciário, o Conselho da Comunidade e a Defensoria
                        Pública (Brasil, 1984). Além disso, cada estado tem sua Secretaria de Estado de Administração
                        Penitenciária, responsável pela administração das instituições penais em sua região. A seguir,
                        discutiremos de forma mais detalhada as funções de cada um desses órgãos.</p>
                    <div id="accordion">

                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold font-sans">1.7 Segurança e dinamismo do sistema prisional
                        brasileiro
                    </h2>
                    <p>
                        Uma importante classificação no âmbito do sistema prisional brasileiro é a do grau de segurança
                        das penitenciárias. Essa classificação é feita pelo Ministério da Justiça e Segurança Pública e
                        tem três categorias: Segurança Média, Segurança Máxima e Segurança Máxima Especial. As
                        penitenciárias de Segurança Média e de Segurança Máxima contam com celas individuais e
                        coletivas. As penitenciárias de Segurança Máxima Especial se diferenciam por serem equipadas
                        exclusivamente com celas individuais, oferecendo maior controle e segurança (Barbosa, 2022).
                    </p>
                    <p>
                        A escolha do nível de segurança leva em consideração o perfil das pessoas privadas de liberdade
                        que serão alocadas na penitenciária. Indivíduos que pertencem a facções criminosas ou que
                        cometeram crimes graves, como os hediondos, e pessoas cuja segurança pessoal esteja em risco são
                        alocados em penitenciárias de Segurança Máxima. Já as pessoas condenadas por crimes de menor
                        gravidade são encaminhadas às penitenciárias de Segurança Média, que são compostas, geralmente,
                        por celas coletivas.
                    </p>
                    <p>
                        As penitenciárias estaduais são de Segurança Média ou de Segurança Máxima, enquanto as
                        penitenciárias federais são todas de Segurança Máxima Especial (Barbosa, 2022). Em 2025, o
                        Brasil tem cinco penitenciárias federais, localizadas nas seguintes cidades: Brasília (Distrito
                        Federal), Porto Velho (Rondônia), Mossoró (Rio Grande do Norte), Campo Grande (Mato Grosso do
                        Sul) e Catanduvas (Paraná) (Brasil, 2025b).
                    </p>
                    <h2 class="text-2xl md:text-3xl font-bold font-sans">1.8 Direito à saúde</h2>
                </div>

                <div class="w-full bg-gray-100 text-xl leading-10 font-serif">
                    <div class="max-w-[900px] mx-auto py-10 flex flex-col gap-7">
                        <div class="w-[85px] border-3 border-orange-500"></div>
                        <h3 class="text-xl md:text-2xl font-bold leading-10">Você sabia que, mesmo estando privada de
                            liberdade,
                            uma pessoa não perde todos os seus direitos?</h3>
                        <p class="text-md leading-8 font-sans">Pois é, muita gente acredita que a privação
                            da
                            liberdade
                            suspende
                            completamente os direitos, mas isso não é verdade. O Código Penal Brasileiro (Brasil, 1940)
                            estabelece, em seu Art. 38, que a pessoa privada de liberdade mantém todos os direitos não
                            atingidos pela perda da liberdade. Em outras palavras, ela perde o direito de ir e vir, mas
                            continua tendo direito à dignidade, à saúde e à integridade física e moral. Além disso, a
                            Lei de Execução Penal trata da assistência às pessoas privadas de liberdade e egressas e
                            prevê que lhes seja ofertada assistência material, à saúde, jurídica, educacional, social e
                            religiosa (Brasil, 1984).</p>
                        <div class="w-[85px] border-3 border-orange-500 mt-10"></div>
                        <h3 class="text-xl md:text-2xl font-bold leading-10">Você já parou para pensar como deve ser
                            difícil garantir direitos em uma instituição penal?</h3>
                        <p class="text-md leading-8 font-sans">Costumamos falar de direitos como algo universal, mas, na
                            prática, o ambiente prisional impõe muitos desafios para que esses direitos sejam garantidos
                            e protegidos.</p>
                    </div>
                </div>

                <div class="w-full max-w-[800px] mx-auto px-2 py-10 flex flex-col gap-7 font-serif text-xl leading-10">
                    <p>E, quando o assunto é saúde, a situação se torna ainda mais complicada. Fazel e Baillargeon
                        (2011) chamam a atenção para um dado alarmante: transtornos mentais e doenças infecciosas são
                        mais comuns entre pessoas privadas de liberdade do que na população em geral. Quais razões você
                        acha que explicam esse cenário? Um dos motivos é justamente as condições de vida que essas
                        pessoas enfrentaram antes mesmo da prisão, um histórico de desigualdades sociais profundas,
                        muitas vezes transmitidas de geração em geração (Organização Mundial da Saúde, 2019).</p>
                    <p>
                        Diante disso, a conclusão é clara: o direito à saúde precisa ser encarado como uma prerrogativa
                        básica nos estabelecimentos penais. Mais do que isso: esse direito deve ser garantido com
                        qualidade e efetividade; não como uma concessão, mas como um dever do Estado.
                    </p>
                    <h2 class="text-2xl md:text-3xl font-bold">1.9 Experiências exitosas no sistema prisional brasileiro
                    </h2>
                    <p>
                        Uma experiência bem-sucedida relacionada ao direito à saúde é o Projeto Agentes Promotores de
                        Saúde: cuidando e ressocializando vidas, realizado na cidade de Cuiabá, capital do estado de
                        Mato Grosso. A iniciativa propõe a participação de pessoas privadas de liberdade como agentes de
                        promoção da saúde no ambiente prisional. Elas circulam pelas alas e pavilhões das instituições
                        penais com a missão de identificar demandas relacionadas à saúde, promover ações preventivas,
                        apoiar processos de reabilitação e contribuir para o bem-estar da população privada de
                        liberdade.
                    </p>
                    <p>
                        Dentre os principais resultados do projeto, destacam-se: a redução no número de novos casos de
                        diversas doenças; a ampliação da capacidade de monitoramento de pessoas com problemas de saúde;
                        o aumento do acesso aos serviços de saúde no sistema prisional; e a criação de oportunidades
                        para a ressocialização dos participantes, fortalecendo seu papel social e contribuindo para a
                        sua reintegração à sociedade.
                    </p>
                    <small>Essa iniciativa pode ser acessada pelo endereço:
                        <br> <a
                            href="https://www.prisoeslivresdetbcesp.com.br/projetoagentespromotoresdesaudecuidandoeressocializandovidas"
                            class="underline text-orange-500">https://www.prisoeslivresdetbcesp.com.br/projetoagentespromotoresdesaudecuidandoeressocializandovidas</a>
                    </small>
                </div>

                <a href="" class="w-full">
                    <div class="group bg-gray-300 hover:bg-gray-400 p-5">
                        <p class="text-center font-bold group-hover:underline">Lesson 4 - Encerramento da Unidade</p>
                        <div class="flex justify-center">
                            <font-awesome-icon :icon="faChevronDown" />
                        </div>
                    </div>
                </a>
            </div>
        </template>
    </TemplateModulo1>
</template>
