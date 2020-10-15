//const Produto = require('../models/Produto.model');

window.onload =  () => {
    const ids = Object.keys(localStorage);
    
    let tagHtml = '';
    let sumTotal = 0;
    let itemNr = 0;

	ids.forEach(id => {
        const thisId = JSON.parse(localStorage.getItem(id));
        
        let subTotal = thisId['qty'] * thisId['preco'];
        sumTotal += subTotal;
        itemNr ++;

        tagHtml += `<tr class='product' id='${id}'>
                            <th scope="row">${itemNr}</th>
                            <td>${thisId['nome']}</td>
                            <td class="quantity">
                                <input class='quantity-value' type="number" value=${thisId['qty']} min="0"  onchange="recalculaValor();" />
                            </td>
                            <td class="price">$<span>${thisId['preco']}</span></td>
                            <td class="subtotal">$<span>${subTotal}</span></td>
                        </tr>`;
    });
    
    tagHtml += `<tr>
                    <td></th>
                    <td></td>
                    <td></td>
                    <th scope="row">Total Pedido</th>
                    <th scope="row" id='total-value'>$<span>${sumTotal}</span></th>
                </tr>`; 

    document.getElementsByClassName('tbody')[0].innerHTML = tagHtml;
}

const enviaDados = async () => {

    //console.log('preparando dados para enviar');
    let dadosPedido = {};

    const ids = Object.keys(localStorage);
    
    let sumTotal = 0;
    //let indexId = 0;
    let arrayItens = [];

	ids.forEach(id => {
        const thisId = JSON.parse(localStorage.getItem(id));
        
        //let subTotal = ;
        sumTotal += thisId['qty'] * thisId['preco'];

        if (thisId['qty'] > 0) {
            //Rodrigo - 13/10 - Acrescentado nome e preco
            arrayItens.push({produtoID: id, quantidade: thisId['qty'], nome: thisId['nome'], preco: thisId['preco']});
        }
        //indexId ++;
    });    
    //console.log(dadosPedido);
    dadosPedido = {itens: arrayItens, total: sumTotal};
    //console.log(dadosPedido);

    if (sumTotal === 0) {
        alert('Pedido Vazio, selecione algum produto!')
        return ;
    } ;

    try {
        console.log('entrou no axios');
        let dataRet = await axios.post(`/cart`, dadosPedido);

        //console.log(dataRet.request.responseURL);
        //deleta todos os itens do carrinho
        localStorage.clear();

        window.location=dataRet.request.responseURL;

    //console.log(dataRet);

        //return dataRet.data;
    } catch (error) {
        console.log(error);
    }

}