function move(event) {
    let data = event.target.innerHTML;
    console.log(data)
    if (!data) {
      console.log('hi')
      let activeEle = document.getElementsByClassName('active')[0];
      let activeData = activeEle.innerHTML;
      activeEle.innerHTML = '';
      activeEle.classList.remove("active");
      event.target.innerHTML = activeData
    } else {
      let activeEle = document.getElementsByClassName('active');
      for (let item of activeEle) {

        item.classList.remove("active")
      }

      event.target.classList.add('active')
    }
  }