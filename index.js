var input = document.querySelector("#input");
var btn = document.querySelector("#btn");
var apiKey = "7bf13608-05b6-4ca8-91e0-842dc56baeee";
var notFound = document.querySelector(".not_found")
var definitionBox = document.querySelector(".definition")
var audioBox = document.querySelector(".audio")
var loading = document.querySelector(".loading")

definitionBox.innerHTML=""

btn.addEventListener("click", function (e) {
   e.preventDefault();


  //clear data
  audioBox.innerHTML="";
  notFound.innerText="";
  definitionBox.innerHTML=""

   //Get input data
   var inputVal = input.value;
   if (inputVal === "") {
      alert("Please write the word")
      return 0;
   }

   // Call API   
   getData(inputVal)
})

async function getData(inputVal) {
 
   loading.style.display = "block"
   //AJAX CALL 
   var responseData = await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${inputVal}?key=${apiKey}`);
   var data = await responseData.json();
   console.log(data)

   //if empty result 
   if (!data.length) {
      loading.style.display = "none"
      notFound.innerHTML = "Not found"
      return;
   }
  
  //IF RESULT IS SUGGESTION

  if(typeof data[0] ==="string"){
   loading.style.display = "block"
     var suggestingHeading = document.createElement("p") 
     suggestingHeading.innerText = "Did You Mean";
     notFound.appendChild(suggestingHeading);
     data.forEach(element => {
        var SUGGESTION = document.createElement("p")
        SUGGESTION.classList.add("suggestion-data")
        SUGGESTION.innerText = element;
        notFound.appendChild(SUGGESTION)
     });
   }

   loading.style.display = "none"
  //to show definition 
   let defn = data[0].shortdef[0];
   definitionBox.innerHTML = defn;

   //to insert sound
   let audioGet = data[0].hwi.prs[0].sound.audio; 
   
   if(audioGet){
     // if sound file available then
     
     renderSound(audioGet)
   }
 

}

function  renderSound(audioGet) {
  let soundDire = audioGet.charAt(0);
  let soundUrl = `https://media.merriam-webster.com/audio/prons/en/us/wav/${soundDire}/${audioGet}.wav`
  
  let aud = document.createElement("audio")
  aud.src = soundUrl;
  aud.controls=true;
  audioBox.appendChild(aud)


}

//https://dictionaryapi.com/api/v3/references/learners/json/car?key=7bf13608-05b6-4ca8-91e0-842dc56baeee













//https://satyam2201.github.io/dictionary/
