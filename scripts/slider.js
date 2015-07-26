(function() {
  (function() {
    var getOffset, makeSlider;
    getOffset = function(el) {
      return el.getBoundingClientRect();
    };
    makeSlider = function(maxStep, activeArea, cache) {
      var curSliderBodyLeft, sliderBody, sliderMove, sliderMoveInterval, sliderOutArea, sliderStop, sliderWrap, sliderWrapOffset;
      if (maxStep == null) {
        maxStep = 10;
      }
      if (activeArea == null) {
        activeArea = 300;
      }
      if (cache == null) {
        cache = true;
      }
      sliderWrap = this;
      sliderWrapOffset = getOffset(this);
      sliderBody = sliderWrap.children[0];
      sliderMoveInterval = null;
      curSliderBodyLeft = null;
      sliderOutArea = sliderWrap.clientWidth - sliderBody.clientWidth;
      sliderMove = function(e) {
        var destination, maxLeft, minLeft, sliderRelativeClientX, step;
        e || (e = window.event);
        sliderRelativeClientX = e.clientX - sliderWrapOffset.left;
        curSliderBodyLeft = cache ? curSliderBodyLeft || parseInt(sliderBody.style.left || getComputedStyle(sliderBody).left) : parseInt(sliderBody.style.left || getComputedStyle(sliderBody).left);
        clearInterval(sliderMoveInterval);
        if (sliderRelativeClientX < activeArea) {
          step = ((activeArea - sliderRelativeClientX) / activeArea) * maxStep;
          destination = '+';
          minLeft = sliderOutArea;
          maxLeft = -step;
        } else if (sliderRelativeClientX > sliderWrapOffset.right - activeArea) {
          step = ((activeArea - (sliderWrapOffset.right - sliderRelativeClientX)) / activeArea) * maxStep;
          destination = '-';
          minLeft = sliderOutArea + step;
          maxLeft = 0;
        } else {
          sliderStop(e, false);
          return;
        }
        return sliderMoveInterval = setInterval(function() {
          if ((minLeft <= curSliderBodyLeft && curSliderBodyLeft <= maxLeft)) {
            curSliderBodyLeft = destination === '+' ? curSliderBodyLeft += step : curSliderBodyLeft -= step;
            return sliderBody.style.left = curSliderBodyLeft + "px";
          } else {
            return clearInterval(sliderMoveInterval);
          }
        }, 1);
      };
      sliderStop = function(e, mouseout) {
        e || (e = window.event);
        if (!mouseout || (mouseout && (e.clientX < sliderWrapOffset.left || e.clientY < sliderWrapOffset.top || e.clientX > sliderWrapOffset.right || e.clientY > sliderWrapOffset.bottom))) {
          return clearInterval(sliderMoveInterval);
        }
      };
      return sliderWrap.addEventListener('mousemove', function(e) {
        return sliderMove(e);
      }).addEventListener('mouseout', function(e) {
        return sliderStop(e, true);
      });
    };
    return HTMLElement.prototype.makeSlider = makeSlider;
  })();

}).call(this);

