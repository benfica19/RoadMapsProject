//Calls the API to get a list of all tables.
//https://script.google.com/macros/s/AKfycbxQLEDssUsb7BGlwzYgzwAJohRQb1vEvLznwlFK2ZPowwel3F_J6Z3AvGTGWq-PenCD/exec

var element = document.getElementById('tableselection');
fetchTableList()
  .then(options => {
    for (var key in options) {
        var option = document.createElement('option');
        option.value = options[key];
        option.text = key+" "+"Table ID: "+options[key];
        element.appendChild(option);
    }
  });


async function fetchTableList() {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxQLEDssUsb7BGlwzYgzwAJohRQb1vEvLznwlFK2ZPowwel3F_J6Z3AvGTGWq-PenCD/exec');
      const data = await response.json();
      //console.log('Data received(List of Milestones):', data);
      return data;
    } catch (error) {
      //console.error('Error', error);
      throw error; 
    }
}

//Triggered when user selected a new table using the dropdown
function handleTableSelection() {
    var selectElement = document.getElementById("tableselection");
    var selectedTableId = selectElement.value; 
    // getBaseData(selectedTableId);
    initilizeganttchart(selectedTableId);
    console.log("Selected table ID:", selectedTableId);
  }