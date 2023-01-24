window.onload = (event) => {
  init()
};

function init() {
  let inputClick = document.getElementsByClassName('inputBttn')[0];
  inputClick.addEventListener("click", function () { addTask() });
  var tableStorage = [];

  document.getElementById('searchBtn').addEventListener("click", function (event) {
    searchTask(event);
  });
  
  document.getElementById('filterStatus').addEventListener("change", function (event) {
    let searchEle = document.querySelector('.searchEle');
    filterTask(event.target.value, searchEle.value);
  });
}

function searchTask(event) {

  let parentEle = event.target.closest('.searchWrap');
  let searchEle = parentEle.querySelector('.searchEle');
  let statusEle = document.getElementById('filterStatus');
  filterTask(statusEle.value, searchEle.value)

}

function filterTask(status = '', textSearch = '') {
  debugger;
  console.log('status', status, 'textSearch', textSearch)
  switch (status) {
    case "completed": {
      let filterData = tableStorage.filter((item) => {
        if (textSearch && item.status && item.title.indexOf(textSearch) >= 0) {
          return true;
        } else if (item.status) {
          return true;
        }
        return false;
      });
      showTable(filterData);
      break;
    }
    case "pending": {
      let filterData = tableStorage.filter((item) => {
        if (textSearch && !item.status && item.title.indexOf(textSearch) >= 0) {
          return true;
        } else if (!item.status) {
          return true;
        }
        return false;
      });
      showTable(filterData);
      break;
    }
    default: {
      let filterData = tableStorage;
      if (textSearch) {
        filterData = tableStorage.filter((item) => {
          console.log('l1', item.title.indexOf(textSearch))
          if (item.title.indexOf(textSearch) >= 0) {
            return true;
          }
          return false;
        })
      }
      showTable(filterData);
      break;
    }
  }
}

function addTask() {
  let inputData = document.getElementById("tableInput");
  let inputTemp = inputData.value;

  if (inputTemp && (tableStorage.filter((item) => item.title === inputTemp).length === 0)) {
    tableStorage.push({
      title: inputTemp, status: false,
      id: tableStorage.length + 1
    });
    inputData.value = "";
    showTable(tableStorage)
  } else if (inputTemp) {
    document.getElementsByClassName("error")[0].innerHTML =
      'please enter new task';

  } else {
    document.getElementsByClassName("error")[0].innerHTML =
      'please enter the task';
  }
}

function showTable(tableListData) {
  console.log('k1', tableListData)
  let tableList = document.getElementsByClassName('tableData')[0];
  tableList.innerHTML = "";
  let move = "";
  tableListData.forEach((item, index) => {
    move +=
      `<li class="taskWrap ${item.status ? 'completed' : ''}" data-id="${index}">
    <div class="taskItem">
    	<div>
    		<span class="editEvent" data-type="status">${item.title}</span>
    	</div>
    	<div>
      	<span class="delete" data-id="${index}">Delete	</span>
    		<span class="edit" data-id="${index}">Edit</span>
    	</div>
    </div>
    
    <div class="editWrap">
    	<input class="taskInput" name="" data-id="${index}" id="" 
      value="${item.title}">
      <span class="editEvent" data-type="save">Save</span>
      <span class="editEvent" data-type="cancel">Cancel</span>
    </div>
    </li>`;
  });
  tableList.innerHTML = move;
  deletBttn();
  editBttn();
  saveAndCancel()
}

function deletBttn() {
  let deleteRow = document.getElementsByClassName('delete');
  for (let item of deleteRow) {
    item.addEventListener("click", function (event) {
      deleteTask(event.target.dataset.id);
    });
  }
}

function deleteTask(id) {
  tableStorage.splice(id, 1);
  showTable(tableStorage);
}

function saveAndCancel() {
  let editEles = document.getElementsByClassName('editEvent');
  for (let item of editEles) {
    item.addEventListener("click", function (event) {
      let type = event.target.dataset.type;
      if (type === 'save') {
        saveTask(event);
      } else if (type === 'status') {
        changeStatus(event)
      } else {
        cancelTask(event);
      }
    });
  }
}

function changeStatus(event) {
  let parentEle = event.target.closest('.taskWrap');
  let indexNum = parentEle.dataset.id;
  console.log('indexNum', indexNum)
  tableStorage[indexNum].status = !tableStorage[indexNum].status;
  console.log('tableStorage', tableStorage)
  showTable(tableStorage)
}

function saveTask(event) {
  debugger;
  let parentEle = event.target.closest('.taskWrap');
  let inputEle = parentEle.querySelector('.taskInput');
  let indexNum = inputEle.dataset.id;
  tableStorage = tableStorage.map((item, index) => {
    if (indexNum == index) {
      item.title = inputEle.value
    }
    return item;
  });

  showTable(tableStorage)
}

function cancelTask(event) {
  let parentEle = event.target.closest('.taskWrap');
  let taskEle = parentEle.querySelector('.taskItem');
  let editEle = parentEle.querySelector('.editWrap');
  taskEle.style.display = 'block';
  editEle.style.display = 'none';
  console.log("cancel")
}

function editBttn() {
  let editRow = document.getElementsByClassName('edit');
  for (let item of editRow) {
    item.addEventListener("click", function (event) {
      let parentEle = event.target.closest('.taskWrap');
      let taskEle = parentEle.querySelector('.taskItem');
      let editEle = parentEle.querySelector('.editWrap');
      taskEle.style.display = 'none';
      editEle.style.display = 'block';
      //editTask(event.target.dataset.id);
    });
  }
}

