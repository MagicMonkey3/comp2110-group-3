import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

/** EditTask <edit-task id=N>
 * Task edit for a given task id (N).  Displays as a button which when clicked
 * shows a modal dialog containing a form to update the task properties.
 * Submitting the form updates the task via the TaskModel.
 */
class CreateTask extends LitElement {
  static properties = {
  };

  static styles = css`


        form {
            display: flex;
            flex-direction: column;
        }
        form div {
            display: grid;
            grid-template-columns: 1fr 3fr;
        }
        input {
            width: 100%;
        }

        form div {
          display: grid;
  grid-template-columns: 1fr 3fr;
          padding: 1.5rem;
          font-size: 20px;
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    border: 1px solid #66fcf1;
    border-radius: 6px;

    color: white;
    background-color: black;
    margin: 0 auto; 
    display: flex; 
    flex: column;
        }

        button {
          padding: 1.5rem;
          font-size: 20px;
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    border: 1px solid #66fcf1;
    border-radius: 6px;
    cursor: pointer;
    color: white;
    background-color: black;
    margin: 0 auto; 
    display: block; 

    }

    button:hover{
      color: black;
      background-color: #66fcf1;
        }

       div button {
          padding: 1.5rem;
          font-size: 20px;
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    border: 1px solid #66fcf1;
    border-radius: 6px;
    cursor: pointer;
    color: white;
    background-color: black;
    margin: 0 auto; 
    display: block; 

    }

    div button:hover{
      color: black;
      background-color: #66fcf1;
        }

       

form div input[type="submit"] {
  padding: 1.5rem;
  font-size: 20px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
border: 1px solid #66fcf1;
border-radius: 6px;
cursor: pointer;
color: white;
background-color: black;
margin: 0 auto; 
display: block; 
}

form div input[type="submit"]:hover{
  color: black;
  background-color: #66fcf1;
    }
      `;

  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * _submit - private method to handle form submission. Constructs
   * a new task from the form values and then updates the task via TaskModel
   * @param {Object} event - the click event
   */
  _submit(event) {
    event.preventDefault();
    const day = new Date().getTime();
    const formData = new FormData(event.target);
    const due = new Date(formData.get('due'));
    const newTask = {
      summary: formData.get('summary'),
      text: formData.get('text'),
      priority: formData.get('priority'),
      due: due.valueOf(),
      category: formData.get("category"),
      timestamp: day
    };
    TaskModel.createTask(newTask);
    this._hideModal(event);
  }


  /**
   * click handler for the button to show the editor dialog
   */
  _showModal() {
    const dialog = this.renderRoot.querySelector('#create-task-dialog');
    dialog.showModal();
  }

  /**
   * click handler to close the editor dialog
   * @param {Object} event - the click event
   */
  _hideModal(event) {
    event.preventDefault();
    const dialog = this.renderRoot.querySelector('#create-task-dialog');
    dialog.close();
  }

  render() {
    return html`
        <button @click=${this._showModal}>Create Task</button>
        <dialog id="create-task-dialog">
            <form @submit="${this._submit}">
                <div>
                    <label for="category">Choose a category:</label>
                    <select id="category" name="category">
                      <option value="ToDo">ToDo</option>
                      <option value="Doing">Doing</option>
                      <option value="Done">Done</option>
                    </select>
                </div>

                <div>
                    <label for="summary">Summary</label>
                    <input name="summary">
                </div>
                <div>
                    <label for="text">Text</label>
                    <textarea name="text"></textarea> 
                </div>
                <div>
                    <label for="priority">Priority</label>
                    <input name="priority" 
                           type="number" 
                           > 
                </div>
                <div>
                    <label for="due">Due</label>
                    <input name="due" type="datetime-local" >
                </div>
                <div>
                    <button @click="${this._hideModal}">Cancel</button>
                    <input value='Create' type=submit>
                </div>
            </form>
        </dialog>`;
  }
}

customElements.define('create-task', CreateTask);
