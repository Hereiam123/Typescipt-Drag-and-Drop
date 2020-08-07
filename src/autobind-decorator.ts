namespace App {
  //Custom autobind decorator
  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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
}
