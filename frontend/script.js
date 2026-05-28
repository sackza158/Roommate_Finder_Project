let posts = [];

let currentUser = null;

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

    if(currentUser === null){
        alert("กรุณา Login ก่อน");
        return;
    }
    
    const imageInput = document.getElementById("imageInput");
    const file = imageInput.files[0];

    const reader = new FileReader();

    //จะทำฟังชั่นนี้ หลังอ่านรูปเสร็จ
    reader.onload = function(){
        const post = {
            id: Date.now(),
            user: currentUser,
            title: title,
            price: price,
            location: location,
            distance: distance,
            gender: gender,
            discription: discription,
            contract: contract,
            image: file ? reader.result : ""
        };

        //เช็คว่าการกด addPost ครั้งนี้ มาจากการแก้ไขหรือไม่ ถ้าใช่ จะทำ
        if(editingPostId !== null){
            
            const index = posts.findIndex(p => p.id === editingPostId);

            if(index === -1)
                return;

            posts[index] = {
                id: editingPostId,
                user: posts[index].user,
                title,
                price,
                location,
                distance,
                gender,
                discription,
                contract,
                image: file ? reader.result : posts[index].image                
            };

            editingPostId = null;

            localStorage.setItem("posts",JSON.stringify(posts));

            renderPost();
            modal.style.display = "none"; 
            return;
        }

        posts.push(post);

        localStorage.setItem("posts",JSON.stringify(posts));

        renderPost();  
        
        editingPostId = null;

        
        modal.style.display = "none";  

    }

    //เช็คว่ามีรูปไหม
    if(file){
        reader.readAsDataURL(file);
    }
    else{
        reader.onload();
    }


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
    
    if(post.user === currentUser){
        card.appendChild(deleteBtn);        
    }

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

    if(post.user === currentUser){
        card.appendChild(editBtn);        
    }

    document.getElementById("posts").appendChild(card);

}


function searchPost(){
    const keywordTitle = document.getElementById("searchInput").value.toLowerCase();
    const keywordLocation = document.getElementById("searchLocation").value.toLowerCase();
    const keywordGender = document.getElementById("searchGender").value.toLowerCase();


    const postContainer = document.getElementById("posts");

    postContainer.innerHTML = "";

    //อันไหน ตรงเงื่อนไข เก็บเข้า Array filterposts;
    const filterposts = posts.filter(function(post){
        return(
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
        
        );

    });

    if(filterposts.length === 0){
         postContainer.innerHTML = `
                                    <div class="empty-container">
                                        <h2 class="empty-font">
                                            ไม่มีโพสต์ที่คุณค้นหา
                                        </h2>
                                    </div> ` ;    
        return;
    }
    else{
        filterposts.forEach(function(post){
            createPostCard(post);
        });
    }

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

function renderPost(){
    const postsContainer = document.getElementById("posts");

    postsContainer.innerHTML = "";

    if(posts.length === 0){
        postsContainer.innerHTML = `
                                    <div class="empty-container">
                                        <h2 class="empty-font">
                                            ยังไม่มีโพสต์
                                        </h2>
                                    </div> `
    }
    else{
        posts.forEach(post => {
            createPostCard(post);
        });
    }


}

const savePosts = localStorage.getItem("posts");
if(savePosts !== null){  
    posts = JSON.parse(savePosts);
}
renderPost();

const saveUser = localStorage.getItem("currentUser");
if(saveUser !== null){
    currentUser = saveUser;

    document.getElementById("loginPage").style.display = "none";

    renderPost();
}

window.onclick = function(event){
    if(event.target === modal){
        modal.style.display = "none";
    }
}