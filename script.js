let posts = [
      {
            profileImage: 'pb/pb1.jpg',
            author: 'everly_engel',
            location: 'München',
            recency: '1 Wo.',
            image: 'img/img1.jpg',
            description: 'Just generated this with AI...',
            commentingUsers: ['sxmxn.huettnr', 'worst.nightmare'],
            comments: ['Wow!', 'Interessant!'],
      },
      {
            profileImage: 'pb/pb2.jpg',
            author: 'santa_claus',
            location: 'North Pole',
            recency: '3 Wo.',
            image: 'img/img2.jpg',
            description: 'I have something for you! 😊',
            commentingUsers: ['christopher.nolan', 'jennifer.lawrence'],
            comments: ['Ich freue mich schon!', 'Fascinating!'],
      },
      {
            profileImage: 'pb/pb3.jpg',
            author: 'lxrs.balthasar',
            location: 'Herold',
            recency: '1 Mo.',
            image: 'img/img3.jpg',
            description: 'working on it...',
            commentingUsers: ['kevin.hauser', 'justin.dreher', 'magda_123'],
            comments: ['You got this!', 'Fascinating!', 'I believe in you!'],
      },
];

function render() {
      getSavedArrays();

      document.getElementById('post-area').innerHTML = '';

      for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            document.getElementById('post-area').innerHTML += /*html*/ `
                        <div class="post-header">
                            <img class="profile-img" src="${post['profileImage']}">
                            <div class="info-container">
                                <div class="author-recency-container">
                                    <h3 class="author">${post['author']}</h3>
                                    <h3 class="light-gray">${post['recency']}</h3>
                                </div>
                                <h4 class="location">${post['location']}</h4>
                            </div>
                        </div>  
                        <img src="${post['image']}">
                        <div class="comment-container">
                            <h3>${post['author']}</h3>
                            <p>${post['description']}</p>
                        </div>
                        <div id="comment-section-${i}"></div>
                        <h3 onclick="showCommentInput(${i})" class="light-gray cursor-pointer">add comment...</h3>
                        <div id="comment-input-container">
                            <input id="comment-input-${i}" class="display-none">
                            <button onclick="addComment(${i})" id="add-comment-button-${i}" class="display-none">comment</button>
                        </div>
                    


        
        `;
            for (let j = 0; j < post['comments'].length; j++) {
                  const commentingUser = post['commentingUsers'][j];
                  const comment = post['comments'][j];

                  document.getElementById(`comment-section-${i}`).innerHTML += /*html*/ `
                    <div class="comment-container">
                        <h3>${commentingUser}</h3>
                        <p>${comment}</p>
                    </div>
                  `;
            }
      }
}

function getSavedArrays() {
      for (let i = 0; i < posts.length; i++) {
            const post = posts[i];

            if (getArray(`${i}-commentingUsers`) !== null && getArray(`${i}-comments`) !== null) {
                  post['commentingUsers'] = getArray(`${i}-commentingUsers`);
                  post['comments'] = getArray(`${i}-comments`);
            }
      }
}

function showCommentInput(currentPost) {
      document.getElementById(`comment-input-${currentPost}`).classList.remove('display-none');
      document.getElementById(`add-comment-button-${currentPost}`).classList.remove('display-none');
}

function addComment(currentPost) {
      let newComment = document.getElementById(`comment-input-${currentPost}`).value;

      posts[currentPost]['commentingUsers'].push('You');
      posts[currentPost]['comments'].push(newComment);
      setArray(`${currentPost}-commentingUsers`, posts[currentPost]['commentingUsers']);
      setArray(`${currentPost}-comments`, posts[currentPost]['comments']);

      document.getElementById(`comment-input-${currentPost}`).value = '';

      document.getElementById(`comment-input-${currentPost}`).classList.add('display-none');
      document.getElementById(`add-comment-button-${currentPost}`).classList.add('display-none');

      render();
}

function setArray(key, array) {
      localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
      return JSON.parse(localStorage.getItem(key));
}
