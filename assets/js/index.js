document.querySelector('.menuTrigger').addEventListener('click', function (event) {
  console.log("hi", event);
  let parentEle = event.target.closest('.sectionOne');
  let linkEle = parentEle.querySelector('.linkWrap');
  if (linkEle.style.display === 'none') {
    linkEle.style.display = 'block';
  } else {
    linkEle.style.display = 'none';
  }
})