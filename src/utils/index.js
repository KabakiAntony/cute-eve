export function openAction(evt, actionName){
    let i, actioncontent, actionlinks;
    actioncontent = document.getElementsByClassName("actionContent");
    for (i = 0; i < actioncontent.length; i++) {
        actioncontent[i].style.display = "none";
    }
    actionlinks = document.getElementsByClassName("action-links");
    for (i = 0; i < actionlinks.length; i++) {
        actionlinks[i].className = actionlinks[i].className.replace(" active", "");
    }
    document.getElementById(actionName).style.display = "block";
    document.getElementById('profileInstruction').style.display = "none";
    evt.currentTarget.className += " active";
  };

  export function loadSpinner(){
    document.getElementById('show-spinner').style.display = " block";
  }

  export function unloadSpinner(){
    document.getElementById('show-spinner').style.display = " none";
  }

  export function loadToast(msg, toast_type){
    this.show = true
    this.message = msg
    this.type = toast_type

    setTimeout(()=>{
          this.type = null
          this.message = null
        }, 6000)
  }

  export function comparePasswords(){
    const pass_one = document.getElementById('password');
    const pass_two = document.getElementById('confirm-password');

    if(pass_one.value === pass_two.value){
      pass_one.style.border = "2px solid  #2C974B";
      pass_two.style.border = "2px solid  #2C974B";
      return true;
    }
    pass_one.style.border = "2px solid  #b8251b";
    pass_two.style.border = "2px solid  #b8251b";
    return false;
  }

  export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }