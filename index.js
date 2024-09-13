const { select } = require('@inquirer/prompts');

const start = async () => {
  while (true) {
    const opcao = await select({
      message: 'Menu >',
      choices: [
        {
          name: 'cadastrar meta',
          value: 'sair',
        },
        {
          name: 'sair',
          value: 'sair',
        },
        {
          name: 'listar Metas',
          value: 'listar',
        },
        {
          name: 'sair',
          value: 'sair',
        },
      ],
    });

    switch (opcao) {
      case 'cadastrar':
        console.log('vamos cadastrar');

        break;
      case 'listar':
        console.log('vamos Listar');

        break;
      case 'sair':
        return;
    }
  }
};

start();
