$(document).ready(function(){const list=parseList();const sidebar=$('#content-sidebar');list.map(item=>{sidebar.append(`<li><a href="${item.href}">${item.title}</a></li>`);if(item.child&&item.child.length){const ul=document.createElement('ul');item.child.map(e=>ul.append(createListItem(e.href,e.title)));sidebar.append(ul);}});function parseList(){const list=[];const h1=document.body.querySelectorAll("article > h1, article > h2");let node=null;let latestTag=null;for(let i=0;i<h1.length;i++){if(h1[i].tagName==='H1'){node=createNote(h1[i].id,h1[i].textContent);}else{node.child.push(createNote(h1[i].id,h1[i].textContent));}
if(h1[i].tagName==='H1'){list.push(node);}
latestTag=h1[i].tagName;}
return list;}
function createNote(href,title){return{href:'#'+href,title,child:[]};}
function createListItem(href,title){const childLi=document.createElement('li');const aTag=document.createElement('a');aTag.href=href;const text=document.createTextNode(title);aTag.append(text);childLi.append(aTag);return childLi;}});;var userInfo=null;var loggerIn=false;$(document).ready(function(){firebase.initializeApp(config);checkAuth();getComments();});function addComment(){const textarea=$('#comment-content');if(!textarea.val()){alert('Bạn chưa nhập nội dung');}
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
function addMyAvatar(){if(userInfo){$('#my-avatar').html(`<img src="${userInfo.photo}" alt="${userInfo.name}">`)}};$(document).ready(function(){const progressBar=document.querySelector('#reading-progress');if(progressBar){let lastScrollY=window.scrollY;let lastWindowHeight=window.innerHeight;let lastDocumentHeight=$(document).height();function onScroll(){lastScrollY=window.scrollY;update();}
function onResize(){lastWindowHeight=window.innerHeight;lastDocumentHeight=$(document).height();}
function update(){const progressMax=lastDocumentHeight-lastWindowHeight;progressBar.setAttribute('max',progressMax);progressBar.setAttribute('value',lastScrollY);}
window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('scroll',onResize);update();}});