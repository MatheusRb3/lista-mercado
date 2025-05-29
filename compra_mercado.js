produtos_mercado = [];
preco_mercado = [];
qtds = [];




const lista = (nome_produto, preco, qtd, div) => {
    if(nome_produto != "" && preco != "" && qtd != "")
    {
        produtos_mercado.push(nome_produto);
        preco_mercado.push(preco);
        qtds.push(qtd);

        lerLista(div);
    }
    else{
        alert("Preencha todos os campos!");
    }
}

const lerLista = (div) => {

    let totalGeral = 0;

    let tabela = `<table class="table table-dark table-hover">
                    <tr>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th>Valor Total</th>
                        <th>Ações</th>
                    </tr>
`;

    produtos_mercado.forEach((produto, index) => {
        const valor = parseFloat(preco_mercado[index]);
        const quantidade = parseInt(qtds[index]);
        const total = valor * quantidade;

        totalGeral += total;


                tabela += `<tr>
                            <td>${produto}</td>
                           <td>R$ ${valor.toFixed(2)}</td>
                           <td>${quantidade}</td> 
                           <td>R$ ${total.toFixed(2)}</td>
                           <td><button class="btn btn-warning" onclick="retirar(${index}, '${div}')">Retirar</button>
                           <button class="btn btn-warning" onclick="editar(${index}, '${div}')">Editar</button></td>
                           </tr>`;

    });

    tabela += `<tr>
                <td colspan=2></td>
                <td style="text-align:right">Total da compra:</td>
                <td colspan=2>R$ ${totalGeral.toFixed(2)}</td>
                </tr>`

    document.getElementById(div).innerHTML = tabela;

    document.getElementById("nome_produto").value = "";
    document.getElementById("valor_produto").value = "";
    document.getElementById("qtd_itens").value = "";
    document.getElementById("nome_produto").focus();
}

const retirar = (index, div) => {
    produtos_mercado.splice(index, 1);
    preco_mercado.splice(index, 1);
    qtds.splice(index, 1);

    lerLista(div);
}



const editar = (index, div) => {
    document.getElementById("nome_produto").value = produtos_mercado[index];
    document.getElementById("valor_produto").value = preco_mercado[index];
    document.getElementById("qtd_itens").value = qtds[index];


    document.getElementById("nome_produto").focus();

    document.getElementById("confirm_button").style.display="none";
    document.getElementById("confirm_edit").style.display="block";

    const confirmEditBtn = document.getElementById("confirm_edit");

    // Substituir o botão por um clone para remover event listeners antigos
    const newBtn = confirmEditBtn.cloneNode(true);
    confirmEditBtn.replaceWith(newBtn);

    newBtn.style.display = "block";

    newBtn.addEventListener('click', function(){
        confirmarEdicao(index, div);
    });
}


const confirmarEdicao = (index, div) => {
    produtos_mercado[index] = document.getElementById("nome_produto").value;
    preco_mercado[index] = document.getElementById("valor_produto").value;
    qtds[index] = document.getElementById("qtd_itens").value;

    

    document.getElementById("confirm_button").style.display="block";
    document.getElementById("confirm_edit").style.display="none";


    lerLista(div);
}
