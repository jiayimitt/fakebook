'use strict';

class User {
  #email;  

  constructor(id, name, userName, email) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.#email = email;
  }

  get email() {
    return this.#email;
  }

  getInfo() {
    return `Name: ${this.name}\nEmail: ${this.#email}`;
  }
}

class Subscriber extends User {
  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);  
    this.pages = pages;               
    this.groups = groups;            
    this.canMonetize = canMonetize;   
  }

  getInfo() {
    let baseInfo = super.getInfo();   
    return `${baseInfo}\nGroups: ${this.groups.join(', ')}`;
  }
}

const subscriber = new Subscriber(
  1,  
  "Jiayi Nie",  
  "jiayiNie", 
  "jiayi_nie@163.com",  
  ["Tech Tips", "Photography"], 
  ["SD Developers", "Photo Enthusiasts"],  
  true,   
);

// Main script to handle interactions
document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts');
  const postButton = document.getElementById('postButton');
  const postText = document.getElementById('postText');
  const postImage = document.getElementById('postImage');
  const imagePreview = document.getElementById('imagePreview');

  // Show image preview
  postImage.addEventListener('change', () => {
    const file = postImage.files[0];
    imagePreview.innerHTML = ''; 

    if (file) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.style.maxWidth = '100px'; 
      img.style.maxHeight = '100px';
      imagePreview.appendChild(img);
      imagePreview.style.display = 'block'; 
    } else {
      imagePreview.style.display = 'none'; 
    }

    togglePostButton();
  });

  // Listen for input changes, check if there's content
  postText.addEventListener('input', () => {
    togglePostButton();
  });

  // Toggle Post button enabled/disabled
  function togglePostButton() {
    const postContent = postText.value.trim(); 
    const postImageFile = postImage.files[0];

    if (postContent || postImageFile) {
      postButton.disabled = false;
    } else {
      postButton.disabled = true;
    }
  }

  // Publish new post
  postButton.addEventListener('click', () => {
    const postContent = postText.value;
    const postImageFile = postImage.files[0];

    if (postContent || postImageFile) { 
      const postElement = document.createElement('div');
      postElement.className = 'post';

      // Create post header
      const postHeader = document.createElement('div');
      postHeader.className = 'post-header';
      postHeader.innerHTML = `
        <div class="post-header-content">
          <img src="./assets/img/jiayi-id.jpg" alt="Profile Pic" class="profile-pic">
          <span class="subscriber-name">${subscriber.name}</span> <!-- Access name from global subscriber -->
        </div>
      `;
      
      // Time section for the post
      const postTime = document.createElement('span');
      postTime.className = 'post-time';
      const currentTime = new Date().toLocaleString(); // Format current date and time
      postTime.textContent = currentTime;
      postHeader.appendChild(postTime);

      postElement.appendChild(postHeader);

      // Post content
      if (postContent) {
        const textElement = document.createElement('p');
        textElement.textContent = postContent;
        textElement.className = 'post-content';
        postElement.appendChild(textElement);
      }

      // Post image
      if (postImageFile) {
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(postImageFile);
        imageElement.style.maxWidth = '100%';
        postElement.appendChild(imageElement);
      }

      // Add the post to the posts container
      postsContainer.insertBefore(postElement, postsContainer.firstChild);

      postText.value = '';
      postImage.value = '';
      imagePreview.style.display = 'none';
      imagePreview.innerHTML = '';

      postButton.disabled = true;
    }
  });

  // Initial state of the post button
  togglePostButton();
});

// Modal function
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("userModal");
  const closeModal = document.getElementById("closeModal");
  const accountImageLink = document.getElementById("accountImageLink");

  modal.classList.remove("open"); 

  accountImageLink.addEventListener("click", function(event) {
    event.preventDefault(); 
    modal.classList.add("open"); 
    displayUserInfo(); 
  });

  // Close the modal when the close button is clicked
  closeModal.addEventListener("click", function() {
    modal.classList.remove("open"); 
  });

});

// Function to display the user information in the modal
function displayUserInfo() {
  const userInfo = subscriber.getInfo(); 

  const userInfoContainer = document.getElementById("userInfo");
  const infoParts = userInfo.split('\n');  
  let userInfoHTML = ``;

  infoParts.forEach(part => {
    userInfoHTML += `<p>${part}</p>`;  
  });

  userInfoContainer.innerHTML = userInfoHTML;
}
