const exerciseGroups = {
	basic: [
		{ id: "addsub2", title: "两位数加减", desc: "两位整数随机加减，10 题全对后按用时评级。", count: 10, generator: twoDigitAddSub, timeLevels: grade(28, 22, 18) },
		{ id: "add3", title: "三位数加法", desc: "三位整数相加，10 题全对后按用时评级。", count: 10, generator: () => arithmetic(100, 999, 100, 999, "+"), timeLevels: grade(38, 30, 24) },
		{ id: "sub3", title: "三位数减法", desc: "三位整数相减，10 题全对后按用时评级。", count: 10, generator: () => arithmetic(100, 999, 100, 999, "-"), timeLevels: grade(38, 30, 24) },
		{ id: "addsub3", title: "三位数加减", desc: "三位整数随机加减，10 题全对后按用时评级。", count: 10, generator: threeDigitAddSub, timeLevels: grade(40, 32, 26) },
		{ id: "sumMany", title: "多数相加", desc: "多个两位数连续相加，10 题全对后按用时评级。", count: 10, generator: multiSum, timeLevels: grade(90, 75, 60) },
		{ id: "mixedAddSub", title: "混合加减", desc: "两位到四位数随机加减，10 题全对后按用时评级。", count: 10, generator: mixedAddSub, timeLevels: grade(42, 34, 28) },
		{ id: "mul21", title: "两位数乘一位数", desc: "两位数乘一位数，10 题全对后按用时评级。", count: 10, generator: () => arithmetic(10, 99, 2, 9, "×"), timeLevels: grade(38, 30, 24) },
		{ id: "mul31", title: "三位数乘一位", desc: "三位数乘一位数，10 题全对后按用时评级。", count: 10, generator: () => arithmetic(100, 999, 2, 9, "×"), timeLevels: grade(60, 50, 40) },
		{ id: "mul11", title: "两位数乘11", desc: "两位数乘 11，10 题全对后按用时评级。", count: 10, generator: () => multiplyByFixed(11), timeLevels: grade(38, 30, 24) },
		{ id: "mul15", title: "两位数乘15", desc: "两位数乘 15，10 题全对后按用时评级。", count: 10, generator: () => multiplyByFixed(15), timeLevels: grade(38, 30, 24) },
		{ id: "mul22", title: "两位数乘两位数", desc: "两位数乘两位数，10 题全对后按用时评级。", count: 10, generator: () => arithmetic(10, 99, 10, 99, "×"), timeLevels: grade(90, 75, 60) },
		{ id: "div31", title: "三位数除一位数", desc: "三位数除一位数，题目保证整除，10 题全对后按用时评级。", count: 10, generator: division(100, 999, 2, 9), timeLevels: grade(38, 30, 24) },
		{ id: "div32", title: "三位数除两位数", desc: "三位数除两位数，题目保证整除，10 题全对后按用时评级。", count: 10, generator: division(100, 999, 10, 31), timeLevels: grade(90, 75, 60) },
		{ id: "mulEstimate", title: "乘法估算", desc: "三位数乘两位数估算，允许相对误差 ±5%，10 题全对后按用时评级。", count: 10, generator: multiplyEstimate, timeLevels: grade(48, 40, 32) },
		{ id: "div53", title: "五位数除三位数", desc: "五位数除三位数，题目保证整除，10 题全对后按用时评级。", count: 10, generator: division(10000, 99999, 100, 999), timeLevels: grade(90, 75, 60) },
		{ id: "div34", title: "三位数除四位数", desc: "三位数除四位数估算，允许相对误差 ±3%，10 题全对后按用时评级。", count: 10, generator: threeByFourDivision, timeLevels: grade(90, 75, 60) }
	],
	data: [
		{ id: "base", title: "估算前期量", desc: "现期为 4 位数，增长率保留 1 位小数且可为负，允许相对误差 ±3%。", count: 5, generator: basePeriod },
		{ id: "growth", title: "估算增长量", desc: "现期为 4 位数，增长率保留 1 位小数且可为负，允许相对误差 ±3%。", count: 5, generator: growthAmount },
		{ id: "percent", title: "百化分计算", desc: "计算 1 除以 20 以内的数对应百分比，允许相对误差 ±2%。", count: 5, generator: percentQuestion },
		{ id: "growthCompare", title: "增量比大小", desc: "现期为 3 位数，增长率保留 1 位小数且可为负，比较增量大小，输入 A 或 B。", count: 5, generator: growthCompare },
		{ id: "baseCompare", title: "基期比大小", desc: "现期为 3 位数，增长率保留 1 位小数且可为负，比较基期大小，输入 A 或 B。", count: 5, generator: baseCompare },
		{ id: "fractionUnder", title: "分数计算（分子＜分母）", desc: "三位数分子和三位数分母，分子小于分母，允许相对误差 ±2%。", count: 5, generator: fractionUnder },
		{ id: "fractionOver", title: "分数计算（分子＞分母）", desc: "三位数分子和三位数分母，分子大于分母，允许相对误差 ±2%。", count: 5, generator: fractionOver },
		{ id: "baseShare", title: "基期比重", desc: "给出现期 A、现期 B 及各自增长率，计算基期 A/B，允许相对误差 ±2%。", count: 5, generator: baseShare },
		{ id: "fractionCompare", title: "分数比大小", desc: "三位数分子和三位数分母，比较两个分数大小，输入 A 或 B。", count: 5, generator: fractionCompare }
	]
};

const GAME_PROGRESS_KEY = "xingceAssistantGameProgress";
const GAME_PROGRESS_VERSION = 3;

const gameStages = [
	{ id: "stage-1", number: 1, title: "口算营地", exerciseId: "addsub2", difficulty: "入门" },
	{ id: "stage-2", number: 2, title: "加法哨站", exerciseId: "add3", difficulty: "入门" },
	{ id: "stage-3", number: 3, title: "减法山路", exerciseId: "sub3", difficulty: "基础" },
	{ id: "stage-4", number: 4, title: "三位混合坡", exerciseId: "addsub3", difficulty: "基础" },
	{ id: "stage-5", number: 5, title: "混合运算场", exerciseId: "mixedAddSub", difficulty: "基础" },
	{ id: "stage-6", number: 6, title: "连算峡谷", exerciseId: "sumMany", difficulty: "基础" },
	{ id: "stage-7", number: 7, title: "乘法工坊", exerciseId: "mul21", difficulty: "进阶" },
	{ id: "stage-8", number: 8, title: "十一捷径", exerciseId: "mul11", difficulty: "进阶" },
	{ id: "stage-9", number: 9, title: "十五驿站", exerciseId: "mul15", difficulty: "进阶" },
	{ id: "stage-10", number: 10, title: "三位乘法塔", exerciseId: "mul31", difficulty: "进阶" },
	{ id: "stage-11", number: 11, title: "双位乘法阵", exerciseId: "mul22", difficulty: "挑战" },
	{ id: "stage-12", number: 12, title: "除法关隘", exerciseId: "div31", difficulty: "挑战" },
	{ id: "stage-13", number: 13, title: "双位除法门", exerciseId: "div32", difficulty: "挑战" },
	{ id: "stage-14", number: 14, title: "乘法估算台", exerciseId: "mulEstimate", difficulty: "挑战" },
	{ id: "stage-15", number: 15, title: "五位除法城", exerciseId: "div53", difficulty: "挑战" },
	{ id: "stage-16", number: 16, title: "小数估算桥", exerciseId: "div34", difficulty: "挑战" },
	{ id: "stage-17", number: 17, title: "百化分入口", exerciseId: "percent", difficulty: "资料" },
	{ id: "stage-18", number: 18, title: "基期侦察", exerciseId: "base", difficulty: "资料" },
	{ id: "stage-19", number: 19, title: "增量前线", exerciseId: "growth", difficulty: "资料" },
	{ id: "stage-20", number: 20, title: "增量比较站", exerciseId: "growthCompare", difficulty: "资料" },
	{ id: "stage-21", number: 21, title: "基期比较所", exerciseId: "baseCompare", difficulty: "资料" },
	{ id: "stage-22", number: 22, title: "小分数堡垒", exerciseId: "fractionUnder", difficulty: "资料" },
	{ id: "stage-23", number: 23, title: "大分数堡垒", exerciseId: "fractionOver", difficulty: "资料" },
	{ id: "stage-24", number: 24, title: "分数竞技场", exerciseId: "fractionCompare", difficulty: "资料" },
	{ id: "stage-25", number: 25, title: "比重指挥部", exerciseId: "baseShare", difficulty: "资料" },
	{ id: "stage-26", number: 26, title: "综合试炼", count: 10, passAccuracy: 100, passSeconds: 90, goodSeconds: 75, excellentSeconds: 60, difficulty: "终局", generator: gameMixedQuestion }
];
