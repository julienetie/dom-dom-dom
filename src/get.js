export default function() {
  if (arguments.length === 1) {
    return this.element.getAttribute(arguments[0]);
  }

  return this;
}
