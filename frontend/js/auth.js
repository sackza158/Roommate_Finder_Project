function login(){
    const username = document.getElementById("usernameInput").value;

    if(username === ""){
        alert("ใส่ชื่อก่อน");
        return;
    }

    currentUser = username;
    console.log(currentUser);

    document.getElementById("loginPage").style.display = "none";

    alert("สวัสดี " + currentUser);

    localStorage.setItem("currentUser",currentUser);

    renderPost();
}

function Logout(){
    currentUser = null;
    
    alert("ออกจากระบบแล้ว");

    document.getElementById("loginPage").style.display = "flex";

    localStorage.removeItem("currentUser");

    renderPost();
}