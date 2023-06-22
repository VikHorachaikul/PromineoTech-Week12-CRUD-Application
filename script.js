$(document).ready(function() {
    // Mock data source as an array
    let entities = [];
  
    // Function to render the entities in the table
    function renderEntities() {
      $('#entityTableBody').empty();
  
      for (const entity of entities) {
        const row = `
          <tr>
            <td>${entity.name}</td>
            <td>${entity.email}</td>
            <td>
              <button class="btn btn-sm btn-primary editBtn" data-id="${entity.id}">Edit</button>
              <button class="btn btn-sm btn-danger deleteBtn" data-id="${entity.id}">Delete</button>
            </td>
          </tr>
        `;
  
        $('#entityTableBody').append(row);
      }
  
      // Attach event listeners to edit and delete buttons
      $('.editBtn').click(function() {
        const entityId = $(this).data('id');
        editEntity(entityId);
      });
  
      $('.deleteBtn').click(function() {
        const entityId = $(this).data('id');
        deleteEntity(entityId);
      });
    }
  
    // Function to add a new entity
    function addEntity(name, email) {
      const entity = {
        id: entities.length + 1,
        name: name,
        email: email
      };
  
      entities.push(entity);
      renderEntities();
      $('#addForm')[0].reset(); // Reset the form
    }
  
    // Function to edit an existing entity
    function editEntity(entityId) {
      const entity = entities.find(entity => entity.id === entityId);
  
      if (entity) {
        const newName = prompt('Enter new name:', entity.name);
        const newEmail = prompt('Enter new email:', entity.email);
  
        if (newName && newEmail) {
          entity.name = newName;
          entity.email = newEmail;
          renderEntities();
        }
      }
    }
  
    // Function to delete an entity
    function deleteEntity(entityId) {
      entities = entities.filter(entity => entity.id !== entityId);
      renderEntities();
    }
  
    // Event listener for form submission
    $('#addForm').submit(function(event) {
      event.preventDefault();
      const name = $('#name').val();
      const email = $('#email').val();
  
      addEntity(name, email);
    });
  
    // Initial rendering of entities
    renderEntities();
  });
  