var DB = "http://127.0.0.1:5984/japansrestaurant/";
function opslaan() {
	
	var gerecht = $("#gerecht option:selected").text();
	var hoeveelheid = $("#hoeveelheid option:selected").text();
	 var tafelnummer = $("#tafelnummer option:selected").text();
	   var opmerking = $("#opmerking").val();
	   var geleverd = false;
	   var bestellingsdatum = getDate();
	   var type = "bestelling";
	   


	    var doc = {};

	    doc.gerecht = gerecht;
	    doc.tafelnummer = tafelnummer;
	    doc.hoeveelheid = hoeveelheid;
	    doc.opmerking = opmerking;
	    doc.geleverd = geleverd;
	    doc.bestellingsdatum = bestellingsdatum;
	    doc.type = type;
	    
	    var json = JSON.stringify(doc);

	    $.ajax({
	        type : 'POST',
	        url : DB,
	        data : json,
	        contentType : 'application/json',
	        async : true,
	        success : function(data){
	        	$('#bestelling').hide();
	        	$('allebestellingen').show();
	        	getAlleBestellingen();
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown){
	            console.log(textStatus);
	        }
	    });
}

function getAlleBestellingen() {
	VIEW = "_design/views/_view/bestelling_opzoeken";
	html = '';
	html += '<hr/><br/><h2>Bestellingsoverzicht:</h2>';
	html += "<table style=''width=100%''>";
	html += '<tr><td>Gerecht</td><td>Tafelnummer</td><td>Hoeveelheid</td><td>Opmerking</td><td>Checked</td></tr>';
	 $.ajax({
	        type : 'GET',
	        url : DB + VIEW,
	        async : true,
	        success : function(data){
	            var arr = JSON.parse(data).rows;

	            for(var i = 0; i < arr.length; i++){

	                if (arr[i].id.indexOf('_design') == -1){
	                    var doc = arr[i].value;
		                    html += '<tr><td>' + doc.gerecht + '</td><td>' + doc.tafelnummer
                         + '</td><td>' + doc.hoeveelheid + '</td><td>' + doc.opmerking
                         + '</td><td>' + '<input type="checkbox" ' + isGeleverd(doc.geleverd) + '  onchange="checkchange(\'' + doc._id + '\',\'' + doc._rev + '\',\'' + doc.gerecht + '\',\'' + doc.hoeveelheid + '\',\'' + doc.tafelnummer + '\',\'' + doc.opmerking + '\',\''  + doc.bestellingsdatum + '\',\'' + doc.type + '\')" id="check'+ doc._id +'"/></td></tr>'

	                }


	            }
	            html += '</table>';
	            $('#allebestellingen').html(html);
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown){
	            console.log(errorThrown);
	        }
	    });
		
}

function isGeleverd(geleverd) {
     if (geleverd == true) {
      	return 'checked';
     }
}

function checkchange(id, rev, gerecht, hoeveelheid, tafelnummer, opmerking, bestellingsdatum, type) {
	console.log('type: ' + type);
	if (document.getElementById('check' + id).checked) {
		updateBestelling(id, rev, gerecht, hoeveelheid, tafelnummer, opmerking, bestellingsdatum, type);
	}
}

function updateBestelling(id, rev, gerecht, hoeveelheid, tafelnummer, opmerking, bestellingsdatum, type) {

	console.log(id + ' - ' + gerecht + ' - ' + hoeveelheid + ' - ' + tafelnummer + ' - ' + opmerking + ' - ' + bestellingsdatum + ' - ' + type);
    var doc = {};

    doc._id = id;
    doc._rev = rev;
    doc.gerecht = gerecht;
    doc.opmerking = opmerking;
    doc.hoeveelheid = hoeveelheid;
    doc.tafelnummer = tafelnummer;
    doc.bestellingsdatum = bestellingsdatum;
    doc.type = type;
    doc.geleverd = true;
    var json = JSON.stringify(doc);

    $.ajax({
        type : 'PUT',
        url : DB + id,
        data : json,
        contentType : 'application/json',
        async : true,
        success : function(data){
        	$(".allebestellingen").empty();
            getAlleBestellingen();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
}

function getDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var hr = today.getHours();
	var min = today.getMinutes();
	var sec = today.getSeconds();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = dd+'/'+mm+'/'+yyyy + ' ' + hr + ':' + min + ':' + sec;
	return today;
}