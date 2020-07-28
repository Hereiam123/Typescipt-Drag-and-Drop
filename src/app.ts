//Custom autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  //Get original property method
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    /*Template element
        Adding exclamation to avoid null value, due to typescript
        not being sure of finding template element*/
    //Casting as template element
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    //Reference to element where we want to render content
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    //Importing content of template element
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescritpion = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescritpion.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      alert("Invalid input");
      return;
    } else {
      return [enteredTitle, enteredDescritpion, +enteredPeople];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      //const [title, desc, people] = userInput;
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
