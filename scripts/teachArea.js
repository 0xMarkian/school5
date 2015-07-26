(function() {
  (function() {
    var identifyNeededEl, methodBlock, methodBlockMouseOut, methodBlockTransform, methodBlockTransformBack;
    methodBlock = document.querySelector('#teach .block-area');
    identifyNeededEl = function(e, parentBlock) {
      var className, curElement, neededElement;
      curElement = e.target;
      neededElement = null;
      while (!neededElement && curElement !== parentBlock) {
        className = curElement.className.split(' ')[0];
        if (className === 'teach-circle') {
          return neededElement = curElement;
        } else {
          curElement = curElement.parentNode;
        }
      }
      return false;
    };
    methodBlockMouseOut = function(e) {
      var neededElement;
      neededElement = identifyNeededEl(e, this);
      if (neededElement) {
        return methodBlockTransformBack.call(neededElement, 'teach-circleHover');
      }
    };
    methodBlockTransform = function(hoverClass) {
      this.removeEventListener('mouseout', methodBlockMouseOut);
      return methodBlockTransform.initTimeout = setTimeout((function(_this) {
        return function() {
          return _this.classList.add(hoverClass);
        };
      })(this), 300);
    };
    methodBlockTransformBack = function(hoverClass) {
      clearTimeout(methodBlockTransform.initTimeout);
      return this.classList.remove(hoverClass);
    };
    return methodBlock.addEventListener('mouseover', function(e) {
      var neededElement;
      neededElement = identifyNeededEl(e, this);
      if (neededElement) {
        return methodBlockTransform.call(neededElement, 'teach-circleHover');
      }
    }).addEventListener('mouseout', methodBlockMouseOut);
  })();

}).call(this);

