const angleInput = document.querySelector('[data-input="range"]')
const thicknessInput = document.querySelector('[data-input="thickness"]')
const widthInput = document.querySelector('[data-input="width"]')
const colorInput = document.querySelector('[data-input="color1"]')
const contrastInput = document.querySelector('[data-input="contrast"]')
const outputContainer = document.querySelector('[data-output]')
const bg = document.querySelector('[data-bg]')
const inputs = [...document.querySelectorAll('[data-input]')]

const angleChange = (target) => {
	const newAngle = `${target.value}deg`
	setItem('--angle', newAngle, 'angle', target.value)
}

const thicknessChange = (target) => {
	const newThickness = `${target.value}px`
	setItem('--t', newThickness, 'thickness', target.value)
}

const setItem = (cssVar, newValue, property, unitlessValue) => {
	bg.style.setProperty(cssVar, newValue)
	getCSSOutput()
	localStorage.setItem(property, unitlessValue)
}

const widthChange = (target) => {
	const newWidth = `${target.value}px`
	setItem('--w', newWidth, 'width', target.value)
}

const colorChange = (target) => {
	const newColor = `${target.value}deg`
	setItem('--h1', newColor, 'color', target.value)
}

const setContrast = (contrast) => {
	const newL = `${contrast}%`
	const newD = `${100 - contrast}%`
	bg.style.setProperty('--l', newL)
	bg.style.setProperty('--d', newD)
}

const contrastChange = (target) => {
	setContrast(target.value)
	getCSSOutput()
	localStorage.setItem('contrast', target.value)
}

const getCSSOutput = () => {
	const backgroundImage = getComputedStyle(bg, '::after').backgroundImage
	const backgroundSize = getComputedStyle(bg, '::after').backgroundSize
	const width = getComputedStyle(bg, '::after').width
	const mask = getComputedStyle(bg, '::after').webkitMaskSize
	const cssOutput = `
<pre>
.bg {
  position:relative;
  overflow:hidden;
}
.bg::before,
.bg::after {
  content: '';
  position: absolute;
  inset:0;
  width:${width};
  background-image: ${backgroundImage};
  background-size: ${backgroundSize};
}

.bg::after {
  transform:scaleX(-1);
  -webkit-mask: linear-gradient(90deg,#000 50%, #0000 0) 0/${mask};
          mask: linear-gradient(90deg,#000 50%, #0000 0) 0/${mask};
}
</pre>`
	
	outputContainer.innerHTML = cssOutput
}

const setStyle = (input, property, unitlessValue, value) => {
	if (unitlessValue) {
		input.value = unitlessValue
		bg.style.setProperty(property, value)
	}
}

const getInitialStateFromLocalStorage = () => {
	const angle = localStorage.getItem('angle')
	const thickness = localStorage.getItem('thickness')
	const width = localStorage.getItem('width')
	const color = localStorage.getItem('color')
	const contrast = localStorage.getItem('contrast')
	
	setStyle(angleInput, '--angle', angle, `${angle}deg`)
	setStyle(thicknessInput, '--t', thickness,  `${thickness}px`)
	setStyle(widthInput, '--w', width, `${width}px`)
	setStyle(colorInput, '--h1', color, `${color}deg`)
	
	if (contrast) {
		setContrast(contrast)
		contrastInput.value = contrast
	}
}

getInitialStateFromLocalStorage()
getCSSOutput()

let activeInput

const handleMouseDown = (e) => {
	activeInput = e.target
}

const updateValues = (target) => {
	const { id } = target
	
	if (id === 'angle') {
		angleChange(target)
	}
	
	if (id === 'thickness') {
		thicknessChange(target)
	}
	
	if (id === 'color1') {
		colorChange(target)
	}
	
	if (id === 'width') {
		widthChange(target)
	}
	
	if (id === 'contrast') {
		contrastChange(target)
	}
}

const handleMouseMove = (e) => {
	if (activeInput === e.target) {
		updateValues(e.target)
	}
}

const handleChange = (e) => {
	updateValues(e.target)
}

inputs.forEach(el => {
	el.addEventListener('change', handleChange)
	el.addEventListener('mousedown', handleMouseDown)
	el.addEventListener('mousemove', _.throttle(handleMouseMove, 100))
	updateValues(el)
})

CSS.registerProperty({
  name: '--angle',
  syntax: '<angle>',
  inherits: true,
  initialValue: `${angleInput.value}deg`,
})

CSS.registerProperty({
  name: '--t',
  syntax: '<length>',
  inherits: true,
  initialValue: `${thicknessInput.value}px`,
})

CSS.registerProperty({
  name: '--w',
  syntax: '<length>',
  inherits: true,
  initialValue: `${widthInput.value}px`,
})