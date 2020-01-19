//Init
const github = new GitHub;
const ui = new UI;

const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
  //Get input text
  const userText = e.target.value;

  if(userText != ''){
    github.getUser(userText)
    .then(data => {
      if(data.profile.message == 'Not Found'){
        //Show Alert
        ui.showAlert('User Not Found', 'alert alert-danger')
      }
      else{
        //Show profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    })
  }else{
    //Clear profile listing
    ui.clearProfile();
  }
})

