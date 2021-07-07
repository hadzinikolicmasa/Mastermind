
function inic(){

    localStorage.setItem("igrac1",ikonice1);
    localStorage.setItem("igrac2",ikonice1);
}

let ikonice1=[];
let ikonice2=[];

$(document).ready(function(){

    let turn=1;
    let start=false;
    let winner=0;
    let pokusaj1=1,pokusaj2=1;
    let polje=1;
    let last1=false,last2=false;
    
    $("#spreman1").click(function(){
     if($("#spreman2").is(":checked"))  {
         window.location.href="skocko-podesavanja.html"
     } 
    });


    $("#spreman2").click(function(){
        if($("#spreman1").is(":checked"))  {
            window.location.href="skocko-podesavanja.html"
        } 
       });


for(let i=1;i<=2;i++){
    let red=$("<tr></tr>");
      for(let j=1;j<=4;j++){
         let celija=$("<td></td>").attr("id","i"+i+j).attr("Class","polje");
         red.append(celija);
    }
     $("#igrac"+i).prepend(red);
}


   let player1=true;
   let player2=false;
  


$("#igrac1potvrda").click( function(){
  if(ikonice1.length==4){
     player1=false;
     $("#igrac2").show();
     $("#igrac1").hide();
     player2=true;
     localStorage.setItem("igrac2",ikonice1);
     $("#igrac1").find(".polje").hide();
     $("#igrac1").find("#igrac1potvrda").hide();
    }
  }
);


$("#igrac2potvrda").click(function(){
  if(ikonice2.length==4){
    player2=false;
    localStorage.setItem("igrac1",ikonice2);
    window.location.href="skocko-igra.html";
   }   
  }
);



let icons=$(".opcije").find("img");
let i1=$("#igrac1").find(".polje");
let i2=$("#igrac2").find(".polje");
$("#igrac2").hide();




for(let i=0;i<icons.length;i++){
     $(icons[i]).click(function(){
       let $img=$(this).clone();
       let $id=$(this).attr("id");
        if(player1==true && ikonice1.length<4){
           let polje="#i1"+(ikonice1.length+1);
           ikonice1.push($id);
           $(polje).append($img);
        }else if(player2==true && ikonice2.length<4){
           let polje="#i2"+(ikonice2.length+1);
           ikonice2.push($id);
           $(polje).append($img);
       }

    });
}




let red,celija;

for(let k=1;k<=2;k++){
   for(let i=1;i<8;i++){
      red=$("<tr></tr>");
         for(let j=1;j<=4;j++){
          
            celija=$("<td></td>").attr("id","i"+k+i+j).attr("Class","polje");
           red.append(celija);
        }
      $("#igra"+k).append(red);
   } 
   let hor=$("<hr>").attr("color","white");
   $("#igra"+k).append(hor);
   red=$("<tr></tr>");
   for(let j=1;j<=4;j++){
   celija=$("<td></td>").attr("id","i"+k+8+j).attr("Class","polje");
    red.append(celija);
  }
  $("#igra"+k).append(red);
}



let dugme;


for(let k=1;k<=2;k++){
    for(let i=1;i<8;i++){
       red=$("<tr></tr>");
         for(let j=1;j<=5;j++){
            if(j==1){
              celija=$("<td></td>").attr("id","r"+k+i+j);
              dugme=$("<button></button>").css("width","100%").attr("Class","btn").attr("Class","btn-dark").text(">").attr("id","d"+k+i).attr("disabled", true);
              dugme.click(function(){
                

                let niz=[];
                for(let a=1;a<=4;a++){
                    niz.push($("#i"+k+i+a).children().attr("name"));
                }
               
                $(this).attr("disabled",true);
                polje=1;
                if(k==1){
                    check(niz,ikonice1,k,i);
                    if(ikonice1==niz){
                        alert("Igrač 1 je pobedio");
                        prikaz();
                        winner=1;
                        start=false;
                    }else{
                        turn=2;
                        pokusaj1++;
                    }
                    
                }else{
                    check(niz,ikonice2,k,i);
                    if(ikonice2==niz){
                        alert("Igrač 2 je pobedio");
                        prikaz();
                        winner=2;
                        start=false;
                    }else{
                        turn=1;
                        pokusaj2++;
                    }
                }
                if(pokusaj1==8)last1=true;
                if(pokusaj2==8)last2=true;
                if(last1==true && last2==true && winner==0){
                    alert("Rezultat nerešen.");
                    prikaz();
                    start=false;
                }

 });
             celija.append(dugme);
           }else celija=$("<td></td>").attr("id","r"+k+i+j).attr("Class","pogodak");
                 red.append(celija);
       }
    $("#rezultati"+k).append(red);
  }        
}

function prikaz(){
    
    for(let i=0;i<4;i++){
       
        let $slika1=$(".choice1").find("#"+ikonice1.split(",")[i]).clone();
        let $slika2=$("#"+ikonice2.split(",")[i]).clone();
        let where1=$("#i18"+(i+1));
      
        let where2=$("#i28"+(i+1));
        $(where1).append($slika1);
        $(where2).append($slika2);
    }

}


   
for(let i=1;i<=2;i++){

   $("#start"+i).click(function(){
       turn=i % 3;
      
        $("#start1").attr("disabled", true);
        $("#start2").attr("disabled", true);
        start=true;
        
        
       
        ikonice1=localStorage.getItem("igrac1");
        ikonice2=localStorage.getItem("igrac2");
        
        setInterval(function(){
        
           if(turn==1 && parseInt($("#vreme1").text())>0 && start==true){

              let vrednost=$("#vreme1").text();
              vrednost--;
              $("#vreme1").text(vrednost);

               if($("#vreme1").text()=="0"){
                 
                 prikaz();
                 start=false;
                 setTimeout(function(){
                  alert("Isteklo vreme. Igrac 2 je pobedio.");
                 },1000);
               }

        } else if(parseInt($("#vreme2").text())>0 && start==true){

             let vrednost=$("#vreme2").text();
             vrednost--;
             $("#vreme2").text(vrednost);

              if($("#vreme2").text()=="0"){
                
                prikaz();
                start=false;
               setTimeout(function(){
                alert("Isteklo vreme. Igrac 1 je pobedio.");
               },1000);
              }
        }
     },1000);
  });
 }
   
 
icons=$(".choice1").find("img");
 
for(let i=0;i<icons.length;i++){
   $(icons[i]).click(function(){
      if(turn==1 && start==true &&polje<5){
         let $img=$(this).clone();
         
         let where=$("#igra1").find("#i1"+pokusaj1+polje);
         $(where).append($img);
        
         polje++; 
         if(polje==5){
            $("#d"+turn+pokusaj1).attr("disabled",false);
        }
         
        }
    });
  }

icons=$(".choice2").find("img");
 
for(let i=0;i<icons.length;i++){      
    $(icons[i]).click(function(){
      if(turn==2 && start==true &&polje<5){
        let $img=$(this).clone();
        let $name=$(this).attr("name");
        let where=$("#igra2").find("#i2"+pokusaj2+polje);
        $(where).append($img);
        polje++; 
        if(polje==5){
           $("#d"+turn+pokusaj2).attr("disabled",false);
       }
        }
    });
 }

function check(array,array2,igrac,pokusaj){
    let po=2;
    let found1=[];
    let found=[];
   
    for(let i=0;i<4;i++){
       if(array2.split(",")[i]==array[i]){
         
         $("#r"+igrac+pokusaj+po).css("background-color","red"); 
         found[i]=true;         
         found1[i]=true;
         po++; 
       }
   }

   for(let i=0;i<4;i++)
      for(let j=0;j<4;j++){
        if(array2.split(",")[i]==array[j] && found[i]!=true &&  found1[j]!=true){
            $("#r"+igrac+pokusaj+po).css("background-color","yellow"); 
            $("#i"+igrac+pokusaj+i).attr("name","nasao");
           
            found[i]=true;
            found1[j]=true;
            po++; 
        }

      }

   
 
}

});


