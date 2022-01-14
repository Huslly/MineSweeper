
const e = function(selector) {
	let element = document.querySelector(selector)
	if (element === null) {
		let s = `元素没找到, 选择器 ${selector} 错误`
		alert(s)
		return null
	} else {
		return element
	}
}
// es 返回一个数组，包含所有被选中的元素
const es = function(selector) {
	let elements = document.querySelectorAll(selector)
	if (elements.length === 0) {
		let s = `元素没找到, 选择器 ${selector} 错误`
		alert(s)
		return []
	} else {
		return elements
	}
}

// bindAll 给所有的元素绑定事件
const bindAll = function(elements, eventName, callback) {
	for (let i = 0; i < elements.length; i++) {
		let tag = elements[i]
		tag.addEventListener(eventName, callback)
	}
}

// line 是每一行的数组
// x 表示第几行
const CreateCell = (line, x) => {
	let s = ''
	for (let i = 0; i < line.length; i++){
		let c = line[i]
		s += `<div class="cell" data-number=${c} data-x=${x} data-y=${i}>${c}</div>`
	}
	return s
}

// square 是二维数组
// 表示雷相关的数据
// 返回 square.length 个 row 拼接的字符串
const CreateRow = (square) => {
	let s = ''
	for (let i = 0; i < square.length; i++){
		let c = square[i]
		s += `<div class="row-clearfix">${CreateCell(c, i)}</div>`
	}
	return s
}

// 生成 9 * 9 的格子, 然后插入到页面中
const CreateMine = (square)=> {
	let div = e('#id-div-mime')
	div.innerHTML += CreateRow(square)
}


// 绑定 click 事件
const bindEventDelegate = (square) => {
	let Delegates = es('.cell')
	for (const Delegate of Delegates) {
		Delegate.addEventListener('click', function () {
			cli(Delegate, square)
		})
	}
}


// cli 是点击格子后执行的函数
// 点击之后class增加opened
const cli = (Delegate, square) => {
	// console.log(Delegate.classList)
	if (!Delegate.classList.contains("opened")){
		// Delegate.classList.add("opened")
		//数字为9，结束游戏
		if (Delegate.getAttribute("data-number") == 9){
			alert("game-over")
		} else if (Delegate.getAttribute("data-number") == 0){
			//数字为0，展开
			let x = Delegate.getAttribute("data-x")
			let y = Delegate.getAttribute("data-y")
			cliAround(square, parseInt(x), parseInt(y))
		} else {
			Delegate.classList.add("opened")
		}
	}
}


// cliAround 展开周围 cell 周围 8 个元素
// x 和 y 分别是下标
// 展开周围的元素通过调用 vjkl1 来解决
const cliAround = (square, x, y) => {
		cli1(square,x - 1, y - 1)
		cli1(square,x - 1, y)
		cli1(square,x - 1, y + 1)

		cli1(square, x, y - 1)
		cli1(square, x, y + 1)

		cli1(square,x + 1, y - 1)
		cli1(square, x + 1, y)
		cli1(square, x + 1, y + 1)
}

// 展开格子, 所以如果已经展开过, 那么就不展开元素
// x, y为坐标
const cli1 = (square, x, y) => {
	let len = square.length
	if (0 <= x && x < len && 0 <= y && y < len) {
		let a = `[data-x="${x}"][data-y="${y}"]`
		let index = e(a)
		let number = index.dataset.number
		if (!index.classList.contains('opened')) {
			if (number === '0') {
				index.classList.add('opened')
				cliAround(square, x, y)
			} else if (number !== '9') {
				console.log(1)
				index.classList.add('opened')
			}
		}
	}
}


const __main = () => {
	let s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'
	let square = JSON.parse(s)

	// 显示雷
	CreateMine(square)
	// 展开雷
	bindEventDelegate(square)

}
__main()

