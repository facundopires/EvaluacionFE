import { FingerprintJS } from './fingerprint.js';

function getData(){
  const referrer = document.referrer;
  const userAgent = navigator.userAgent;
  let fingerprint;
  FingerprintJS.load().then(fp => {
    fp.get().then(result => {
      fingerprint = result.visitorId;
      checkVisitorId(fingerprint);
      doPostRequest(referrer, userAgent, fingerprint);
    });
  });
  
}

function doPostRequest(referrer, userAgent, fingerprint){ 
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",
    body: JSON.stringify({
      referrer: referrer,
      userAgent: userAgent, 
      fingerprint: fingerprint
    }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  }).then(response => response.json())
    .then(json => console.log(json));
  
}

function checkVisitorId(fingerprint){
  if(fingerprint == localStorage.getItem("fingerprint")){
    console.log("usuario encontrado")
  } else{
    console.log("usuario nuevo")
    localStorage.setItem("fingerprint", fingerprint)
    console.log("Fingerprint registrado: ", fingerprint)
  }
}

getData()
