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

const state = {
	current: exerciseGroups.basic[0],
	questions: [],
	startedAt: 0,
	pausedAt: 0,
	pausedTotalMs: 0,
	resumeQuestionIndex: null,
	activeQuestionIndex: null,
	activeQuestionStartedAt: 0,
	questionTimes: [],
	timerId: null,
	submitted: false
};

const elements = {
	menuPanels: document.querySelectorAll(".menu-panel"),
	menuTriggers: document.querySelectorAll(".menu-trigger"),
	exerciseToolbar: document.getElementById("exerciseToolbar"),
	title: document.getElementById("exerciseTitle"),
	desc: document.getElementById("exerciseDesc"),
	startBtn: document.getElementById("startBtn"),
	recordPageBtn: document.getElementById("recordPageBtn"),
	scoreBtn: document.getElementById("scoreBtn"),
	metaRow: document.getElementById("metaRow"),
	timer: document.getElementById("timer"),
	progress: document.getElementById("progress"),
	statusText: document.getElementById("statusText"),
	form: document.getElementById("quizForm"),
	submitBar: document.getElementById("submitBar"),
	submitHint: document.getElementById("submitHint"),
	inlineResult: document.getElementById("inlineResult"),
	submitBtn: document.getElementById("submitBtn"),
	confirmMask: document.getElementById("confirmMask"),
	confirmMessage: document.getElementById("confirmMessage"),
	confirmCancel: document.getElementById("confirmCancel"),
	confirmOk: document.getElementById("confirmOk"),
	scorePanel: document.getElementById("scorePanel"),
	scoreSummary: document.getElementById("scoreSummary"),
	scoreDetail: document.getElementById("scoreDetail"),
	answerList: document.getElementById("answerList"),
	recordPanel: document.getElementById("recordPanel"),
	recordCountText: document.getElementById("recordCountText"),
	recordList: document.getElementById("recordList"),
	recordTypeFilter: document.getElementById("recordTypeFilter"),
	exportRecordBtn: document.getElementById("exportRecordBtn"),
	clearRecordBtn: document.getElementById("clearRecordBtn")
};

init();

function init() {
	renderMenus();
	renderRecordFilters();
	selectExercise(state.current.id);
	bindEvents();
}

function bindEvents() {
	elements.menuTriggers.forEach((trigger) => {
		trigger.addEventListener("click", () => toggleMenu(trigger.dataset.menu));
	});

	document.addEventListener("click", (event) => {
		if (!event.target.closest(".menu")) closeMenus();
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "F12") {
			event.preventDefault();
			restartCurrentExercise();
			return;
		}
		if (event.key !== " ") return;
		if (isEditableTarget(event.target)) return;
		if (canStartNewExercise()) {
			event.preventDefault();
			startExercise();
		}
	});

	elements.startBtn.addEventListener("click", () => {
		if (state.questions.length && !state.submitted) {
			openSubmitConfirm();
			return;
		}
		startExercise();
	});
	if (elements.submitBtn) elements.submitBtn.addEventListener("click", submitAnswers);
	document.addEventListener("click", (event) => {
		if (event.target && event.target.id === "submitBtn") submitAnswers();
	});
	if (elements.confirmCancel) elements.confirmCancel.addEventListener("click", closeSubmitConfirm);
	if (elements.confirmOk) elements.confirmOk.addEventListener("click", submitAnswers);
	if (elements.confirmMask) elements.confirmMask.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			submitAnswers();
		}
		if (event.key === "Escape") {
			event.preventDefault();
			closeSubmitConfirm();
		}
	});
	elements.scoreBtn.addEventListener("click", () => {
		elements.scorePanel.hidden = !elements.scorePanel.hidden;
	});
	elements.recordPageBtn.addEventListener("click", showRecordPage);
	elements.recordTypeFilter.addEventListener("change", renderHistory);
	elements.exportRecordBtn.addEventListener("click", exportHistoryCsv);
	elements.clearRecordBtn.addEventListener("click", () => {
		if (!window.confirm("确定要清空全部做题记录吗？此操作无法恢复。")) return;
		localStorage.removeItem("xingceAssistantHistory");
		renderHistory();
	});

	elements.form.addEventListener("submit", (event) => {
		event.preventDefault();
		openSubmitConfirm();
	});

	elements.form.addEventListener("keydown", (event) => {
		const inputs = [...elements.form.querySelectorAll(".question-input")];
		const index = inputs.indexOf(event.target);
		if (event.key === "Shift" && !event.repeat && index > 0) {
			event.preventDefault();
			stopQuestionTimer(index);
			inputs[index - 1].focus();
			startQuestionTimer(index - 1);
			scrollQuestionIntoView(inputs[index - 1]);
			return;
		}
		if (event.key !== "Enter") return;
		event.preventDefault();
		if (index >= 0 && index < inputs.length - 1) {
			stopQuestionTimer(index);
			inputs[index + 1].focus();
			startQuestionTimer(index + 1);
			scrollQuestionIntoView(inputs[index + 1]);
		} else if (inputs.length) {
			openSubmitConfirm(index);
		}
	});
}

function renderMenus() {
	Object.entries(exerciseGroups).forEach(([groupKey, items]) => {
		const panel = document.querySelector(`[data-panel="${groupKey}"]`);
		panel.innerHTML = "";
		items.forEach((item) => {
			const button = document.createElement("button");
			button.type = "button";
			button.className = "menu-item";
			button.dataset.exercise = item.id;
			button.textContent = item.title;
			button.addEventListener("click", () => {
				selectExercise(item.id);
				closeMenus();
			});
			panel.appendChild(button);
		});
	});
}

function renderRecordFilters() {
	const titles = [...new Set(Object.values(exerciseGroups).flat().map((item) => item.title))];
	elements.recordTypeFilter.innerHTML = '<option value="">全部题型</option>';
	titles.forEach((title) => {
		const option = document.createElement("option");
		option.value = title;
		option.textContent = title;
		elements.recordTypeFilter.appendChild(option);
	});
}

function toggleMenu(groupKey) {
	document.querySelectorAll(".menu").forEach((menu) => {
		const isTarget = menu.querySelector(".menu-trigger").dataset.menu === groupKey;
		menu.classList.toggle("open", isTarget && !menu.classList.contains("open"));
		menu.querySelector(".menu-trigger").setAttribute("aria-expanded", menu.classList.contains("open"));
	});
}

function closeMenus() {
	document.querySelectorAll(".menu").forEach((menu) => {
		menu.classList.remove("open");
		menu.querySelector(".menu-trigger").setAttribute("aria-expanded", "false");
	});
}

function selectExercise(id) {
	const item = Object.values(exerciseGroups).flat().find((exercise) => exercise.id === id);
	if (!item) return;
	showExercisePage();

	state.current = item;
	state.questions = [];
	state.submitted = false;
	clearInterval(state.timerId);

	elements.title.textContent = item.title;
	elements.desc.textContent = getExerciseDescription(item);
	elements.form.innerHTML = '<div class="placeholder">点击“开始练习”生成题目。</div>';
	elements.metaRow.hidden = true;
	if (elements.submitBar) elements.submitBar.hidden = true;
	if (elements.inlineResult) elements.inlineResult.hidden = true;
	elements.scoreBtn.hidden = true;
	elements.scorePanel.hidden = true;
	if (elements.confirmMask) elements.confirmMask.hidden = true;
	elements.startBtn.textContent = "开始练习";

	document.querySelectorAll(".menu-item").forEach((button) => {
		button.classList.toggle("active", button.dataset.exercise === id);
	});

	document.querySelectorAll(".menu-trigger").forEach((trigger) => {
		if (!trigger.dataset.menu) return;
		const active = exerciseGroups[trigger.dataset.menu].some((exercise) => exercise.id === id);
		trigger.classList.toggle("active", active);
	});
}

function showExercisePage() {
	elements.exerciseToolbar.hidden = false;
	elements.form.hidden = false;
	elements.recordPanel.hidden = true;
	elements.recordPageBtn.classList.remove("active");
}

function showRecordPage() {
	closeMenus();
	elements.exerciseToolbar.hidden = true;
	elements.metaRow.hidden = true;
	elements.form.hidden = true;
	if (elements.submitBar) elements.submitBar.hidden = true;
	elements.scorePanel.hidden = true;
	elements.scoreBtn.hidden = true;
	elements.recordPanel.hidden = false;
	document.querySelectorAll(".menu-trigger").forEach((trigger) => trigger.classList.remove("active"));
	elements.recordPageBtn.classList.add("active");
	renderHistory();
}

function canStartNewExercise() {
	return !state.questions.length || state.submitted;
}

function isEditableTarget(target) {
	return target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

function restartCurrentExercise() {
	if (elements.confirmMask) elements.confirmMask.hidden = true;
	showExercisePage();
	startExercise();
}

function getExerciseDescription(item) {
	if (!item.timeLevels) return item.desc;
	const pass = item.timeLevels.find((level) => level.label === "合格")?.seconds;
	const good = item.timeLevels.find((level) => level.label === "良好")?.seconds;
	const excellent = item.timeLevels.find((level) => level.label === "优秀")?.seconds;
	if (!pass || !good || !excellent) return item.desc;
	return `${item.desc} 评级规则：合格 ${pass}s，良好 ${good}s，优秀 ${excellent}s。`;
}

function startExercise() {
	state.questions = Array.from({ length: state.current.count }, (_, index) => ({
		...state.current.generator(index),
		index
	}));
	state.startedAt = Date.now();
	state.pausedAt = 0;
	state.pausedTotalMs = 0;
	state.resumeQuestionIndex = null;
	state.activeQuestionIndex = null;
	state.activeQuestionStartedAt = 0;
	state.questionTimes = Array(state.questions.length).fill(0);
	state.submitted = false;

	elements.scorePanel.hidden = true;
	elements.scoreBtn.hidden = true;
	if (elements.submitBar) elements.submitBar.hidden = false;
	if (elements.submitHint) elements.submitHint.textContent = "填写完成后点击校验。";
	if (elements.inlineResult) elements.inlineResult.hidden = true;
	if (elements.submitBtn) elements.submitBtn.disabled = false;
	elements.metaRow.hidden = false;
	elements.statusText.textContent = "练习中";
	elements.startBtn.textContent = "提交答案";

	renderQuestions();
	updateProgress();
	startTimer();

	const firstInput = elements.form.querySelector(".question-input");
	if (firstInput) {
		firstInput.focus();
		startQuestionTimer(0);
		scrollQuestionIntoView(firstInput);
	}
}

function scrollQuestionIntoView(input) {
	const row = input.closest(".question-row");
	if (!row) return;
	row.scrollIntoView({ behavior: "smooth", block: "center" });
}

function startQuestionTimer(index) {
	if (state.submitted || index === null || index === undefined || index < 0) return;
	if (state.activeQuestionIndex === index) return;
	stopQuestionTimer(state.activeQuestionIndex);
	state.activeQuestionIndex = index;
	state.activeQuestionStartedAt = Date.now();
}

function stopQuestionTimer(index) {
	if (index === null || index === undefined || index < 0 || !state.activeQuestionStartedAt) return;
	const elapsed = (Date.now() - state.activeQuestionStartedAt) / 1000;
	state.questionTimes[index] = (state.questionTimes[index] || 0) + elapsed;
	state.activeQuestionIndex = null;
	state.activeQuestionStartedAt = 0;
}

function pauseExercise(resumeIndex = state.activeQuestionIndex) {
	if (state.pausedAt || state.submitted) return;
	state.resumeQuestionIndex = resumeIndex;
	stopQuestionTimer(state.activeQuestionIndex);
	state.pausedAt = Date.now();
	clearInterval(state.timerId);
	elements.timer.textContent = formatTime(getElapsedSeconds());
	elements.statusText.textContent = "已暂停";
}

function resumeExercise() {
	if (!state.pausedAt || state.submitted) return;
	state.pausedTotalMs += Date.now() - state.pausedAt;
	state.pausedAt = 0;
	elements.statusText.textContent = "练习中";
	startTimer();
	const resumeIndex = state.resumeQuestionIndex ?? 0;
	const input = elements.form.querySelector(`.question-input[data-index="${resumeIndex}"]`);
	if (input) {
		input.focus();
		startQuestionTimer(resumeIndex);
		scrollQuestionIntoView(input);
	}
	state.resumeQuestionIndex = null;
}

function openSubmitConfirm(resumeIndex = state.activeQuestionIndex) {
	if (!state.questions.length || state.submitted) return;
	if (!elements.confirmMask || !elements.confirmMessage || !elements.confirmOk) {
		submitAnswers();
		return;
	}
	pauseExercise(resumeIndex);
	const total = state.current.custom === "schulte" ? 25 : state.questions.length;
	const done = getDoneCount();
	const missing = Math.max(0, total - done);
	elements.confirmMessage.textContent = missing
		? `还有 ${missing} 题未完成，仍要提交并校验吗？`
		: "提交后会立即显示正确答案和本次成绩。";
	elements.confirmMask.hidden = false;
	elements.confirmOk.focus();
}

function closeSubmitConfirm() {
	if (elements.confirmMask) elements.confirmMask.hidden = true;
	resumeExercise();
}

function renderQuestions() {
	elements.form.innerHTML = "";

	state.questions.forEach((question, index) => {
		if (question.type === "schulte") {
			elements.form.appendChild(renderSchulte(question));
			return;
		}

		const row = document.createElement("div");
		row.className = "question-row";
		row.dataset.index = String(index);

		const main = document.createElement("div");
		main.className = "question-main";

		const text = document.createElement("label");
		text.className = "question-text";
		text.htmlFor = `answer-${index}`;
		text.textContent = question.prompt;

		const input = document.createElement("input");
		input.id = `answer-${index}`;
		input.className = "question-input";
		input.inputMode = question.inputMode || "decimal";
		input.name = `answer-${index}`;
		input.dataset.index = String(index);
		input.addEventListener("input", updateProgress);
		input.addEventListener("focus", () => startQuestionTimer(index));

		const mark = document.createElement("span");
		mark.className = "result-mark";

		main.append(text, input, mark);
		row.appendChild(main);
		elements.form.appendChild(row);
	});
}

function renderSchulte(question) {
	const wrap = document.createElement("div");
	wrap.className = "schulte-wrap";
	wrap.innerHTML = "";

	const grid = document.createElement("div");
	grid.className = "schulte-grid";

	question.values.forEach((value) => {
		const cell = document.createElement("button");
		cell.type = "button";
		cell.className = "schulte-cell";
		cell.textContent = value;
		cell.addEventListener("click", () => {
			if (Number(value) !== question.next) return;
			cell.disabled = true;
			cell.classList.add("done");
			question.next += 1;
			updateProgress();
			if (question.next > 25) submitAnswers();
		});
		grid.appendChild(cell);
	});

	const hint = document.createElement("p");
	hint.className = "placeholder";
	hint.textContent = "从 1 开始顺序点击到 25。";
	wrap.append(hint, grid);
	return wrap;
}

function submitAnswers() {
	if (!state.questions.length || state.submitted) return;
	state.submitted = true;
	stopQuestionTimer(state.activeQuestionIndex);
	if (elements.confirmMask) elements.confirmMask.hidden = true;
	clearInterval(state.timerId);

	const elapsed = getElapsedSeconds();
	let correct = 0;
	const answers = [];

	state.questions.forEach((question, index) => {
		let userAnswer = "";
		let ok = false;

		if (question.type === "schulte") {
			ok = question.next > 25;
			userAnswer = ok ? "完成" : `到 ${question.next - 1}`;
		} else {
			const input = elements.form.querySelector(`.question-input[data-index="${index}"]`);
			userAnswer = normalize(input.value);
			ok = isCorrect(userAnswer, question.answer, question.tolerance);
			input.disabled = true;

			const row = input.closest(".question-row");
			row.classList.add(ok ? "correct" : "wrong");
			row.querySelector(".result-mark").textContent = ok ? "正确" : `答案 ${question.displayAnswer || question.answer}`;
		}

		if (ok) correct += 1;
		answers.push({ question, userAnswer, ok, seconds: state.questionTimes[index] || 0 });
	});

	elements.statusText.textContent = "已提交";
	elements.scoreBtn.hidden = false;
	elements.scorePanel.hidden = false;
	const accuracy = Math.round(correct / state.questions.length * 100);
	if (elements.submitHint) elements.submitHint.textContent = `已校验：${correct} / ${state.questions.length}，正确率 ${accuracy}%。`;
	if (elements.inlineResult) {
		elements.inlineResult.textContent = `正确率 ${accuracy}%`;
		elements.inlineResult.hidden = false;
	}
	if (elements.submitBtn) elements.submitBtn.disabled = true;
	elements.startBtn.textContent = "重新开始";
	const timeGrade = getTimeGrade(state.current, elapsed, correct, state.questions.length);
	const gradeText = timeGrade.replace(/^评级：/, "");
	elements.scoreSummary.textContent = `${correct} / ${state.questions.length}`;
	elements.scoreDetail.textContent = `正确率 ${accuracy}%，用时 ${formatTime(elapsed)}，平均 ${formatAverage(elapsed, state.questions.length)} 秒/题${timeGrade ? `，${timeGrade}` : ""}。`;
	renderAnswers(answers);
	try {
		saveHistory(correct, elapsed, accuracy, gradeText, answers);
		renderHistory();
	} catch (error) {
		console.warn("保存练习记录失败：", error);
	}
	try {
		elements.scorePanel.scrollIntoView({ behavior: "smooth", block: "start" });
	} catch (error) {
		elements.scorePanel.scrollIntoView();
	}
}

window.submitAnswers = submitAnswers;

function renderAnswers(answers) {
	elements.answerList.innerHTML = "";
	answers.forEach(({ question, userAnswer, ok, seconds }, index) => {
		const item = document.createElement("div");
		item.className = "answer-item";
		item.innerHTML = `<b>${index + 1}. ${escapeHtml(question.prompt)}</b><br>你的答案：${escapeHtml(userAnswer || "未作答")}<br>标准答案：${escapeHtml(String(question.displayAnswer || question.answer))}${question.explain ? `<br>${escapeHtml(question.explain)}` : ""}`;
		item.insertAdjacentHTML("beforeend", `<br>单题用时：${escapeHtml(formatSecondsMs(seconds || 0))}`);
		const errorInfo = buildErrorInfo(userAnswer, question.answer);
		if (errorInfo) item.insertAdjacentHTML("beforeend", `<br>${errorInfo}`);
		if (!ok) item.style.borderLeft = "3px solid var(--danger)";
		elements.answerList.appendChild(item);
	});
}

function buildErrorInfo(userAnswer, answer) {
	const error = getErrorMetrics(userAnswer, answer);
	if (!error) return "";
	return `相差值：${escapeHtml(error.diff)}<br>相对误差：${escapeHtml(error.errorRate)}%（按标准答案绝对值计算）`;
}

function getErrorMetrics(userAnswer, answer) {
	if (typeof answer === "string" || !userAnswer) return null;
	const userValue = Number(userAnswer);
	const answerValue = Number(answer);
	if (!Number.isFinite(userValue) || !Number.isFinite(answerValue)) return null;
	const diff = userValue - answerValue;
	const absDiff = Math.abs(diff);
	const errorRate = answerValue === 0 ? 0 : Math.abs(diff / answerValue) * 100;
	return {
		diff: formatNumber(absDiff),
		errorRate: formatNumber(errorRate)
	};
}

function updateProgress() {
	const total = state.questions.length;
	let done = getDoneCount();

	if (state.current.custom === "schulte") {
		elements.progress.textContent = `${done} / 25`;
		return;
	}

	elements.progress.textContent = `${done} / ${total}`;
	if (total && !state.submitted) {
		if (elements.submitHint) elements.submitHint.textContent = done === total ? "已全部填写，可以提交校验。" : `已填写 ${done} 题，还剩 ${total - done} 题。`;
	}
}

function getDoneCount() {
	if (state.current.custom === "schulte") {
		const question = state.questions[0];
		return question ? Math.max(0, question.next - 1) : 0;
	}
	let done = 0;
	elements.form.querySelectorAll(".question-input").forEach((input) => {
		if (input.value.trim()) done += 1;
	});
	return done;
}

function startTimer() {
	clearInterval(state.timerId);
	elements.timer.textContent = "00:00";
	state.timerId = setInterval(() => {
		elements.timer.textContent = formatTime(getElapsedSeconds());
	}, 500);
}

function getElapsedSeconds() {
	const pausedMs = state.pausedTotalMs + (state.pausedAt ? Date.now() - state.pausedAt : 0);
	return Math.max(0, (Date.now() - state.startedAt - pausedMs) / 1000);
}

function saveHistory(correct, elapsed, accuracy, gradeText, answers) {
	const key = "xingceAssistantHistory";
	const history = JSON.parse(localStorage.getItem(key) || "[]");
	history.unshift({
		id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
		title: state.current.title,
		correct,
		total: state.questions.length,
		accuracy,
		elapsed,
		grade: gradeText,
		questions: buildQuestionReport(answers),
		time: new Date().toISOString()
	});
	localStorage.setItem(key, JSON.stringify(history));
}

function buildQuestionReport(answers) {
	return answers.map(({ question, userAnswer, ok, seconds }, index) => {
		const answer = question.displayAnswer || question.answer;
		const error = getErrorMetrics(userAnswer, question.answer);
		return {
			index: index + 1,
			prompt: question.prompt,
			userAnswer: userAnswer || "未作答",
			answer: String(answer),
			correct: ok,
			seconds: Number(seconds || 0).toFixed(3),
			diff: error ? error.diff : "",
			errorRate: error ? error.errorRate : "",
			explain: question.explain || ""
		};
	});
}

function renderHistory() {
	const visibleHistory = getVisibleHistory();
	elements.recordCountText.textContent = `（${visibleHistory.length} 次）`;
	elements.recordList.innerHTML = "";
	if (!visibleHistory.length) {
		elements.recordList.innerHTML = '<div class="empty-record">暂无做题记录。</div>';
		return;
	}
	visibleHistory.forEach((item, recordIndex) => {
		const recordId = item.id || item.time;
		const grade = item.grade || "";
		const gradeBadge = grade ? `<span class="grade-badge ${getGradeBadgeClass(grade)}">${escapeHtml(grade)}</span>` : "";
		const record = document.createElement("article");
		record.className = "record-card";
		record.innerHTML = `
			<div class="record-item">
				<span class="record-index">第 ${visibleHistory.length - recordIndex} 次${gradeBadge}</span>
				<strong>${escapeHtml(item.title)}</strong>
				<span>做题时间：${escapeHtml(formatDateTime(item.time))}</span>
				<span>${item.correct} / ${item.total}，正确率 ${item.accuracy}%</span>
				<span>用时 ${escapeHtml(formatTime(item.elapsed))}</span>
				<button class="record-toggle" type="button" data-record="${recordIndex}">${item.questions?.length ? "查看题目报告" : "无题目明细"}</button>
				<button class="record-delete" type="button" data-record-id="${escapeHtml(recordId)}">删除</button>
			</div>
			<div class="record-report" id="record-report-${recordIndex}" hidden></div>
		`;
		elements.recordList.appendChild(record);
		const toggle = record.querySelector(".record-toggle");
		const report = record.querySelector(".record-report");
		toggle.disabled = !item.questions?.length;
		toggle.addEventListener("click", () => {
			report.hidden = !report.hidden;
			toggle.textContent = report.hidden ? "查看题目报告" : "收起题目报告";
			if (!report.hidden && !report.dataset.rendered) {
				renderRecordReport(report, item.questions);
				report.dataset.rendered = "true";
			}
		});
		record.querySelector(".record-delete").addEventListener("click", () => {
			if (!window.confirm("确定要删除这条做题记录吗？")) return;
			deleteHistoryRecord(recordId);
		});
	});
}

function getVisibleHistory() {
	const history = JSON.parse(localStorage.getItem("xingceAssistantHistory") || "[]");
	const filter = elements.recordTypeFilter.value;
	return filter ? history.filter((item) => item.title === filter) : history;
}

function exportHistoryCsv() {
	const visibleHistory = getVisibleHistory();
	if (!visibleHistory.length) return;
	const maxQuestionCount = Math.max(0, ...visibleHistory.map((item) => item.questions?.length || 0));
	const rows = visibleHistory.map((item) => [
		item.title,
		formatDateTime(item.time),
		formatTime(item.elapsed),
		formatRecordStatus(item),
		formatRecordGrade(item),
		...formatQuestionColumns(item.questions, maxQuestionCount)
	]);
	const csv = `\uFEFF${rows.map((row) => row.map(escapeCsvCell).join(",")).join("\r\n")}`;
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	const suffix = elements.recordTypeFilter.value || "全部题型";
	link.href = url;
	link.download = `行测助手做题记录-${suffix}-${new Date().toISOString().slice(0, 10)}.csv`;
	document.body.appendChild(link);
	link.click();
	link.remove();
	URL.revokeObjectURL(url);
}

function formatQuestionColumns(questions = [], maxQuestionCount = 0) {
	return Array.from({ length: maxQuestionCount }, (_, index) => {
		const question = questions[index];
		if (!question) return "";
		const parts = [
			`第${question.index}题：${question.prompt}`,
			`你的答案：${question.userAnswer}`,
			`标准答案：${question.answer}`,
			question.correct ? "正确" : "错误",
			`用时：${formatSecondsMs(question.seconds || 0)}`
		];
		if (question.diff !== "") parts.push(`相差值：${question.diff}`);
		if (question.errorRate !== "") parts.push(`误差率：${question.errorRate}%`);
		return parts.join("；");
	});
}

function formatRecordStatus(item) {
	return `${item.correct} / ${item.total}，正确率 ${item.accuracy}%`;
}

function formatRecordGrade(item) {
	return (item.grade || "").replace(/^评级：/, "").replace("未达标（需全对）", "未达标");
}

function escapeCsvCell(value) {
	const text = String(value ?? "");
	return `"${text.replace(/"/g, '""')}"`;
}

function deleteHistoryRecord(recordId) {
	const history = JSON.parse(localStorage.getItem("xingceAssistantHistory") || "[]");
	const nextHistory = history.filter((item) => (item.id || item.time) !== recordId);
	localStorage.setItem("xingceAssistantHistory", JSON.stringify(nextHistory));
	renderHistory();
}

function renderRecordReport(container, questions) {
	container.innerHTML = "";
	questions.forEach((question) => {
		const row = document.createElement("div");
		const statusText = question.correct ? "正确" : "错误";
		row.className = `record-question ${question.correct ? "correct" : "wrong"}`;
		row.innerHTML = `
			<b class="record-question-title">
				<span class="record-question-index">第 ${question.index} 题</span>
				<span class="answer-badge ${question.correct ? "is-correct" : "is-wrong"}">${statusText}</span>
				<span class="record-question-prompt">${escapeHtml(question.prompt)}</span>
			</b>
			<span>你的答案：${escapeHtml(question.userAnswer)}</span>
			<span>标准答案：${escapeHtml(question.answer)}</span>
			<span>用时：${escapeHtml(formatSecondsMs(question.seconds || 0))}</span>
			${question.diff !== "" ? `<span>相差值：${escapeHtml(question.diff)}</span>` : ""}
			${question.errorRate !== "" ? `<span>相对误差：${escapeHtml(question.errorRate)}%</span>` : ""}
			${question.explain ? `<small>${escapeHtml(question.explain)}</small>` : ""}
		`;
		container.appendChild(row);
	});
}

function getGradeBadgeClass(grade) {
	if (grade.includes("优秀")) return "is-excellent";
	if (grade.includes("良好")) return "is-good";
	if (grade.includes("合格")) return "is-pass";
	return "is-fail";
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
