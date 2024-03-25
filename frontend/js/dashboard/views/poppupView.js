import View from './view';
export class PoppupView extends View {
  _window;
  _overlay;
  _btnOpen;
  _btnClose;
  _parentElement;
  selector(singleClass) {
    return document.querySelector(singleClass);
  }
  multiSelector(multiClass) {
    return document.querySelectorAll(multiClass);
  }
  reselector(isSingularOp, opennerClass, closerClass) {
    if (isSingularOp) {
      Array.from(document.querySelectorAll(opennerClass)).forEach(el => {
        el.addEventListenner();
      });
    }
  }
}
export default new PoppupView();
