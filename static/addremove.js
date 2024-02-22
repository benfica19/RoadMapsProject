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
    try {
      const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=88x2DbYh61b5N4tXp1qesD2L5-ZOznwIz4F2ZGO16p66OpzW9RJGYg2VeriADAEnBVqsYqQCBfDH2QglclF7jD3dQmV8bQFzm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnM2T8DKDJb5crms6eM5dD74yHaN3nw-lk6zCmt0LD12POxXbVlFzVxVd9dgpkg69E8ScFxxCR6dA16JurqEdtgA7qaRArYe_jtz9Jw9Md8uu&lib=MxHd7AEelJsYyiIUxj9Djq-BRxnWXSPyf');
      const data = await response.json();
      //console.log('Data received(List of Milestones):', data);
      return data;
    } catch (error) {
      //console.error('Error', error);
      throw error; 
    }
}


//Get data after Add Task button is clicked in the modal box.
addtask = document.getElementById("addtask");
addtask.addEventListener('click', async function() {

});
