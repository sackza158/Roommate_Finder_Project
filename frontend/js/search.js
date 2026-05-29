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