# підтерти mouseout на деякий час після mouseover + якось забрати 100500 викликів функції

do () ->
	methodBlock = document.querySelector('#teach .block-area')

	identifyNeededEl = (e,parentBlock)->
		curElement = e.target #curElement - currentElement
		neededElement = null		
		while not neededElement and curElement isnt parentBlock
			className = curElement.className.split(' ')[0]
			if className == 'teach-circle'
				return neededElement = curElement
			else
				curElement = curElement.parentNode
		return false

	methodBlockMouseOut = (e) ->
		neededElement = identifyNeededEl(e,this)
		methodBlockTransformBack.call(neededElement,'teach-circleHover') if neededElement


	methodBlockTransform = (hoverClass) ->
		this.removeEventListener('mouseout', methodBlockMouseOut)
		methodBlockTransform.initTimeout = setTimeout =>
			this.classList.add(hoverClass)
		,300

	methodBlockTransformBack = (hoverClass) ->
		clearTimeout(methodBlockTransform.initTimeout)
		this.classList.remove(hoverClass)
	methodBlock
		.addEventListener('mouseover', (e) ->
			neededElement = identifyNeededEl(e,this)

			methodBlockTransform.call(neededElement,'teach-circleHover') if neededElement

		)
		.addEventListener('mouseout', methodBlockMouseOut)

