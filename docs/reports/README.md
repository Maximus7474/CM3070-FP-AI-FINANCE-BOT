# Reports

This directory contains reports generated with locally hosted language models through Ollama.

The models are used as development-support tools for codebase analysis, documentation, and review. They analyse an existing snapshot of the project and produce structured observations about selected aspects of the implementation.

The models are not used to:
- Generate source code for the project.
- Modify, commit, or delete project files.
- Make final architectural or implementation decisions.
- Replace developer testing, validation, or academic judgement.

The reports are intended to provide an additional perspective on the codebase. They can be used to identify questions, inconsistencies, risks, missing documentation, and areas that require further investigation.

All observations produced by the models are treated as suggestions only. The developer remains responsible for reviewing the source code, assessing the accuracy of each observation, deciding whether an action is appropriate, and implementing and testing any accepted changes.

The models run locally. No source code is intentionally sent to an external AI service as part of the report-generation process.

## Modules

- `source/`: uses [Repomix](https://github.com/yamadashy/repomix) to combine all files into one markdown file to use as context
- `structure/`: uses the [`project-source.md`](./source/project-source.md) to generate an objective report on the project architecture and systems
- `risk/`: uses the [`project-source.md`](./source/project-source.md) to generate an objective report on risks on security and stability of the project
