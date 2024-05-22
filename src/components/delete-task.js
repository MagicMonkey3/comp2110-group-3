import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

/** EditTask <edit-task id=N>
 * Task edit for a given task id (N).  Displays as a button which when clicked
 * shows a modal dialog containing a form to update the task properties.
 * Submitting the form updates the task via the TaskModel.
 */
class DeleteTask extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
  };

  static styles = css`
        form {
            display: flex;
            flex-direction: column;
        }
        input {
            width: 100%;
        }

        button {
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
          padding: 0.5rem;
      border-color: #66fcf1;
    border-radius: 6px;
    cursor: pointer;
    color: #1f2833;
    background-color: #66fcf1;
    }

    button:hover{
      color: #66fcf1;
      background-color: #1f2833;
        }

        form div input[type="submit"] {
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
          padding: 0.5rem;
          margin: 0 auto;
      border-color: #66fcf1;
    border-radius: 6px;
    cursor: pointer;
    color: #1f2833;
    background-color: #66fcf1;

    }

    form div input[type="submit"]:hover{
      color: #66fcf1;
      background-color: #1f2833;
        }
      `;

  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
  }

  /**
   * _submit - private method to handle form submission. Constructs
   * a new task from the form values and then updates the task via TaskModel
   * @param {Object} event - the click event
   */
  _submit(event) {
    TaskModel.deleteTask(this.id);
    this._hideModal(event);
  }


  /**
   * click handler for the button to show the editor dialog
   */
  _showModal() {
    const dialog = this.renderRoot.querySelector('#delete-task-dialog');
    dialog.showModal();
  }

  /**
   * click handler to close the editor dialog
   * @param {Object} event - the click event
   */
  _hideModal(event) {
    event.preventDefault();
    const dialog = this.renderRoot.querySelector('#delete-task-dialog');
    dialog.close();
  }

  render() {
    // convert due date from milliseconds time to an ISO string
    // suitable for the datetime-local form input
    return html`
        <button @click=${this._showModal}>Delete</button>
        <dialog id="delete-task-dialog">
            <form @submit="${this._submit}">
                <div>
                    <h5>Are you sure that you want to delete ${this._task.summary}? </h5>
                </div>
                <div>
                    <button @click="${this._hideModal}">Cancel</button>
                    <input value='Delete' type=submit>
                </div>
            </form>
        </dialog>`;
  }
}

customElements.define('delete-task', DeleteTask);
