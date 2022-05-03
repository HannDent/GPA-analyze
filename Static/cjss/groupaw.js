jQuery("select#group").change(function(){
	var opt=jQuery("select#group").val();
	jQuery("a.golink").attr("href",function(n,v){
		var links = v.split('/');
		return ('/'+links[1]+'/'+links[2]+'/'+opt);
	});
});