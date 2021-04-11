const loggerDecorator = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
  let localDescriptor = descriptor;

  if (descriptor === undefined) {
    localDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
  }

  if (process.env.NODE_ENV !== 'development') {
    localDescriptor.value = () => null;
  }
  return localDescriptor;
};

export default class Logger {
  readonly name!: string;

  readonly color!: string;

  collection: unknown;

  cc: Console;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
    this.collection = {};
    this.cc = console;
  }

  @loggerDecorator
  watch(type: string, event: string, ...args: any) {
    if (!this.collection[event]) {
      this.collection[event] = args;
    } else {
      this.cc.groupCollapsed(`🎲 ${type} %c${this.name}`, `color: ${this.color}`, event);
      this.cc.log('◀️️', ...this.collection[event]);
      this.cc.log('▶️', ...args);
      this.cc.groupEnd();
      delete this.collection[event];
    }
  }

  @loggerDecorator
  event(type: string, event: string, ...arg: any) {
    this.cc.log(`✅ ${type} %c${this.name}`, `color: ${this.color}`, event, ...arg);
  }

  @loggerDecorator
  error(type: string, event: string, ...arg: any) {
    this.cc.log(`❌ ${type} %c${this.name}`, `color: red`, event, ...arg);
  }
}
