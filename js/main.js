var btnElement= document.getElementById("btn");
var sitElement= document.getElementById("SiteName");
var urlElement= document.getElementById("SIteUrl");

// localStorage.removeItem("sites");

var retrievInfo=JSON.parse(localStorage.getItem("sites"));
var sitInfo;
var sitarray= retrievInfo|| [];


btnElement.addEventListener("click", submit);
function submit(){

   sitInfo={
        name: sitElement.value,
        url:urlElement.value
    }
    if (!sitInfo.name|| !sitInfo.url){
        alert("Please Fill In The Form");
        return false;
    }
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (!pattern.test(sitInfo.url)) {
            alert("Url is not valid!");
            return false;
        } 
            

    
    sitarray.push(sitInfo);
    localStorage.setItem("sites", JSON.stringify(sitarray));
    fetchBookmarks(); 
    sitElement.value="";
    urlElement.value=""; 
}

function deleteBookmark(url){
    var retrievInfo=JSON.parse(localStorage.getItem("sites"));
    if(retrievInfo){
        for(var i=0; i<retrievInfo.length; i++){
            if(retrievInfo[i].url==url){
                retrievInfo.splice(i, 1);
                sitarray= retrievInfo
            }       
        }
        localStorage.setItem("sites", JSON.stringify(retrievInfo));
        fetchBookmarks();
    } 

}
function fetchBookmarks(){
    var retrievInfo=JSON.parse(localStorage.getItem("sites"));
    var resultElement= document.getElementById("result");
    resultElement.innerHTML='';
    if(retrievInfo){
        for(var i=0; i<retrievInfo.length; i++){
            var name =retrievInfo[i].name;
            var url =retrievInfo[i].url;
            resultElement.innerHTML+='<div style="margin-bottom: 10px; background-color: #eaeaea; height: 70px; text-align: left; border: 3px solid #afafaf;">'+
                                     '<h3 style=" line-height: 55px; margin-left: 10px;">' +name+  '     '  +
                                     '<a  class="btn btn-info" target="_blank" href="'+url+'">Visit</a>'+  '     '  +
                                     '<a onclick="deleteBookmark(\''+url+'\')"  class="btn btn-danger"  href="#">Delete</a>'+
                                     '</h3>'+
                                     '</div>';  
        }
    } 

}




