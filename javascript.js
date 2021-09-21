
var pesos = [0.3, 32, 1.0, 0.1, 0.1, 0.4, 0.1, 1.0, 0.3, 2.8, 0.3, 0.3, 0.7, 0.1, 0.7, 0.4]
    
var conexoes = {"20": [1.2, 0.5, 0.5, 0.3, 0.8, 2.4, 2.4, 0.4, 1.0, 0.9, 9.5, 2.7, 4.1, 11.4, 0.2, 6.1],
                "25": [1.5, 0.7, 0.6, 0.4, 0.9, 3.1, 3.1, 0.5, 1.2, 1.3, 13.3, 3.8, 5.8, 15, 0.4, 8.4],
                "32": [2.0, 1.0, 0.7, 0.5, 1.5, 4.6, 4.5, 0.6, 1.8, 1.4, 15.5, 4.9, 7.4, 22, 0,4, 10,5],
                "40": [3.2, 1.3, 1.2, 0.6, 2.2, 7.3, 7.3, 1.0, 2.3, 3.2, 18.3, 6.8, 9.1, 35.8, 0.7, 17],
                "50": [3.4, 1.5, 1.3, 0.7, 2.3, 7.6, 7.6, 1.5, 2.8, 3.3, 23.7, 7.1, 10.8, 37.9, 0.8, 18.5],                    
                "60": [3.7, 1.7, 1.4, 0.8, 2.4, 7.8, 7.8, 1.6, 3.3, 3.5, 25.0, 8.2, 12.5, 38.0, 0.9, 19.0],
                "75": [3.9, 1.8, 1.5, 0.9, 2.5, 8.0, 8.0, 2.0, 3.7, 3.7, 26.8, 9.3, 14.2, 40.0, 0.9, 20.0],
               "100": [4.3, 1.9, 1.6, 1.0, 2.6, 8.3, 8.3, 2.2, 4.0, 3.9, 28.6, 10.4, 16.0, 42.3, 1.0, 22.1],
               "125": [4.9, 2.4, 1.9, 1.1, 3.3, 10.0, 10.0, 2.5, 5.0, 4.9, 37.4, 12.5, 19.2, 50.9, 1.1, 26.2],
               "150": [5.4, 2.6, 2.1, 1.2, 3.8, 11.1, 11.1, 2.8, 5.6, 5.5, 43.4, 13.9, 21.4, 56.7, 1.2, 28.9]
            }


var dn = 0 
                    
var peso_total = 0
var vazao = 0
var comp_equivalente = 0
var comp_real = 0

var perda_carga_uni = 0
var perda_carga_real = 0
var perda_carga_equiv = 0
var perda_carga_total = 0

function calcular(){

    var pecas = [document.getElementById("qntBaciaSanitariaCaixa").value,
                 document.getElementById("qntBaciaSanitariaValvula").value,
                 document.getElementById("qntBanheira").value,
                 document.getElementById("qntBebedouro").value,
                 document.getElementById("qntBide").value,
                 document.getElementById("qntChuveiroDucha").value,
                 document.getElementById("qntChuveiroEletrico").value,
                 document.getElementById("qntLavadoura").value,
                 document.getElementById("qntLavatorio" ).value,
                 document.getElementById("qntMicCerValvula").value,
                 document.getElementById("qntMicCerCaixa").value,
                 document.getElementById("qntMicCalha").value,
                 document.getElementById("qntPiaTorneira").value,
                 document.getElementById("qntPiaEletrica").value,
                 document.getElementById("qntTanque").value,
                 document.getElementById("qntTorneiraJardim").value]

    var qntConexoes = [document.getElementById("qntJoelho90").value,
                       document.getElementById("qntJoelho45").value,
                       document.getElementById("qntcurva90").value,
                       document.getElementById("qntCurva45").value,
                       document.getElementById("qntTeDireta").value,
                       document.getElementById("qntTeLateral").value,
                       document.getElementById("qntTeBilateral").value,
                       document.getElementById("qntEntradaNormal").value,
                       document.getElementById("qntEntradaBorda" ).value,
                       document.getElementById("qntSaidaCanalizacao").value,
                       document.getElementById("qntValvulaCrivo").value,
                       document.getElementById("qntValRetLeve").value,
                       document.getElementById("qntValRetPesada").value,
                       document.getElementById("qntRegGlobo").value,
                       document.getElementById("qntRegGaveta").value,
                       document.getElementById("qntRegAngulo").value]

    dn = document.getElementById("diametro").value 
    comp_real = document.getElementById("qntTubo").value

    peso_total = 0
    for (var i = 0 ; i < 16 ; i++){
        peso_total = peso_total + pesos[i] * pecas[i]
    }
    
    vazao = 0.3 * peso_total**0.5
    
    comp_equivalente = 0
    for(var i = 0; i < 16 ; i++){
        comp_equivalente = comp_equivalente + conexoes[dn][i] * qntConexoes[i]
    }

    perda_carga_uni = 8.69 * 10**6 * vazao**1.75 * dn**(-4.75) * 0.102
    perda_carga_real = perda_carga_uni * comp_real
    perda_carga_equiv = perda_carga_uni * comp_equivalente
    perda_carga_total = perda_carga_equiv + perda_carga_real
}

function adicionarTrecho(){
    const notificar = document.getElementById("notificacao")
    notificar.classList.add("mostrar")
    
    var inicio = parseInt(document.getElementById("inicio").value)
    var fim = parseInt(document.getElementById("fim").value)
    var tabela = document.getElementById("tabela")
    var qntLinhas = tabela.rows.length

    //linha inicial
    if(qntLinhas == 1){
        var linha = tabela.insertRow(1)
        var celulas = [linha.insertCell(0), linha.insertCell(1), linha.insertCell(2), linha.insertCell(3),
                       linha.insertCell(4), linha.insertCell(5), linha.insertCell(6), linha.insertCell(7),
                       linha.insertCell(8), linha.insertCell(9), linha.insertCell(10), linha.insertCell(11),
                       linha.insertCell(12), linha.insertCell(13), linha.insertCell(14), linha.insertCell(15)]
        
        celulas[0].innerHTML = inicio
        celulas[1].innerHTML = fim
        celulas[2].innerHTML = peso_total.toFixed(2)
        celulas[3].innerHTML = vazao.toFixed(2)
        celulas[4].innerHTML = dn
        celulas[5].innerHTML = ((vazao/1000) / (Math.PI * (((dn/1000)**2)/4))).toFixed(2)
        celulas[6].innerHTML = perda_carga_uni.toFixed(2)
        celulas[7].innerHTML = document.getElementById("difCotas").value
        celulas[8].innerHTML = 0
        celulas[9].innerHTML = comp_real
        celulas[10].innerHTML = comp_equivalente.toFixed(2)
        celulas[11].innerHTML = perda_carga_real.toFixed(2)
        celulas[12].innerHTML = perda_carga_equiv.toFixed(2)
        celulas[13].innerHTML = perda_carga_total.toFixed(2)
        celulas[14].innerHTML = (parseFloat(celulas[7].innerHTML) + parseFloat(celulas[8].innerHTML)
                                - parseFloat(celulas[13].innerHTML)).toFixed(2)
        celulas[15].innerHTML = document.getElementById("pressaoRequerida").value
        
        
    } 
    //continuar linha anterior
    else if(inicio == parseInt(tabela.rows[qntLinhas-1].cells[1].innerHTML)){
        var linha = tabela.insertRow(qntLinhas)
        var celulas = [linha.insertCell(0), linha.insertCell(1), linha.insertCell(2), linha.insertCell(3),
                       linha.insertCell(4), linha.insertCell(5), linha.insertCell(6), linha.insertCell(7),
                       linha.insertCell(8), linha.insertCell(9), linha.insertCell(10), linha.insertCell(11),
                       linha.insertCell(12), linha.insertCell(13), linha.insertCell(14), linha.insertCell(15)]
        
        celulas[0].innerHTML = inicio
        celulas[1].innerHTML = fim
        celulas[2].innerHTML = peso_total.toFixed(2)
        celulas[3].innerHTML = vazao.toFixed(2)
        celulas[4].innerHTML = dn
        celulas[5].innerHTML = ((vazao/1000) / (Math.PI * (((dn/1000)**2)/4))).toFixed(2)
        celulas[6].innerHTML = perda_carga_uni.toFixed(2)
        celulas[7].innerHTML = document.getElementById("difCotas").value
        celulas[8].innerHTML = tabela.rows[qntLinhas-1].cells[14].innerHTML
        celulas[9].innerHTML = comp_real
        celulas[10].innerHTML = comp_equivalente.toFixed(2)
        celulas[11].innerHTML = perda_carga_real.toFixed(2)
        celulas[12].innerHTML = perda_carga_equiv.toFixed(2)
        celulas[13].innerHTML = perda_carga_total.toFixed(2)
        celulas[14].innerHTML = (parseFloat(celulas[7].innerHTML) + parseFloat(celulas[8].innerHTML)
                                - parseFloat(celulas[13].innerHTML)).toFixed(2)
        celulas[15].innerHTML = document.getElementById("pressaoRequerida").value
    } 
    //editar trecho ou adicionar trecho com inicio em qualquer ponto
    else{
        var novoTrecho = true
        //editar trecho
        for (var i = 1; i < qntLinhas ; i++){
            if (parseInt(tabela.rows[i].cells[0].innerHTML) == inicio && parseInt(tabela.rows[i].cells[1].innerHTML) == fim){
                novoTrecho = false
                var linha = tabela.rows[i]
                
                linha.cells[0].innerHTML = inicio
                linha.cells[1].innerHTML = fim
                linha.cells[2].innerHTML = peso_total.toFixed(2)
                linha.cells[3].innerHTML = vazao.toFixed(2)
                linha.cells[4].innerHTML = dn
                linha.cells[5].innerHTML = ((vazao/1000) / (Math.PI * (((dn/1000)**2)/4))).toFixed(2)
                linha.cells[6].innerHTML = perda_carga_uni.toFixed(2)
                linha.cells[7].innerHTML = document.getElementById("difCotas").value
                if(i == 1){
                    linha.cells[8].innerHTML = 0
                } else{
                    linha.cells[8].innerHTML = tabela.rows[qntLinhas-1].cells[14].innerHTML
                }
                linha.cells[9].innerHTML = comp_real
                linha.cells[10].innerHTML = comp_equivalente.toFixed(2)
                linha.cells[11].innerHTML = perda_carga_real.toFixed(2)
                linha.cells[12].innerHTML = perda_carga_equiv.toFixed(2)
                linha.cells[13].innerHTML = perda_carga_total.toFixed(2)
                linha.cells[14].innerHTML = (parseFloat(linha.cells[7].innerHTML) + parseFloat(linha.cells[8].innerHTML)
                                        - parseFloat(linha.cells[13].innerHTML)).toFixed(2)
                linha.cells[15].innerHTML = document.getElementById("pressaoRequerida").value
                
                for(var j = 2 ; j < tabela.rows.length ; j++){
                    if(tabela.rows[j].cells[0].innerHTML == "-"){}
                    else if(tabela.rows[j-1].cells[0].innerHTML != "-"){
                        tabela.rows[j].cells[8].innerHTML = tabela.rows[j-1].cells[14].innerHTML
                        tabela.rows[j].cells[14].innerHTML = (parseFloat(tabela.rows[j].cells[7].innerHTML) + parseFloat(tabela.rows[j].cells[8].innerHTML)
                                                              - parseFloat(tabela.rows[j].cells[13].innerHTML)).toFixed(2)
                    } else{
                        for(var k = 1; k < j ; k++){
                            if(tabela.rows[j].cells[0].innerHTML == parseInt(tabela.rows[k].cells[1].innerHTML)){
                                tabela.rows[j].cells[8].innerHTML = tabela.rows[k].cells[14].innerHTML
                                tabela.rows[j].cells[14].innerHTML = (parseFloat(tabela.rows[j].cells[7].innerHTML) + parseFloat(tabela.rows[j].cells[8].innerHTML)
                                                                      - parseFloat(tabela.rows[j].cells[13].innerHTML)).toFixed(2)
                            break
                            }
                        }
                    }
                }
                break
            }
        }
        //adicionar trecho com inicio em qualquer ponto
        if (novoTrecho){
            //adicionar linha "---------"
            var linha = tabela.insertRow(qntLinhas)
            var celulas = [linha.insertCell(0), linha.insertCell(1), linha.insertCell(2), linha.insertCell(3),
                        linha.insertCell(4), linha.insertCell(5), linha.insertCell(6), linha.insertCell(7),
                        linha.insertCell(8), linha.insertCell(9), linha.insertCell(10), linha.insertCell(11),
                        linha.insertCell(12), linha.insertCell(13), linha.insertCell(14), linha.insertCell(15)]
            
            celulas[0].innerHTML = "-"
            celulas[1].innerHTML = "-"
            celulas[2].innerHTML = "-"
            celulas[3].innerHTML = "-"
            celulas[4].innerHTML = "-"
            celulas[5].innerHTML = "-"
            celulas[6].innerHTML = "-"
            celulas[7].innerHTML = "-"
            celulas[8].innerHTML = "-"
            celulas[9].innerHTML = "-"
            celulas[10].innerHTML = "-"
            celulas[11].innerHTML = "-"
            celulas[12].innerHTML = "-"
            celulas[13].innerHTML = "-"
            celulas[14].innerHTML = "-"
            celulas[15].innerHTML = "-"

            //adicionar linha com os valores
            linha = tabela.insertRow(qntLinhas+1)
            celulas = [linha.insertCell(0), linha.insertCell(1), linha.insertCell(2), linha.insertCell(3),
                        linha.insertCell(4), linha.insertCell(5), linha.insertCell(6), linha.insertCell(7),
                        linha.insertCell(8), linha.insertCell(9), linha.insertCell(10), linha.insertCell(11),
                        linha.insertCell(12), linha.insertCell(13), linha.insertCell(14), linha.insertCell(15)]
            
            celulas[0].innerHTML = inicio
            celulas[1].innerHTML = fim
            celulas[2].innerHTML = peso_total.toFixed(2)
            celulas[3].innerHTML = vazao.toFixed(2)
            celulas[4].innerHTML = dn
            celulas[5].innerHTML = ((vazao/1000) / (Math.PI * (((dn/1000)**2)/4))).toFixed(2)
            celulas[6].innerHTML = perda_carga_uni.toFixed(2)
            celulas[7].innerHTML = document.getElementById("difCotas").value
            for(var i = 0 ;  i < qntLinhas ; i++){
                if (parseInt(tabela.rows[i].cells[1].innerHTML) == inicio){
                    celulas[8].innerHTML = parseFloat(tabela.rows[i].cells[14].innerHTML)
                }
            }
            celulas[9].innerHTML = comp_real
            celulas[10].innerHTML = comp_equivalente.toFixed(2)
            celulas[11].innerHTML = perda_carga_real.toFixed(2)
            celulas[12].innerHTML = perda_carga_equiv.toFixed(2)
            celulas[13].innerHTML = perda_carga_total.toFixed(2)
            celulas[14].innerHTML = (parseFloat(celulas[7].innerHTML) + parseFloat(celulas[8].innerHTML)
                                    - parseFloat(celulas[13].innerHTML)).toFixed(2)
            celulas[15].innerHTML = document.getElementById("pressaoRequerida").value
        }
    }
    document.getElementById("inicio").value = fim
    document.getElementById("fim").value = fim + 1
}

function removerTrecho(){
    var tabela = document.getElementById("tabela")
    if( tabela.rows.length > 1){
        var ultimo = tabela.rows.length
        tabela.deleteRow(ultimo-1)
    }
}

function exportarCSV(){
    var tabela = document.getElementById("tabela")
    var matrizTabela = []

    var linhas = tabela.rows.length
    
    for (var i = 0 ; i < linhas ; i++){
        matrizTabela.push([])
        for (var j = 0 ; j < 15 ; j++){
            matrizTabela[i].push(tabela.rows[i].cells[j].innerHTML)
        }
    }

    var CsvString = ""
    matrizTabela.forEach(function(RowItem, RowIndex) {
      RowItem.forEach(function(ColItem, ColIndex) {
        CsvString += ColItem + ','
      })
      CsvString += "\r\n"
    })
    CsvString = "data:application/csv," + encodeURIComponent(CsvString)
    var x = document.createElement("A")
    x.setAttribute("href", CsvString )
    x.setAttribute("download","Dimensionamentos.csv")
    document.body.appendChild(x)
    x.click()
}

function abrirModal(modalId){
    const notificar = document.getElementById("notificacao")
    notificar.classList.remove("mostrar")
    
    const modal = document.getElementById("divTabela")
    modal.classList.add("mostrar")
    modal.addEventListener("click", (e) => {
        if(e.target.id == "divTabela" || e.target.id == "voltar"){
            modal.classList.remove("mostrar")
        }
    });
}