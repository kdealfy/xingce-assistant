# 项目结构说明

这个项目保持无构建工具的纯前端结构，方便直接打开 `index.html` 使用。

## 文件职责

- `app.js`：页面渲染、答题流程、计时、提交校验、做题记录展示。
- `js/question-generators.js`：所有出题函数、判题辅助函数、格式化工具函数。
- `js/exercise-config.js`：练习项目配置、闯关关卡配置、本地进度版本号。
- `style.css`：页面样式。

## 新增一个基础练习或资料专项

1. 在 `js/question-generators.js` 增加一个出题函数，返回格式：

```js
{
	prompt: "题目文本",
	answer: 123,
	displayAnswer: "123",
	tolerance: 0
}
```

2. 在 `js/exercise-config.js` 的 `exerciseGroups.basic` 或 `exerciseGroups.data` 中增加配置：

```js
{
	id: "newType",
	title: "新题型",
	desc: "题型说明",
	count: 10,
	generator: newGenerator,
	timeLevels: grade(60, 50, 40)
}
```

资料专项如果不需要用时评级，可以不写 `timeLevels`。

## 新增一个闯关关卡

在 `js/exercise-config.js` 的 `gameStages` 里增加一项：

```js
{
	id: "stage-27",
	number: 27,
	title: "关卡名",
	exerciseId: "newType",
	difficulty: "挑战"
}
```

闯关会自动继承对应练习的题量、评级和出题函数。

如果改了关卡顺序或通关规则，建议递增 `GAME_PROGRESS_VERSION`，避免旧进度污染新规则。
