function validateForm() {
    let validate = document.forms["login"];
    let username = validate["username"].value;
    let password = validate["password"].value;

    if(username==="john" && password==="1234"){
        
    } else{
        alert("Account incorrect");
    }
}