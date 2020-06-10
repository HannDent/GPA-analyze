jQuery(document).ready(function(){
	var idno = new Array();
	var idname = new Array();
	var idcourse = new Array();
	var regression = new Array();
	jQuery("td.idcourse").each(function(){
		idcourse.push(jQuery(this).text());
	});
	jQuery("td.idname").each(function(){
		idno.push(idname.length);
		idname.push(jQuery(this).text());
	});
	for(var i=0;i<idname.length;i++){
		var tempke = new Array();
		for(var j=0;j<idcourse.length;j++){
			jQuery("td#"+String(i)+"Regression"+String(j)).each(function(){
				tempke.push(Number(jQuery(this).text()));
			});
		}
		regression.push(tempke);
	}
	
	
	var btnNo = 1;

function stradd(){
	var table = "";
	for(var i=0;i<idno.length;i++){
		if(i%2==1){
			table = table+"<tr class='success'>";
		}else{
			table = table+"<tr class='warning'>";
		}
		table = table +"<td>"+String(i+1)+"</td><td class='idname'><a href='/single/"+String(idno[i])+"'>"+idname[i]+"</a></td>";
		for(var j=0;j<idcourse.length;j++){
			table = table +"<td id='"+String(i)+"Regression"+String(j)+"'>"+String(regression[i][j])+"</td>";
		}
		table = table +"</tr>";
	}
	jQuery('tbody#ty').html(table);
}

var arr = document.getElementsByTagName('button');
for(var i = 0;i<arr.length;i++){
	arr[i].onclick = function(){
		var strarr = (this.id).split("up");
		if(Number(strarr[1])==-1){
			if(btnNo!=1){
				for(var i=0;i<idno.length;i++){
					for(var j=i;j>0;j--){
						if(idno[j]<idno[j-1]){
							var temp = idno[j];
							idno[j] = idno[j-1];
							idno[j-1] = temp;

							temp = idname[j];
							idname[j] = idname[j-1];
							idname[j-1] = temp;

							temp = regression[j];
							regression[j] = regression[j-1];
							regression[j-1] = temp;
						}
					}
				}
			btnNo = 1;
			}else{
				for(var i=0;i<idno.length;i++){
					for(var j=i;j>0;j--){
						if(idno[j]>idno[j-1]){
							var temp = idno[j];
							idno[j] = idno[j-1];
							idno[j-1] = temp;

							temp = idname[j];
							idname[j] = idname[j-1];
							idname[j-1] = temp;

							temp = regression[j];
							regression[j] = regression[j-1];
							regression[j-1] = temp;
						}
					}
				}
				btnNo = -1;
			}
			stradd();
		}else{
			var pq = 2*Number(strarr[1])+Number(strarr[0]);
			if(btnNo!=pq+2){
				for(var i=0;i<idno.length;i++){
					for(var j=i;j>0;j--){
						if(regression[j][pq]<regression[j-1][pq]){
							var temp = idno[j];
							idno[j] = idno[j-1];
							idno[j-1] = temp;

							temp = idname[j];
							idname[j] = idname[j-1];
							idname[j-1] = temp;

							temp = regression[j];
							regression[j] = regression[j-1];
							regression[j-1] = temp;
						}
					}
				}
			btnNo = pq+2;
			}else{
				for(var i=0;i<idno.length;i++){
					for(var j=i;j>0;j--){
						if(regression[j][pq]>regression[j-1][pq]){
							var temp = idno[j];
							idno[j] = idno[j-1];
							idno[j-1] = temp;

							temp = idname[j];
							idname[j] = idname[j-1];
							idname[j-1] = temp;

							temp = regression[j];
							regression[j] = regression[j-1];
							regression[j-1] = temp;
						}
					}
				}
				btnNo = -(pq+2);
			}
			stradd();
		}
	}
}



//----------------------------以下是底线--------------------------------
});