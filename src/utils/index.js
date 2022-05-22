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
    // document.getElementById('profileInstruction').style.display = "none";
    evt.currentTarget.className += " active";
  };

  export function loadSpinner(){
    document.getElementById('show-spinner').style.display = " block";
  }

  export function unloadSpinner(){
    document.getElementById('show-spinner').style.display = " none";
  }

  export function unloadToast(){
    setTimeout(()=>{
          this.type = null
          this.message = null
        }, 6000)
  }
  export function loadToast(msg, toast_type){
    this.show = true
    this.message = msg
    this.type = toast_type
  }