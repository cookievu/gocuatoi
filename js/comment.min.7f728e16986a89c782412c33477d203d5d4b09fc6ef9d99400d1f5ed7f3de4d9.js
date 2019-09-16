var userInfo=null;var loggerIn=false;$(document).ready(function(){firebase.initializeApp(config);checkAuth();getComments();});function addComment(){const textarea=$('#comment-content');if(!textarea.val()){alert('Bạn chưa nhập nội dung');}
const commentRef=firebase.database().ref('/comments/'+PAGE_ID);commentRef.push().set({content:textarea.val(),author:{name:userInfo.name,photo:userInfo.photo},timestamp:new Date().toString()});textarea.val('');}
function getComments(){const commentRef=firebase.database().ref('comments/'+PAGE_ID);commentRef.on('child_added',function(data){addCommentElement(data.key,data.val().content,data.val().author,data.val().timestamp);});}
function addCommentElement(key,content,author,timestamp){const date=new Date(timestamp);var result=window.markdownit().render(content);$('#comment').append(`
        <li id="${key}" class="parent">
            <div class="avatar">
                <img src="${author.photo}" alt="${author.name}">
            </div>
            <div class="comment">
                <p class="name">${author.name} <small>lúc ${getDateString(date)}</small></p>
                <p class="content">${result}</p>
            </div>
        </li>
    `);}
function authGoogle(){var provider=new firebase.auth.GoogleAuthProvider();firebase.auth().signInWithPopup(provider).then(function(result){createUser(result.user)}).catch(function(error){console.log(error)});}
function getDateString(date){return date.getHours()+":"+date.getMinutes()+' '+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();}
function createUser(user){userInfo=getUserParams(user);const userRef=firebase.database().ref('/users/'+userInfo.uid);userRef.set(userInfo);authed();}
function checkAuth(){firebase.auth().onAuthStateChanged(function(user){if(user){createUser(user)}});}
function getUserParams(user){return{uid:user.uid,name:user.displayName,email:user.email,photo:user.photoURL};}
function authed(){loggerIn=true;addMyAvatar();$('#loginBox').hide();$('#commentBox').show();}
function addMyAvatar(){if(userInfo){$('#my-avatar').html(`<img src="${userInfo.photo}" alt="${userInfo.name}">`)}}