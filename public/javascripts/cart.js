window.onload = () => {
	const ids = Object.keys(localStorage);
	ids.forEach(id => {
		const thisId = JSON.parse(localStorage.getItem(id));
		document.getElementsByClassName(id)[0].textContent = thisId.qty;
	});
}

const createProduto = (id, nome, preco, descricao) => {
	if (Object.keys(localStorage).includes(id)) {
		const data = JSON.parse(localStorage.getItem(id));
		data.qty += 1;
		localStorage.setItem(id, JSON.stringify(data));
		document.getElementsByClassName(`${id}`)[0].textContent = data.qty;
	} else {
		const data = {nome, preco, descricao, qty: 1};
		localStorage.setItem(id, JSON.stringify(data));
		document.getElementsByClassName(`${id}`)[0].textContent = data.qty;
	}
}

const deleteProduto = (id) => {
	const data = JSON.parse(localStorage.getItem(id));
	if (data.qty > 1) {
		data.qty -= 1;
		localStorage.setItem(id, JSON.stringify(data));
		document.getElementsByClassName(`${id}`)[0].textContent = data.qty;
	}
	else {
		localStorage.removeItem(id);
		document.getElementsByClassName(`${id}`)[0].textContent = 0;
	}
}