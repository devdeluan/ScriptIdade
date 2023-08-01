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
    let idadeCalculada = calcularIdade(usuario.ano, usuario.atual)
    
    // passo 3
    let classificacaoImc = classificarImc (imcCalculado)
  
    console.log (classificacaoImc)
  
    // passo 4
    usuario = organizarDados (usuario, imcCalculado, classificacaoImc)
  
    // passo 5
    cadastrarUsuario(usuario)
  
   // Atualizaçao automatica da pagina 
    window.location.reload()
  
  
  }
  
  function receberValores() {
    let nomeRecebido = document.getElementById ("nome").value.trim()
    let anoRecebido = document.getElementById ("ano-nascimento").value
    let anoAtual = dataHoraAtual
  
    let dadosUsuario = {
      nome: nomeRecebido,
      ano: anoRecebido,
      atual: anoAtual
    }
  console.log (dadosUsuario)
  
  return dadosUsuario
  }
  
  function calcularIdade(ano, dataHoraAtual) {
    let resultado = ano - dataHoraAtual
  
    console.log (resultado.toFixed(1))
  
    return resultado
  }
  
  function classificarIdade(resultado) {
  
//   Gerar a faixa etária
   
//     Resultado            Faixa

//     0 à 12              Criança
//     13 à 17             Adolescente
//     18 à 65             Adulto
//     Acima de 65         Idoso 
   

  if  (resultado <= 12) {
  return 'Criança'
  } 

  else if(resultado >= 13 && resultado <= 17) {
  return 'Adolescente'
  }

  else if(resultado >= 18 && resultado <= 65) {
    return 'Adulto'
  }

  else if(resultado >= 66) {
  return 'Idoso'
  }

  }

  function organizarDados (usuario, idadeCalculada, classificarIdade) {
    // pegar data e hora
  let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())
  
  console.log(dataHoraAtual)
  
  // organizar dados
  
  let dadosUsuarioAtualizado = {
    ...usuario,
    resultado: idadeCalculada.toFixed(1),
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
      template += `<tr>
      <td data-cell="nome">${usuario.nome}</td>
      <td data-cell="altura">${usuario.altura}</td>
      <td data-cell="peso">${usuario.peso}</td>
      <td data-cell="valor do IMC">${usuario.imc}</td>
      <td data-cell="classificação do IMC">${usuario.situaçaoImc}</td>
      <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
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