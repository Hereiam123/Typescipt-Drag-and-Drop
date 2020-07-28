class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

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
    this.attach();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
