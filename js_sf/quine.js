$(function () {
    var MAX_VAR_NUM = 7;
    var MIN_VAR_NUM = 2;
    var varNum = 4;

    var MAX_FUNC_NUM = 5;
    var MIN_FUNC_NUM = 1;
    var funcNum = 1;

    var labelVarNums = $('#label_num');
    var labelFuncNums = $('#label_num_f');
    var resultText = $('#result_text');
    let letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

    genTable();

    $("#btn_plus").click(function () {
        if (varNum < MAX_VAR_NUM) {
            varNum++;
            genTable();
        }
    });

    $("#btn_minus").click(function () {
        if (varNum > MIN_VAR_NUM) {
            varNum--;
            genTable();
        }
    });

    $("#btn_plus_f").click(function () {
        if (funcNum < MAX_FUNC_NUM) {
            funcNum++;
            genTable();
        }
    });

    $("#btn_minus_f").click(function () {
        if (funcNum > MIN_FUNC_NUM) {
            funcNum--;
            genTable();
        }
    });


    $("#btn_quine_mac_klask").click(function () {
        calcQuineMacKlask($("#latexMode").get(0).checked);
    });

    $(".new_expression").click('click', _ => {
        location.reload();
    });

    //Tabla interactiva
    function genTable() {
        labelVarNums.text(varNum);
        labelFuncNums.text(funcNum);
        var head = $("#truth_table_head").empty();
        for (var i = 0; i < varNum; i++) {
            head.append('<td>' + letras[i] + '</div></td>');
        }
        for (i = 0; i < funcNum; i++) {
            head.append('<td class="col-lg-2"><div class="text-center">f</div></td>');
        }
        head.append('<td class="col-lg-2"><div class="text-center">Minitérmino</div></td>');
        

        var states = [{text: "1"}];
        var body = $("#truth_table_body").empty();
        var rows = Math.pow(2, varNum);
        for (var i = 0; i < rows; i++) {
            var row = $("<tr>");
            for (var j = 1; j <= varNum; j++) {
                var n = Math.pow(2, varNum - j);
                var m = Math.floor(i / n);
                row.append("<td>" + (m % 2 === 0 ? "0" : "1") + "</td>");
            }
            for (j = 1; j <= funcNum; j++) {
                var td = $('<td style="width: 100px"><div class="n-toggle"></td>');
                td.children('.n-toggle').nToggle(states);
                row.append(td);
                body.append(row);
            }
            row.append('<td>'+ i +'</sub></div></td>');
        }
    }

    function getTableContent() {
        var vars = [];
        var funcs = [];
        var body = $("#truth_table_body");
        body.children().each(function (idx, valTr) {
            var row = [];
            var func = [];
            $(valTr).children().each(function (idx2, valTd) {
                if (idx2 < varNum) {
                    row[idx2] = Number(valTd.innerText);
                } else {
                    var fidx = idx2 - varNum;
                    func[fidx] = $(valTd).find(".active").text();
                    if (func[fidx] !== '*')
                        func[fidx] = Number(func[fidx]);
                }
            });
            vars[idx] = row;
            funcs[idx] = func;
        });
        return {varTable: vars, funcTable: funcs};
    }

    function calcQuineMacKlask(latexMode) {
        resultText.empty();
        resultText.append('<strong></strong>');
        var data = getTableContent();
        var tableGroups;
        var groups = getGroupsStructure(data.varTable, data.funcTable);
        var ddnf = groups;

        var skdnf = [];
        var absorbNeeded = true;
        var step = 0;
        var contador = 0;
        var resPar = '';

        //Combinaciones tabla 3+
        var parCombi = [];

        while (absorbNeeded) {
            console.log('/////////////////////// NEXT ITER');
            console.log(JSON.stringify(groups));
            absorbNeeded = false;
            var k, m;
            var group1, group2;
            var resImpl, res;
            var newGroups = [];
            var newGroup;
            for (i = 0; i < groups.length; i++) {
                group1 = groups[i];
                console.log('///////// NEXT GROUP');
                console.log(JSON.stringify(group1));
                newGroup = [];
                for (j = 0; j < group1.length; j++) {
                    for (k = i + 1; k < groups.length; k++) {
                        group2 = groups[k];
                        for (m = 0; m < group2.length; m++) {
                            console.log('Gr=' + i + ' Im=' + j + ' >>>  Gr=' + k + ' Im=' + m);
                            resImpl = absorb(group1[j], group2[m]);
                            resPar = par(group1[j], group2[m]);
                            console.log('absorb result: ' + JSON.stringify(resImpl));
                            if (!resImpl)
                                continue;
                            absorbNeeded = true;
                            res = absorbImplicates(group1[j], group2[m]);
                            console.log('absorbImplaicates result: ' + JSON.stringify(res));
                            newGroup[newGroup.length] = {vars: resImpl, labels: res.new_labels,pares:resPar, absorbed: false};
                            if (contador === 0){
                                parCombi.push({bina: resImpl, com: resPar});
                            }
                            group1[j].absorbed = res.absorbed_1;
                            group2[m].absorbed = res.absorbed_2;
                        }
                    }
                }
                newGroups[i] = newGroup;
            }
            resultText.append('TABLA ' + ++step);
            tableGroups = $('<table>').addClass('table table-bordered');
            if(contador == 0){
                tableGroups.append($('<thead>').append('<tr>\n\
                        <td>1\'s</td>\n\
                        <td>Representación Binaria</td>\n\
                        <td>Minitérmino\n\
                     </tr>'));
                generateTableContent1(tableGroups, groups);
            }
            if(contador == 1){
                tableGroups.append($('<thead>').append('<tr>\n\
                        <td>1\'s</td>\n\
                        <td>Representación Binaria</td>\n\
                        <td>Combinaciones\n\
                     </tr>'));
                generateTableContent2(tableGroups, groups);
            }
            if(contador == 2){
                var newParCombi = moreCom(parCombi);
                tableGroups.append($('<thead>').append('<tr>\n\
                        <td>1\'s</td>\n\
                        <td>Representación Binaria</td>\n\
                        <td>Combinaciones\n\
                     </tr>'));
                generateTableContent3(tableGroups, groups, newParCombi);
            }
            if(contador == 3){
                var newParCombi0 = moreCom(parCombi);
                var newParCombi1 = returnPar(groups, newParCombi0);
                var newParCombi2 = moreCom1(newParCombi1);
                tableGroups.append($('<thead>').append('<tr>\n\
                        <td>1\'s</td>\n\
                        <td>Representación Binaria</td>\n\
                        <td>Combinaciones\n\
                     </tr>'));
                generateTableContent4(tableGroups, groups, newParCombi2);
            }
            if(contador > 3){
                tableGroups.append($('<thead>').append('<tr>\n\
                        <td>1\'s</td>\n\
                        <td>Representación Binaria</td>\n\
                     </tr>'));
                generateTableContent1(tableGroups, groups);
            }
            resultText.append($('<div>').addClass('panel panel-default').append(tableGroups));
            newGroups = removeDuplicateImpl(newGroups);
            addNotAbsorbed(groups, skdnf);
            groups = newGroups;
            contador++;
        }
        buildImplTable(skdnf, ddnf);
    }

    function getGroupsStructure(vars, funcs) {
        var groups = [];
        for (var i = 0; i <= varNum; i++) {
            var group = [];
            for (var j = 0; j < vars.length; j++) {
                var count = 0;
                var impl = '';
                var labels = '';
                var haveFuncOnImpl = false;
                var undefFuncs = '';
                for (var k = 0; k < funcNum; k++) {
                    if (funcs[j][k] === 1) {
                        haveFuncOnImpl = true;
                        labels += k;
                    } else if (funcs[j][k] === '*') {
                        haveFuncOnImpl = true;
                        undefFuncs += k;
                        labels += k;
                    }
                }
                if (haveFuncOnImpl) {
                    for (k = 0; k < varNum; k++) {
                        impl += vars[j][k];
                        if (vars[j][k] === 1) {
                            count++;
                        }
                    }
                    if (count === i) {
                        group[group.length] = {vars: impl, labels: labels, absorbed: false, undef: undefFuncs};
                    }
                }
            }
            groups[i] = group;
        }
        return groups;
    }

    function moreCom(combina){
        var resultado = [];
        var copyCombina = combina;
        var hash = {};

        for (var i = 0; i < copyCombina.length; i++){
            var comparar = combina[i];
            for (var j = 0; j < copyCombina.length; j++){
                if (comparar.com !== copyCombina[j].com){
                    var vars = '';
                    var diff = 0;
                    for (var z = 0; z < comparar.bina.length; z++) {
                        if (diff > 1){
                            console.log();
                        }
                        else{
                            if (comparar.bina[z] !== copyCombina[j].bina[z]) {
                                diff++;
                                vars += '_';
                            } else {
                                vars += comparar.bina[z];
                            }
                        }
                        newCombi = comparar.com + ',' +copyCombina[j].com;
                        resultado.push({combi: newCombi, binari: vars});
                    }
                }
            }
        }
        resultado = resultado.filter(function(current){
            var exists = !hash[current.binari];
            hash[current.binari] = true;
            return exists;
        });
        return resultado;
    }

    function generateTableContent0(table, groups) {
        var content = '';
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.length; j++) {
                mini = group[j].vars;
                content += '<tr><td>' + i + '</td>' + '<td>' + mini + '</td>' +'<td>'
            }
        }
        table.append(content);
    }

    function generateTableContent1(table, groups) {
        var content = '';
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.length; j++) {
                mini = group[j].vars;
                content += '<tr><td>' + i + '</td>' + '<td>' + mini + '</td>' +'<td>' + parseInt(mini, 2) + '</td>'
            }
        }
        table.append(content);
    }

    function generateTableContent2(table, groups) {
        var content = '';
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.length; j++) {
                mini = group[j].vars;
                mini2 = '(' + group[j].pares + ')';
                content += '<tr><td>' + i + '</td>' + '<td>' + mini + '</td>' + '<td>' + mini2 + '</td>'
            }
        }
        table.append(content);
    }

    function generateTableContent3(table, groups, combina) {
        var content = '';
        
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.length; j++) {
                mini = group[j].vars;
                for(var z = 0; z < combina.length; z++){
                    if(mini === combina[z].binari){
                        //content += '<tr><td>' + i + '</td>' + '<td>' + mini + '</td>' + '<td>' + combina[z].combi + '</td>'+ '<td>' + combina[z].binari + '</td>'
                        mini2 = '(' + combina[z].combi + ')';
                        content += '<tr><td>' + i + '</td>' + '<td>' + mini + '</td>' + '<td>' + mini2 + '</td>'
                    }
                }
            }
        }
        table.append(content);
    }

    function generateTableContent4(table, groups, combina) {
        var content = '';
        
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.length; j++) {
                mini = group[j].vars;
                for(var z = 0; z < combina.length; z++){
                    if(mini === combina[z].binari1){
                        //content += '<tr><td>' + i + '</td>' + '<td>' + mini + '</td>' + '<td>' + combina[z].combi + '</td>'+ '<td>' + combina[z].binari + '</td>'
                        mini2 = '(' + combina[z].combi1 + ')';
                        content += '<tr><td>' + i + '</td>' + '<td>' + mini + '</td>' + '<td>' + mini2 + '</td>'
                    }
                }
            }
        }
        table.append(content);
    }

    function returnPar(groups, combina){
        var arre = [];
        
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            for (var j = 0; j < group.length; j++) {
                mini = group[j].vars;
                for(var z = 0; z < combina.length; z++){
                    a = combina[z].combi;
                    b = combina[z].binari;
                    arre.push({pares:a, biina:b});            
                }
            }
        }
        return arre;
    }

    function moreCom1(combina){
        var resultado = [];
        var copyCombina = combina;
        var hash = {};

        for (var i = 0; i < copyCombina.length; i++){
            var comparar = combina[i];
            for (var j = 0; j < copyCombina.length; j++){
                if (comparar.pares !== copyCombina[j].pares){
                    var vars = '';
                    var diff = 0;
                    for (var z = 0; z < comparar.biina.length; z++) {
                        if (diff > 1){
                            console.log();
                        }
                        else{
                            if (comparar.biina[z] !== copyCombina[j].biina[z]) {
                                diff++;
                                vars += '_';
                            } else {
                                vars += comparar.biina[z];
                            }
                        }
                        newCombi = comparar.pares + ',' +copyCombina[j].pares;
                        resultado.push({combi1: newCombi, binari1: vars});
                    }
                }
            }
        }
        resultado = resultado.filter(function(current){
            var exists = !hash[current.binari1];
            hash[current.binari1] = true;
            return exists;
        });
        return resultado;
    }

    function absorbImplicates(im1, im2) {
        console.log('absorbImplicates started: ' + JSON.stringify(im1) + ' and ' + JSON.stringify(im2));
        var newLabels = '';
        var absorbed1 = im1.absorbed;
        var absorbed2 = im2.absorbed;
        var eq = 0;
        for (var i = 0; i < im1.labels.length; i++) {
            if (im2.labels.indexOf(im1.labels[i]) !== -1) {
                newLabels += im1.labels[i];
                eq++;
            }
        }
        if (eq === im1.labels.length) {
            absorbed1 = true;
        }
        eq = 0;
        for (var i = 0; i < im2.labels.length; i++) {
            if (im1.labels.indexOf(im2.labels[i]) !== -1)
                eq++;
        }
        if (eq === im2.labels.length) {
            absorbed2 = true;
        }
        return {absorbed_1: absorbed1, absorbed_2: absorbed2, new_labels: newLabels};
    }

    function absorb(a, b) {
        console.log('absorb started: ' + JSON.stringify(a) + ' and ' + JSON.stringify(b));
        if (!varsComparable(a, b) || !labelsComparable(a, b))
            return false;
        var vars = '';
        var diff = 0;
        for (var i = 0; i < a.vars.length; i++) {
            if (a.vars[i] !== b.vars[i]) {
                diff++;
                vars += '_';
            } else {
                vars += a.vars[i];
            }
        }
        if (diff > 1)
            return false;
        return vars;
    }

    function par(a, b) {
        var parejas = '';
        var resultado = '';
        var int1 = '';
        var int2 = '';
        for (var i = 0; i < a.vars.length; i++) {
            int1 += a.vars[i];
            int2 += b.vars[i];
        }
        resultado = parseInt(int1, 2) + ','+ parseInt(int2, 2);
        parejas = resultado;
        return parejas;
    }

    function varsComparable(a, b) {
        for (var i = 0; i < a.vars.length; i++) {
            if ((a.vars[i] !== b.vars[i])
                    && (b.vars[i] === '_' || a.vars[i] === '_'))
                return false;
        }
        return true;
    }

    function labelsComparable(a, b) {
        for (var i = 0; i < a.labels.length; i++) {
            if (b.labels.indexOf(a.labels[i]) !== -1)
                return true;
        }
        return false;
    }

    function removeDuplicateImpl(groups) {
        var newGroups = [];
        var newGroup;
        var group;
        var skip;
        for (var i = 0; i < groups.length; i++) {
            group = groups[i];
            newGroup = [];
            for (var j = 0; j < group.length; j++) {
                skip = false;
                for (var k = j + 1; k < group.length; k++) {
                    if (group[j].vars === group[k].vars
                            && group[j].labels === group[k].labels) {
                        skip = true;
                        console.log('SKIP ' + JSON.stringify(group[j]) + ' === ' + JSON.stringify(group[k]));
                        console.log('in group ' + i + ' indexes: ' + j + ' === ' + k);
                        break;
                    }
                }
                if (!skip) {
                    newGroup[newGroup.length] = group[j];
                }
            }
            newGroups[i] = newGroup;
        }
        return newGroups;
    }

    function addNotAbsorbed(groups, skdnfImpl) {
        var group;
        for (var i = 0; i < groups.length; i++) {
            group = groups[i];
            for (var j = 0; j < group.length; j++) {
                if (!group[j].absorbed) {
                    skdnfImpl[skdnfImpl.length] = group[j];
                }
            }
        }
    }

    function implicatesToStr(impl) {
        var str = '';
        for (var i = 0; i < impl.length; i++) {
            str += impl[i].vars + '(' + getHumanReadableLabels(impl[i]) + ')';
            if (i < impl.length - 1)
                str += '+';
        }
        if (str === '')
            str = 'any';
        return str;
    }

    function buildImplTable(skdnf, ddnfGroups) {
        var ddnf = [];
        var impl;
        var funcGroup;
        for (var i = 0; i < ddnfGroups.length; i++) {
            for (var j = 0; j < ddnfGroups[i].length; j++) {
                impl = ddnfGroups[i][j];
                for (var k = 0; k < impl.labels.length; k++) {
                    if (impl.undef.indexOf(impl.labels[k]) !== -1) continue;
                    funcGroup = ddnf[impl.labels[k]];
                    if (funcGroup === undefined)
                        funcGroup = [];
                    funcGroup[funcGroup.length] = impl;
                    ddnf[impl.labels[k]] = funcGroup;
                }
            }
        }
        
        var table = $('<table>').addClass('table table-bordered modal-body').attr('id', 'impl_table');
        var ddnfRow = $('<tr>').append('<td style="min-width: 100px;">Representación Binaria</td>');
        var funcRow = $('<tr>').append($('<td>TABLA IMPLICANTES PRIMOS</td>'));
        let suma = [];
        
        for (var i = 0; i < ddnf.length; i++) {
            for (var j = 0; j < ddnf[i].length; j++) {
                impl = ddnf[i][j];
                let a = (impl.vars).toString();
                let b = parseInt(a, 2);
                ddnfRow.append($('<td>').append(b).addClass('text-center'));
                suma.push(a);
            }
        }
        table.append($('<thead>').append(funcRow, ddnfRow));
        var row;
        var skImpl;
        var map = [];
        var colIdx;
        for (var i = 0; i < skdnf.length; i++) {
            skImpl = skdnf[i];
            row = $('<tr>').append($('<td nowrap>').append(skImpl.vars));
            colIdx = 0;
            for (var j = 0; j < ddnf.length; j++) { 
                for (var k = 0; k < ddnf[j].length; k++) {
                    impl = ddnf[j][k];
                    colIdx++;
                    if (labelsComparable(skImpl, {labels: String(j)}) && implAinB(skImpl, impl)) {
                        row.append($('<td>').append('X').addClass('text-center').attr('id', 'r' + i + 'c' + colIdx));
                        map[map.length] = {impl: skImpl, row: i, col: colIdx, func: String(j)};
                    } else {
                        row.append($('<td>').addClass('text-center'));
                    }
                }
            }
            table.append(row);
        }
        resultText.append(table);
        var mdnf = [];
        var closedCols = [];
        for (var i = 0; i < map.length; i++) {
            if (inColumnCount(map[i], map) === 1 && !inClosed(map[i], closedCols)) {
                mdnf[mdnf.length] = map[i].impl;
                map[i].kernel = true;
                map[i].closed = true;
                closedCols[closedCols.length] = map[i].col;
                closeOtherInRow(map[i], map, closedCols, true);
            }
        }
        
        var elem;
        var queue = 0;
        while (closedCols.length < colIdx) {
            elem = switchElem(map, closedCols);
            mdnf[mdnf.length] = elem.impl;
            elem.closed = true;
            closedCols[closedCols.length] = elem.col;
            closeOtherInRow(elem, map, closedCols, false);
        }
        printMdnf(mdnf, $("#latexMode").get(0).checked,suma);
    }

    function inColumnCount(mapElem, map) {
        var n = 0;
        for (var i = 0; i < map.length; i++) {
            if (mapElem.col === map[i].col)
                n++;
        }
        return n;
    }

    function closeOtherInRow(mapElem, map, closedCols, kernelElem) {
        for (var i = 0; i < map.length; i++) {
            if (map[i].row === mapElem.row) {
                if (!inClosed(map[i], closedCols)) {
                    closedCols[closedCols.length] = map[i].col;
                }
            }
        }

    }

    function inClosed(mapElem, closedCols) {
        for (var i = 0; i < closedCols.length; i++) {
            if (mapElem.col === closedCols[i])
                return true;
        }
        return false;
    }

    function switchElem(map, closedCols) {
        var best;
        var countInRow, maxCount = 0;
        var varsInImpl, minVars = 999;
        for (var i = 0; i < map.length; i++) {
            if (inClosed(map[i], closedCols))
                continue;
            countInRow = 0;
            for (var j = 0; j < map.length; j++) {
                if (!inClosed(map[j], closedCols) && map[j].row === map[i].row) {
                    countInRow++;
                }
            }
            if (countInRow >= maxCount) {
                varsInImpl = 0;
                for (var j = 0; j < map[i].impl.vars.length; j++) {
                    if (map[i].impl.vars[j] !== '_') {
                        varsInImpl++;
                    }
                }
                if (varsInImpl <= minVars) {
                    maxCount = countInRow;
                    minVars = varsInImpl;
                    best = map[i];
                }
            }
        }
        best.inRow = maxCount;
        best.implLen = minVars;
        return best;
    }

    function implAinB(a, b) {
        for (var i = 0; i < a.vars.length; i++) {
            if (a.vars[i] === '_' || a.vars[i] === b.vars[i]) {
            }
            else
                return false;
        }
        return true;
    }

    function getHumanReadableLabels(impl) {
        var labels = '';
        for (var i = 0; i < impl.labels.length; i++) {
            labels += impl.labels[i];
            if (i < impl.labels.length - 1)
                labels += ', ';
        }
        return labels;
    }

    function printMdnf(mdnf, latexMode,sumatoria) {
        let suma = [];
        numVar = sumatoria[1].length;
        let variables = [];
        for (var j = 0; j < numVar; j++){
            variables.push(letras[j]);
        }
        for (var i = 0; i < sumatoria.length; i++) {
            z = sumatoria[i];
            let a = z.toString();
            let b = parseInt(a, 2);
            suma.push(b);
        }
        let producto = implicatesToStr(mdnf);
        let finalProducto = product(producto);
        var mdnfStr = 'f(' + variables + ") = " + "Σ" + '<sub>m</sub>'+"("+ suma +") = "+ finalProducto;
        resultText.append('<hr><h2><small><Font color = "black">Resultado</Font></small></h2>' + '<h2><small><Font color = "black">' + mdnfStr + '</Font></small></h2><br>');
        mdnfStr = mdnfStr.replace(/(.+)/, '');
        resultText.append('<br/>' + mdnfStr);
    }

    function product(lista){
        separado = lista.split("+");
        tam = separado.length;
        var num = separado[0].length - 3;
        let listaFinal = [];

        for (var i = 0; i < tam; i++){
            miniProducto = "";
            primer = separado[i];
            for (var j = 0; j <num; j++){
                segundo = letras[j];
                tercer = primer[j];
                if(tercer == '0'){
                    cuarto = segundo + "'";
                    miniProducto = miniProducto + cuarto;
                }
                if(tercer == '1'){
                    cuarto = segundo;
                    miniProducto = miniProducto + cuarto;
                }
                if(tercer == '_'){
                    cuarto = "";
                    miniProducto = miniProducto + cuarto;
                }
            }
            listaFinal.push(miniProducto);
        }
        return listaFinal.join(' + ');
    }
});

function showImplicTable() {
    var modal = $('<div>').addClass('modal fade');
    var w = $('#impl_table').width() + 70;
    if (w > $(window).width())
        w = $(window).width();
    var dialog = $('<div>').addClass('modal-dialog modal-lg');
    var content = $('<div>').addClass('modal-content')
            .css('width', w);
    var header = $('<div>').addClass('modal-header');
    var body = $('<div>').addClass('modal-body').attr('style', 'overflow: auto;');
    var data = $('#impl_table').clone(true);
    if ($('#showMini')[0].checked) {
        data.css('font-size', '14px');
        data.css('width', '0px');
        data.find('td').css('padding', '2px');
    }
    header.append('<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title"></h4>');
    modal.append(dialog.append(content.append(header, body.append(data))));
    modal.modal('show');
}
