const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
  value: 'tomar 3L de agua por dia',
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({
    message: 'Digite a meta:',
  });

  if (meta.length == 0) {
    console.log(' A Meta nao pode ser vazia!');
    return;
  }
  metas.push({
    value: meta,
    checked: false,
  });
};

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      'Use as setas para mudar de meta o espaço para marcar ou desmarcar, e o Enter para finalizar essa etapa:',
    choices: [...metas],
    instructions: false,
  });

  metas.forEach(m => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    console.log('Você não marcou nenhuma meta!');
    return;
  }

  respostas.forEach(resposta => {
    const meta = metas.find(m => {
      return m.value == resposta;
    });
    meta.checked = true;
  });
  console.log('Meta(s) marcadas como concluida(s)');
};

const metasRealizadas = async () => {
  const realizadas = metas.filter(meta => {
    return meta.checked;
  });
  console.log(realizadas);

  if (realizadas.length == 0) {
    console.log('Você não realizou nenhuma meta! :(');
    return;
  }
  await select({
    message: 'Metas Realizadas',
    choices: [...realizadas],
  });
};
const start = async () => {
  while (true) {
    const opcao = await select({
      message: 'Menu >',
      choices: [
        {
          name: 'cadastrar meta',
          value: 'cadastrar',
        },

        {
          name: 'listar Metas',
          value: 'listar',
        },
        {
          name: 'Metas realizadas',
          value: 'realizadas',
        },
        {
          name: 'sair',
          value: 'sair',
        },
      ],
    });

    switch (opcao) {
      case 'cadastrar':
        await cadastrarMeta();
        console.log(metas);

        break;
      case 'listar':
        await listarMetas();
        console.log('vamos Listar');
        break;
      case 'realizadas':
        await metasRealizadas();

      case 'sair':
        console.log('ate a proxima...!');
        return;
    }
  }
};

start();
