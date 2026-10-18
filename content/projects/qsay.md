---
name: qsay
description: 用自然语言生成终端命令计划，由确定性代码校验结构和风险，并在用户确认后执行；支持本地模型或 OpenAI-compatible API。
repo: https://github.com/xiaoqiang-cheng/qsay
image: "@/assets/images/qsay-workflow.png"
tags: [Python, CLI, 本地优先]
order: 6
featured: true
---

项目重点是把模型生成和命令执行边界分开，并用评估集检查参数准确率、危险误调用和延迟。
