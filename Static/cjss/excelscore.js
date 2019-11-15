var exceldat = '';
var excelhead = '';

jQuery(document).ready(function(){

    jQuery('#upload_excel').bind('change', handleFile);

    jQuery("button#score").click(function(){
        jQuery.post('/admin/scorepost',{csrfmiddlewaretoken:jQuery("input[name='csrfmiddlewaretoken']").val(), da:exceldat, exam:excelhead}, function(dat){
            alert(dat);
            jQuery('#content').html("");
            var text_2=document.getElementById("score");
            text_2.setAttribute("hidden",true);
        });
    });
});

function handleFile(e) {
    var files = e.target.files;
    var i,f;
    f = files[0];
    var name = f.name;
    var result;
    var num=0;
    var a1='';
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var headstr='';
        var datastr='';
        
        result = XLSX.utils.sheet_to_json(worksheet);
        if (result.length>0){
            jQuery.each(result[0],function (j,val) {
                num = num+1;
                if (num==1){
                    a1=j.trim();
                }
                headstr=headstr+'<td style="border: 1px solid #cccccc">'+j+'</td>';
            })
        }
        jQuery.each(result,function (i,date) {
            datastr=datastr+'<tr >';
            $.each(date,function (j,val) {
                val=val.trim();
                datastr=datastr+'<td style="border: 1px solid #cccccc">'+val+'</td>';
				if(/^\d+(\.\d+)?$/.test(val)){
					exceldat = exceldat+val+"`";
				}else{
					exceldat = exceldat+val+":";
				}
            })
            datastr=datastr+'</tr>';
            exceldat = exceldat+'@';
        })

        var table='<table style="border: 1px solid #cccccc;border-collapse: collapse;"><thead><tr style="font-weight: bold">'+headstr+'</tr></thead><tbody>'+datastr+ '</tbody></table>';
        jQuery('#content').html( $('#content').html()+table);

        if(num%2==1){
            excelhead = a1;
            var text_2=document.getElementById("score");
            text_2.removeAttribute("hidden");
        }else{
            alert("提供的表格格式错误，请检查！");
        }
    };

    reader.readAsBinaryString(f);
    jQuery('#upload_excel').val(name);
}
