const modal = document.getElementById("modal");

const openBtn = document.querySelector(".createPost-btn");

const closeBtn = document.getElementById("closeModalBtn");

openBtn.onclick = function(){
    modal.style.display = "block";
}

closeBtn.onclick = function(){
    modal.style.display = "none";
}

const imageInput = document.getElementById("imageInput");

imageInput.onchange = function(){
    
    const file = imageInput.files[0];

    if(!file){
        return;
    }

    const reader = new FileReader();

    reader.onload = function(){
        document.getElementById("previewImage").src = reader.result;
    }

    reader.readAsDataURL(file);

}
