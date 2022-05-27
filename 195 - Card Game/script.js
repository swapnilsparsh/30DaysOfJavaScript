window.addEventListener('load', function() { Solitario = new ObjetoSolitario;
            Solitario.Iniciar(); });


var ObjetoSolitario = function() {
    this.CartaDrag        = new Array();
    this.ImagenDrag       = new Array();
    this.Movimiento       = 0;
    this.Movimientos      = new Array();
    this.MovimientosAuyda = new Array();
    this.MovimientosAuydaActual = 0;
    
    this.Iniciar = function() {
        $("body").on("keydown", function(e) { 
            if (e.ctrlKey && (String.fromCharCode(e.which) === 'z' || String.fromCharCode(e.which) === 'Z')) {
                Solitario.Deshacer(e); 
            }
            else if (e.ctrlKey && (String.fromCharCode(e.which) === 'y' || String.fromCharCode(e.which) === 'Y')) {
                Solitario.Rehacer(e);             
            }
            else if (String.fromCharCode(e.which) === 'n' || String.fromCharCode(e.which) === 'N') {
                Solitario.NuevoJuego();   
            }
            else if (String.fromCharCode(e.which) === ' ') {
                Solitario.MostrarAyuda();
            }
        });
        
        $("ventanamenu > button:nth-child(1)").on("click", this.NuevoJuego.bind(this));
        $("ventanamenu > button:nth-child(2)").on("click", this.Deshacer.bind(this));
        $("ventanamenu > button:nth-child(3)").on("click", this.Rehacer.bind(this));
        $("ventanamenu > button:nth-child(4)").on("click", this.MostrarAyuda.bind(this));
        this.NuevoJuego();
    };
    
    this.MostrarAyuda = function() {
        $("Carta, Solucion, Baraja, Columna").removeAttr("ayuda1").removeAttr("ayuda2");
        var Mov = this.MovimientosAuyda[this.MovimientosAuydaActual];   
        if (this.MovimientosAuydaActual === this.MovimientosAuyda.length - 1) { this.MovimientosAuydaActual = 0; }
        else                                                                  { this.MovimientosAuydaActual ++; }
        Mov.origen.attr({ "ayuda1" : "true"});
        Mov.destino.attr({ "ayuda2" : "true"});        
    }
    
    this.NuevoJuego = function() {
        var Orden = new Array(4 * 13);
        var Baraja = Array();
        for (i = 0; i < 4; i++) { Baraja[i]   = $("Baraja[num='" + (i + 1) + "']");     Baraja[i].html("");   }
        var Solucion = Array();
        for (i = 0; i < 4; i++) { Solucion[i] = $("Solucion[num='" + (i + 1) + "']");   Solucion[i].html(""); }
        var Columna = Array();
        for (i = 0; i < 7; i++) { Columna[i]  = $("Columna[num='" + (i + 1) + "']");    Columna[i].html("");  }
        this.Movimiento = 0;
        this.Movimientos = [];
        var Cartas = Array();
        Contador = 0;
        for (p = 1; p < 5; p++) {
            for (v = 0; v < 13; v++) {
                Orden[Contador] = Contador;
                Cartas[Contador] = $("<Carta></Carta>")
                Cartas[Contador++].attr({ "Palo" : p, "Valor" : v, "Tapada" : "true" });
            }
        }
        for (var Rand, Tmp, i = Orden.length; i; Rand = Math.floor(Math.random() * i), Tmp = Orden[--i], Orden[i] = Orden[Rand], Orden[Rand] = Tmp);        
        Contador = 0;
        for (Cols = 0; Cols < 7; Cols ++) {
            Carta = Columna[Cols];
            for (i = 0; i < Cols +1; i++) {
                Carta = Cartas[Orden[Contador++]].appendTo(Carta);
                if (i == Cols) {
                    Carta.attr({ "Tapada" : "false", "draggable" : "true" });
                }
                Carta.css({ "z-index" : i });
            }
        }
        Carta = Baraja[0];
        for (var i = Contador; i < 52; i++) {
            Carta = Cartas[Orden[i]].appendTo(Carta);
            Carta.css({ "z-index" : i - Contador });
        }

        Baraja[0].off("click").on("click",          this.Baraja1_EventoClick.bind(this));

        $("Carta").off("mouseover").on('mouseover', this.Carta_EventoMouseOver.bind(this));
        $("Carta").off("mouseout").on('mouseout',   this.Carta_EventoMouseOut.bind(this));
        $("Carta").off("dragstart").on('dragstart', this.Carta_EventoDragStart.bind(this));
        $("Carta").off("dragend").on('dragend',     this.Carta_EventoDragEnd.bind(this));
        $("Carta").off("dblclick").on('dblclick',   this.Carta_EventoDblClick.bind(this));

        $("Columna").off("drop").on('drop',          this.Columna_EventoDrop.bind(this));
        $("Columna").off("dragover").on('dragover',  this.Columna_EventoDragOver.bind(this));
        
        $("Solucion").off("drop").on('drop',         this.Solucion_EventoDrop.bind(this));
        $("Solucion").off("dragover").on('dragover', this.Solucion_EventoDragOver.bind(this));
    
    
        this.UltimoHijo($("Columna[num=7]"));
        
        $("Victoria").css({ "display" : "none" });
        $("Derrota").css({ "display" : "none" });
        
        this.GuardarMovimiento();
    };
    
    this.Carta_EventoMouseOver = function(e) {
        Carta = $(e.originalEvent.currentTarget);
        if (Carta.attr("tapada") !== "true" && Carta.attr("draggable") === "true") {
            $(e.originalEvent.currentTarget).attr({ "hover" : "true" });
        }
        e.stopPropagation();
    };
    
    this.Carta_EventoMouseOut = function(e) {
        $(e.originalEvent.currentTarget).removeAttr("hover");
        e.stopPropagation();
    };    
    
    this.Carta_EventoDblClick = function(e) {
        Carta = this.UltimoHijo($(e.originalEvent.currentTarget));        
        Palo = 0;
        Valor = 0;
        for (i = 1; i < 5; i++) {
            if (this.UltimoHijo($("Solucion[num='" + i + "']")).attr("palo") == Carta.attr("palo")) {
                Valor = parseInt(this.UltimoHijo($("Solucion[num='" + i + "']")).attr("valor")) + 1;
                Palo = this.UltimoHijo($("Solucion[num='" + i + "']"));
            }
        }
        if (Palo == 0) {
            for (i = 1; i < 5; i++) {
                if (this.UltimoHijo($("Solucion[num='" + i + "']")).attr("num") == i) {
                    Palo = this.UltimoHijo($("Solucion[num='" + i + "']"));
                    break;
                }
            }
        }
        //
        if (parseInt(Carta.attr("valor")) == Valor) {
            if (typeof(Carta.parent().attr("num")) === "undefined") {
                Carta.parent().attr({ "tapada" : "false", "draggable" : "true" });
            }
            Carta.appendTo(this.UltimoHijo(Palo));
            Carta.removeAttr("draggable");
            this.GuardarMovimiento();            
        }
        e.stopPropagation();
    };
    
    this.Carta_EventoDragStart = function(e) {
        this.CartaDrag = $(e.originalEvent.currentTarget);
        this.ImagenDrag = $("#ImgDrag");
        this.ImagenDrag.attr({ "palo" : this.CartaDrag.attr("palo"), "valor" : this.CartaDrag.attr("valor") }).html(this.CartaDrag.html());
        this.CartaDrag.css({ opacity : 0 });
        OffSet = this.CartaDrag.offset();
        e.originalEvent.dataTransfer.setDragImage(this.ImagenDrag[0], e.originalEvent.clientX - OffSet.left, (e.originalEvent.clientY - OffSet.top) + $(window).scrollTop());
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        e.originalEvent.dataTransfer.setData('text/html', e.originalEvent.currentTarget);
        e.stopPropagation();
    }
    
    this.Carta_EventoDragEnd = function(e) {
        this.CartaDrag.css({ opacity : 1 });
    };
    
    this.Baraja1_EventoClick = function(e) {
        Baraja1 = $("Baraja[num='1']");
        Baraja2 = $("Baraja[num='2']");
        if (this.UltimoHijo(Baraja1) !== Baraja1) {
            $("Baraja[num='2'] Carta[draggable]").removeAttr("draggable");
            Carta = this.UltimoHijo(Baraja1).appendTo(this.UltimoHijo(Baraja2));
            Carta.css({ "z-index" : (Cartas.length + 1) }).attr({ "Tapada" : "false", "draggable" : "true" });
            this.GuardarMovimiento();
        }
        else { 
            if (this.UltimoHijo(Baraja2) === Baraja2) return;
            Carta = this.UltimoHijo(Baraja2);
            while (Carta !== Baraja2) {
                Carta.appendTo(this.UltimoHijo(Baraja1)).attr({ "Tapada" : "true", "draggable" : "false" });
                Carta = this.UltimoHijo(Baraja2);    
            }
            this.Baraja1_EventoClick();
        }
    };
    
    this.Solucion_EventoDragOver = function(e) {
        e.preventDefault();  
        e.stopPropagation();
        e.originalEvent.dataTransfer.dropEffect = 'move';  			
        return false;
    };

    this.Solucion_EventoDrop = function(e) {
        if (this.UltimoHijo(this.CartaDrag) === this.CartaDrag) {
            Solucion = this.UltimoHijo($(e.originalEvent.target));
            Valor = 0;
            if (typeof(Solucion.attr("num")) === "undefined") {
                if (Solucion.attr("palo") === this.CartaDrag.attr("palo")) { Valor = (parseInt(Solucion.attr("valor")) + 1); }
                else                                                       { Valor = -1; }
            }
            if (parseInt(this.CartaDrag.attr("valor")) === Valor) {
                if (typeof(this.CartaDrag.parent().attr("num")) === "undefined") {
                    this.CartaDrag.parent().attr({ "tapada" : "false", "draggable" : "true" });
                }                
                this.CartaDrag.appendTo(Solucion);
                this.CartaDrag.removeAttr("draggable");
                this.GuardarMovimiento();
            }
        }        
    };
    
    this.Columna_EventoDragOver = function(e) {
        e.preventDefault();  
        e.stopPropagation();
            e.originalEvent.dataTransfer.dropEffect = 'move';  			
  //      }
        return false;
    };
    
    this.Columna_EventoDrop = function(e) {
        var GM = false;
        if (this.CartaValida(this.CartaDrag, $(e.originalEvent.target)) == true) {
            if (this.UltimoHijo(this.CartaDrag) != this.UltimoHijo($(e.originalEvent.target))) {
                if (typeof(this.CartaDrag.parent().attr("num")) === "undefined") {
                    this.CartaDrag.parent().attr({ "tapada" : "false", "draggable" : "true" });
                }
                this.CartaDrag.appendTo(this.UltimoHijo($(e.originalEvent.target)));
                GM = true;
            }
            UH = this.UltimoHijo($("Baraja[num='2']"));
            $("Baraja[num='2'] Carta[draggable]").removeAttr("draggable");
            if (typeof(UH.attr("num")) === "undefined") {
                this.UltimoHijo($("Baraja[num='2']")).attr({ "draggable" : "true" });
            }            
            if (GM === true) { this.GuardarMovimiento(); }
        }
        e.preventDefault();  
        e.stopPropagation();        
        return false;
    };
    
    this.CartaValida = function(Carta, Destino) {
        if (typeof(Destino.attr("num")) !== "undefined" && parseInt(Carta.attr("valor")) === 12) { return true; }
        if (Destino.attr("tapada") === true) { return false; }
        if (parseInt(Carta.attr("valor")) === parseInt(Destino.attr("valor")) - 1) {
            if (parseInt(Carta.attr("palo")) > 2) {
                if (parseInt(Destino.attr("palo")) < 3) { return true; }
            }
            else {
                if (parseInt(Destino.attr("palo")) > 2) { return true; }
            }
        }
        return false;
    };

    this.UltimoHijo = function(nPadre) { 
        Cartas = nPadre.find(":last-child");
        if (Cartas.length == 0) return nPadre;
        return $(Cartas[Cartas.length - 1]);
    };
    
    this.Victoria = function() {
        return ($("Columna Carta[tapada='true']").length > 0) ? false : true;
    }
    
    this.GuardarMovimiento = function() {
        $("Carta, Solucion, Baraja, Columna").removeAttr("ayuda1").removeAttr("ayuda2");

        var DH = [];
        DH["Baraja1"] = $("Baraja[num='1']").html();
        DH["Baraja2"] = $("Baraja[num='2']").html();
        DH["Solucion1"] = $("Solucion[num='1']").html();
        DH["Solucion2"] = $("Solucion[num='2']").html();
        DH["Solucion3"] = $("Solucion[num='3']").html();
        DH["Solucion4"] = $("Solucion[num='4']").html();
        DH["Columna1"] = $("Columna[num='1']").html();
        DH["Columna2"] = $("Columna[num='2']").html();
        DH["Columna3"] = $("Columna[num='3']").html();
        DH["Columna4"] = $("Columna[num='4']").html();
        DH["Columna5"] = $("Columna[num='5']").html();
        DH["Columna6"] = $("Columna[num='6']").html();
        DH["Columna7"] = $("Columna[num='7']").html();
        this.Movimientos[this.Movimiento++] = DH;
        $("movimientos").html(this.Movimiento - 1);
        var V = this.Victoria();
        $("Derrota").css({ "display" : (this.Ayuda() === false && V !== true) ? "block" : "none" });
        $("Victoria").css({ "display" : (V === true) ? "block" : "none" });        
    };
    
    this.Rehacer = function(e) {
        if (this.Movimiento < this.Movimientos.length) {
            var DH = this.Movimientos[this.Movimiento++];
            $("Baraja[num='1']").html(DH["Baraja1"]);
            $("Baraja[num='2']").html(DH["Baraja2"]);
            $("Solucion[num='1']").html(DH["Solucion1"]);
            $("Solucion[num='2']").html(DH["Solucion2"]);
            $("Solucion[num='3']").html(DH["Solucion3"]);
            $("Solucion[num='4']").html(DH["Solucion4"]);
            $("Columna[num='1']").html(DH["Columna1"]);
            $("Columna[num='2']").html(DH["Columna2"]);
            $("Columna[num='3']").html(DH["Columna3"]);
            $("Columna[num='4']").html(DH["Columna4"]);
            $("Columna[num='5']").html(DH["Columna5"]);
            $("Columna[num='6']").html(DH["Columna6"]);
            $("Columna[num='7']").html(DH["Columna7"]);
            $("Carta").css({ opacity : 1 }).removeAttr("hover");
            $("Carta").off("mouseover").on('mouseover', this.Carta_EventoMouseOver.bind(this));
            $("Carta").off("mouseout").on('mouseout',   this.Carta_EventoMouseOut.bind(this));
            $("Carta").off("dragstart").on('dragstart', this.Carta_EventoDragStart.bind(this));
            $("Carta").off("dragend").on('dragend',     this.Carta_EventoDragEnd.bind(this));  
            $("Carta").off("dblclick").on('dblclick',   this.Carta_EventoDblClick.bind(this));
        }
        $("movimientos").html(this.Movimiento - 1);
        $("Derrota").css({ "display" : (this.Ayuda() === false) ? "block" : "none" });
        $("Victoria").css({ "display" : (this.Victoria() === true) ? "block" : "none" });        

    };
    
    this.Deshacer = function(e) {
        if (this.Movimiento !== 1) {
            var DH = this.Movimientos[--this.Movimiento - 1];
            $("Baraja[num='1']").html(DH["Baraja1"]);
            $("Baraja[num='2']").html(DH["Baraja2"]);
            $("Solucion[num='1']").html(DH["Solucion1"]);
            $("Solucion[num='2']").html(DH["Solucion2"]);
            $("Solucion[num='3']").html(DH["Solucion3"]);
            $("Solucion[num='4']").html(DH["Solucion4"]);
            $("Columna[num='1']").html(DH["Columna1"]);
            $("Columna[num='2']").html(DH["Columna2"]);
            $("Columna[num='3']").html(DH["Columna3"]);
            $("Columna[num='4']").html(DH["Columna4"]);
            $("Columna[num='5']").html(DH["Columna5"]);
            $("Columna[num='6']").html(DH["Columna6"]);
            $("Columna[num='7']").html(DH["Columna7"]);
            $("Carta").css({ opacity : 1 }).removeAttr("hover");
            $("Carta").off("mouseover").on('mouseover', this.Carta_EventoMouseOver.bind(this));
            $("Carta").off("mouseout").on('mouseout',   this.Carta_EventoMouseOut.bind(this));
            $("Carta").off("dragstart").on('dragstart', this.Carta_EventoDragStart.bind(this));
            $("Carta").off("dragend").on('dragend',     this.Carta_EventoDragEnd.bind(this));
            $("Carta").off("dblclick").on('dblclick',   this.Carta_EventoDblClick.bind(this));
            $("movimientos").html(this.Movimiento - 1);
        }
        
        $("Derrota").css({ "display" : (this.Ayuda() === false) ? "block" : "none" });
        $("Victoria").css({ "display" : (this.Victoria() === true) ? "block" : "none" });        
        
    };
    
    this.Ayuda = function(e) {
        var Solucion = [];
        var Baraja = [];
        var Columna = [];
        Solucion[1] = this.UltimoHijo($("Solucion[num='1']"));
        Solucion[2] = this.UltimoHijo($("Solucion[num='2']"));
        Solucion[3] = this.UltimoHijo($("Solucion[num='3']"));
        Solucion[4] = this.UltimoHijo($("Solucion[num='4']"));
        Baraja[1] = this.UltimoHijo($("Baraja[num='1']"));
        Baraja[2] = this.UltimoHijo($("Baraja[num='2']"));
        Columna[1] = this.UltimoHijo($("Columna[num='1']"));
        Columna[2] = this.UltimoHijo($("Columna[num='2']"));
        Columna[3] = this.UltimoHijo($("Columna[num='3']"));
        Columna[4] = this.UltimoHijo($("Columna[num='4']"));
        Columna[5] = this.UltimoHijo($("Columna[num='5']"));
        Columna[6] = this.UltimoHijo($("Columna[num='6']"));
        Columna[7] = this.UltimoHijo($("Columna[num='7']"));
        this.MovimientosAuyda = new Array();
        this.MovimientosAuydaActual = 0;
        this.MovimientosAuyda.push({ origen : $("Baraja[num='1']"), destino : $("Baraja[num='2']"), valor : 0 });
        if (Baraja[2].prop("tagName") === "CARTA") {
            for (i = 1; i < 5; i++) {
                Valor = (Solucion[i].prop("tagName") === "CARTA")? parseInt(Solucion[i].attr("valor")) : -1;
                Palo  = (Solucion[i].prop("tagName") === "CARTA")? Solucion[i].attr("palo") : Baraja[2].attr("palo");
                if (Valor + 1 === parseInt(Baraja[2].attr("valor")) && Palo === Baraja[2].attr("palo")) {
                    this.MovimientosAuyda.push({ origen : Baraja[2], destino : Solucion[i], valor : 150 - ((Valor + 1) * 10) });
                }
            }
        }
        for (c = 7; c > 0; c--) {
            for (i = 1; i < 5; i++) {
                Valor = (Solucion[i].prop("tagName") === "CARTA")? parseInt(Solucion[i].attr("valor")) : -1;
                Palo  = (Solucion[i].prop("tagName") === "CARTA")? Solucion[i].attr("palo") : Columna[c].attr("palo");
                if (Valor + 1 === parseInt(Columna[c].attr("valor")) && Palo === Columna[c].attr("palo")) {
                    this.MovimientosAuyda.push({ origen : Columna[c], destino : Solucion[i], valor : 150 - ((Valor + 1) * 10) });
                }
            }            
        }
        
        for (c = 7; c > 0; c--) {
            Carta = this.UltimoHijo(Columna[c]);
            if (Carta.prop("tagName") === "CARTA") {
                Padres = 1;
                do {
                    for (c2 = 7; c2 > 0; c2--) {
                        CC = this.UltimoHijo(Columna[c2]);
                        Valor = (CC.prop("tagName") === "CARTA")? parseInt(CC.attr("valor")) : -1;
                        Palo  = (CC.prop("tagName") === "CARTA")? CC.attr("palo") : Carta.attr("palo");
                        if (this.CartaValida(Carta, CC)) {
                            if (Carta.parent().attr("tapada") === "true" || Carta.parent().prop("tagName") !== "CARTA") {
                                if (parseInt(Carta.attr("valor")) === 12 && CC.prop("tagName") === "COLUMNA" && Carta.parent().prop("tagName") === "COLUMNA") { }
                                else { 
                                    this.MovimientosAuyda.push({ origen : Carta, destino : CC, valor : 10 * Padres }); 
                                }
                            }
                        }
                    }
                    Carta = Carta.parent();
                    Padres ++;
                } while(Carta.attr("tapada") !== "true" && Carta.prop("tagName") === "CARTA");
            }
        }
        if (Baraja[2].prop("tagName") === "CARTA") {            
            for (c = 7; c > 0; c--) {
                CC = this.UltimoHijo(Columna[c]);
                Valor = (CC.prop("tagName") === "CARTA")? CC.attr("valor") : -1;
                Palo  = (CC.prop("tagName") === "CARTA")? CC.attr("palo") : Baraja[2].attr("palo");
                if (this.CartaValida(Baraja[2], CC)) {
                    this.MovimientosAuyda.push({ origen : Baraja[2], destino : CC, valor : 10 });                
                }
            }
        }
        
        this.MovimientosAuyda.sort(function(a, b){ 
            var a1 = a.valor, b1 = b.valor;
            if (a1 === b1) return 0;
            return (a1 < b1)? 1 : -1;
        });
        
        
        var DebugIA = $("DebugIA");
        
        var DebugHTML = "<ul>";
        var ValoresCartas = Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" )
        for (d = 0; d < this.MovimientosAuyda.length; d++) {
            var OrigenPalo = this.MovimientosAuyda[d].origen.attr("palo");
            var OrigenValor = this.MovimientosAuyda[d].origen.attr("valor");
            var DestinoPalo = this.MovimientosAuyda[d].destino.attr("palo");
            var DestinoValor = this.MovimientosAuyda[d].destino.attr("valor");
            DebugHTML += "<li>" + "<palo num= '" + OrigenPalo + "'> " + ValoresCartas[OrigenValor] + " -&gt; " + DestinoPalo + "'> " + ValoresCartas[DestinoValor] + "</li>"
        }
        DebugHTML += "</ul>"
        DebugIA.html(DebugHTML);
        
        if (this.MovimientosAuyda.length === 1) {
            for (b = 1; b < 3; b++) {
                Carta = Baraja[b];
                do {
                    for (c = 7; c > 0; c--) {
                        if (this.CartaValida(Carta, Columna[c])) {
                            return true;
                        }
                    }
                    Carta = Carta.parent();
                } while (Carta.prop("tagName") === "CARTA");
            }
            for (b = 1; b < 3; b++) {
                Carta = Baraja[b];
                do {
                    for (s = 1; s < 5; s++) { 
                        Valor = (Solucion[s].prop("tagName") === "CARTA")? parseInt(Solucion[s].attr("valor")) : -1;
                        Palo  = (Solucion[s].prop("tagName") === "CARTA")? Solucion[s].attr("palo") : Carta.attr("palo");
                        if (Valor + 1 === parseInt(Carta.attr("valor")) && Palo === Carta.attr("palo")) {
                            return true;
                        }
                    }
                    Carta = Carta.parent();
                } while (Carta.prop("tagName") === "CARTA");
            }            
            return false; 
        }        
        return true; 
    };
};