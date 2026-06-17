function gameMixedQuestion(index = 0) {
	const generators = [
		threeDigitAddSub,
		() => arithmetic(10, 99, 2, 9, "×"),
		division(100, 999, 2, 9),
		percentQuestion,
		baseCompare,
		growthAmount,
		fractionCompare,
		mixedAddSub
	];
	return generators[index % generators.length]();
}

function arithmetic(aMin, aMax, bMin, bMax, op) {
	let a = rand(aMin, aMax);
	let b = rand(bMin, bMax);

	const answer = op === "+"
		? a + b
		: op === "-"
			? a - b
			: a * b;

	return {
		prompt: `${a} ${op} ${b} =`,
		answer,
		tolerance: 0
	};
}

function grade(pass, good, excellent) {
	return [
		{ label: "优秀", seconds: excellent },
		{ label: "良好", seconds: good },
		{ label: "合格", seconds: pass }
	];
}

function twoDigitAddSub() {
	const op = Math.random() < 0.5 ? "+" : "-";
	return arithmetic(10, 99, 10, 99, op);
}

function threeDigitAddSub() {
	const op = Math.random() < 0.5 ? "+" : "-";
	return arithmetic(100, 999, 100, 999, op);
}

function mixedAddSub() {
	const op = Math.random() < 0.5 ? "+" : "-";
	const aDigits = rand(2, 4);
	const bDigits = rand(2, 4);
	return arithmetic(minByDigits(aDigits), maxByDigits(aDigits), minByDigits(bDigits), maxByDigits(bDigits), op);
}

function multiplyByFixed(factor) {
	const a = rand(10, 99);
	return {
		prompt: `${a} × ${factor} =`,
		answer: a * factor,
		tolerance: 0
	};
}

function multiplyEstimate() {
	const a = rand(100, 999);
	const b = rand(10, 99);
	const answer = a * b;
	return {
		prompt: `${a} × ${b} ≈`,
		answer,
		tolerance: { type: "relative", percent: 5 },
		explain: "本题允许相对误差 ±5%。"
	};
}

function threeByFourDivision() {
	const a = rand(100, 999);
	const b = rand(1000, 9999);
	const answer = round2(a / b);
	return {
		prompt: `${a} ÷ ${b} ≈`,
		answer,
		displayAnswer: answer.toFixed(2),
		tolerance: { type: "relative", percent: 3 },
		explain: "本题允许相对误差 ±3%。"
	};
}

function division(aMin, aMax, bMin, bMax) {
	return () => {
		const b = rand(bMin, bMax);
		const qMin = Math.max(2, Math.ceil(aMin / b));
		const qMax = Math.max(qMin, Math.floor(aMax / b));
		const q = rand(qMin, qMax);
		const a = b * q;
		return {
			prompt: `${a} ÷ ${b} =`,
			answer: q,
			tolerance: 0
		};
	};
}

function multiSum() {
	const nums = Array.from({ length: 4 }, () => rand(12, 98));
	return {
		prompt: `${nums.join(" + ")} =`,
		answer: nums.reduce((sum, item) => sum + item, 0),
		tolerance: 0
	};
}

function squareQuestion() {
	const n = rand(11, 40);
	return {
		prompt: `${n}² =`,
		answer: n * n,
		tolerance: 0
	};
}

function basePeriod() {
	const current = rand(1000, 9999);
	const rate = dataRate();
	const answer = round2(current / (1 + rate / 100));
	return {
		prompt: `现期${current}，增长率${rate.toFixed(1)}%，前期量≈`,
		answer,
		displayAnswer: answer.toFixed(2),
		tolerance: { type: "relative", percent: 3 },
		explain: "公式：前期量 = 现期 ÷ (1 + 增长率)。本题允许相对误差 ±3%。"
	};
}

function growthAmount() {
	const current = rand(1000, 9999);
	const rate = dataRate();
	const answer = round2(current * rate / (100 + rate));
	return {
		prompt: `现期${current}，增长率${rate.toFixed(1)}%，增长量≈`,
		answer,
		displayAnswer: answer.toFixed(2),
		tolerance: { type: "relative", percent: 3 },
		explain: "公式：增长量 = 现期 × 增长率 ÷ (1 + 增长率)。本题允许相对误差 ±3%。"
	};
}

function percentQuestion() {
	const divisor = rand(1, 20);
	const answer = percentAnswer(1 / divisor);
	return {
		prompt: `1 ÷ ${divisor} 的百分比≈`,
		answer,
		displayAnswer: `${answer.toFixed(2)}%`,
		tolerance: { type: "relative", percent: 2 },
		explain: "公式：1 ÷ 分母 × 100%。本题允许相对误差 ±2%。"
	};
}

function growthCompare() {
	const optionA = growthOption();
	const optionB = growthOption();
	const valueA = optionA.current * optionA.rate / (100 + optionA.rate);
	const valueB = optionB.current * optionB.rate / (100 + optionB.rate);
	const answer = valueA >= valueB ? "A" : "B";
	return {
		prompt: `A:现期${optionA.current}, 增长率${optionA.rate.toFixed(1)}%  B:现期${optionB.current}, 增长率${optionB.rate.toFixed(1)}%，增量较大=`,
		answer,
		inputMode: "text",
		tolerance: 0,
		explain: "分别按 增量 = 现期 × 增长率 ÷ (1 + 增长率) 估算后比较。"
	};
}

function fractionCompare() {
	const a1 = rand(100, 999);
	const a2 = rand(100, 999);
	const b1 = rand(100, 999);
	const b2 = rand(100, 999);
	const answer = a1 / a2 >= b1 / b2 ? "A" : "B";
	return {
		prompt: `A:${a1}/${a2}  B:${b1}/${b2}，较大=`,
		answer,
		inputMode: "text",
		tolerance: 0,
		explain: "比较时可交叉相乘。"
	};
}

function baseCompare() {
	const optionA = growthOption();
	const optionB = growthOption();
	const valueA = optionA.current / (1 + optionA.rate / 100);
	const valueB = optionB.current / (1 + optionB.rate / 100);
	const answer = valueA >= valueB ? "A" : "B";
	return {
		prompt: `A:现期${optionA.current}, 增长率${optionA.rate.toFixed(1)}%  B:现期${optionB.current}, 增长率${optionB.rate.toFixed(1)}%，基期较大=`,
		answer,
		inputMode: "text",
		tolerance: 0,
		explain: "分别用 现期 ÷ (1 + 增长率) 估算。"
	};
}

function fractionUnder() {
	const denominator = rand(101, 999);
	const numerator = rand(100, denominator - 1);
	return fractionPercentQuestion(numerator, denominator);
}

function fractionOver() {
	const denominator = rand(100, 998);
	const numerator = rand(denominator + 1, 999);
	return fractionPercentQuestion(numerator, denominator);
}

function baseShare() {
	const currentA = rand(100, 999);
	const currentB = rand(100, 999);
	const rateA = dataRate();
	const rateB = dataRate();
	const baseA = currentA / (1 + rateA / 100);
	const baseB = currentB / (1 + rateB / 100);
	const answer = percentAnswer(baseA / baseB);
	return {
		prompt: `现期A:${currentA}, A增长率${rateA.toFixed(1)}%；现期B:${currentB}, B增长率${rateB.toFixed(1)}%，基期A/B百分比≈`,
		answer,
		displayAnswer: `${answer.toFixed(2)}%`,
		tolerance: { type: "relative", percent: 2 },
		explain: "公式：基期比重 = [A现期 ÷ (1 + A增长率)] ÷ [B现期 ÷ (1 + B增长率)] × 100%。本题允许相对误差 ±2%。"
	};
}

function fractionPercentQuestion(numerator, denominator) {
	const answer = percentAnswer(numerator / denominator);
	return {
		prompt: `${numerator} ÷ ${denominator} 的百分比≈`,
		answer,
		displayAnswer: `${answer.toFixed(2)}%`,
		tolerance: { type: "relative", percent: 2 },
		explain: "公式：分子 ÷ 分母 × 100%。本题允许相对误差 ±2%。"
	};
}

function growthOption() {
	return {
		current: rand(100, 999),
		rate: dataRate()
	};
}

function dataRate() {
	let value = 0;
	while (value === 0) {
		value = rand(-350, 350) / 10;
	}
	return value;
}

function percentAnswer(ratio) {
	return round2(ratio * 100);
}

function sequenceQuestion() {
	const type = rand(1, 3);
	if (type === 1) {
		const start = rand(2, 20);
		const diff = rand(3, 12);
		const nums = Array.from({ length: 5 }, (_, i) => start + i * diff);
		return { prompt: `${nums.join("，")}，?`, answer: start + 5 * diff, tolerance: 0 };
	}
	if (type === 2) {
		const start = rand(2, 8);
		const ratio = rand(2, 4);
		const nums = Array.from({ length: 5 }, (_, i) => start * Math.pow(ratio, i));
		return { prompt: `${nums.join("，")}，?`, answer: start * Math.pow(ratio, 5), tolerance: 0 };
	}
	const start = rand(1, 8);
	const nums = Array.from({ length: 5 }, (_, i) => start + i * i);
	return { prompt: `${nums.join("，")}，?`, answer: start + 25, tolerance: 0 };
}

function schulteQuestion() {
	return {
		type: "schulte",
		prompt: "舒尔特方格",
		answer: "完成",
		next: 1,
		values: shuffle(Array.from({ length: 25 }, (_, index) => index + 1))
	};
}

function isCorrect(userAnswer, answer, tolerance) {
	if (typeof answer === "string") {
		return userAnswer.toUpperCase() === answer.toUpperCase();
	}
	const num = Number(userAnswer);
	if (!Number.isFinite(num)) return false;
	if (tolerance && typeof tolerance === "object" && tolerance.type === "relative") {
		const allowed = Math.abs(Number(answer)) * tolerance.percent / 100;
		return Math.abs(num - Number(answer)) <= allowed;
	}
	return Math.abs(num - Number(answer)) <= tolerance;
}

function normalize(value) {
	return value.trim().replace(/％/g, "%").replace(/%$/, "");
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function minByDigits(digits) {
	return 10 ** (digits - 1);
}

function maxByDigits(digits) {
	return 10 ** digits - 1;
}

function randRate(min, max, decimals) {
	const factor = 10 ** decimals;
	let value = 0;
	while (Math.abs(value) < 1) {
		value = rand(Math.round(min * factor), Math.round(max * factor)) / factor;
	}
	return value;
}

function round1(value) {
	return Math.round(value * 10) / 10;
}

function round2(value) {
	return Math.round(value * 100) / 100;
}

function shuffle(items) {
	return items
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map((item) => item.value);
}

function formatTime(seconds) {
	const totalMs = Math.max(0, Math.round(seconds * 1000));
	const min = String(Math.floor(totalMs / 60000)).padStart(2, "0");
	const sec = String(Math.floor((totalMs % 60000) / 1000)).padStart(2, "0");
	const ms = String(totalMs % 1000).padStart(3, "0");
	return `${min}:${sec}.${ms}`;
}

function formatSecondsMs(seconds) {
	return `${Number(seconds).toFixed(3)}s`;
}

function formatAverage(seconds, total) {
	if (!total) return "0";
	return (seconds / total).toFixed(1);
}

function formatDateTime(value) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleString("zh-CN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	});
}

function getTimeGrade(exercise, elapsed, correct, total) {
	if (!exercise.timeLevels) return "";
	if (correct !== total) return "评级：未达标（需全对）";
	const matched = exercise.timeLevels.find((level) => elapsed <= level.seconds);
	return `评级：${matched ? matched.label : "待提升"}`;
}

function formatNumber(value) {
	return Number(value.toFixed(2)).toString();
}

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
