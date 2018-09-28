(function(){

 const config = {
 apiKey: "AIzaSyC_bff2WFczT1UFX1aNYLKNFOAajY2WWHw",
    authDomain: "trofidata.firebaseapp.com",
    databaseURL: "https://trofidata.firebaseio.com",
    projectId: "trofidata",
    storageBucket: "",
    messagingSenderId: "895523981616"
  };
  firebase.initializeApp(config);

   // Get a reference to the database service
  var database = firebase.database();




firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // User is signed in.
    console.log(user);
   console.log(document.URL);
   var rememberMe = localStorage.getItem("remember_me");
   console.log(rememberMe);
   if(rememberMe != 'true'){
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
   }
   else{
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
   }




var userId = firebase.auth().currentUser.uid;
var user_name = firebase.database().ref(userId).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
     document.getElementById('user_name').innerHTML = username;
});




   if(document.URL.indexOf("signin.html") != -1 || document.URL.indexOf("signup.html") != -1){
		 window.location.href = "index.html";
    }

if(document.URL.indexOf("datatable_list.html") != -1){
 
    getFood();
}

if(document.URL.indexOf("datatable_manual.html") != -1){
 
    getFoodManual();
}

if(document.URL.indexOf("profile.html") != -1){
 
  var userId = firebase.auth().currentUser.uid;
 firebase.database().ref(userId).once('value').then(function(snapshot) {
  var trofi_code = snapshot.val().accepted_code;
  var address = snapshot.val().address;
  var contact_email = snapshot.val().contact_email;
  var contact_phone = snapshot.val().contact_phone;
  var restaurant_name = snapshot.val().restaurant_name;
  var restaurant_desc = snapshot.val().restaurant_desc;

  document.getElementById('trofi_code').innerHTML = '<b>Trofi #: ' + trofi_code + '</b>';
  document.getElementById('r_name').innerHTML = '<b>Name:</b> ' + restaurant_name;
  document.getElementById('r_desc').innerHTML = '<b>Description:</b> ' + restaurant_desc;
  document.getElementById('r_address').innerHTML = '<b>Address:</b> ' + address;
  document.getElementById('c_email').innerHTML = '<b>Contact Email:</b> ' + contact_email;
   document.getElementById('c_number').innerHTML = '<b>Contact Number:</b> ' + contact_phone;



  // ...
});

}

if(document.URL.indexOf("settings.html") != -1){
 
  var userId = firebase.auth().currentUser.uid;
 firebase.database().ref(userId).once('value').then(function(snapshot) {
  var trofi_code = snapshot.val().accepted_code;
  var email = snapshot.val().email;
  var user_name = snapshot.val().username;
 

  document.getElementById('trofi_code').innerHTML = '<b>Trofi #: ' + trofi_code + '</b>';
  document.getElementById('full_name').innerHTML = '<b>Full Name:</b> ' + user_name;
  document.getElementById('email').innerHTML = '<b>Email:</b> ' + email;




  // ...
});

}


  } else {
    // No user is signed in.
 	console.log("NOT SIGNED IN");
 	console.log(document.URL.indexOf("signin.html"));
    if(document.URL.indexOf("signin.html") == -1 && document.URL.indexOf("signup.html") == -1){
    	window.location.href = "signin.html";
    }
    else{
    	console.log("hi");
    }
    
    	
     
  }
});




}());


function createNewAdjustFood(name, price, time, discount) {
  var obj = {};
  obj.name = name;
  obj.price = price;
  obj.time = time;
  obj.discount = discount;
  return obj;
}


var toPushDiscounts = [];

function getFood(){




                  var data = [
    [
        "test",
     "test",
     "test",
     "test",
     "test",
     "test",
    ]
];
// document.getElementById("dataTable").deleteRow(1);
var table = $('#dataTableMine').DataTable( {
    data: data
} );
table.clear();

 var database = firebase.database();
  console.log('kobe');

 firebase.database().ref(firebase.auth().currentUser.uid).child("menu").on('value', function(snapshot) {
  


 if(snapshot.exists()){
table.clear();
 var content = '';
 var odd = 1;

            snapshot.forEach(function(data){
 var val = data.val();
              
                  table.rows.add( [ [
       val.name,
       val.desc,
       "$" + val.original_price,
       "$" +  val.discounted_price,
       val.percent_discount + "%",
       val.time
   ]
   ]
   )
    .draw();
                
odd += 1;

     

            });
            


 }


});




}


function getFoodManual(){




                  var data = [
    [
        '<input type="checkbox" name="actionSelectorAll" />',
     "test",
      "test",
     "test",
     "test",
     '<input type="number" id="set_discount" name="set_discount" >',
     '<input type="time" id="set_time" name="set_time" >'
    ]
];
// document.getElementById("dataTable").deleteRow(1);
var table = $('#dataTableManualMine').DataTable( {
    data: data
} );
table.clear();

 var database = firebase.database();

  
  console.log('kobe');

 firebase.database().ref(firebase.auth().currentUser.uid).child("menu").on('value', function(snapshot) {
  


 if(snapshot.exists()){
table.clear();
 var content = '';
 var odd = 1;

            snapshot.forEach(function(data){
 var val = data.val();

 var input = document.createElement('input');
 input.id = val.name + '_set_time';
              
                  table.rows.add( [ [
       '<input type="checkbox" id="' + val.name + '_checkbox" name="actionSelectorAll" onchange="selectedGetValues(this);" />' ,
       val.name,
       '<p id="' + val.name  +  '_original_price">$' + val.original_price +'</p>',
       '<p id="' + val.name  +  '_discounted_price">$' + val.discounted_price + '</p>',
       '<p id="' + val.name  +  '_new_price">$' + val.original_price + '</p>',
      '<input type="number" min="0" max="100" id="' + val.name + '_set_discount" name="set_discount" oninput="showDiscount(this);">',
     /* '<div id="' + val.name + '_set_time" class="input-append date"><input type="text"></input><span class="add-on"><i data-time-icon="icon-time" data-date-icon="icon-calendar"></i></span></div>'*/
      // input
      '<input class="input" id="' + val.name + '_set_time" name="set_time" >'

   ]
   ]
   )
    .draw();

    // table.row.appendChild(input);
    var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = yyyy + '-' + mm + '-' + dd;

    rome(document.getElementById(val.name + '_set_time'), { min: today});
    

                
odd += 1;
               
            });
            


 }


});






}

function registerUser(){

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var trofi_code = document.getElementById("trofi_code").value;
  var username = document.getElementById("username").value;

  var accepted = false;

  firebase.database().ref("accepted").on('value', function(snapshot) {
  


 if(snapshot.exists()){
 var content = '';
 var odd = 1;

            snapshot.forEach(function(data){
                val = data.val();
                

                if(val == trofi_code){
                  accepted = true;
               
                }


            });
          }
        });

console.log(accepted);

if(accepted == true){

const promise = firebase.auth().createUserWithEmailAndPassword(email, password)

  promise.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  // ...
});
  promise.then(function(){

// Get a key for a new Post.
  var newPostKey = firebase.database().ref(firebase.auth().currentUser.uid).set({
    email: email,
    username: username,
    accepted_code: trofi_code

  });


firebase.auth().signOut().then(function() {



document.getElementById('message').innerHTML = 'Successfully Registered! Redirecting you to login page...'
  // Sign-out successful.''
  setTimeout( function() {
    // code that must be executed after pause
      window.location.href = "signin.html";
  }, 3000 );

}).catch(function(error) {
  // An error happened.
});

  });

}
else{
alert("You did not enter the right trofi code!");

}

 

}

function signInUser(){

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  rememberMe = document.getElementById("inputCall1").checked;
   localStorage.setItem("remember_me",rememberMe);
 
  console.log(rememberMe);

  firebase.auth().signInWithEmailAndPassword(email, password).then(function() {

  // Sign-out successful.''
  setTimeout( function() {
    // code that must be executed after pause
   //  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

      window.location.href = "index.html";
  }, 1000 );

  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
 alert(errorMessage);
});

return false;

}

function showDiscount(calling){



  if(calling.value >= 0 && calling.value <= 100){




var id = calling.id;
  var getPriceID = id.substring(0, id.indexOf("_")) + "_new_price";
  var getOriginalPriceID = id.substring(0, id.indexOf("_")) + "_original_price";
var getCheckboxID = id.substring(0, id.indexOf("_")) + "_checkbox";

  if(document.getElementById(getCheckboxID).checked == true){
    document.getElementById(getCheckboxID).checked = false;
    var food_id = id.substring(0, id.indexOf("_"));
    var index = arrayObjectIndexOf(toPushDiscounts, food_id, "name");
    toPushDiscounts.splice(index, 1);
  }
  

  var new_price_show = document.getElementById(getPriceID);
  console.log(getOriginalPriceID);
  var original_price = document.getElementById(getOriginalPriceID).innerHTML.substring(1);
  var discount = (calling.value/100) * original_price;
  var new_price_print = original_price - discount;
  new_price_show.innerHTML = "$" + new_price_print.toFixed(2);
  console.log(getPriceID);
  console.log(discount);
  }
  else{
  var id = calling.id;
  var getPriceID = id.substring(0, id.indexOf("_")) + "_new_price";
  var getOriginalPriceID = id.substring(0, id.indexOf("_")) + "_original_price";
  var original_price = document.getElementById(getOriginalPriceID).innerHTML;
  document.getElementById(getPriceID).innerHTML = original_price;

  }
  


}

function selectedGetValues(calling){
var id = calling.id;
var food_id = id.substring(0, id.indexOf("_"));
var getPriceID = food_id + "_new_price";
var newTimeID = food_id + "_set_time";
var disID = food_id + "_set_discount";

var new_price = document.getElementById(getPriceID).innerHTML.substring(1);
var new_time = document.getElementById(newTimeID).value;
var discount_number = document.getElementById(disID).value;
console.log(food_id);
console.log(new_price);
console.log(new_time);

if(calling.checked) {
   var newObj = createNewAdjustFood(food_id, new_price, new_time, discount_number);
toPushDiscounts.push(newObj);
console.log(toPushDiscounts);
} else {
  var index = arrayObjectIndexOf(toPushDiscounts, food_id, "name");
    toPushDiscounts.splice(index, 1);
    console.log(toPushDiscounts);
}

}

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

function pushFood(){

  if(toPushDiscounts.length != 0){

  

  var database = firebase.database();


  
  // ...




  console.log('kobe');



  var arrayLength = toPushDiscounts.length;
for (var i = 0; i < arrayLength; i++) {
   // toPushDiscounts[i]
    //Do something

      // Get a key for a new Post.
    console.log('inside BRO');
  var newPostKey = firebase.database().ref(firebase.auth().currentUser.uid).child('menu').child(toPushDiscounts[i].name).push().key;
console.log('here BRO');
  var updates = {};
  updates['/' + firebase.auth().currentUser.uid + '/menu/' + toPushDiscounts[i].name + '/discounted_price'] = parseFloat(toPushDiscounts[i].price);
  updates['/' + firebase.auth().currentUser.uid + '/menu/' + toPushDiscounts[i].name + '/time'] = toPushDiscounts[i].time;
  updates['/' + firebase.auth().currentUser.uid + '/menu/' + toPushDiscounts[i].name + '/percent_discount'] = parseInt(toPushDiscounts[i].discount);
  updates['/' + firebase.auth().currentUser.uid + '/menu/' + toPushDiscounts[i].name + '/time_up'] = false;
  firebase.database().ref().update(updates);
console.log('here');

  

}

toPushDiscounts.length = 0;



}
else{

document.getElementById('exampleModalLabel').innerHTML = "No items selected!";

}
}

function resetFood(){

	console.log('here');

	if(toPushDiscounts.length != 0){

  

  var database = firebase.database();


  
  // ...




  console.log('kobe');



  var arrayLength = toPushDiscounts.length;
for (var i = 0; i < arrayLength; i++) {
   // toPushDiscounts[i]
    //Do something

      // Get a key for a new Post.
    console.log('inside BRO');
  // var newPostKey = firebase.database().ref(firebase.auth().currentUser.uid).child('menu').child(toPushDiscounts[i].name).push().key;
console.log('here BRO');
	var original_price = document.getElementById(toPushDiscounts[i].name + "_original_price").innerHTML.substring(1);
	console.log(original_price);

  var updates = {};

  updates['/' + firebase.auth().currentUser.uid + '/menu/' + toPushDiscounts[i].name + '/discounted_price'] = parseFloat(original_price);
  updates['/' + firebase.auth().currentUser.uid + '/menu/' + toPushDiscounts[i].name + '/time'] = '2018-01-01 00:00';
  updates['/' + firebase.auth().currentUser.uid + '/menu/' + toPushDiscounts[i].name + '/percent_discount'] = 0;
  firebase.database().ref().update(updates);
console.log('here');
  

}

toPushDiscounts.length = 0;



}
else{

document.getElementById('exampleModalLabel').innerHTML = "No items selected!";

}

}

function discountsSwitch(event){

var switch_on = document.getElementById('switch_d').checked;

if(switch_on == true){
  var updates = {};
    updates['/' + firebase.auth().currentUser.uid + '/discounts_active'] = true;
    firebase.database().ref().update(updates);

document.getElementById('switch_discount_label').innerHTML = "Discounts Active";


}
else{
  var updates = {};
   updates['/' + firebase.auth().currentUser.uid + '/discounts_active'] = false;
    firebase.database().ref().update(updates);
document.getElementById('switch_discount_label').innerHTML = "Discounts Disabled";
}

}

function updatePassword(){


var user = firebase.auth().currentUser;
var email = document.getElementById('user_email').value;
var oldPassword = document.getElementById('old_password').value;
var newPassword = document.getElementById('update_password_1').value;
var confirmPassword = document.getElementById('update_password_2').value;

console.log(email);
console.log(oldPassword);

var credential = firebase.auth.EmailAuthProvider.credential(
   email, 
  oldPassword
);
console.log('HI');

user.reauthenticateWithCredential(credential).then(function() {
  // User re-authenticated.


if(newPassword == confirmPassword){

  console.log('hi');

user.updatePassword(newPassword).then(function() {
  // Update successful.


document.getElementById('user_email').value = "";
document.getElementById('old_password').value = "";
document.getElementById('update_password_1').value = "";
document.getElementById('update_password_2').value = "";
alert("Password updated!");

}).catch(function(error) {
  // An error happened.

alert(error.message);

});


}


else{

alert("Password must match!");


}



}).catch(function(error) {
  // An error happened.


  alert(error.message);

});

return false;

}


function updateProfile(event){


var user = firebase.auth().currentUser;
var r_name = document.getElementById('inputEmail4').value;
var r_desc = document.getElementById('inputDesc').value;
var address = document.getElementById('inputAddress').value;
var city = document.getElementById('inputCity').value;

var stateDrop = document.getElementById('inputState');
var state = stateDrop.options[stateDrop.selectedIndex].value;

var zip = document.getElementById('inputZip').value;
var phone = document.getElementById('inputPhone').value;
var contact_email = document.getElementById('contactEmail').value;

var toPushAddress = address + ',' + city + ',' + state + ' ' + zip;
console.log(toPushAddress);

if(r_name.trim() != '' && r_desc.trim() != '' && address.trim() != '' && city.trim() != '' && state != '' && zip.trim() != '' && phone.trim() != '' && contact_email.trim() != ''){



 var updates = {};
   updates['/' + firebase.auth().currentUser.uid + '/restaurant_name'] = r_name;
  updates['/' + firebase.auth().currentUser.uid + '/restaurant_desc'] = r_desc;
  updates['/' + firebase.auth().currentUser.uid + '/address'] = toPushAddress;
  updates['/' + firebase.auth().currentUser.uid + '/contact_phone'] = phone;
    updates['/' + firebase.auth().currentUser.uid + '/contact_email'] = contact_email;
  firebase.database().ref().update(updates).then(function() {
    console.log("kobe");
   if(confirm('Successfully Updated!')){
    window.location.reload();  
}
  }).catch(function(error) {
  // An error happened.


  alert(error.message);

});;


}
else{

  alert("Some fields are empty!");
}

  return false;
}




function logoutUser(){

	firebase.auth().signOut().then(function() {
  // Sign-out successful.
  setTimeout( function() {
    // code that must be executed after pause
      window.location.href = "signin.html";
  }, 1000 );
}, function(error) {
  // An error happened.
});

}



