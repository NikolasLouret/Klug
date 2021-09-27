# Especificações Do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Contexto.md"> Documentação de Contexto</a></span>

> Apresente uma visão geral do que será abordado nesta parte do
> documento, enumerando as técnicas e/ou ferramentas utilizadas para
> realizar a especificações do projeto

## Personas

<strong>Wellington</strong> tem 47 anos, e já foi motorista de ônibus e taxi. Ele mora no centro da cidade e tem carro próprio que o possibilita ser motorista de aplicativo de viagem, sua principal fonte de renda aliás. Por não ter muito poder aquisitivo, o Wellington vive sofrendo com a mal optimização dos aplicativos de GPS em seu celular, além de reclamar muito dos diversos problemas ocasionados nas rotas geradas automaticamente. Outro problema que afeta negativamente a vida do motorista é a dificuldade de entender o mapa do aplicativo, por ter uma interface muito poluída com informações desnecessárias para a usabilidade dele.

<strong>Adriano</strong> tem 35 anos e também é motorista de aplicativo de viagem, além de ser entregador de aplicativo (motoboy). Por morar em uma região periférica, tem muito apreço pela segurança, tanto no trânsito como pessoal. Ele é extremamente pontual e não gosta de atrasos, por isso se sente muito frustrado quando as viagens demoram mais do que o informado pelos aplicativos. Atualmente ele resolve esse problema ele negocia com o cliente para não ter problemas. Outro problema que afeta a vida do Adriano é ausência de indicação da elevação das ruas. Quando elas são muito íngremes, o carro dele não consegue subi-las.

<strong>Luiz</strong> tem 26 anos e é um profissional liberal. Ele sai de casa quase todos os dias, inclusive nos finais de semana para lazer, e por não ter carro próprio, ele utiliza aplicativos de viagem e entrega. Por ser um usuário ativo desses serviços, ele se sente irritado quando o GPS do aplicativo de viagem erra o caminho, causando-lhe um atraso, ou quando algum produto erra o endereço. Ele tem o sonho de comprar um carro próprio e parar de usar esses aplicativos.

<strong>Guilherme</strong> tem 25 anos e mora na região central da cidade. Ele é recém habilitado e já tem carro próprio. Por não ter muita experiência no trânsito e muito menos com mapas e GPS, ele se depara com muitos problemas no dia-dia com os aplicativos de rotas GPS. Um exemplo é quando o carro morre em um local muito movimentado, isso deixa-o extremamente irritado e nervoso. Ele soluciona esse problema optando por fazer rotas que passam em ruas com o trânsito mais tranquilo, o que é um pouco difícil para ele.


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

> Apresente aqui as histórias de usuário que são relevantes para o
> projeto de sua solução. As Histórias de Usuário consistem em uma
> ferramenta poderosa para a compreensão e elicitação dos requisitos
> funcionais e não funcionais da sua aplicação. Se possível, agrupe as
> histórias de usuário por contexto, para facilitar consultas
> recorrentes à essa parte do documento.
>
> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre tarefas | ALTA | 
|RF-002| Emitir um relatório de tarefas no mês   | MÉDIA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

> Com base nas Histórias de Usuário, enumere os requisitos da sua
> solução. Classifique esses requisitos em dois grupos:
>
> - [Requisitos Funcionais
>   (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
>   correspondem a uma funcionalidade que deve estar presente na
>   plataforma (ex: cadastro de usuário).
>
> - [Requisitos Não Funcionais
>   (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
>   correspondem a uma característica técnica, seja de usabilidade,
>   desempenho, confiabilidade, segurança ou outro (ex: suporte a
>   dispositivos iOS e Android).
>
> Lembre-se que cada requisito deve corresponder à uma e somente uma
> característica alvo da sua solução. Além disso, certifique-se de que
> todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


> Enumere as restrições à sua solução. Lembre-se de que as restrições
> geralmente limitam a solução candidata.
> 
> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
