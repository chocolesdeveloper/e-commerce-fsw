# Projeto Full Stack Week

![preview](https://github.com/chocolesdeveloper/e-commerce-fsw/assets/105561544/2ed1f135-532c-40cf-bc2e-b35e0afea815)

<p align="center">
  Um E-Commerce de vendas de periféricos como teclados, mouses, headset entre outros produtos!
</p>

## Tecnologias Utilizadas 🚀

- React: Uma biblioteca JavaScript popular para construir interfaces de usuário interativas.
- Next.js 13: Um framework React que oferece renderização do lado do servidor (SSR), geração estática (SSG), entre muitos outros recursos.
- Next Auth: Biblioteca para autenticação de usuários com OAuth.
- Postgres: Um sistema de gerenciamento de banco de dados relacional.
- Prisma: Um ORM (Object-Relational Mapping) para Node.js e TypeScript.
- shadcn/ui: Uma biblioteca de componentes de IU reutilizáveis e estilizáveis.
- Tailwind CSS: Um framework CSS que oferece várias classes para utilização já pré-estilizadas.
- API do Stripe: Uma API de pagamento popular para processar pagamentos online de forma segura.

## Funcionalidades 📦

- Login com o Google: Permitimos que os usuários façam login usando suas contas do Google para uma experiência de autenticação simplificada.
- Navegação por Categorias: Os usuários podem explorar produtos por categorias, facilitando a busca e a compra.
- Descontos em Produtos: Alguns produtos podem ter descontos especiais, permitindo aos usuários economizar em suas compras.
- Gerenciamento do Carrinho de Compras: Os usuários podem adicionar produtos ao seu carrinho de compras, remover produtos e também modificar a quantidade de um produto no carrinho de compras conforme necessário.
- Pagamento do Pedido com a API do Stripe: Oferecemos uma experiência segura de pagamento online com a integração da API do Stripe, incluindo o uso de webhooks para processar eventos relacionados ao pagamento. Os usuários podem concluir seus pedidos com facilidade e segurança.

## Protótipo no Figma 🎨

Você pode visualizar o protótipo do nosso projeto no Figma. Ele oferece uma prévia visual de como a interface do usuário é projetada e como as diferentes funcionalidades são organizadas. Confira o protótipo [aqui](https://www.figma.com/file/Y8jmabSZXxAobeUJQdI4bm/FSW-Store-%5BLive%5D?type=design&node-id=89-280&mode=design&t=6gAKLp0JuIIoJKRs-0).

Fique à vontade para explorar e compartilhar suas opiniões sobre o design do projeto!

## Como testar

Crie um arquivo `.env` e adicione as variáveis ambiente:

```bash

DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET_KEY=
HOST_URL=
```

Clone o repo:

```bash
  git clone https://github.com/chocolesdeveloper/e-commerce-fsw
```

Entre no diretório

```bash
  cd my-project
```

Instale as dependêcias 

```bash
  npm install 
```

Inicie o serve

```bash
  npm run dev
```

Acesse o `localhost:3000` no seu navegador e pronto.


## Authors

- Feito com carinho por: [@chocoles](https://github.com/chocolesdeveloper) :purple_heart:
