const postform = document.querySelector('#postform');
const postlist = document.querySelector('.post-list');

/*//Saving questions
function send(e){
    e.preventDefault;
    db.collection('Messages').add({
        Names: contactform.names.value,
        email: contactform.email.value,
        Message: contactform.message.value,
        Comments: contactform.comments.value,
    });
    contactform.reset();
}
document.getElementById('messagebtn').addEventListener('click', send);
*/
//Saving new blogs to firestore
function post(e) {
    e.preventDefault();
    db.collection('Posts').add({
        Author_Names: postform.authornames.value,
        Description: postform.description.value,
        Info: postform.info.value,
        Citation: postform.citation.value,
       // Cover_Image: postform.cover.value,
    })
    postform.reset();
}
document.getElementById('postblog').addEventListener('click', post);

// create element & retrieve post
function renderpost(doc){
    let li = document.createElement('li');
    let Author_Names = document.createElement('h2');
    let Description = document.createElement('h5');
    let Info = document.createElement('p');
    let Citation = document.createElement('h5');
    let Delete = document.createElement('button');
    let update = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    Author_Names.textContent = doc.data().Author_Names;
    Description.textContent = doc.data().Description;
    Info.textContent = doc.data().Info;
    Citation.textContent = doc.data().Citation;
    Delete.textContent = 'Delete';
    Delete.setAttribute("class", "btn");
    update.textContent = 'Update';
    update.setAttribute("class", "updatebtn");

    li.appendChild(Author_Names);
    li.appendChild(Description);
    li.appendChild(Info);
    li.appendChild(Citation);
    li.appendChild(Delete);
    li.appendChild(update);

    postlist.appendChild(li);

    // deleting data
    Delete.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Posts').doc(id).delete();
    });
    
    //Updating data
 update.addEventListener('click', (e) => {
    let id = e.target.parentElement.getAttribute('data-id');

    window.location.href = "profile.html#editpost";
   /* db.collection('Posts').doc(id).update({Description:'data-id', Info:'data-id', Author_Names:'Junior', Citation:'data-id'})
    .then(function() {
        console.log("Document successfully updated!");
        window.location.href = "profile.html#editpost"
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    }); */
    const editform = document.querySelector('.editform');
    db.collection('Posts').doc(id).get().then(article=>{
     editform['authorinputbox'].value= doc.data().Author_Names;
     editform['titleinputbox'].value= doc.data().Description;
     editform['contentinputbox'].value= doc.data().Info;
     editform['citationinputbox'].value= doc.data().Citation;
 

    db.collection('Posts').doc(id).update();
    window.location.href = "profile.html#editpost"
})
});
}
var edit = document.getElementById('postarticle');
    edit.addEventListener('click', (e)=>{
    returndb.collection('Posts').doc(id).update({
    Author_Names: editform['authorinputbox'].value,  
    Description: editform['titleinputbox'].value,
    Info: editform['contentinputbox'].value,
    Citation: editform['citationinputbox'].value,
    })
})

// real-time listener
db.collection('Posts').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderpost(change.doc);
        } else if (change.type == 'removed'){
            let li = postlist.querySelector('[data-id=' + change.doc.id + ']');
            postlist.removeChild(li);
        }
      /* if (change.type === "modified") {
            let li = postlist.querySelector('[data-id=' + change.doc.id + ']');
            postlist.updateChild(li);
        }*/
    });
});
 



/*// getting data
db.collection('Posts').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderpost(doc);
    });
});*/
/*//Delete data
function del() {
    e.preventDefault();
    db.collection('Posts').delete({
       doc()
    })
    postform.reset();
}
document.getElementById('postblog').addEventListener('click', del);*/

/*//Retrieving Posts
const posted = document.querySelector('.posted')
db.collection("Posts").onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            posted.innerHTML += "<article class='article'><h2>" + change.doc.data().Author_Names + "</h2>  <h5>" + change.doc.data().Description + "</h5><p>" 
        + change.doc.data().Info + "</p><p>" + change.doc.data().Citation +  "</p><br><button id='deletepostbtn onclick='del'>Delete</button></section>"
    }
    });
});*/


       
/*//retrieving messages

db.collection("Messages").onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") { messagelist.innerHTML += "<div class='list'><h3>" + change.doc.data().Names + "</h3> <p> Email:" + change.doc.data().email + "</p><p>" 
        + change.doc.data().Message + "</p><p>" + change.doc.data().Comments +  "</p></div>"
        }
    });
});
*/

/*
db.collection("Messages").onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") { messagelist.innerHTML += "<div class='list'><h3>" + change.doc.data().Names + "</h3> <p> Email:" + change.doc.data().email + "</p><p>" 
        + change.doc.data().Message + "</p><p>" + change.doc.data().Comments +  "</p></div>"
        }
    });
});
// getting data
db.collection('Messages').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
    retrievemessage(doc)
    }) 
})
*/