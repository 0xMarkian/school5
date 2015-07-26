do ()-> 
	getOffset = (el) ->
		el.getBoundingClientRect();

	makeSlider = (maxStep = 10, activeArea = 300, cache = true) ->
		sliderWrap = this
		sliderWrapOffset = getOffset(this)
		sliderBody = sliderWrap.children[0]
		sliderMoveInterval = null
		curSliderBodyLeft = null

		#sliderOutArea -  width of area out of slider wrap, return negative value as sliderBody has bigger with that sliderWrap
		sliderOutArea = sliderWrap.clientWidth - sliderBody.clientWidth

		sliderMove = (e) ->
			e ||= window.event
			sliderRelativeClientX = e.clientX - sliderWrapOffset.left
			curSliderBodyLeft = if cache 
				curSliderBodyLeft || parseInt sliderBody.style.left || getComputedStyle(sliderBody).left 
			else parseInt sliderBody.style.left || getComputedStyle(sliderBody).left
				

			clearInterval(sliderMoveInterval)
			if sliderRelativeClientX < activeArea 
				#condition for left slider side, slider move's in left side so left will be bigger
				step = ((activeArea-sliderRelativeClientX)/activeArea) * maxStep
				destination = '+'

				#set allowing rage for slider moving
				minLeft = sliderOutArea
				maxLeft = -step 
			else if sliderRelativeClientX > sliderWrapOffset.right - activeArea
				#condition for right slider side, slider move's in right side so left will be smaller
				step = ((activeArea - 
					(sliderWrapOffset.right - sliderRelativeClientX)
					)/activeArea) * maxStep
				destination = '-';

				#set allowing rage for slider moving
				minLeft = sliderOutArea+step
				maxLeft = 0
			else
				sliderStop(e, false)
				return
			sliderMoveInterval = setInterval ->
				if minLeft <= curSliderBodyLeft <= maxLeft
					curSliderBodyLeft = if destination == '+' then curSliderBodyLeft+=step else curSliderBodyLeft-=step
					sliderBody.style.left = "#{curSliderBodyLeft}px"
				else
					clearInterval sliderMoveInterval
			,1
		sliderStop = (e,mouseout) ->
			e ||= window.event
			clearInterval(sliderMoveInterval) if(not mouseout or 
				(mouseout and (e.clientX < sliderWrapOffset.left || e.clientY < sliderWrapOffset.top || e.clientX > sliderWrapOffset.right || e.clientY > sliderWrapOffset.bottom)))	
		sliderWrap
			.addEventListener 'mousemove', (e)->
				sliderMove e
			.addEventListener 'mouseout', (e)->
				sliderStop e, true
	HTMLElement::makeSlider = makeSlider


