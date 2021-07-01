//Recebe parâmetro da URL
var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');

let respGet;
let respVenda;

function Dados() {

    modeloPut = document.getElementById("carroModeloPut");
    marcaPut = document.getElementById("carroMarcaPut");
    anoFabriPut = document.getElementById("dataFabricacaoPut");
    placaPut = document.getElementById("carroPlacaPut");
    corPut = document.getElementById("carroCorPut");
    chassiPut = document.getElementById("carroChassiPut");
    dataCompraPut = document.getElementById("dataCompraPut");
    valorCompraPut = document.getElementById("valorCompraPut");

    var url = `http://localhost:5000/carros/get/${id}`;

    modelo = document.getElementById("modeloView");
    marca = document.getElementById("marcaView");
    anoFabri = document.getElementById("anoFabriView");
    placa = document.getElementById("placaView");
    cor = document.getElementById("corView");
    chassi = document.getElementById("chassiView");
    dataCompra = document.getElementById("dataCompraView");
    valorCompra = document.getElementById("valorCompraView");

    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        respGet = JSON.parse(request.response);

        modelo.innerHTML = respGet[0].modelo;
        modeloPut.value = respGet[0].modelo;
        marca.innerHTML = respGet[0].marca;
        marcaPut.value = respGet[0].marca;
        anoFabri.innerHTML = respGet[0].ano_fabricacao;
        anoFabriPut.value = respGet[0].ano_fabricacao;
        placa.innerHTML = respGet[0].placa;
        placaPut.value = respGet[0].placa;
        cor.innerHTML = respGet[0].cor;
        corPut.value = respGet[0].cor;
        chassi.innerHTML = respGet[0].chassi;
        chassiPut.value = respGet[0].chassi;
        dataCompra.innerHTML = respGet[0].data_compra;
        dataCompraPut.value = respGet[0].data_compra;
        valorCompra.innerHTML = respGet[0].valor_compra;
        valorCompraPut.value = respGet[0].valor_compra;
    }

    request.onerror = function () {
        console.log("Erro:" + request);
    };

    request.send();
}

function VendaGet() {

    var url = `http://localhost:5000/vendas/get/${id}`;

    dadosVendas = document.getElementById("dadosVenda");
    vendaModal = document.getElementById("vendaModal");

    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        respVenda = JSON.parse(request.response);
        dadosVendas.innerHTML = `<div id="info" class="row">
        <div class="col-md-3">
          <p><strong>Data da venda:</strong></p>
          <p id="modeloView">${respVenda[0].data_venda}</p>
        </div>
        <div class="col-md-3">
          <p><strong>Valor da venda:</strong></p>
          <p id="marcaView">${respVenda[0].valor_venda}</p>
        </div>
        <div class="col-md-3">
          <p><strong>Comissão:</strong></p>
          <p id="anoFabriView">${respVenda[0].comissao}</p>
        </div>
      </div>
      <hr/>`
        vendaModal.innerHTML = `<div class="form-group col-md-4">
            <label for="dataVendaPut">Data da venda:</label>
            <input type="date" class="form-control" id="dataVendaPut" placeholder="Digite o valor">
        </div>
        <div class="form-group col-md-4">
            <label for="valorVendaPut">Valor da venda:</label>
            <input type="number" class="form-control" id="valorVendaPut" placeholder="Digite o valor" onchange="CalComissao()">
        </div>
        <div class="form-group col-md-4">
            <label for="comissaoPost">Comissão:</label>
            <input type="number" class="form-control" id="comissaoVendaPut" placeholder="Digite o valor" readonly>
        </div>`
        dataVendaPut = document.getElementById("dataVendaPut");
        valorVendaPut = document.getElementById("valorVendaPut");
        comissaoPut = document.getElementById("comissaoVendaPut");
        dataVendaPut.value = respVenda[0].data_venda;
        valorVendaPut.value = respVenda[0].valor_venda;
        comissaoPut.value = respVenda[0].comissao;
    }

    request.onerror = function () {
        console.log("Erro:" + request);
    };

    request.send();
}

Dados();
VendaGet();

//Atualizar Carro
function Update() {
    var url = `http://localhost:5000/carros/put/${id}/${modeloPut.value}/${marcaPut.value}/${anoFabriPut.value}/${placaPut.value}/${chassiPut.value}/${dataCompraPut.value}/${valorCompraPut.value}/${corPut.value}`;
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
    setTimeout(() => { window.location.reload() }, 500);
    UpdateVenda();
}

//Atualizar Venda
function UpdateVenda() {
    var url = `http://localhost:5000/vendas/put/${id}/${dataVendaPut.value}/${valorVendaPut.value}/${comissaoPut.value}/`;
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
    setTimeout(() => { window.location.reload() }, 500);
}

//Calcular Comissão
function CalComissao() {
    valor = document.getElementById("valorVendaPut");
    comissao = document.getElementById("comissaoVendaPut");

    comissao.value = valor.value / 10;
}

//Deletar item
function Deletar() {

    var url = "http://localhost:5000/carros/delete";
    var request = new XMLHttpRequest();

    request.open("DELETE", url + `/${id}`, true);
    request.onload = function () {
        var respPut = request.responseText;
        if (request.readyState == 4 && request.status == "200") {
            console.table(respPut);
        } else {
            console.error(respPut);
        }
    }
    request.send(null);
    DeletarVenda();
    setTimeout(() => { Ordenar() }, 500);
}

function DeletarVenda() {

    var url = "http://localhost:5000/vendas/delete";
    var request = new XMLHttpRequest();

    request.open("DELETE", url + `/${id}`, true);
    request.onload = function () {
        var respDel = request.responseText;
        if (request.readyState == 4 && request.status == "200") {
            console.table(respDel);
        } else {
            console.error(respDel);
        }
    }
    request.send(null);
}

//Ordenar
function Ordenar() {

    console.log("Ordenar")
    let tamanho = 0;

    let request = new XMLHttpRequest();
    request.open('GET', "http://localhost:5000/carros/", true);
    request.onload = function () {
        respCarros = JSON.parse(request.response);
        tamanho = respCarros.length;
        console.log(respCarros)
        console.log(tamanho)
        for (i = 0; i < tamanho; i++) {
            OrdenarCarros(respCarros[i].id, (i + 1));
        }
        setTimeout(() => { window.location = "index.html" }, 1000);
    }
    request.onerror = function () {
        // There was a connection error of some sort
        console.log("Erro:" + request);
    };
    request.send();
}

function OrdenarCarros(id, newid) {
    console.log(`Carro, Id: ${id}, NewID: ${newid}`)
    var url = `http://localhost:5000/carros/put/${id}/${newid}/`;
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
    OrdenarVendas(id, newid)
}

function OrdenarVendas(id, newid) {
    console.log(`Venda, Id: ${id}, NewID: ${newid}`)
    var url = `http://localhost:5000/vendas/put/${id}/${newid}/`;
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
}

//Fim ordenar