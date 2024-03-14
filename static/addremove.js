//Add Item Button.
btnShowDialog = document.getElementById('btnShowDialog')
let options = {};

// Add a click event listener to the button
btnShowDialog.addEventListener('click', async function() {
    try { 
        options = await fetchData();
        const selectOption = document.getElementById('milestones');
        selectOption.innerHTML = " ";

        options.milestones.forEach(option => { 
            const optionElement = document.createElement('option');
            optionElement.value = option; 
            optionElement.textContent = option;
            selectOption.appendChild(optionElement);
        });

    } catch (error) {
        console.log(error);
    }
});

//Function gets the list of the Milestones from Google Table,
// Used if user wants to add an item to the existing Milestone.
async function fetchData() {
    var selectElement = document.getElementById("tableselection");
    var selectedTableId = selectElement.value; 
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbybBMWs3AZYRejwnkKrjhn7_uEgFlr0kr9Pe1rBFs8vcCMy_T5KEQWqwbHE5qorbBgq/exec?tableid="+selectedTableId);
      const milestones = await response.json();
      const dataarr = Object.keys(milestones).filter(key => key !== "Milestone").filter(obj => Object.keys(obj).length !== 0);
      const data = {"milestones":dataarr};
    //   console.log('Data received(List of Milestones):', data);
      return data;
    } catch (error) {
      //console.error('Error', error);
      throw error; 
    }
}


//Get data after Add Task button is clicked in the modal box.
addtask = document.getElementById("addtask");
addtask.addEventListener('click', async function() {
    // Get the values from the form
    let taskName = document.getElementById('exampleFormControlInput1').value;
    let milestone = document.getElementById('milestones').value;
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    let newmilestone = document.getElementById('exampleFormControlInput2').value;

    // console.log(milestone)
    // console.log(taskName)
    // console.log(startDate)
    // console.log(endDate)

    let milestonefinal = newmilestone.length !== 0 ? newmilestone : milestone;

    console.log(milestonefinal);

    // Send the task data to the API
    fetch('https://script.google.com/macros/s/AKfycbzHmIxyXBROpNuN0HPsAtJU4VClyJ2PtcSD4YHv1MuNQINQdaLDc8xnAElNSZaVGUkLdQ/exec?milestone=' + encodeURIComponent(milestonefinal) + '&task=' + encodeURIComponent(taskName) + '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate))
    .then(response => {
        if (response.ok) {
            console.log('Task added successfully');
            // Close the modal
            $('#exampleModalCenter').modal('hide');
        } else {
            console.error('Failed to add task');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});