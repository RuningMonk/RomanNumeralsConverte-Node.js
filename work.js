'use strict';
const inquirer = require('inquirer');

//获取参数
const questions = [
	{
		type: "input",
		name: "Roman",
		message: "请输入需转换的罗马数字(ctrl + C结束程序)",
		validate: function(value) {
			if(value.length > 0) {
				let pass = value.match(
					/(-| +|^)M{0,9}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})( +|$)/
				);
				if(pass) {
					return true
				} else {
					return "请输入正确的罗马数字"
				}
			} else {
				return "输入不能为空"
			}
		}
	},
	{
		type: "list",
		name: "size",
		message: "请选择显示规格",
		choices: ['set size 1','set size 2']
	}
]

//返回结果,并再次调用方法
loop()

//设置递归,避免因多次异步调用导致的错误
function loop(){
	inquirer.prompt(questions).then(answers => {
		//获取参数
		let Roman = answers.Roman;
		let size = answers.size == "set size 1"?1:2;
		//阿拉伯数字
		let num = Transform(Roman)
		console.log(num);
		//打印
		Print(num,size)
		loop()
	})
}

//罗马数字-阿拉伯数字的转换
function Transform(Roman) {
	//初始化结果
	let num = 0;
	//遍历-转换
	for(let i = 0; i < Roman.length; i++) {
		switch(Roman[i]) {
			case 'M':
				num += 1000;
				break;
			case 'D':
				num += 500;
				break;
			case 'C':
				if(Roman[i + 1] == 'D' || Roman[i + 1] == 'M') {
					num -= 100;
				} else {
					num += 100;
				}
				break;
			case 'L':
				num += 50;
				break;
			case 'X':
				if(Roman[i + 1] == 'L' || Roman[i + 1] == 'C') {
					num -= 10;
				} else {
					num += 10;
				}
				break;
			case 'V':
				num += 5;
				break;
			case 'I':
				if(Roman[i + 1]) {
					if(Roman[i + 1] == 'V' || Roman[i + 1] == 'X') {
						num -= 1;
					} else {
						num += 1;
					}
				} else {
					num += 1;
				}
				break;
		}
	};
	//返回结果
	return num
}

//打印
function Print(num,size){
	//转成字符串
	let num_str = num.toString();
	let width = 0;
	let height = 0;
	let map = new Array();
	//设置map的宽高
	if(size == 1){
		width = num_str.length * 3 + 3;
		height = 5;
		//创建二维数组map,默认值为' '
		for(let i = 0;i < height;i++){
			map[i] = new Array();
			for(let j = 0;j < width;j++){
				map[i][j] = ' ';
			}
		}
		//声明当前修改进度统计
		let nowY = 0;//x轴
		//修改map内容
		for(let i = 0;i < num_str.length;i++){
			switch(num_str[i]){
				case '0':
					map[1][nowY] = '|';
					map[3][nowY] = '|';
					map[0][nowY+1] = '-';
					map[4][nowY+1] = '-';
					map[1][nowY+2] = '|';
					map[3][nowY+2] = '|';
					nowY += 3;
					break;
				case '1':
					map[1][nowY+2] = '|';
					map[3][nowY+2] = '|';
					nowY += 3;
					break;
				case '2':
					map[3][nowY] = '|';
					map[0][nowY+1] = '-';
					map[2][nowY+1] = '-';
					map[4][nowY+1] = '-';
					map[1][nowY+2] = '|';
					nowY += 3;
					break;
				case '3':
					map[0][nowY+1] = '-';
					map[2][nowY+1] = '-';
					map[4][nowY+1] = '-';
					map[1][nowY+2] = '|';
					map[3][nowY+2] = '|';
					nowY += 3;
					break;
				case '4':
					map[1][nowY] = '|';
					map[2][nowY+1] = '-';
					map[1][nowY+2] = '|';
					map[3][nowY+2] = '|';
					nowY += 3;
					break;
				case '5':
					map[1][nowY] = '|';
					map[0][nowY+1] = '-';
					map[2][nowY+1] = '-';
					map[4][nowY+1] = '-';
					map[3][nowY+2] = '|';
					nowY += 3;
					break;
				case '6':
					map[1][nowY] = '|';
					map[3][nowY] = '|';
					map[0][nowY+1] = '-';
					map[2][nowY+1] = '-';
					map[4][nowY+1] = '-';
					map[3][nowY+2] = '|';
					nowY += 3;
					break;
				case '7':
					map[0][nowY+1] = '-';
					map[1][nowY+2] = '|';
					map[3][nowY+2] = '|';
					nowY += 3;
					break;
				case '8':
					map[1][nowY] = '|';
					map[3][nowY] = '|';
					map[0][nowY+1] = '-';
					map[2][nowY+1] = '-';
					map[4][nowY+1] = '-';
					map[1][nowY+2] = '|';
					map[3][nowY+2] = '|';
					nowY += 3;
					break;
				case '9':
					map[1][nowY] = '|';
					map[0][nowY+1] = '-';
					map[2][nowY+1] = '-';
					map[4][nowY+1] = '-';
					map[1][nowY+2] = '|';
					map[3][nowY+2] = '|';
					nowY += 3;
					break;
				case 'E':
					map[1][nowY] = '|';
					map[3][nowY] = '|';
					map[0][nowY+1] = '-';
					map[2][nowY+1] = '-';
					map[4][nowY+1] = '-';
					nowY += 3;
					break;
			}
		}
	}else if(size == 2){
		width = num_str.length * 4;
		height = 7;
		//创建二维数组map,默认值为' '
		for(let i = 0;i < height;i++){
			map[i] = new Array();
			for(let j = 0;j < width;j++){
				map[i][j] = ' ';
			}
		}
		//声明当前修改进度统计
		let nowY = 0;//x轴
		//修改map内容
		for(let i = 0;i < num_str.length;i++){
			switch(num_str[i]){
				case '0':
					map[1][nowY] = '|';
					map[2][nowY] = '|';
					map[4][nowY] = '|';
					map[5][nowY] = '|';
					map[0][nowY+1] = '-';
					map[6][nowY+1] = '-';
					map[0][nowY+2] = '-';
					map[6][nowY+2] = '-';
					map[1][nowY+3] = '|';
					map[2][nowY+3] = '|';
					map[4][nowY+3] = '|';
					map[5][nowY+3] = '|';
					nowY += 4;
					break;
				case '1':
					map[1][nowY+3] = '|';
					map[2][nowY+3] = '|';
					map[4][nowY+3] = '|';
					map[5][nowY+3] = '|';
					nowY += 4;
					break;
				case '2':
					map[4][nowY] = '|';
					map[5][nowY] = '|';
					map[0][nowY+1] = '-';
					map[3][nowY+1] = '-';
					map[6][nowY+1] = '-';
					map[0][nowY+2] = '-';
					map[3][nowY+2] = '-';
					map[6][nowY+2] = '-';
					map[1][nowY+3] = '|';
					map[2][nowY+3] = '|';
					nowY += 4;
					break;
				case '3':
					map[0][nowY+1] = '-';
					map[3][nowY+1] = '-';
					map[6][nowY+1] = '-';
					map[0][nowY+2] = '-';
					map[3][nowY+2] = '-';
					map[6][nowY+2] = '-';
					map[1][nowY+3] = '|';
					map[2][nowY+3] = '|';
					map[4][nowY+3] = '|';
					map[5][nowY+3] = '|';
					nowY += 4;
					break;
				case '4':
					map[1][nowY] = '|';
					map[2][nowY] = '|';
					map[3][nowY+1] = '-';
					map[3][nowY+1] = '-';
					map[1][nowY+3] = '|';
					map[2][nowY+3] = '|';
					map[4][nowY+3] = '|';
					map[5][nowY+3] = '|';
					nowY += 4;
					break;
				case '5':
					map[1][nowY] = '|';
					map[2][nowY] = '|';
					map[0][nowY+1] = '-';
					map[3][nowY+1] = '-';
					map[6][nowY+1] = '-';
					map[0][nowY+2] = '-';
					map[3][nowY+2] = '-';
					map[6][nowY+2] = '-';
					map[4][nowY+3] = '|';
					map[5][nowY+3] = '|';
					nowY += 4;
					break;
				case '6':
					map[1][nowY] = '|';
					map[2][nowY] = '|';
					map[4][nowY] = '|';
					map[5][nowY] = '|';
					map[0][nowY+1] = '-';
					map[3][nowY+1] = '-';
					map[6][nowY+1] = '-';
					map[0][nowY+2] = '-';
					map[3][nowY+2] = '-';
					map[6][nowY+2] = '-';
					map[4][nowY+3] = '|';
					map[5][nowY+3] = '|';
					nowY += 4;
					break;
				case '7':
					map[0][nowY+1] = '-';
					map[0][nowY+2] = '-';
					map[1][nowY+3] = '|';
					map[2][nowY+3] = '|';
					map[4][nowY+3] = '|';
					map[5][nowY+3] = '|';
					nowY += 4;
					break;
				case '8':
					map[1][nowY] = '|';
					map[2][nowY] = '|';
					map[4][nowY] = '|';
					map[5][nowY] = '|';
					map[0][nowY+1] = '-';
					map[3][nowY+1] = '-';
					map[6][nowY+1] = '-';
					map[0][nowY+2] = '-';
					map[3][nowY+2] = '-';
					map[6][nowY+2] = '-';
					map[1][nowY+3] = '|';
					map[2][nowY+3] = '|';
					map[4][nowY+3] = '|';
					map[5][nowY+3] = '|';
					nowY += 4;
					break;
				case '9':
					map[1][nowY] = '|';
					map[2][nowY] = '|';
					map[0][nowY+1] = '-';
					map[3][nowY+1] = '-';
					map[6][nowY+1] = '-';
					map[0][nowY+2] = '-';
					map[3][nowY+2] = '-';
					map[6][nowY+2] = '-';
					map[1][nowY+3] = '|';
					map[2][nowY+3] = '|';
					map[4][nowY+3] = '|';
					map[5][nowY+3] = '|';
					nowY += 4;
					break;
				case 'E':
					map[1][nowY] = '|';
					map[2][nowY] = '|';
					map[4][nowY] = '|';
					map[5][nowY] = '|';
					map[0][nowY+1] = '-';
					map[3][nowY+1] = '-';
					map[6][nowY+1] = '-';
					map[0][nowY+2] = '-';
					map[3][nowY+2] = '-';
					map[6][nowY+2] = '-';
					nowY += 4;
					break;
			}
		}
	}
	
	
	//打印map
	let show = "";
	for(let i = 0;i < height;i++){
		for(let j = 0;j < width;j++){
			show += map[i][j];
		}
		show += '\n'
	}
	console.log(show);
}

