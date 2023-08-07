function calcular(event) {

    event.preventDefault()

    console.log ("Executada funçao calcular!!")

    let usuario = receberValores()
    let calculoIdade = calcularIdade (usuario.ano, usuario.anoAtual, usuario.mesAtual, usuario.diaAtual)
    let classificacaoIdade = classificarIdade (calculoIdade)

    console.log (classificacaoIdade)

    usuario = organizarDados (usuario, calculoIdade, classificacaoIdade)
    cadastrarUsuario(usuario)
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

    let dataOk = new Date()
    let calculoIdade  = dataOk.getFullYear() - ano

    if (mes > dataOk.getMonth() || mes >= dataOk.getMonth() && dia > dataOk.getDate())
  {
   calculoIdade --
    }    
      return calculoIdade
  }
  
  console.log()

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

  let dadosUsuarioAtualizado = {
    ...usuario,
    idade: calculoIdade,
    situaçaoIdade: classificarIdade,
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