let posts = [];

function addPost(){
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;
    const distance = document.getElementById("distance").value;
    const gender = document.getElementById("gender").value;
    const discription = document.getElementById("discription").value;
    const contract = document.getElementById("contract").value;

    if(title === "" || price === "" || gender === "เลือกเพศ"){
        alert("กรอกข้อมูลให้ครบถ้วน");
        return;
    }

    const post = {
        title: title,
        price: price,
        location: location,
        distance: distance,
        gender: gender,
        discription: discription,
        contract: contract
    };

    posts.push(post);

    createPostCard(post);

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
    price.textContent = "งบประมาณ : " + post.price;

    const location = document.createElement("p");
    location.textContent = "หอพักใกล้ : " + post.location;

    const distance = document.createElement("p");
    distance.textContent = "ระยะทางห่างจากมหาลัย < " + post.location + " Km.";

    const gender = document.createElement("p");
    gender.textContent = "ต้องการเพศ : " + post.gender;

    const discription = document.createElement("p");
    discription.textContent = "รายละเอียด : " + post.discription;

    const contract = document.createElement("p");
    contract.textContent = "ช่องทางการติดต่อ : " + post.contract;


    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(location);
    card.appendChild(distance);
    card.appendChild(gender);
    card.appendChild(discription);
    card.appendChild(contract);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "ลบ";

    deleteBtn.onclick = function(){
        card.remove();
    }

    card.appendChild(deleteBtn);

    document.getElementById("posts").appendChild(card);

}