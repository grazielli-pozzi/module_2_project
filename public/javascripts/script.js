document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

//!-- Rodrigo - 03/10 --
function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('estado').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('estado').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}
    
function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('estado').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

function recalculaValor(){
  //console.log('mudou');

  let total = 0;
  const products = document.getElementsByClassName('product');
  for(i=0;i<products.length;i++){
    singleProduct = products[i];
    //console.log(singleProduct);
    total += updateSubtotal(singleProduct);
  }  

  // ITERATION 3
  //... your code goes here
  //console.log(total);
  let sumTotal = document.querySelector('#total-value span');
  sumTotal.innerHTML = total;
}

function updateSubtotal(product) {
  //console.log('Calculating subtotal, yey!');

  //... your code goes here
  let price = product.querySelector('.price span');
  let quantity = product.querySelector('.quantity input');

  let idProd = product.getAttribute('id');
  const thisId = JSON.parse(localStorage.getItem(idProd));
  const qtyAnt = thisId['qty'];

  if (qtyAnt > quantity.value){
    //console.log('diminuiu');
    deleteProduto(idProd);
  } else if(qtyAnt < quantity.value) {
    //console.log('aumentou');
    createProduto(idProd);
  }

  let valPrice = price.innerHTML;
  let valQuantity = quantity.value;

  let subTotal = valPrice  * valQuantity;
  //console.log(subTotal);

  let subtotal = product.querySelector('.subtotal span');
  subtotal.innerHTML = subTotal;

  return subTotal;
}

const createProduto = (id) => {
	// if (Object.keys(localStorage).includes(id)) {
		const data = JSON.parse(localStorage.getItem(id));
		data.qty += 1;
		localStorage.setItem(id, JSON.stringify(data));
		//document.getElementsByClassName(`${id}`)[0].textContent = data.qty;
	// } else {
	// 	const data = {nome, preco, qty: 1};
	// 	localStorage.setItem(id, JSON.stringify(data));
	// 	document.getElementsByClassName(`${id}`)[0].textContent = data.qty;
	// }
}

const deleteProduto = (id) => {
	const data = JSON.parse(localStorage.getItem(id));
	// if (data.qty > 1) {
		data.qty -= 1;
		localStorage.setItem(id, JSON.stringify(data));
		//document.getElementsByClassName(`${id}`)[0].textContent = data.qty;
	// }
	// else {
	// 	localStorage.removeItem(id);
	// 	document.getElementsByClassName(`${id}`)[0].textContent = 0;
	// }
}

const clearLS = () => localStorage.clear();
