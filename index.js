const { select, input, checkbox } = require('@inquirer/prompts');
const fs = require('fs').promises;

let mensagem = 'Bem vindo ao App de Metas';

let metas;

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile('metas.json', 'utf-8');
    metas = JSON.parse(dados);
  } catch (error) {
    metas = [];
  }
};

const salvarMetas = async () => {
  await fs.writeFile('metas.json', JSON.stringify(metas, null, 2));
};

const cadastrarMeta = async () => {
  const meta = await input({
    message: 'Digite a meta:',
  });

  if (meta.length == 0) {
    mensagem = ' A Meta nao pode ser vazia!';
    return;
  }
  metas.push({
    value: meta,
    checked: false,
  });

  mensagem = 'Meta cadastrada com sucesso';
};

const listarMetas = async () => {
  if (respostas.length == 0) {
    mensagem = 'Você não marcou nenhuma meta!';
    return;
  }

  const respostas = await checkbox({
    message:
      'Use as setas para mudar de meta o espaço para marcar ou desmarcar, e o Enter para finalizar essa etapa:',
    choices: [...metas],
    instructions: false,
  });

  metas.forEach(m => {
    m.checked = false;
  });

  respostas.forEach(resposta => {
    const meta = metas.find(m => {
      return m.value == resposta;
    });
    meta.checked = true;
  });
  mensagem = 'Meta(s) marcada(s) como concluida(s)';
};

const metasRealizadas = async () => {
  if (respostas.length == 0) {
    mensagem = 'Você não marcou nenhuma meta!';
    return;
  }
  const realizadas = metas.filter(meta => {
    return meta.checked;
  });
  mensagem = realizadas;

  if (realizadas.length == 0) {
    mensagem = 'Você não realizou nenhuma meta! :(';
    return;
  }
  await select({
    message: 'Metas Realizadas ' + realizadas.length,
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  if (respostas.length == 0) {
    mensagem = 'Você não marcou nenhuma meta!';
    return;
  }
  const abertas = metas.filter(meta => {
    return !meta.checked;
  });

  if (abertas.length == 0) {
    mensagem = 'Você não tem nenhuma meta aberta! :)';
    return;
  }
  await select({
    message: 'Metas Abertas ' + abertas.length,
    choices: [...abertas],
  });
};

const deletarMetas = async () => {
  if (respostas.length == 0) {
    mensagem = 'Você não marcou nenhuma meta!';
    return;
  }
  const metasDesmarcadas = metas.map(meta => {
    return { value: meta.value, checked: false };
  });
  const itensADeletar = await checkbox({
    message: 'Selecione item para deletar',
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itensADeletar.length == 0) {
    mensagem = 'Você não marcou nenhuma meta para deletar!';
    return;
  }

  itensADeletar.forEach(item => {
    metas = metas.filter(meta => {
      return meta.value != item;
    });
  });
  mensagem = 'Metas deletada(s) com sucesso!';
};

const mostrarMensagem = () => {
  console.clear();

  if (mensagem != '') {
    console.log(mensagem);
    console.log('');
    mensagem = '';
  }
};
const start = async () => {
  await carregarMetas();
  while (true) {
    mostrarMensagem();
    await salvarMetas();

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
          name: 'Metas Abertas',
          value: 'abertas',
        },
        {
          name: 'Deletar Metas',
          value: 'deletar',
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

        break;
      case 'listar':
        await listarMetas();
        console.log('vamos Listar');
        break;
      case 'realizadas':
        await metasRealizadas();
        break;
      case 'abertas':
        await metasAbertas();
        break;
      case 'deletar':
        await deletarMetas();
        break;
      case 'sair':
        console.log('ate a proxima...!');
        return;
    }
  }
};

start();
