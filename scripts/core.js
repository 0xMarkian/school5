(function() {
  HTMLElement.prototype.addEventListener = function(event, handler) {
    EventTarget.prototype.addEventListener.call(this, event, handler);
    return this;
  };

}).call(this);

