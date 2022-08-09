const arr = [10, 12, 14, 21]; 
for (var i=0; i<arr.length; i++){
  setTimeout(function(){
    console.log('El:'+ arr[i]);
  }, 3000);
}
