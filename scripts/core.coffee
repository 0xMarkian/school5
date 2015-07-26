HTMLElement::addEventListener = (event,handler) ->
	EventTarget::addEventListener.call(this, event, handler)
	this