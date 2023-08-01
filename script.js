// alert ("Hello Word!!")

// Algoritmo
// OK  1. Pegar os valores dos inputs
// OK  2. Fazer o calculo do IMC -> valorImc
// Ok  3. Gerar a classificaçao IMC -> classificacaoImc
// Ok  4. Organizar os dados do usuario para salvar na lista e gerar a data de cadastro
// Ok  5. inserir o usuario na lista(salvar no localStorage)
// Ok  6. Funcao para carregar os usuarios(salvos no localStorage) chamar ao carregar a pagina
// Ok  7.  renderizar o conteudo da tabela com os usuarios cadastrados = mostrar na tela
// Botao para limpar os registros (localStorage)

function calcular(event) {


    event.preventDefault()
  
    console.log ("Executada funçao calcular!!")
  
    // passo 1
    let usuario = receberValores()

    // passo 2
    let calculoIdade = calcularIdade (usuario.ano, usuario.dataHoraAtual)
    
    // passo 3
    let classificacaoIdade = classificarIdade (calculoIdade)
  
    console.log (classificacaoIdade)
  
    // passo 4
    usuario = organizarDados (usuario, calculoIdade, classificacaoIdade)
  
    // passo 5
    cadastrarUsuario(usuario)
  
   // Atualizaçao automatica da pagina 
    window.location.reload()
  
  
  }
  
  function receberValores() {
    let nomeRecebido = document.getElementById ("nome").value.trim()
    let diaRecebido = document.getElementById ("dia-nascimento").value
    let mesRecebido = document.getElementById ("mes-nascimento").value
    let anoRecebido = document.getElementById ("ano-nascimento").value

    let dadosUsuario = {
      nome: nomeRecebido,
      dia: diaRecebido,
      mes: mesRecebido,
      ano: anoRecebido,
    }
  console.log (dadosUsuario)
  
  return dadosUsuario
  }

  function calcularIdade(ano, mes, dia) {

  //  let calculoIdade  = new Date().getFullYear() - ano;
  //  let calculoMes = new Date().getMonth() - mes;
  //  let calculoDia = new Date().getDate() - dia;

    let diaAtual = new Date().getDate()
    let mesAtual = new Date().getMonth()
    // let anoAtual = new Date().getDate()
    let calculoIdade  = new Date().getFullYear() - ano;

    if (mesAtual < mes || diaAtual < dia) {
    return calculoIdade -- } else {
      return calculoIdade
    }
  }
  
  function classificarIdade(calculoIdade) {

  if  (calculoIdade <= 12) {
  return 'Criança'
  } 

  else if(calculoIdade >= 13 && calculoIdade <= 17) {
  return 'Adolescente'
  }

  else if(calculoIdade >= 18 && calculoIdade <= 65) {
    return 'Adulto'
  }

  else if(calculoIdade >= 66) {
  return 'Idoso'
  }

  }

  function organizarDados (usuario, calculoIdade, classificarIdade) {
    // pegar data e hora
  let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())
  
  console.log(dataHoraAtual)
  
  // organizar dados
  
  let dadosUsuarioAtualizado = {
    ...usuario,
    idade: calculoIdade,
    situaçaoIdade: classificarIdade,
    dataCadastro: dataHoraAtual
  }
  
  return dadosUsuarioAtualizado;
  
  }
  
  function cadastrarUsuario(usuario) {
  
  let listaUsuarios = []
  
  
  if (localStorage.getItem('usuariosCadastrados') != null) {
    listaUsuarios = JSON.parse ( localStorage.getItem ('usuariosCadastrados'))
  }
  
  //Adiciona o usuario
  listaUsuarios.push (usuario)
  
  // Salva a lista usuario Localstorage
  localStorage.setItem('usuariosCadastrados', JSON.stringify(listaUsuarios))
  
  }
  
  function carregarUsuarios () {
  
    let listaCarregada = []
  
    if (localStorage.getItem('usuariosCadastrados') != null) {
      listaCarregada = JSON.parse (localStorage.getItem('usuariosCadastrados'))
    }
  
    if (listaCarregada.length == 0) {
      // se nao tiver nenhum usuario cadastrado mostrar msg
      let tabela = document.getElementById('corpo-tabela')
  
      tabela.innerHTML = `<tr class='linha-mensagem'>
      <td colspan='6'>Nenhum usuario cadastrado 👌</td>
      </tr>`
    } else {
      // Montar conteudo da tabela...
  
    montarTabela(listaCarregada)
  
    }
  
    console.log(listaCarregada)
  }
  
  window.addEventListener('DOMContentLoaded', () => carregarUsuarios())
  
  //Passo 7 
  
  function montarTabela(listaUsuarios) {
  
    let tabela = document.getElementById('corpo-tabela')
  
    let template = ''
    
    listaUsuarios.forEach(usuario => {
      template += `
      <tr>
      <td data-cell="nome">${usuario.nome}</td>
      <td data-cell="data de nascimento">${usuario.dia + "/" + usuario.mes + "/" + usuario.ano}</td>
      <td data-cell="idade">${usuario.idade}</td>
      <td data-cell="faixa etária">${usuario.situaçaoIdade}</td>
  </tr>` 
    });
  
    tabela.innerHTML = template;
  }
  
  function deletarRegistros() {
    // Remove o item do localstorage
    localStorage.removeItem('usuariosCadastrados')
  
    // Recarrega a pagina
    window.location.reload()
  
  
  }