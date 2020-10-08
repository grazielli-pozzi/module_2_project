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
        
    // console.log();
    // console.log();
    // console.log(thisId['qty']);

}