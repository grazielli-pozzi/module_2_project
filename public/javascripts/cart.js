let contador = document.getElementById('quantidade');

const addProduto = (id) => {
    if (localStorage.length === 0) {
        localStorage.setItem('produto', id);
        contador.innerText = 1
    }
}
