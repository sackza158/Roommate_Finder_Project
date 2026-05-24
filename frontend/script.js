let posts = [];

let editingPostId = null;

function addPost(){
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const distance = document.getElementById("distance").value;
    const gender = document.getElementById("gender").value;
    const discription = document.getElementById("discription").value;
    const contract = document.getElementById("contract").value;

    if(title === "" || price === "" || gender === "เลือกเพศ" || location === "เลือกLocation" || distance === ""||
            contract === ""){
            alert("กรอกข้อมูลให้ครบถ้วน");
            return;
    }
    
    const imageInput = document.getElementById("imageInput");
    const file = imageInput.files[0];

    const reader = new FileReader();

    reader.onload = function(){
        const post = {
            id: Date.now(),
            title: title,
            price: price,
            location: location,
            distance: distance,
            gender: gender,
            discription: discription,
            contract: contract,
            image: reader.result
        };


        if(editingPostId !== null){
            posts = posts.ilter(function(item){
                return !(item.id === editingPostId)
            });
        }

        posts.push(post);

        localStorage.setItem("posts",JSON.stringify(posts));

        createPostCard(post);  
        
        editingPostId = null;

    }

    reader.readAsDataURL(file);





    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("location").value = "เลือกLocation";
    document.getElementById("distance").value = "";
    document.getElementById("gender").value = "เลือกเพศ";
    document.getElementById("discription").value = "";
    document.getElementById("contract").value = "";
}

function createPostCard(post){
    const card = document.createElement("div");

    card.classList.add("card");

    const title = document.createElement("h3");
    title.textContent = post.title;

    const price = document.createElement("p");
    price.textContent = post.price + " บาท/เดือน";

    const location = document.createElement("p");
    location.textContent = "หอพักใกล้ : " + post.location;

    const distance = document.createElement("p");
    distance.textContent = "ระยะทางห่างจากมหาลัย < " + post.distance + " Km.";

    const gender = document.createElement("p");
    gender.textContent = "ต้องการเพศ : " + post.gender;

    const discription = document.createElement("p");
    discription.textContent = "รายละเอียด : " + post.discription;

    const contract = document.createElement("p");
    contract.textContent = "ช่องทางการติดต่อ : " + post.contract;

    const image = document.createElement("img");

    image.src = post.image;
    image.width = 200;

    image.classList.add("post-image");

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(location);
    card.appendChild(distance);
    card.appendChild(gender);
    card.appendChild(discription);
    card.appendChild(contract);

    //---------------Delete Button---------------
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "ลบ";

    deleteBtn.classList.add("buttonStyle");

    deleteBtn.onclick = function(){
        posts = posts.filter(function(item){
            return !(
                item.id === post.id
            )
        })

        localStorage.setItem("posts" , JSON.stringify(posts));

        card.remove();

    }
    card.appendChild(deleteBtn);

    //---------------Edit Button--------------//
    const editBtn = document.createElement("button");
    editBtn.textContent = "แก้ไข";
    editBtn.classList.add("buttonStyle");

    editBtn.onclick = function(){
        document.getElementById("title").value = post.title;
        document.getElementById("price").value = post.price;
        document.getElementById("location").value = post.location;
        document.getElementById("distance").value = post.distance;
        document.getElementById("gender").value = post.gender;
        document.getElementById("discription").value = post.discription;
        document.getElementById("contract").value = post.contract;

        editingPostId = post.id;

        modal.style.display = "block";
    }

    card.appendChild(editBtn);

    document.getElementById("posts").appendChild(card);

}


function searchPost(){
    const keywordTitle = document.getElementById("searchInput").value.toLowerCase();
    const keywordLocation = document.getElementById("searchLocation").value.toLowerCase();
    const keywordGender = document.getElementById("searchGender").value.toLowerCase();

    if(keywordLocation === "เลือกLocation"){
        keywordLocation = "";
    }
    if(keywordGender === "เลือกเพศ"){
        keywordGender = "";
    }


    document.getElementById("posts").innerHTML = "";

    posts.forEach(function(post){
        if(
            post.title
            .toLowerCase()
            .includes(keywordTitle)
        
            &&

            post.location
            .toLowerCase()
            .includes(keywordLocation)

            &&

            post.gender
            .toLowerCase()
            .includes(keywordGender)
        
        )
        {
            createPostCard(post);
        }

    });


}


const savePosts = localStorage.getItem("posts");
if(savePosts !== null){
    posts = JSON.parse(savePosts);

    posts.forEach(function(post){
        createPostCard(post);
    });
}

const modal = document.getElementById("modal");

const openBtn = document.querySelector(".createPost-btn");

const closeBtn = document.getElementById("closeModalBtn");

openBtn.onclick = function(){
    modal.style.display = "block";
}

closeBtn.onclick = function(){
    modal.style.display = "none";
}