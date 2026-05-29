let posts = [];

let currentUser = null;

let editingPostId = null;


const savePosts = localStorage.getItem("posts");
if(savePosts !== null){  
    posts = JSON.parse(savePosts);
}

const saveUser = localStorage.getItem("currentUser");
if(saveUser !== null){
    currentUser = saveUser;

    document.getElementById("loginPage").style.display = "none";

}

renderPost();

window.onclick = function(event){
    if(event.target === modal){
        modal.style.display = "none";
    }
}