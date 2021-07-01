let compras = 0;
let id = 0;
let idPut = 0;
let respCarros;
let respVendas;

function SetID(num) {
    id = num;
}

function ViewId(num) {
    window.location = "view.html?id=" + num;
}

//Carros

//Listar carros
function ListarCarros() {

    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:5000/carros/', true);
    request.onload = function () {
        let itens = '';
        respCarros = JSON.parse(request.response);
        idPut = respCarros.length + 1;
        respCarros.map(
            carro => {
                itens += `<tr>
                    <td>${carro.status}</td>
                    <td>${carro.modelo}</td>
                    <td>${carro.marca}</td>
                    <td>${carro.ano_fabricacao}</td>
                    <td>${carro.cor}</td>
                    <td>${carro.placa}</td>
                    <td class="actions">
                        <a class="btn btn-outline-success btn-xs" href="#" onclick="ViewId(${carro.id})">
                        <i class="far fa-eye"></i>
                        Visualizar</a>
                        <a class="btn btn-outline-warning btn-xs"  href="#" data-bs-toggle="modal" href="index.html"  data-bs-target="#postVendaModal" onclick="SetID(${carro.id})">
                        <i class="fas fa-dollar-sign"></i>
                        Vender</a>
                    </td>
                </tr>`;
                compras += parseInt(carro.valor_compra);
            }
        );
        document.getElementById("lista").innerHTML = itens;
    };

    request.onerror = function () {
        // There was a connection error of some sort
        console.log("Erro:" + request);
    };

    request.send();
}
ListarCarros();


//Listar carros com filtro
function ListarCarrosFiltro(filtro) {

    let request = new XMLHttpRequest();
    request.open('GET', `http://localhost:5000/carros/get/filtro/${filtro}`, true);
    request.onload = function () {
        let itens = '';
        respFiltro = JSON.parse(request.response);
        respFiltro.map(
            carro => {
                itens += `<tr>
                    <td>${carro.status}</td>
                    <td>${carro.modelo}</td>
                    <td>${carro.marca}</td>
                    <td>${carro.ano_fabricacao}</td>
                    <td>${carro.cor}</td>
                    <td>${carro.placa}</td>
                    <td class="actions">
                    <a class="btn btn-outline-success btn-xs" href="#" onclick="ViewId(${carro.id})">
                    <i class="far fa-eye"></i>
                    Visualizar</a>
                        <a class="btn btn-outline-warning btn-xs"  href="#" data-bs-toggle="modal" href="index.html"  data-bs-target="#postVendaModal" onclick="SetID(${carro.id})">
                        <i class="fas fa-dollar-sign"></i>
                        Vender</a>
                    </td>
                </tr>`;
                compras += parseInt(carro.valor_compra);
            }
        );
        document.getElementById("lista").innerHTML = itens;
    }

    request.onerror = function () {
        // There was a connection error of some sort
        console.log("Erro:" + request);
    };
    request.send();
}

//Inserir item
function Inserir() {
    modelo = document.getElementById("carroModeloPost");
    marca = document.getElementById("carroMarcaPost");
    dataFabricacao = document.getElementById("dataFabricacaoPost");
    placa = document.getElementById("carroPlacaPost");
    cor = document.getElementById("carroCorPost");
    chassi = document.getElementById("carroChassiPost");
    dataCompra = document.getElementById("dataCompraPost");
    valorCompra = document.getElementById("valorCompraPost");

    var url = `http://localhost:5000/carros/post/${idPut}/${modelo.value}/${marca.value}/${dataFabricacao.value}/${placa.value}/${chassi.value}/${dataCompra.value}/${valorCompra.value}/${cor.value}/Disponível`;
    var request = new XMLHttpRequest();

    request.open("POST", url, true);
    request.onload = function () {
        var respPut = request.responseText;
        if (request.readyState == 4 && request.status == "200") {
            console.table(respPut);
        } else {
            console.error(respPut);
        }
    }
    request.send(null);
    setTimeout(() => { window.location.reload() }, 500);
}

//Vendas

//Get vendas
function ListarVendas(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        // Success!
        let vendas = 0;
        let comissoes = 0;
        respVendas = JSON.parse(request.response);
        respVendas.map(
            item => {
                vendas += parseInt(item.valor_venda);
                comissoes += parseInt(item.comissao);
            }
        );
        //Listar valores
        document.getElementById("compraTotal").innerHTML = `Compras totais: R$${compras}`;
        document.getElementById("vendaTotal").innerHTML = `Vendas totais: R$${vendas}`;
        document.getElementById("comissoes").innerHTML = `Comissões: R$${comissoes}`;
        document.getElementById("lucroMensal").innerHTML = `Lucro: R$${vendas - comissoes - compras}`;
    };

    request.onerror = function () {
        // There was a connection error of some sort
        console.log("Erro:" + request);
    };

    request.send();
}
ListarVendas("http://localhost:5000/vendas/");

//Post venda
function Vender() {

    dataVenda = document.getElementById("dataVenda");
    valorVenda = document.getElementById("valorVenda");
    comissaoVenda = document.getElementById("comissaoVenda");

    var url = `http://localhost:5000/vendas/post/${id}/${dataVenda.value}/${valorVenda.value}/${comissao.value}/`;
    var request = new XMLHttpRequest();

    request.open("POST", url, true);
    request.onload = function () {
        var respPut = request.responseText;
        if (request.readyState == 4 && request.status == "200") {
            console.table(respPut);
        } else {
            console.error(respPut);
        }
    }
    request.send(null);
    UpdateStatus('Vendido');
}

//Update status
function UpdateStatus(newStatus) {
    var url = `http://localhost:5000/carros/put/status/${id}/${newStatus}`;
    var request = new XMLHttpRequest();

    request.open("PUT", url, true);
    request.onload = function () {
        var respPut = request.responseText;
        if (request.readyState == 4 && request.status == "200") {
            console.table(respPut);
        } else {
            console.error(respPut);
        }
    }
    request.send(null);
    setTimeout(() => {
        window.location.reload()
    }, 1000);
}

//Calcular comissão
function CalComissao() {
    valor = document.getElementById("valorVenda");
    comissao = document.getElementById("comissaoVenda");

    comissao.value = valor.value / 10;
}
